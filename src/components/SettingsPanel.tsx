import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Theme {
  id: string;
  name: string;
  icon: React.ElementType;
  preview: string;
}

interface SettingsPanelProps {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isDarkMode, setIsDarkMode }) => {
  const themes: Theme[] = [
    {
      id: 'light',
      name: 'Light Theme',
      icon: Sun,
      preview: 'bg-gradient-to-br from-white to-gray-100'
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      icon: Moon,
      preview: 'bg-gradient-to-br from-gray-900 to-gray-800'
    }
  ];

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <motion.button
              key={theme.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDarkMode(theme.id === 'dark')}
              className={`
                relative p-4 rounded-xl transition-all duration-200
                ${(theme.id === 'dark' && isDarkMode) || (theme.id === 'light' && !isDarkMode)
                  ? 'ring-2 ring-indigo-500'
                  : 'hover:bg-white/5'
                }
              `}
            >
              <div className={`
                h-32 rounded-lg mb-4 ${theme.preview}
                flex items-center justify-center
              `}>
                <theme.icon
                  size={32}
                  className={theme.id === 'light' ? 'text-gray-900' : 'text-white'}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{theme.name}</span>
                <div className={`
                  w-4 h-4 rounded-full border-2
                  ${(theme.id === 'dark' && isDarkMode) || (theme.id === 'light' && !isDarkMode)
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-white/30'
                  }
                `} />
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
          <p className="text-white/80">
            More appearance options coming soon! We're working on custom themes, color schemes, and layout preferences.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPanel;