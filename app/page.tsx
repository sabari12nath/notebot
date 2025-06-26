'use client';

import { useState, useEffect, useRef } from 'react';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';

// Remove the mock getRoastResponse and use a simple roast message:
function getRoastResponse(input: string, name: string): string {
  return `That was a terrible question: "${input}"`;
}

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function Page() {
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const themeClasses =
    theme === 'light'
      ? {
          main: 'bg-gray-100 text-gray-900 font-sans',
          section: '',
        }
      : {
          main: 'bg-gray-900 text-gray-100 font-sans',
          section: '',
        };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) setName(inputName.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userMsg: Message = { role: 'user', content: input };
    const botMsg: Message = { role: 'bot', content: getRoastResponse(input, name) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  if (!name) {
    return (
      <main className={`flex items-center justify-center h-screen ${themeClasses.main}`}>
        <form
          onSubmit={handleNameSubmit}
          className="border shadow-lg p-8 rounded-lg space-y-4 w-full max-w-sm bg-white"
        >
          <h2 className="text-2xl font-bold text-center tracking-wide">
            Hey! What's your name?
          </h2>
          <input
            type="text"
            placeholder="Enter a name"
            className="w-full p-2 rounded font-sans outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-100 border border-gray-300 text-gray-900"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <button
            type="submit"
            className="w-full font-semibold p-2 rounded transition bg-blue-600 text-white hover:bg-blue-700"
          >
            Continue
          </button>
          <div className="flex justify-center pt-2">
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className={`flex flex-col h-screen ${themeClasses.main}`}>
      <ChatHeader name={name} theme={theme} setTheme={setTheme} />
      <section className={`flex-1 overflow-y-auto px-4 py-2 space-y-4 ${themeClasses.section}`}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} msg={msg} theme={theme} />
        ))}
        <div ref={messagesEndRef} />
      </section>
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        theme={theme}
      />
      <style jsx global>{`
        body {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          background: ${theme === 'light' ? '#f3f4f6' : '#181825'};
        }
      `}</style>
    </main>
  );
}