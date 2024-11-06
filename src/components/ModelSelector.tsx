import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Zap, Brain, Cpu, ChevronDown, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Model {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  requiredPlan: 'free' | 'pro' | 'enterprise';
  contextWindow: string;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  currentPlan?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModel, 
  onModelChange,
  currentPlan = 'free',
  onClose,
  showCloseButton = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const models: Model[] = [
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      description: 'Fast and efficient responses',
      requiredPlan: 'free',
      contextWindow: '16K tokens'
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      description: 'Advanced reasoning capabilities',
      requiredPlan: 'pro',
      contextWindow: '128K tokens'
    },
    {
      id: 'claude-instant',
      name: 'Claude Instant',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      description: 'Quick analytical responses',
      requiredPlan: 'pro',
      contextWindow: '100K tokens'
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      icon: Star,
      color: 'from-orange-600 to-red-600',
      description: 'Latest Claude model',
      requiredPlan: 'enterprise',
      contextWindow: '200K tokens'
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      icon: Cpu,
      color: 'from-blue-600 to-cyan-600',
      description: "Google's advanced AI model",
      requiredPlan: 'enterprise',
      contextWindow: '32K tokens'
    },
    {
      id: 'gemini-ultra',
      name: 'Gemini Ultra',
      icon: Sparkles,
      color: 'from-blue-700 to-cyan-700',
      description: 'Most powerful Gemini model',
      requiredPlan: 'enterprise',
      contextWindow: '128K tokens'
    }
  ];

  const selectedModelData = models.find(m => m.id === selectedModel) || models[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-3 glass rounded-xl cursor-pointer"
      >
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${selectedModelData.color} flex items-center justify-center`}>
          <selectedModelData.icon size={18} className="text-white" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{selectedModelData.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
              {selectedModelData.contextWindow}
            </span>
          </div>
          <p className="text-xs text-white/60">{selectedModelData.description}</p>
        </div>
        {showCloseButton ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            className="ml-2 p-1 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X size={16} className="text-white/60" />
          </div>
        ) : (
          <ChevronDown
            size={18}
            className={`text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl p-4 z-50 max-h-[400px] overflow-y-auto"
          >
            <div className="space-y-2">
              {models.map((model) => (
                <motion.div
                  key={model.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (model.requiredPlan === 'free' || model.requiredPlan === currentPlan) {
                      onModelChange(model.id);
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                    selectedModel === model.id
                      ? `bg-gradient-to-r ${model.color}`
                      : 'hover:bg-white/10'
                  } ${
                    model.requiredPlan !== 'free' && model.requiredPlan !== currentPlan
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${model.color} flex items-center justify-center`}>
                    <model.icon size={18} className="text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{model.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                        {model.contextWindow}
                      </span>
                    </div>
                    <p className="text-xs text-white/60">{model.description}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                    {model.requiredPlan}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelSelector;