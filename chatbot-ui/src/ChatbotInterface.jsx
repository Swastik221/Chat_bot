import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Copy, ThumbsUp, ThumbsDown, Plus, MessageSquare, Search, Newspaper, TrendingUp, Globe, Brain, Menu, X, History } from 'lucide-react';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistorySliderOpen, setChatHistorySliderOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      title: "Python data analysis tips",
      preview: "How can I analyze large datasets efficiently?",
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 8
    },
    {
      id: 2,
      title: "Machine Learning basics",
      preview: "Explain neural networks in simple terms",
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 12
    },
    {
      id: 3,
      title: "React best practices",
      preview: "What are the latest React patterns?",
      timestamp: new Date(Date.now() - 259200000),
      messageCount: 6
    }
  ]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const newsItems = [
    {
      title: "AI Breakthrough in Medical Diagnosis",
      source: "TechNews",
      time: "2h ago",
      category: "Technology"
    },
    {
      title: "Climate Change Summit Reaches Key Agreement",
      source: "Global Times",
      time: "4h ago",
      category: "Environment"
    },
    {
      title: "New Space Telescope Discovers Distant Galaxy",
      source: "Space Daily",
      time: "6h ago",
      category: "Science"
    },
    {
      title: "Cryptocurrency Market Shows Recovery Signs",
      source: "Finance World",
      time: "8h ago",
      category: "Finance"
    }
  ];

  const quickSuggestions = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Explain complex concepts",
      description: "Break down difficult topics into simple terms"
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Research assistance",
      description: "Find and analyze information from various sources"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Data analysis",
      description: "Analyze trends and patterns in your data"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Current events",
      description: "Get updates on latest news and developments"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    if (!currentChatId) {
      const newChatId = Date.now();
      const newChat = {
        id: newChatId,
        title: input.slice(0, 50) + (input.length > 50 ? '...' : ''),
        preview: input,
        timestamp: new Date(),
        messageCount: 0
      };
      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(newChatId);
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I understand you're asking about "${input}". This is a demo response showing how the AI would typically provide a detailed, helpful answer with proper formatting and structure. The response would include relevant information, sources, and clear explanations.`,
        timestamp: new Date(),
        sources: [
          { title: "Example Source 1", url: "#", domain: "example.com" },
          { title: "Example Source 2", url: "#", domain: "demo.org" }
        ]
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setInput('');
  };

  const loadChat = (chatId) => {
    setCurrentChatId(chatId);
    setMessages([
      {
        id: 1,
        type: 'user',
        content: chatHistory.find(c => c.id === chatId)?.preview || "Previous message",
        timestamp: new Date(Date.now() - 60000)
      },
      {
        id: 2,
        type: 'ai',
        content: "This is a previously saved conversation. The actual messages would be loaded from your database.",
        timestamp: new Date(),
        sources: [
          { title: "Sample Source", url: "#", domain: "example.com" }
        ]
      }
    ]);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(`Tell me about ${suggestion.title.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      {/* Chat History Slider */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ${
        chatHistorySliderOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Chat History</h2>
          <button
            onClick={() => setChatHistorySliderOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors mb-4"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>

          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  loadChat(chat.id);
                  setChatHistorySliderOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg hover:bg-gray-800 transition-colors group ${
                  currentChatId === chat.id ? 'bg-gray-800' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-200 truncate">
                      {chat.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {chat.preview}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {chat.timestamp.toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {chat.messageCount} messages
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {chatHistorySliderOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setChatHistorySliderOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setChatHistorySliderOpen(true)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Open chat history"
              >
                <History className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-6 max-w-6xl mx-auto">
              <div className="text-center py-8 mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  What can I help you with today?
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Ask me anything and I'll provide detailed, accurate answers with sources and analysis.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-200">Quick Start</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-blue-500/50 transition-all group text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                          {suggestion.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200 mb-1">{suggestion.title}</h4>
                          <p className="text-gray-400 text-sm">{suggestion.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Newspaper className="w-5 h-5 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-200">Latest News</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {newsItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <h4 className="font-medium text-gray-200 mb-2 leading-tight">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.source}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-200">Trending Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["AI Development", "Climate Tech", "Space Exploration", "Quantum Computing", "Renewable Energy", "Biotechnology"].map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(`Tell me about ${topic}`)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 hover:border-blue-500/50 transition-all text-sm"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-6 space-y-6 max-w-4xl mx-auto w-full">
              {messages.map((message) => (
                <div key={message.id} className="group">
                  <div className="flex gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gray-700' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}>
                      {message.type === 'user' ? 
                        <User className="w-5 h-5" /> : 
                        <Bot className="w-5 h-5" />
                      }
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {message.type === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>

                      {message.sources && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium text-gray-300">Sources</h4>
                          <div className="grid gap-2">
                            {message.sources.map((source, idx) => (
                              <a
                                key={idx}
                                href={source.url}
                                className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700/50"
                              >
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-sm text-gray-200">{source.title}</span>
                                <span className="text-xs text-gray-500 ml-auto">{source.domain}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {message.type === 'ai' && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-gray-800 rounded transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded transition-colors">
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">AI Assistant</span>
                      <span className="text-xs text-gray-500">thinking...</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-800 rounded-2xl border border-gray-700 focus-within:border-blue-500/50 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="w-full bg-transparent px-4 py-3 pr-12 text-white placeholder-gray-400 resize-none focus:outline-none min-h-[48px] max-h-[120px]"
                rows={1}
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;