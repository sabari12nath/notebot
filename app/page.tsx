'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Sun, Moon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';

type Message = {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

const quickTopicSimpleAnswers: Record<string, string> = {
  "concrete technology": "Concrete technology is about making and using concrete in construction.",
  "structural analysis": "Structural analysis checks if buildings and bridges are strong and safe.",
  "surveying": "Surveying is measuring land and mapping it for construction.",
  "fluid mechanics": "Fluid mechanics studies how liquids and gases move and behave.",
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content:
        "Oh, you finally decided to show up! Ready to ask questions you probably should've Googled? 😏 I'm your snarky little civil engineering companion. Try asking me about concrete, steel, or why your calculations never match reality!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickTopics, setShowQuickTopics] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Theme toggle handler
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Call FastAPI backend for real answer
  const fetchRealAnswer = async (question: string) => {
    try {
      // This calls your Next.js API route, which should proxy to your FastAPI backend
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      if (!res.ok) {
        let errMsg = "Backend error";
        try {
          const err = await res.json();
          errMsg = err.error || errMsg;
        } catch {}
        return errMsg;
      }
      const data = await res.json();
      if (data.response) return data.response;
      return "Sorry, I couldn't find an answer.";
    } catch (e) {
      return "Error: Unable to reach backend.";
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Roasting logic: If this is the user's first message, always roast
    if (messages.length === 1) {
      setTimeout(() => {
        const roastReplies = [
          "Wow, starting off strong! Did you copy-paste that question from your WhatsApp group? 😏",
          "You know, Google is free... but sure, I'll help you out!",
          "Asking me? Not even your seniors could answer that one. Let's see...",
          "You again? I thought you graduated by now. Anyway, here's what I think...",
          "Another question? At this rate, you’ll owe me a coffee after you pass!"
        ];
        const roast = roastReplies[Math.floor(Math.random() * roastReplies.length)];
        const botResponse: Message = {
          id: Date.now() + 1,
          type: 'bot',
          content: roast,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 800);
      return;
    }

    // Check for quick topic simple answer
    const quickKey = inputValue.trim().toLowerCase();
    if (quickTopicSimpleAnswers[quickKey]) {
      // Fetch real answer from backend for quick topics
      const realAnswer = await fetchRealAnswer(quickKey);
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          type: 'bot',
          content: realAnswer,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 600);
      return;
    }

    // For other questions, you may want to provide a context or ask user for context
    // Here, just use inputValue as both question and context for demo
    const realAnswer = await fetchRealAnswer(inputValue);
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: realAnswer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const downloadChat = () => {
    const chatData = messages
      .map(
        (msg) =>
          `[${msg.timestamp.toLocaleString()}] ${msg.type.toUpperCase()}: ${msg.content}`
      )
      .join('\n\n');

    const blob = new Blob([chatData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ktu-civil-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Fresh start! Ready to tackle some new engineering challenges? 🚀',
        timestamp: new Date(),
      },
    ]);
  };

  // Helper to format time in a consistent, SSR-safe way (24h, no locale)
  const formatTime = (date: Date | string) => {
    // Accepts Date or string (for hydration safety)
    const d = typeof date === 'string' ? new Date(date) : date;
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    const s = d.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100'
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow border border-gray-300 dark:border-gray-700 transition-colors"
        title="Toggle theme"
      >
        {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
      </button>
      {/* Glassmorphism Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-300'
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? 'bg-purple-500' : 'bg-purple-300'
          }`}
        ></div>
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar
          isDarkMode={isDarkMode}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          showQuickTopics={showQuickTopics}
          setShowQuickTopics={setShowQuickTopics}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          messages={messages}
          setInputValue={setInputValue}
          downloadChat={downloadChat}
          clearHistory={clearHistory}
        />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-80'}`}>
          <ChatMessages
            isDarkMode={isDarkMode}
            messages={messages}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef as React.MutableRefObject<HTMLDivElement>}
            formatTime={formatTime}
          />
          <ChatInput
            isDarkMode={isDarkMode}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleKeyDown={handleKeyDown}
            sendMessage={sendMessage}
            textareaRef={textareaRef as React.MutableRefObject<HTMLTextAreaElement>}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
