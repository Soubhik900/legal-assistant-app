import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Paperclip, Download, Trash2, Shield, Settings, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ChatMessage from "@/components/chat-message";
import type { Message } from "@shared/schema";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  messagesLoading: boolean;
}

export default function ChatInterface({ messages, onSendMessage, isLoading, messagesLoading }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      onSendMessage(suggestion);
    }
  };

  const suggestedQuestions = [
    "Check case status by CNR number",
    "Legal aid eligibility criteria", 
    "How to file FIR online",
    "Court timings and procedures",
    "Voice search in Hindi",
    "Consumer complaint process",
  ];

  return (
    <Card className="h-[600px] flex flex-col bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-xl">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-navy to-slate-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="text-white h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold font-[Noto_Sans]">DoJ Legal Assistant</h3>
              <p className="text-sm opacity-90 flex items-center">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Online - Ready to help
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white hover:bg-opacity-20 h-8 w-8"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white hover:bg-opacity-20 h-8 w-8"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-50/50 to-blue-50/30">
        {messagesLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="bg-gray-300 rounded-lg h-20 w-3/4"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white text-sm" />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-md">
                  <p className="text-navy font-medium mb-2">Welcome to DoJ Legal Assistant!</p>
                  <p className="text-gray-700 text-sm">I can help you with comprehensive legal services:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Case Status Tracking (CNR/party name via eCourts)</li>
                    <li>• Legal Aid Information (eligibility & application)</li>
                    <li>• Court Services (timings, procedures, locations)</li>
                    <li>• Basic Legal Guidance (FIR, consumer complaints)</li>
                    <li>• Multilingual Support (22 Indian languages)</li>
                    <li>• Voice Input & Natural Language Search</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">How can I assist you today?</p>
                </div>
              </div>
            )}
            
            {/* Messages */}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white text-sm" />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Actions */}
      {messages.length === 0 && (
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="px-3 py-1 h-auto text-xs bg-slate-100 border-slate-200 hover:bg-slate-200 hover:border-primary-blue hover:text-primary-blue transition-colors btn-no-yellow"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Type your question about judicial services..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="pr-12 focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white border-gray-300"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-primary-blue"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary-blue hover:bg-slate-600 text-white focus:ring-2 focus:ring-blue-300"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500 flex items-center">
            <Shield className="mr-1 h-3 w-3" />
            Your conversations are secure and confidential
          </p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Button variant="ghost" size="sm" className="h-6 px-2 hover:text-primary-blue">
              <Download className="mr-1 h-3 w-3" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 hover:text-primary-blue">
              <Trash2 className="mr-1 h-3 w-3" />
              Clear
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
