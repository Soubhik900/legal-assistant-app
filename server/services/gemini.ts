import { GoogleGenAI } from "@google/genai";

// Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ChatResponse {
  message: string;
  category: string;
  confidence: number;
  suggestedActions?: string[];
}

export async function processJudicialQuery(userQuery: string, context?: string): Promise<ChatResponse> {
  try {
    const systemPrompt = `You are a specialized AI assistant for the Department of Justice, Government of India. You provide accurate information about:

- Judge appointments and court vacancies
- Case status checking procedures
- eFiling and ePay procedures
- Traffic violation fines and e-challans
- Court live streaming services
- Fast track courts information
- eCourts Services Mobile app
- Tele Law services
- Legal aid services
- National Judicial Data Grid information

Provide helpful, accurate, and official information. If you don't have specific data, direct users to appropriate official channels. Format your response as JSON with the following structure:

{
  "message": "Your detailed response here",
  "category": "One of: general, case-status, efiling, judge-appointments, traffic-violations, court-streaming, tele-law, legal-aid",
  "confidence": 0.9,
  "suggestedActions": ["Follow-up question 1", "Follow-up question 2"]
}

Keep responses professional, informative, and within 200-300 words. Include specific steps or procedures when relevant.`;

    const userPrompt = `User query: "${userQuery}"
    ${context ? `Context: ${context}` : ''}
    
    Please provide a helpful response about judicial services in India.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            message: { type: "string" },
            category: { type: "string" },
            confidence: { type: "number" },
            suggestedActions: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["message", "category", "confidence"]
        },
      },
      contents: userPrompt,
    });

    const result = JSON.parse(response.text || "{}");
    
    return {
      message: result.message || "I apologize, but I couldn't process your query. Please try asking about specific judicial services.",
      category: result.category || "general",
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      suggestedActions: result.suggestedActions || []
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      message: "I'm currently experiencing technical difficulties. Please try again in a moment or contact the helpline for immediate assistance.",
      category: "error",
      confidence: 0,
      suggestedActions: ["Try rephrasing your question", "Contact helpline: 1800-XXX-XXXX"]
    };
  }
}

export async function categorizeQuery(query: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Categorize this judicial query into one of these categories: general, case-status, efiling, judge-appointments, traffic-violations, court-streaming, tele-law, legal-aid. Respond with just the category name.
      
      Query: ${query}`,
    });

    return response.text?.trim() || "general";
  } catch (error) {
    console.error("Query categorization error:", error);
    return "general";
  }
}