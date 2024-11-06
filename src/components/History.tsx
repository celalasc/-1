import React, { useState } from "react";
import { Search, Archive, Trash2, MessageSquare, Calendar, Clock, Bot, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatHistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  time: string;
  model: string;
  archived: boolean;
  category: string;
}

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchFocused, setSearchFocused] = useState(false);

  const categories = ["all", "coding", "writing", "analysis", "general"];

  const initialChats: ChatHistoryItem[] = [
    {
      id: "1",
      title: "Code Review: React Performance Optimization",
      preview: "Analyzing the useMemo and useCallback implementation in the dashboard components...",
      date: "2024-03-15",
      time: "14:30",
      model: "GPT-4",
      archived: false,
      category: "coding"
    },
    {
      id: "2",
      title: "Blog Post Draft Review",
      preview: "Working on machine learning trends in 2024. Improving the content flow and structure.",
      date: "2024-03-15",
      time: "11:20",
      model: "Claude-3",
      archived: false,
      category: "writing"
    },
    {
      id: "3",
      title: "Data Analysis: Q1 Metrics",
      preview: "Reviewing quarterly performance data and user engagement metrics.",
      date: "2024-03-14",
      time: "16:45",
      model: "GPT-3.5",
      archived: true,
      category: "analysis"
    }
  ];

  const [chats, setChats] = useState(initialChats);

  const filteredChats = chats.filter(chat => 
    (chat.archived === showArchived) &&
    (selectedCategory === "all" || chat.category === selectedCategory) &&
    (chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     chat.preview.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleArchive = (id: string) => {
    setChats(chats.map(chat => 
      chat.id === id ? { ...chat, archived: !chat.archived } : chat
    ));
  };

  const handleDelete = (id: string) => {
    setChats(chats.filter(chat => chat.id !== id));
  };

  return (
    <div className="flex-1 p-6">
      <div className="glass rounded-2xl p-6 h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Chat History</h2>
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showArchived 
                ? "bg-indigo-600 text-white" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {showArchived ? "Show Active" : "Show Archived"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="space-y-4 mb-6">
          <motion.div
            animate={{
              scale: searchFocused ? 1.02 : 1,
              boxShadow: searchFocused 
                ? "0 0 20px rgba(99, 102, 241, 0.3)" 
                : "0 0 0px rgba(99, 102, 241, 0)"
            }}
            className="relative"
          >
            <Search 
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                searchFocused ? "text-indigo-400" : "text-white/60"
              }`} 
              size={20} 
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </motion.div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Chat List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot size={16} className="text-indigo-400" />
                      <h3 className="text-white font-medium">{chat.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                        {chat.model}
                      </span>
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full 
                        ${
                          chat.category === "coding" ? "bg-blue-500/20 text-blue-300" :
                          chat.category === "writing" ? "bg-green-500/20 text-green-300" :
                          chat.category === "analysis" ? "bg-purple-500/20 text-purple-300" :
                          "bg-gray-500/20 text-gray-300"
                        }
                      `}>
                        {chat.category}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{chat.preview}</p>
                    <div className="flex items-center gap-4 text-white/40 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{chat.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{chat.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleArchive(chat.id)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      title={chat.archived ? "Unarchive" : "Archive"}
                    >
                      <Archive size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(chat.id)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Empty State */}
          {filteredChats.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-white/40" />
              </div>
              <p className="text-white/60">
                {searchTerm 
                  ? "No conversations found matching your search"
                  : showArchived 
                    ? "No archived conversations"
                    : "No active conversations"
                }
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;