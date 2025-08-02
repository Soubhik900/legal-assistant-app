import { Bot, User, Globe, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Message } from "@shared/schema";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.isUser;
  const metadata = message.metadata as any;

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="text-white text-sm" />
        </div>
      )}
      
      <div className={`${isUser ? 'bg-navy text-white' : 'bg-white'} rounded-lg ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} p-4 shadow-sm max-w-md`}>
        {!isUser && metadata?.category && metadata.category !== 'general' && (
          <p className="text-navy font-medium mb-2 capitalize">
            {metadata.category.replace('-', ' ')} Information
          </p>
        )}
        
        <div className={`text-sm ${isUser ? 'text-white' : 'text-gray-700'}`}>
          {message.content.split('\n').map((line, index) => {
            if (line.trim() === '') return <br key={index} />;
            
            // Handle bold text
            if (line.includes('**')) {
              const parts = line.split('**');
              return (
                <p key={index} className="mb-2">
                  {parts.map((part, partIndex) => 
                    partIndex % 2 === 1 ? 
                      <strong key={partIndex} className={isUser ? 'text-gray-200' : 'text-navy'}>{part}</strong> : 
                      part
                  )}
                </p>
              );
            }
            
            // Handle bullet points
            if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
              return <li key={index} className="ml-4 mb-1">{line.trim().substring(1).trim()}</li>;
            }
            
            // Handle numbered lists
            if (/^\d+\./.test(line.trim())) {
              return <li key={index} className="ml-4 mb-1 list-decimal">{line.trim().substring(line.indexOf('.') + 1).trim()}</li>;
            }
            
            return <p key={index} className="mb-2">{line}</p>;
          })}
        </div>

        {/* Display helpful information boxes for specific categories */}
        {!isUser && metadata?.category === 'case-status' && (
          <div className="mt-3 space-y-2">
            <Card className="bg-blue-50 p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Globe className="text-navy h-4 w-4" />
                <span className="font-medium text-navy text-sm">eCourts Services Portal</span>
              </div>
              <p className="text-xs text-gray-600">Visit services.ecourts.gov.in and search by case number, party name, or advocate</p>
            </Card>
            
            <Card className="bg-green-50 p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Smartphone className="text-indian-green h-4 w-4" />
                <span className="font-medium text-indian-green text-sm">eCourts Mobile App</span>
              </div>
              <p className="text-xs text-gray-600">Download from Play Store/App Store for instant case updates</p>
            </Card>
          </div>
        )}

        {/* Suggested follow-up actions */}
        {!isUser && metadata?.suggestedActions && metadata.suggestedActions.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">Need more help?</p>
            <div className="flex flex-wrap gap-1">
              {metadata.suggestedActions.slice(0, 2).map((action: string, index: number) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {action}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="text-white text-sm" />
        </div>
      )}
    </div>
  );
}
