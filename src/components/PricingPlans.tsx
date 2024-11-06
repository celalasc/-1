import React from 'react';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  models: string[];
  color: string;
  popular?: boolean;
}

const PricingPlans: React.FC = () => {
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Access to GPT-3.5',
        '30 messages per day',
        'Basic prompt templates',
        'Standard response time',
      ],
      models: ['gpt-3.5-turbo']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$15',
      description: 'For power users',
      icon: Crown,
      color: 'from-indigo-500 to-purple-500',
      features: [
        'Access to GPT-4',
        'Unlimited messages',
        'Advanced prompt library',
        'Priority response time',
        'Custom prompt folders',
      ],
      models: ['gpt-3.5-turbo', 'gpt-4', 'claude-instant'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49',
      description: 'For teams and businesses',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Access to all AI models',
        'Unlimited everything',
        'Team collaboration',
        'API access',
        'Custom model fine-tuning',
        'Dedicated support',
      ],
      models: ['gpt-3.5-turbo', 'gpt-4', 'claude-3', 'gemini-pro', 'gemini-ultra'],
    }
  ];

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-lg text-white/60">Select the perfect plan for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`
                relative glass rounded-2xl p-6
                ${plan.popular ? 'ring-2 ring-indigo-500' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-indigo-500 rounded-full text-white text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                <plan.icon size={32} className="text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-white/60 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/60">/month</span>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Check size={12} className="text-indigo-300" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white/60 uppercase">Available Models</h4>
                <div className="space-y-2">
                  {plan.models.map((model) => (
                    <div
                      key={model}
                      className="px-3 py-2 rounded-lg bg-white/5 text-white/80 text-sm"
                    >
                      {model}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`
                  w-full mt-8 px-6 py-3 rounded-xl font-medium
                  ${plan.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                  transition-colors
                `}
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;