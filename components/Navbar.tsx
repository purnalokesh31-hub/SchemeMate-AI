'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Home, 
  ClipboardCheck, 
  MessageSquareCode, 
  HelpCircle,
  LogIn
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Eligibility Checker', href: '/eligibility', icon: <ClipboardCheck className="w-4 h-4" /> },
    { name: 'AI Assistant', href: '/assistant', icon: <MessageSquareCode className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-md py-3' : 'bg-white/80 backdrop-blur-md py-5 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary text-white p-2.5 rounded-xl shadow-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                SchemeMate <span className="text-primary text-xs bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-bold">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-primary'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.icon}
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" 
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="inline-flex items-center justify-center px-4.5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-all rounded-xl shadow-sm">
              Login
            </button>
            <Link
              href="/eligibility"
              className="inline-flex items-center justify-center px-4.5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 group gap-1"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button - min 48px size for tap target */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 animate-fade-in" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (with AnimatePresence for smooth slide in/out) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900 z-40 md:hidden"
            />
            
            {/* Drawer Content */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 flex flex-col p-6 border-l border-slate-100 md:hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <span className="font-extrabold text-lg text-slate-900 flex items-center gap-1.5">
                  SchemeMate <span className="text-primary text-[10px] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">AI</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list in drawer */}
              <div className="space-y-2 flex-grow">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-50/80 text-primary border border-blue-100/50 shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className={isActive ? 'text-primary' : 'text-slate-400'}>
                        {link.icon}
                      </div>
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Drawer actions */}
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-3 mt-auto">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-slate-400" />
                  Login
                </button>
                <Link
                  href="/eligibility"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3.5 text-sm font-bold text-white bg-primary hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/10 block transition-all active:scale-98"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
