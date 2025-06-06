
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, MessageCircle, User, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
      text: 'Hello, I\'m the Guardian Lens Emergency Assistant powered by advanced AI. I\'m here to provide immediate guidance for emergency situations. How can I help you today? If this is a life-threatening emergency, please call 911 immediately.',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('emergency-chat', {
        body: { message: currentMessage }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        sender: 'assistant',
        text: data.message || 'I apologize, but I encountered an issue. Please try again or contact emergency services if urgent.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to reach emergency assistant. For immediate help, call 911.",
        variant: "destructive",
      });
      
      // Add fallback message
      const fallbackMessage: Message = {
        id: messages.length + 2,
        sender: 'assistant',
        text: 'I\'m currently experiencing connectivity issues. If you\'re facing an emergency, please contact emergency services immediately at 911 (US) or your local emergency number.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Emergency Assistant</h1>
        <p className="text-muted-foreground">
          Get immediate AI-powered guidance for emergency situations. Always call 911 for life-threatening emergencies.
        </p>
      </div>
      
      <Card className="border-guardian-info">
        <CardHeader className="bg-guardian-info/5 border-b">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-guardian-info" />
            <CardTitle>Emergency Assistance Chat</CardTitle>
          </div>
          <CardDescription>
            AI-powered emergency guidance. For immediate life-threatening situations, call 911 first.
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
                        {message.sender === 'assistant' ? 'Guardian AI Assistant' : 'You'}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              )}
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
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !newMessage.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageCircle className="h-4 w-4 mr-2" />
              )}
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
