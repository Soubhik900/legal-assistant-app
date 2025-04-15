import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, HelpCircle, Trash2, Menu } from 'lucide-react';
import { Message } from '@shared/types';
import { quickActions } from '@/lib/judicialData';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onClearChat: () => void;
  onQuickAction: (actionId: string) => void;
  onToggleSidebar: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onClearChat,
  onQuickAction,
  onToggleSidebar
}) => {
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle sending message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Handle input changes and adjust textarea height
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Helper to render HTML content safely
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <main className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-[#000080]">DoJ Judicial Assistant</h2>
          <p className="text-xs text-gray-500">Ask me about judicial services and information</p>
        </div>
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-[#000080]" />
          </Button>
        </div>
      </div>
      
      {/* Chat Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 chat-container"
      >
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            {message.role === 'assistant' && (
              <div className="h-8 w-8 rounded-full bg-[#138808] flex justify-center items-center text-white flex-shrink-0 mr-3">
                <span className="material-icons text-sm">support_agent</span>
              </div>
            )}
            
            <div 
              className={`
                ${message.role === 'user' 
                  ? 'bg-[#FF9933] bg-opacity-10 border border-[#FF9933] border-opacity-20' 
                  : 'bg-white shadow-sm border border-gray-100'} 
                rounded-lg p-3 max-w-[85%]
              `}
            >
              <div dangerouslySetInnerHTML={createMarkup(message.content)} />
            </div>
            
            {message.role === 'user' && (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center text-[#000080] flex-shrink-0 ml-3">
                <span className="material-icons text-sm">person</span>
              </div>
            )}
          </div>
        ))}
        
        {/* Show quick actions after welcome message if no other messages */}
        {messages.length === 1 && messages[0].role === 'assistant' && (
          <div className="flex mb-4">
            <div className="h-8 w-8 rounded-full bg-[#138808] flex justify-center items-center text-white flex-shrink-0 mr-3">
              <span className="material-icons text-sm">support_agent</span>
            </div>
            <div className="max-w-[85%]">
              <div className="flex flex-wrap gap-2">
                {quickActions.map(action => (
                  <button 
                    key={action.id}
                    onClick={() => onQuickAction(action.id)}
                    className="bg-white text-[#000080] border border-gray-200 rounded-full px-3 py-1.5 text-sm hover:bg-gray-50 hover:border-[#FF9933]"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Typing indicator */}
        {isLoading && (
          <div className="flex mb-4">
            <div className="h-8 w-8 rounded-full bg-[#138808] flex justify-center items-center text-white flex-shrink-0 mr-3">
              <span className="material-icons text-sm">support_agent</span>
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 bot-message-loader">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="relative rounded-lg border border-gray-300 focus-within:border-[#138808] bg-white">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your question here..."
            rows={1}
            className="w-full px-4 py-3 pr-12 focus:outline-none resize-none text-[#000080] rounded-lg"
          />
          <Button 
            onClick={handleSendMessage}
            className="absolute right-2 bottom-2 text-white bg-[#138808] p-1.5 rounded-full hover:bg-opacity-90 transition-colors"
            disabled={!inputValue.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>Powered by DoJ Knowledge Base</span>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost" 
              size="sm"
              onClick={onClearChat}
              className="text-xs text-[#000080] bg-gray-100 px-2 py-1 rounded-full mr-2 hover:bg-gray-200"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear Chat
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-[#000080] bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200"
            >
              <HelpCircle className="h-3 w-3 mr-1" />
              Help
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatInterface;
