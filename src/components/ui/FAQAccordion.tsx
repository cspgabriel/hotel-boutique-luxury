'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/types/hotel';

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  defaultOpenIndex = 0,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 divide-y divide-hotel-sand-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.id} className="pt-4 first:pt-0">
            <button
              onClick={() => toggleItem(index)}
              className="w-full py-3 flex items-center justify-between text-left group focus:outline-none focus:ring-2 focus:ring-hotel-gold-400"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="font-serif text-base sm:text-lg text-hotel-navy-950 font-normal pr-4 group-hover:text-hotel-gold-700 transition-colors">
                {item.question}
              </span>
              <span
                className={`p-1 rounded-full text-hotel-gold-600 transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-180 bg-hotel-sand-100' : 'bg-transparent'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </span>
            </button>
            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light pl-1">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
