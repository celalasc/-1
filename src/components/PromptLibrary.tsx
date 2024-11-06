import React, { useState } from 'react';
import { Folder, Plus, Tag, Search, ChevronDown, ChevronRight, Edit, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folderId?: string;
}

interface PromptFolder {
  id: string;
  name: string;
  isOpen?: boolean;
}

const PromptLibrary: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [folders, setFolders] = useState<PromptFolder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingPrompt, setIsAddingPrompt] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ title: '', content: '', tags: '', folderId: '' });
  const [newFolder, setNewFolder] = useState({ name: '' });

  const handleAddPrompt = () => {
    const prompt: Prompt = {
      id: Date.now().toString(),
      title: newPrompt.title,
      content: newPrompt.content,
      tags: newPrompt.tags.split(',').map(tag => tag.trim()),
      folderId: newPrompt.folderId || undefined
    };
    setPrompts([...prompts, prompt]);
    setNewPrompt({ title: '', content: '', tags: '', folderId: '' });
    setIsAddingPrompt(false);
  };

  const handleAddFolder = () => {
    const folder: PromptFolder = {
      id: Date.now().toString(),
      name: newFolder.name,
      isOpen: false
    };
    setFolders([...folders, folder]);
    setNewFolder({ name: '' });
    setIsAddingFolder(false);
  };

  const toggleFolder = (folderId: string) => {
    setFolders(folders.map(folder => 
      folder.id === folderId ? { ...folder, isOpen: !folder.isOpen } : folder
    ));
  };

  const filteredPrompts = prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 p-6">
      <div className="glass rounded-2xl p-6 h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Prompt Library</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsAddingFolder(true)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Folder size={20} />
            </button>
            <button
              onClick={() => setIsAddingPrompt(true)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {folders.map(folder => (
            <div key={folder.id} className="space-y-2">
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                {folder.isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <Folder size={20} />
                <span>{folder.name}</span>
              </button>
              
              <AnimatePresence>
                {folder.isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 space-y-2"
                  >
                    {filteredPrompts
                      .filter(prompt => prompt.folderId === folder.id)
                      .map(prompt => (
                        <div
                          key={prompt.id}
                          className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="text-white font-medium">{prompt.title}</h3>
                            <div className="flex gap-2">
                              <button className="text-white/60 hover:text-white">
                                <Edit size={16} />
                              </button>
                              <button className="text-white/60 hover:text-white">
                                <Trash size={16} />
                              </button>
                            </div>
                          </div>
                          <p className="text-white/60 text-sm mt-2">{prompt.content}</p>
                          <div className="flex gap-2 mt-3">
                            {prompt.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {filteredPrompts
            .filter(prompt => !prompt.folderId)
            .map(prompt => (
              <div
                key={prompt.id}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-medium">{prompt.title}</h3>
                  <div className="flex gap-2">
                    <button className="text-white/60 hover:text-white">
                      <Edit size={16} />
                    </button>
                    <button className="text-white/60 hover:text-white">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-white/60 text-sm mt-2">{prompt.content}</p>
                <div className="flex gap-2 mt-3">
                  {prompt.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
          ))}
        </div>

        {/* Add Prompt Modal */}
        <AnimatePresence>
          {isAddingPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div className="glass rounded-2xl p-6 w-full max-w-lg">
                <h3 className="text-xl font-bold text-white mb-4">Add New Prompt</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newPrompt.title}
                    onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                    className="w-full p-2 bg-white/10 rounded-lg text-white placeholder-white/60"
                  />
                  <textarea
                    placeholder="Content"
                    value={newPrompt.content}
                    onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                    className="w-full p-2 bg-white/10 rounded-lg text-white placeholder-white/60 h-32"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={newPrompt.tags}
                    onChange={(e) => setNewPrompt({ ...newPrompt, tags: e.target.value })}
                    className="w-full p-2 bg-white/10 rounded-lg text-white placeholder-white/60"
                  />
                  <select
                    value={newPrompt.folderId}
                    onChange={(e) => setNewPrompt({ ...newPrompt, folderId: e.target.value })}
                    className="w-full p-2 bg-white/10 rounded-lg text-white"
                  >
                    <option value="">No Folder</option>
                    {folders.map(folder => (
                      <option key={folder.id} value={folder.id}>{folder.name}</option>
                    ))}
                  </select>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsAddingPrompt(false)}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddPrompt}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Add Prompt
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Folder Modal */}
        <AnimatePresence>
          {isAddingFolder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div className="glass rounded-2xl p-6 w-full max-w-lg">
                <h3 className="text-xl font-bold text-white mb-4">Add New Folder</h3>
                <input
                  type="text"
                  placeholder="Folder Name"
                  value={newFolder.name}
                  onChange={(e) => setNewFolder({ name: e.target.value })}
                  className="w-full p-2 bg-white/10 rounded-lg text-white placeholder-white/60 mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsAddingFolder(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddFolder}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Add Folder
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PromptLibrary;