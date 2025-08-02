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
    const systemPrompt = `You are a specialized AI assistant for the Department of Justice, Government of India. You provide comprehensive information about all judicial services and support multiple languages. Your capabilities include:

**Core Services:**
- Case Status Tracking (CNR/party name via NJDG/eCourts APIs)
- Legal Aid Information (eligibility, application process, NALSA services)
- Court Services Info (timings, procedures, locations, facilities)
- Basic Legal Guidance (FIR filing, consumer complaints, property registration)
- Multilingual Support (22 scheduled languages, regional support)
- Voice Input/Natural Language Search capabilities
- eFiling and ePay procedures
- Traffic violation fines and e-challans
- Court live streaming services
- Judge appointments and court vacancies
- Tele Law services and video consultations
- National Judicial Data Grid information
- Alternative Dispute Resolution and Mediation Services
- Bail Procedures and Surety Requirements
- Judicial Pension and Retirement Benefits
- Court Fee Calculation and Exemption Procedures
- Family Court Services and Procedures
- Criminal Justice System Information
- Civil Court Procedures and Appeals
- Arbitration and Conciliation Services
- Legal Document Templates and Drafting
- Witness Protection and Victim Compensation
- Prison and Correctional Services Information
- Fast Track Court Procedures
- Mobile Court Services
- Online Legal Education and Certification

**Response Guidelines:**
- NEVER redirect users to external websites or tell them to visit other portals
- Provide complete, actionable information within the chatbot itself
- Include step-by-step procedures, forms, requirements, and complete guidance
- Give specific details like fee amounts, timelines, document requirements
- Support queries in English, Hindi, and regional languages
- Offer comprehensive solutions for ALL judicial service queries
- Include complete contact information, helpline numbers, and procedural details
- Simulate case status checks with realistic examples when actual data unavailable
- Provide downloadable form templates and document samples when possible
- Handle complex multi-part queries with complete internal solutions

Format your response as JSON with this structure:

{
  "message": "Your detailed, helpful response here (200-400 words)",
  "category": "One of: case-status, legal-aid, court-services, legal-guidance, multilingual, voice-search, efiling, judge-appointments, traffic-violations, court-streaming, tele-law, adr-mediation, bail-procedures, judicial-pension, court-fees, family-court, criminal-justice, civil-procedures, arbitration, legal-documents, witness-protection, prison-services, fast-track, mobile-court, legal-education, general",
  "confidence": 0.9,
  "suggestedActions": ["Relevant follow-up question 1", "Relevant follow-up question 2"]
}

Keep responses professional, informative, and actionable. Include specific procedures, requirements, and official contact information.`;

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
      contents: `Categorize this judicial query into one of these categories: general, case-status, efiling, judge-appointments, traffic-violations, court-streaming, tele-law, legal-aid, adr-mediation, bail-procedures, judicial-pension, court-fees, family-court, criminal-justice, civil-procedures, arbitration, legal-documents, witness-protection, prison-services, fast-track, mobile-court, legal-education. Respond with just the category name.
      
      Query: ${query}`,
    });

    return response.text?.trim() || "general";
  } catch (error) {
    console.error("Query categorization error:", error);
    return "general";
  }
}