import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import ModelSelector from './ModelSelector';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  model?: string;
}

interface ChatWindowProps {
  isDarkMode: boolean;
  selectedModel: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isDarkMode, selectedModel }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Orion, your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      model: selectedModel
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: `I'm a demo interface at the moment, but I'll be fully functional soon!`,
        sender: 'bot',
        timestamp: new Date(),
        model: selectedModel
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-5rem)] p-4">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 glass rounded-xl mb-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            sender={message.sender}
            timestamp={message.timestamp}
            model={message.model}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSend} isDarkMode={isDarkMode} />
    </div>
  );
};

export default ChatWindow;