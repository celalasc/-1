import React from 'react';
import { User, Mail, Calendar, Star, Clock, Download, Shield, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfilePanelProps {
  currentPlan: string;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ currentPlan }) => {
  const userStats = [
    { icon: Clock, label: 'Chat Time', value: '47 hours' },
    { icon: Star, label: 'Saved Chats', value: '128' },
    { icon: Download, label: 'Downloads', value: '1.2K' },
  ];

  const planDetails = {
    free: {
      name: 'Free Plan',
      color: 'from-blue-500 to-cyan-500',
      description: 'Basic features for personal use'
    },
    pro: {
      name: 'Pro Plan',
      color: 'from-indigo-500 to-purple-500',
      description: 'Advanced features for power users'
    },
    enterprise: {
      name: 'Enterprise Plan',
      color: 'from-purple-500 to-pink-500',
      description: 'Full features for teams and businesses'
    }
  };

  const plan = planDetails[currentPlan as keyof typeof planDetails];

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-8 space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8"
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <User size={40} className="text-white" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              <Settings size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">John Doe</h1>
            <div className="flex items-center gap-4 text-white/60">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Member since March 2024</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`glass rounded-2xl p-6 bg-gradient-to-br ${plan.color}/20`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="text-white/60">{plan.description}</p>
            </div>
          </div>
          {currentPlan === 'free' && (
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {userStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <stat.icon size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-white text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-4 text-white/60">
              <div className="w-2 h-2 rounded-full bg-indigo-600" />
              <p>Chat session completed • {30 - index * 10} minutes ago</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePanel;