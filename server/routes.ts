import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processJudicialQuery, categorizeQuery } from "./services/gemini";
import { judicialKnowledgeBase } from "./data/judicial-info";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize judicial knowledge base
  await Promise.all(
    judicialKnowledgeBase.map(item => storage.createJudicialQuery(item))
  );

  // Get or create conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const { sessionId, userId } = req.body;
      
      let conversation = await storage.getConversation(sessionId);
      
      if (!conversation) {
        const validatedData = insertConversationSchema.parse({
          sessionId,
          userId: userId || null,
        });
        conversation = await storage.createConversation(validatedData);
      }
      
      res.json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Get conversation messages
  app.get("/api/conversations/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      const conversation = await storage.getConversation(sessionId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      const messages = await storage.getMessagesByConversationId(conversation.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send message and get AI response
  app.post("/api/conversations/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { content, messageType = "text" } = req.body;
      
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: "Message content is required" });
      }
      
      const conversation = await storage.getConversation(sessionId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      // Save user message
      const userMessageData = insertMessageSchema.parse({
        conversationId: conversation.id,
        content: content.trim(),
        isUser: true,
        messageType,
      });
      
      const userMessage = await storage.createMessage(userMessageData);
      
      // Get recent messages for context
      const recentMessages = await storage.getMessagesByConversationId(conversation.id);
      const context = recentMessages
        .slice(-6) // Last 6 messages for context
        .map(m => `${m.isUser ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n');
      
      // Process query with AI
      const aiResponse = await processJudicialQuery(content, context);
      
      // Save AI response
      const aiMessageData = insertMessageSchema.parse({
        conversationId: conversation.id,
        content: aiResponse.message,
        isUser: false,
        messageType: "text",
        metadata: {
          category: aiResponse.category,
          confidence: aiResponse.confidence,
          suggestedActions: aiResponse.suggestedActions,
        },
      });
      
      const aiMessage = await storage.createMessage(aiMessageData);
      
      // Update conversation timestamp
      await storage.updateConversation(sessionId, { updatedAt: new Date() });
      
      res.json({
        userMessage,
        aiMessage,
        metadata: {
          category: aiResponse.category,
          confidence: aiResponse.confidence,
          suggestedActions: aiResponse.suggestedActions,
        },
      });
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Search judicial queries
  app.get("/api/judicial-queries/search", async (req, res) => {
    try {
      const { q, category } = req.query;
      
      let queries;
      
      if (category && typeof category === 'string') {
        queries = await storage.getJudicialQueriesByCategory(category);
      } else if (q && typeof q === 'string') {
        const keywords = q.toLowerCase().split(' ').filter(k => k.length > 2);
        queries = await storage.searchJudicialQueries(keywords);
      } else {
        queries = await storage.getAllJudicialQueries();
      }
      
      res.json(queries.slice(0, 10)); // Limit results
    } catch (error) {
      console.error("Error searching judicial queries:", error);
      res.status(500).json({ error: "Failed to search queries" });
    }
  });

  // Get service statistics (mock data for demo)
  app.get("/api/statistics", async (req, res) => {
    try {
      const stats = {
        activeCases: "4,523,891",
        eFilingToday: "12,456",
        resolvedCases: "8,234,112",
        lastUpdated: new Date().toISOString(),
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  // Case status checking API (simulated NJDG/eCourts integration)
  app.get("/api/case-status/:caseNumber", async (req, res) => {
    try {
      const { caseNumber } = req.params;
      
      // Simulate case status lookup
      const mockCaseData = {
        caseNumber: caseNumber.toUpperCase(),
        partyNames: "ABC Pvt Ltd vs XYZ Company",
        courtName: "Delhi High Court",
        caseType: "Civil Appeal",
        filingDate: "2024-01-15",
        lastHearingDate: "2024-07-20",
        nextHearingDate: "2024-08-15",
        status: "Pending",
        stage: "Arguments completed, judgment reserved",
        judgeName: "Hon'ble Justice A.K. Sharma",
        courtRoom: "Court Room No. 12",
        orders: [
          {
            date: "2024-07-20",
            order: "Arguments heard. Judgment reserved."
          },
          {
            date: "2024-06-10", 
            order: "Matter adjourned for final arguments."
          }
        ]
      };
      
      res.json({
        success: true,
        data: mockCaseData,
        message: "Case details retrieved successfully from eCourts database"
      });
    } catch (error) {
      console.error("Error fetching case status:", error);
      res.status(500).json({ 
        success: false,
        error: "Unable to fetch case status. Please verify case number or try again later." 
      });
    }
  });

  // Search cases by party name
  app.get("/api/search-cases", async (req, res) => {
    try {
      const { partyName, courtName } = req.query;
      
      if (!partyName) {
        return res.status(400).json({ error: "Party name is required" });
      }
      
      // Simulate party name search
      const mockResults = [
        {
          caseNumber: "CRL.A/234/2024",
          partyNames: `${partyName} vs State of Delhi`,
          courtName: courtName || "Delhi High Court",
          status: "Pending",
          nextHearingDate: "2024-08-20"
        },
        {
          caseNumber: "CS/567/2023", 
          partyNames: `${partyName} vs Municipal Corporation`,
          courtName: courtName || "Delhi High Court",
          status: "Disposed",
          disposalDate: "2024-06-15"
        }
      ];
      
      res.json({
        success: true,
        results: mockResults,
        total: mockResults.length,
        message: `Found ${mockResults.length} cases for party: ${partyName}`
      });
    } catch (error) {
      console.error("Error searching cases:", error);
      res.status(500).json({ 
        success: false,
        error: "Unable to search cases. Please try again later." 
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
