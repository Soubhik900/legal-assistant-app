import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertChatMessageSchema } from "@shared/schema";
import { getChatbotResponse } from "./openai";

// Define request schemas
const createSessionSchema = z.object({
  userId: z.number().optional(),
});

const messageSchema = z.object({
  sessionId: z.string(),
  content: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create new chat session
  app.post("/api/sessions", async (req: Request, res: Response) => {
    try {
      const validatedData = createSessionSchema.parse(req.body);
      const session = await storage.createChatSession(validatedData.userId);
      
      // Add initial assistant message
      await storage.addChatMessage({
        sessionId: session.sessionId,
        role: "assistant",
        content: `Welcome to the Department of Justice Judicial Information Assistant. I can help you with:
        
• Information about judge appointments
• Tracking court case status
• Traffic violation fines
• eFiling and ePay procedures
• Court case live streaming
• And more judicial services

How can I assist you today?`
      });
      
      res.status(201).json(session);
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(400).json({ message: "Failed to create session" });
    }
  });

  // Get session messages
  app.get("/api/sessions/:sessionId/messages", async (req: Request, res: Response) => {
    try {
      const sessionId = req.params.sessionId;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Send message to chatbot
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { sessionId, content } = messageSchema.parse(req.body);
      
      // Check if session exists
      const session = await storage.getChatSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Save user message
      const userMessage = await storage.addChatMessage({
        sessionId,
        role: "user",
        content,
      });

      // Get previous messages for context
      const previousMessages = await storage.getChatMessages(sessionId);
      const chatHistory = previousMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Get response from OpenAI
      const botResponse = await getChatbotResponse(content, chatHistory);
      
      // Save assistant response
      const assistantMessage = await storage.addChatMessage({
        sessionId,
        role: "assistant",
        content: botResponse.message,
      });

      res.status(200).json({ 
        userMessage, 
        assistantMessage,
        category: botResponse.category 
      });
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(400).json({ message: "Failed to process message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
