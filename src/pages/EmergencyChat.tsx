
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, MessageCircle, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Types for chat messages
interface Message {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const EmergencyChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hello, I\'m the Guardian Lens Emergency Assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Predefined responses for demo purposes
  const getAssistantResponse = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes('fire') || lowercaseMsg.includes('burning')) {
      return 'If you\'re reporting a fire, please evacuate immediately. Stay low to avoid smoke inhalation. Call 911 if you haven\'t already. Should I provide more fire safety instructions?';
    }
    
    if (lowercaseMsg.includes('medical') || lowercaseMsg.includes('hurt') || lowercaseMsg.includes('injured')) {
      return 'For a medical emergency, try to keep the person still and comfortable. Apply direct pressure to bleeding wounds. Is the person conscious and breathing normally?';
    }
    
    if (lowercaseMsg.includes('accident') || lowercaseMsg.includes('crash') || lowercaseMsg.includes('collision')) {
      return 'For a traffic accident, ensure you\'re in a safe location away from traffic. Check for injuries and call emergency services. Can you describe the location and severity?';
    }
    
    if (lowercaseMsg.includes('flood') || lowercaseMsg.includes('flooding')) {
      return 'For flooding, move to higher ground immediately. Avoid walking or driving through floodwaters. Are you currently in a flooded area or anticipating flooding?';
    }
    
    return 'I understand you need assistance. Can you provide more details about the emergency situation so I can give you the most appropriate guidance?';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        sender: 'assistant',
        text: getAssistantResponse(userMessage.text),
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Emergency Assistant</h1>
        <p className="text-muted-foreground">
          Get immediate guidance and assistance for emergency situations.
        </p>
      </div>
      
      <Card className="border-guardian-info">
        <CardHeader className="bg-guardian-info/5 border-b">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-guardian-info" />
            <CardTitle>Emergency Assistance Chat</CardTitle>
          </div>
          <CardDescription>
            This AI assistant can provide guidance during emergencies. For immediate help, always call 911.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[50vh] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'assistant' ? (
                        <Shield className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === 'assistant' ? 'Guardian Assistant' : 'You'}
                      </span>
                    </div>
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
            <Input
              placeholder="Describe your emergency situation..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
      
      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">First Aid</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              CPR Instructions
            </Button>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              Stopping Bleeding
            </Button>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              Treating Burns
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Natural Disasters</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              Earthquake Safety
            </Button>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              Flood Evacuation
            </Button>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              Hurricane Preparation
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Personal Safety</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              Home Security Tips
            </Button>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              Travel Safety
            </Button>
            <Button variant="link" className="p-0 h-auto text-left justify-start">
              Self-Defense Basics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyChat;
