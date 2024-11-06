import React from 'react';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageProps {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  model?: string;
}

const Message: React.FC<MessageProps> = ({ text, sender, timestamp, model }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${sender === 'user' ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          sender === 'bot' 
            ? 'bg-gradient-to-br from-indigo-600 to-purple-600' 
            : 'bg-gradient-to-br from-emerald-500 to-teal-600'
        }`}
      >
        {sender === 'bot' ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="flex flex-col gap-1">
        {sender === 'bot' && model && (
          <span className="text-xs text-white/50">{model}</span>
        )}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`max-w-[80%] rounded-2xl p-4 ${
            sender === 'bot'
              ? 'glass'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600'
          }`}
        >
          <p className="text-sm text-white whitespace-pre-wrap">{text}</p>
          <span className="text-xs text-white/50 mt-2 block">
            {timestamp.toLocaleTimeString()}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Message;