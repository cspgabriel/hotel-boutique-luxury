'use client';

import React from 'react';

import { ShieldCheck, Sparkles, Clock, Coffee, MessageSquareHeart, Check, ArrowRight } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { trackBookingCtaClick } from '@/lib/analytics';

interface DirectBookingBenefitsProps {
  onOpenBookingModal?: () => void;
  showCta?: boolean;
}

export const DirectBookingBenefits: React.FC<DirectBookingBenefitsProps> = ({
  onOpenBookingModal,
  showCta = true,
}) => {
  const { directBookingBenefits } = hotelConfig;

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-hotel-gold-600" />,
    Sparkles: <Sparkles className="w-5 h-5 text-hotel-gold-600" />,
    Clock: <Clock className="w-5 h-5 text-hotel-gold-600" />,
    Coffee: <Coffee className="w-5 h-5 text-hotel-gold-600" />,
    MessageSquareHeart: <MessageSquareHeart className="w-5 h-5 text-hotel-gold-600" />,
  };

  return (
    <section className="py-16 sm:py-20 bg-hotel-sand-100/50 border-y border-hotel-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="eyebrow">Vantagens Exclusivas</span>
          <h2 className="section-title mb-4">
            Reserve direto. Aproveite muito mais.
          </h2>
          <p className="section-subtitle mx-auto">
            Garantimos o menor valor e privilégios que nenhuma agência online ou intermediário pode oferecer para sua estadia.
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {directBookingBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white p-6 border border-hotel-sand-200/80 hover:border-hotel-gold-400/80 transition-all duration-300 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-hotel-sand-50 rounded-none group-hover:bg-hotel-gold-100/50 transition-colors">
                    {iconMap[benefit.iconName] || <Check className="w-5 h-5 text-hotel-gold-600" />}
                  </div>
                  {benefit.badge && (
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-hotel-gold-100 text-hotel-gold-800">
                      {benefit.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base font-normal text-hotel-navy-950 mb-2 group-hover:text-hotel-gold-700 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs text-hotel-slate-800/75 leading-relaxed font-light">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Opcional */}
        {showCta && (
          <div className="text-center mt-10">
            <button
              onClick={() => {
                trackBookingCtaClick('benefits_section');
                if (onOpenBookingModal) onOpenBookingModal();
                else window.location.href = '/reservas';
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>Ver disponibilidade</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
