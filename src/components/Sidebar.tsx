import React, { useState, useEffect } from 'react';
import { MessageSquare, Settings, History, User, Sparkles, Store } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  activeTab, 
  setActiveTab, 
  isDarkMode,
  setIsSidebarOpen 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const tabs = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'gpts', icon: Store, label: 'GPTs' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'plans', icon: Sparkles, label: 'Plans' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  useEffect(() => {
    controls.start({
      width: isHovered ? 240 : 80,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    });
    setIsSidebarOpen(isHovered);
  }, [isHovered, controls, setIsSidebarOpen]);

  return (
    <motion.aside
      initial={false}
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed h-full glass flex flex-col items-center border-r border-white/10 z-50"
      style={{ minHeight: '100vh' }}
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center">
          <Sparkles size={24} />
        </div>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <h1 className="text-xl font-bold text-white">Orion</h1>
            <p className="text-xs text-white/50">AI Assistant</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full p-3 rounded-xl flex items-center gap-3
                  transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'hover:bg-white/10 text-white/70'
                  }
                `}
              >
                <tab.icon size={20} />
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 text-left"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Version */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 text-center text-white/30 text-sm"
        >
          <p>Version 1.0.0</p>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;