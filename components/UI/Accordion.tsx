'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-200"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 hover:text-slate-900 transition-colors focus:outline-none"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-96 border-t border-slate-100' : 'max-h-0'
              }`}
            >
              <div className="p-5 text-slate-600 text-sm leading-relaxed bg-slate-50/50">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
