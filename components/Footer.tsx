'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-slate-800">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
            <p className="text-slate-400 text-sm max-w-md">
              Stay updated with new government schemes, subsidies, and grants tailored to your profile. No spam, ever.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            {subscribed ? (
              <div className="bg-emerald-950/50 border border-emerald-800/80 text-emerald-400 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
                🎉 Successfully subscribed to the newsletter!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white rounded-xl px-4 py-2.5 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md shadow-blue-500/10"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Logo & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                SchemeMate AI
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering Indian citizens, students, and businesses by matching profiles to relevant central and state schemes instantly using modern AI models.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Twitter X" className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/eligibility" className="hover:text-white transition-colors">Eligibility Checker</Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-white transition-colors">AI Assistant</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/results?category=msme" className="hover:text-white transition-colors">MSME & Business</Link>
              </li>
              <li>
                <Link href="/results?category=agriculture" className="hover:text-white transition-colors">Agriculture & Farmers</Link>
              </li>
              <li>
                <Link href="/results?category=education" className="hover:text-white transition-colors">Student Scholarships</Link>
              </li>
              <li>
                <Link href="/results?category=women" className="hover:text-white transition-colors">Women Entrepreneurs</Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal & Help</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} SchemeMate AI. All rights reserved.</p>
          <p className="text-slate-500">
            Disclaimer: SchemeMate AI is an independent platform and is not affiliated with the Government of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
