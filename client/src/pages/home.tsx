import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import ChatInterface from "@/components/chat-interface";
import QuickAccessPanel from "@/components/quick-access-panel";
import ServiceCards from "@/components/service-cards";
import type { Conversation, Message } from "@shared/schema";

export default function HomePage() {
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
  const { data: stats } = useQuery({
    queryKey: ["/api/statistics"],
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Department of Justice - Legal Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get instant help with judicial services, case status tracking, legal aid information, 
            and comprehensive guidance on all Department of Justice services through our AI-powered assistant.
          </p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center border border-white/20">
              <div className="text-2xl font-bold text-blue-600">{(stats as any).activeCases}</div>
              <div className="text-sm text-gray-600">Active Cases</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center border border-white/20">
              <div className="text-2xl font-bold text-green-600">{(stats as any).eFilingToday}</div>
              <div className="text-sm text-gray-600">eFiling Today</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center border border-white/20">
              <div className="text-2xl font-bold text-navy-600">{(stats as any).courtsOpen}</div>
              <div className="text-sm text-gray-600">Courts Open</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center border border-white/20">
              <div className="text-2xl font-bold text-slate-600">{(stats as any).onlineServices}</div>
              <div className="text-sm text-gray-600">Online Services</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={sendMessageMutation.isPending}
              messagesLoading={messagesLoading}
            />
          </div>
          
          {/* Quick Access Panel */}
          <div className="space-y-8">
            <QuickAccessPanel 
              onQuickQuery={handleQuickQuery}
              statistics={stats}
            />
          </div>
        </div>

        {/* Popular Services */}
        <div className="mt-12">
          <ServiceCards />
        </div>
      </main>
    </div>
  );
}