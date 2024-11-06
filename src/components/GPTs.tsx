import React from 'react';
import { motion } from 'framer-motion';
import { Code, Pencil, Stethoscope, Calculator, Book } from 'lucide-react';

interface GPT {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  model: string;
}

interface GPTsProps {
  onSelectGPT: (gpt: GPT) => void;
}

const GPTs: React.FC<GPTsProps> = ({ onSelectGPT }) => {
  const gpts: GPT[] = [
    {
      id: 'programmer',
      name: 'Code Assistant',
      description: 'Expert programming help across multiple languages and frameworks',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      model: 'gpt-4'
    },
    {
      id: 'writer',
      name: 'Content Writer',
      description: 'Professional copywriting and content creation assistance',
      icon: Pencil,
      color: 'from-purple-500 to-pink-500',
      model: 'claude-3'
    },
    {
      id: 'doctor',
      name: 'Medical Advisor',
      description: 'General health information and medical guidance',
      icon: Stethoscope,
      color: 'from-red-500 to-pink-500',
      model: 'gpt-4'
    },
    {
      id: 'math',
      name: 'Math Tutor',
      description: 'Mathematics problem-solving and explanations',
      icon: Calculator,
      color: 'from-green-500 to-emerald-500',
      model: 'gpt-3.5-turbo'
    },
    {
      id: 'teacher',
      name: 'Study Assistant',
      description: 'Educational support across various subjects',
      icon: Book,
      color: 'from-yellow-500 to-orange-500',
      model: 'claude-instant'
    }
  ];

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Specialized GPT Models</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gpts.map((gpt) => (
            <motion.button
              key={gpt.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectGPT(gpt)}
              className="text-left"
            >
              <div className="glass rounded-2xl p-6 h-full hover:ring-2 hover:ring-indigo-500 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gpt.color} flex items-center justify-center mb-4`}>
                  <gpt.icon size={24} className="text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{gpt.name}</h3>
                <p className="text-white/60 mb-4">{gpt.description}</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                    {gpt.model}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GPTs;