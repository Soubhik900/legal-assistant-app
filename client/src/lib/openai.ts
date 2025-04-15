import { apiRequest } from "./queryClient";
import { SendMessageRequest, SendMessageResponse, CreateSessionResponse, GetMessagesResponse } from "./types";

// Create a new chat session
export async function createChatSession(): Promise<CreateSessionResponse> {
  const response = await apiRequest('POST', '/api/sessions', {});
  return await response.json();
}

// Send a message to the chatbot
export async function sendChatMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
  const response = await apiRequest('POST', '/api/chat', data);
  return await response.json();
}

// Get all messages for a session
export async function getChatMessages(sessionId: string): Promise<GetMessagesResponse[]> {
  const response = await apiRequest('GET', `/api/sessions/${sessionId}/messages`);
  return await response.json();
}
