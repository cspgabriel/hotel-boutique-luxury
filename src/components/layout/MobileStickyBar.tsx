'use client';

import React from 'react';
import { Calendar, MessageCircle, Phone } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { trackBookingCtaClick, trackWhatsAppClick, trackPhoneClick } from '@/lib/analytics';

interface MobileStickyBarProps {
  onOpenBookingModal?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBookingModal }) => {
  const { hotelInfo } = hotelConfig;

  const handleBooking = () => {
    trackBookingCtaClick('mobile_sticky_bottom');
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      window.location.href = '/reservas';
    }
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-hotel-sand-200 px-4 py-2.5 shadow-luxury pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-2">
        {/* Botão WhatsApp */}
        <a
          href={`https://wa.me/${hotelInfo.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar', hotelInfo.whatsapp)}
          className="flex items-center justify-center w-11 h-11 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-none shrink-0 active:scale-95 transition-transform"
          aria-label="Atendimento no WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Botão Telefone */}
        <a
          href={`tel:${hotelInfo.phone}`}
          onClick={() => trackPhoneClick('mobile_sticky_bar')}
          className="flex items-center justify-center w-11 h-11 bg-hotel-sand-100 text-hotel-slate-800 border border-hotel-sand-200 rounded-none shrink-0 active:scale-95 transition-transform"
          aria-label="Ligar para o Hotel"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* CTA Principal de Reserva */}
        <button
          onClick={handleBooking}
          className="flex-1 flex items-center justify-center gap-2 h-11 bg-hotel-navy-950 text-white font-medium text-[11px] uppercase tracking-[0.18em] active:scale-[0.98] transition-transform shadow-sm"
        >
          <Calendar className="w-4 h-4 text-hotel-gold-400" />
          <span>Reservar agora</span>
        </button>
      </div>
    </div>
  );
};
