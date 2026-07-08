'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ChevronRight, 
  ArrowRight,
  Info,
  HelpCircle
} from 'lucide-react';
import { ChatMessage } from '@/types';
import Card from '@/components/UI/Card';
import Container from '@/components/UI/Container';
import Button from '@/components/UI/Button';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<any>(null);

  // Initialize welcome message only on client to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: "Hello! I am your SchemeMate AI assistant. I can help you understand eligibility criteria, documents needed, or direct you to official portal guidelines. Ask me any question, or select one of the suggested questions below!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    // Load saved checker progress
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('schememate_checker_progress');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.formData) {
            setProfile(parsed.formData);
          }
        } catch (e) {
          console.warn('Failed to parse saved checker progress:', e);
        }
      }
    }
  }, []);

  const suggestedQuestions = [
    'Am I eligible?',
    'Which documents are needed?',
    'How long does approval take?',
    'Can I apply online?',
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}-${Math.random()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, profile })
      });

      if (!res.ok) throw new Error('API backend request failed');

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-assistant-${Date.now()}-${Math.random()}`,
        sender: 'assistant',
        text: data.text || "I understand you are asking about public benefits. I highly recommend running our Eligibility Checker for a personalized scan!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback in case of server offline
      const assistantMsg: ChatMessage = {
        id: `msg-assistant-${Date.now()}-${Math.random()}`,
        sender: 'assistant',
        text: "I'm having trouble reaching our Scheme Database backend right now. Please verify your connection or run the automated Eligibility Checker to scan matched yojanas!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Delayed scroll-to-bottom to allow DOM renders to settle
  useEffect(() => {
    const timer = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] py-8 flex items-center">
      <Container className="max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px] lg:h-[700px] max-h-[80vh]">
        
        {/* Left Info Sidebar (Notion-style navigation) */}
        <div className="lg:col-span-4 hidden lg:flex flex-col bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <div className="bg-blue-50 text-primary p-2 rounded-xl border border-blue-200">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">SchemeMate AI</h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">Online</span>
              </div>
            </div>

            {/* Sidebar quick guides */}
            <div className="space-y-4 text-xs leading-relaxed text-slate-500">
              <p className="font-semibold text-slate-700 text-xs">Helpful Prompts:</p>
              
              <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                <HelpCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p>Ask about loan interest rates, required files, or how to register on portals.</p>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                <Info className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p>Replies are compiled from official scheme databases updated recently.</p>
              </div>
            </div>
          </div>

          {/* CTA back to Checker */}
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl text-center space-y-3">
            <h4 className="font-bold text-xs text-blue-900 leading-snug">Unsure of your profile parameters?</h4>
            <p className="text-[10px] text-slate-500">Let the Checker do the heavy lifting in 2 minutes.</p>
            <Button 
              href="/eligibility"
              size="sm"
              fullWidth
              className="flex items-center justify-center gap-1 shadow-md shadow-blue-500/10"
            >
              Start Checker <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Right Chat Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[2rem] shadow-xl flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-primary flex items-center justify-center font-bold relative">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-800 text-sm">SchemeMate Assistant</h2>
                <p className="text-[10px] text-slate-400">Ask me anything about government schemes</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              AI MATCH ENGINE
            </div>
          </div>

          {/* Chat Window Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/20">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3 max-w-[85%] ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  >
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                      isAssistant 
                        ? 'bg-blue-50 border border-blue-200 text-primary' 
                        : 'bg-slate-900 text-white'
                    }`}>
                      {isAssistant ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                    </div>

                    {/* Bubble */}
                    <div className="space-y-1">
                      <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm border ${
                        isAssistant 
                          ? 'bg-white border-slate-100 text-slate-700' 
                          : 'bg-primary border-primary text-white'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                      <span className={`block text-[10px] text-slate-400 ${isAssistant ? 'text-left' : 'text-right'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-1 items-center shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form and Quick Actions */}
          <div className="p-5 border-t border-slate-100 space-y-4">
            {/* Suggested Pills */}
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  disabled={isTyping}
                  className="bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-[11px] font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 py-1.5 px-3 rounded-full transition-all flex items-center gap-0.5 cursor-pointer"
                >
                  {q}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            {/* Message input form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about MUDRA loans, student grants, farming benefits..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isTyping}
                className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || !inputText.trim()}
                className="bg-primary hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl px-5 py-3 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md shadow-blue-500/10"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </Container>
    </div>
  );
}
