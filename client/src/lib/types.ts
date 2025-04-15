import { Message, Category, QuickAction } from "@shared/types";

export interface CreateSessionResponse {
  id: number;
  sessionId: string;
  userId: number | null;
  createdAt: string;
}

export interface SendMessageRequest {
  sessionId: string;
  content: string;
}

export interface SendMessageResponse {
  userMessage: {
    id: number;
    sessionId: string;
    role: string;
    content: string;
    timestamp: string;
  };
  assistantMessage: {
    id: number;
    sessionId: string;
    role: string;
    content: string;
    timestamp: string;
  };
  category?: string;
}

export interface GetMessagesResponse {
  id: number;
  sessionId: string;
  role: string;
  content: string;
  timestamp: string;
}
