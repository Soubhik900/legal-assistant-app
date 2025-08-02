import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import GovernmentHeader from "@/components/government-header";
import QuickAccessPanel from "@/components/quick-access-panel";
import ChatInterface from "@/components/chat-interface";
import ServiceCards from "@/components/service-cards";
import GovernmentFooter from "@/components/government-footer";
import type { Conversation, Message } from "@shared/schema";

export default function ChatbotPage() {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const queryClient = useQueryClient();

  // Initialize conversation
  const { data: conversation } = useQuery<Conversation>({
    queryKey: ['/api/conversations', sessionId],
    queryFn: async () => {
      const response = await apiRequest('POST', '/api/conversations', { sessionId });
      return response.json();
    },
  });

  // Get messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ['/api/conversations', sessionId, 'messages'],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/conversations/${sessionId}/messages`);
      return response.json();
    },
    enabled: !!conversation,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest('POST', `/api/conversations/${sessionId}/messages`, {
        content,
        messageType: 'text'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations', sessionId, 'messages'] });
    },
  });

  // Statistics query
  const { data: statistics } = useQuery({
    queryKey: ['/api/statistics'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/statistics');
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  const handleSendMessage = (content: string) => {
    if (content.trim()) {
      sendMessageMutation.mutate(content.trim());
    }
  };

  const handleQuickQuery = (query: string) => {
    handleSendMessage(`Tell me about ${query}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <GovernmentHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-navy mb-2">DoJ Legal Assistant</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Advanced AI-powered legal assistant with case status tracking, legal aid information, 
            multilingual support, voice search, and comprehensive guidance for all judicial services.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Access Sidebar */}
          <div className="lg:col-span-1">
            <QuickAccessPanel 
              onQuickQuery={handleQuickQuery}
              statistics={statistics}
            />
          </div>

          {/* Chatbot Interface */}
          <div className="lg:col-span-3">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={sendMessageMutation.isPending}
              messagesLoading={messagesLoading}
            />
          </div>
        </div>

        {/* Service Cards Section */}
        <ServiceCards />
      </main>

      <GovernmentFooter />
    </div>
  );
}
