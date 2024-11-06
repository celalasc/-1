import React, { useState } from 'react';
import { MessageSquare, Settings, History, User, Sparkles, ArrowLeft, Store } from 'lucide-react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import SettingsPanel from './components/SettingsPanel';
import ProfilePanel from './components/ProfilePanel';
import StarField from './components/StarField';
import ModelSelector from './components/ModelSelector';
import PricingPlans from './components/PricingPlans';
import PromptLibrary from './components/PromptLibrary';
import ChatHistory from './components/History';
import GPTs from './components/GPTs';

interface GPT {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  model: string;
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [currentPlan, setCurrentPlan] = useState('free');
  const [selectedGPT, setSelectedGPT] = useState<GPT | null>(null);

  const handleSelectGPT = (gpt: GPT) => {
    setSelectedGPT(gpt);
    setSelectedModel(gpt.model);
  };

  const handleBackToGPTs = () => {
    setSelectedGPT(null);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      <div className="space-bg fixed inset-0" />
      <StarField />
      
      <div className="relative flex w-full">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col ml-20">
          {/* Top Bar */}
          <div className="sticky top-0 z-10 p-4 glass">
            <div className="flex items-center justify-between gap-4">
              {activeTab === 'chat' && !selectedGPT && (
                <ModelSelector 
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                  currentPlan={currentPlan}
                />
              )}
              {selectedGPT && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBackToGPTs}
                    className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <ModelSelector 
                    selectedModel={selectedGPT.model}
                    onModelChange={() => {}}
                    showCloseButton
                    onClose={handleBackToGPTs}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 relative">
            {activeTab === 'chat' && !selectedGPT && (
              <ChatWindow 
                isDarkMode={isDarkMode} 
                selectedModel={selectedModel}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsPanel 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode}
              />
            )}
            {activeTab === 'prompts' && (
              <PromptLibrary />
            )}
            {activeTab === 'plans' && (
              <PricingPlans />
            )}
            {activeTab === 'profile' && (
              <ProfilePanel currentPlan={currentPlan} />
            )}
            {activeTab === 'history' && (
              <ChatHistory />
            )}
            {activeTab === 'gpts' && !selectedGPT && (
              <GPTs onSelectGPT={handleSelectGPT} />
            )}
            {selectedGPT && (
              <ChatWindow 
                isDarkMode={isDarkMode} 
                selectedModel={selectedGPT.model}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;