import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import { createChatSession, sendChatMessage, getChatMessages } from '@/lib/openai';
import { Message } from '@shared/types';
import { quickActions, judicialCategories } from '@/lib/judicialData';

const Home: React.FC = () => {
  const { toast } = useToast();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Create a new chat session
  const createSessionMutation = useMutation({
    mutationFn: createChatSession,
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      localStorage.setItem('chatSessionId', data.sessionId);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create chat session. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Send message to chatbot
  const sendMessageMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      // Convert the response messages to our Message format
      const userMessage: Message = {
        id: `user-${data.userMessage.id}`,
        role: 'user',
        content: data.userMessage.content,
        timestamp: new Date(data.userMessage.timestamp).getTime()
      };
      
      const assistantMessage: Message = {
        id: `assistant-${data.assistantMessage.id}`,
        role: 'assistant',
        content: data.assistantMessage.content,
        timestamp: new Date(data.assistantMessage.timestamp).getTime()
      };
      
      // Add messages to state
      setMessages(prev => [...prev, userMessage, assistantMessage]);
      
      // Update category if the response includes one
      if (data.category) {
        setCurrentCategory(data.category);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Fetch chat messages if session ID exists
  const { data: messagesData, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['/api/sessions', sessionId, 'messages'],
    queryFn: () => getChatMessages(sessionId!),
    enabled: !!sessionId,
    onSuccess: (data) => {
      // Convert messages to our format
      const formattedMessages: Message[] = data.map(msg => ({
        id: `${msg.role}-${msg.id}`,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        timestamp: new Date(msg.timestamp).getTime()
      }));
      
      setMessages(formattedMessages);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load chat history.",
        variant: "destructive"
      });
    }
  });

  // Initialize session on component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId');
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      createSessionMutation.mutate();
    }
  }, []);

  // Handle sending a message
  const handleSendMessage = (content: string) => {
    if (!sessionId) {
      toast({
        title: "Error",
        description: "Chat session not initialized. Please refresh the page.",
        variant: "destructive"
      });
      return;
    }
    
    sendMessageMutation.mutate({
      sessionId,
      content
    });
  };

  // Handle category selection
  const handleSelectCategory = (categoryId: string) => {
    setCurrentCategory(categoryId);
    const category = judicialCategories.find(cat => cat.id === categoryId);
    
    if (category) {
      const message = `Tell me about ${category.title.toLowerCase()}`;
      handleSendMessage(message);
    }
    
    // Close mobile sidebar after selection
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  // Handle quick action selection
  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(act => act.id === actionId);
    
    if (action) {
      handleSendMessage(action.text);
    }
  };

  // Handle clear chat
  const handleClearChat = () => {
    // Create a new session
    createSessionMutation.mutate();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleMobileMenu={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isMobileSidebarOpen}
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
        />
        
        <ChatInterface 
          messages={messages}
          isLoading={sendMessageMutation.isPending}
          onSendMessage={handleSendMessage}
          onClearChat={handleClearChat}
          onQuickAction={handleQuickAction}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />
      </div>
    </div>
  );
};

export default Home;
