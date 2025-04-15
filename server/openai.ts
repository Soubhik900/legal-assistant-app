import OpenAI from "openai";
import { JudicialData } from "@shared/types";
import fs from "fs";
import path from "path";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Load judicial data
const judicialData: JudicialData = {
  judgeVacancies: [
    { court: "Supreme Court", sanctioned: 34, working: 27, vacancies: 7 },
    { court: "High Courts", sanctioned: 1108, working: 776, vacancies: 332 },
    { court: "District Courts", sanctioned: 24282, working: 19192, vacancies: 5090 }
  ],
  trafficViolations: [
    { violation: "Driving without license", fine: "₹5,000" },
    { violation: "Overspeeding", fine: "₹1,000 - ₹2,000" },
    { violation: "Drunk driving", fine: "₹10,000" },
    { violation: "Riding without helmet", fine: "₹1,000" },
    { violation: "Using mobile while driving", fine: "₹5,000" }
  ],
  courtCases: [
    { type: "eCourts Services Portal", description: "Visit ecourts.gov.in and use the Case Status search option" },
    { type: "National Judicial Data Grid", description: "Visit njdg.ecourts.gov.in for comprehensive case status" },
    { type: "eCourts Mobile App", description: "Download from Google Play or App Store" }
  ],
  efilingSteps: [
    "Register on efiling.ecourts.gov.in with mobile and email",
    "Scan documents in prescribed format (PDF/A) and digital signatures",
    "Login and follow the guided process to submit your case details and documents",
    "Pay court fees online through various payment gateways"
  ],
  fastTrackCourts: [
    "Special courts designed to expedite case disposal",
    "Focus on specific types of cases including POCSO, rape, and other heinous crimes",
    "Established to reduce case backlog in the judicial system",
    "Currently over 700 fast track courts operating across India"
  ],
  teleLawServices: [
    "Connect to lawyers through video conferencing at Common Service Centers",
    "Available in rural and remote areas to provide legal advice",
    "Schedule consultations through toll-free number 1516",
    "Services available in multiple regional languages"
  ]
};

const systemPrompt = `
You are the Department of Justice Judicial Information Assistant, helping citizens access information about the Indian judicial system.
Your responses should be formal, helpful, and based on the following data categories:

1. Judge appointments and vacancies
2. Case status tracking
3. Traffic violation fines
4. eFiling and ePay procedures
5. Court case live streaming
6. Fast track courts
7. eCourts Mobile app
8. Tele Law services

Format your responses professionally, with headings, bullet points, and tables when appropriate.
Mention that data is provided by the Department of Justice, Government of India.
If you cannot answer a query with the available information, politely suggest contacting the relevant department directly.
Always maintain a respectful tone appropriate for a government service.

Current data available:
${JSON.stringify(judicialData, null, 2)}
`;

interface ChatbotResponse {
  message: string;
  category?: string;
}

export async function getChatbotResponse(userMessage: string, chatHistory: {role: string, content: string}[]): Promise<ChatbotResponse> {
  try {
    // Create messages array with system prompt, chat history, and user message
    const messages = [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.7,
      max_tokens: 800
    });

    const responseContent = response.choices[0].message.content || "I'm sorry, I couldn't generate a response at this time.";
    
    // Attempt to determine the category of the response
    let category: string | undefined;
    if (userMessage.toLowerCase().includes("judge") || userMessage.toLowerCase().includes("vacanc")) {
      category = "judges";
    } else if (userMessage.toLowerCase().includes("case") || userMessage.toLowerCase().includes("track")) {
      category = "cases";
    } else if (userMessage.toLowerCase().includes("fine") || userMessage.toLowerCase().includes("traffic")) {
      category = "fines";
    } else if (userMessage.toLowerCase().includes("efil") || userMessage.toLowerCase().includes("epay")) {
      category = "efiling";
    } else if (userMessage.toLowerCase().includes("stream")) {
      category = "streaming";
    } else if (userMessage.toLowerCase().includes("fast") || userMessage.toLowerCase().includes("track")) {
      category = "fasttrack";
    } else if (userMessage.toLowerCase().includes("app") || userMessage.toLowerCase().includes("mobile")) {
      category = "mobile";
    } else if (userMessage.toLowerCase().includes("tele") || userMessage.toLowerCase().includes("law")) {
      category = "telelaw";
    }

    return {
      message: responseContent,
      category
    };
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return {
      message: "I apologize, but I'm experiencing technical difficulties. Please try again later or contact the Department of Justice directly for assistance."
    };
  }
}
