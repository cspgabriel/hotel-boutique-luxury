'use client';

import React from 'react';
import Link from 'next/link';
import { X, Phone, MessageCircle, Calendar } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { trackBookingCtaClick, trackWhatsAppClick } from '@/lib/analytics';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingModal: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenBookingModal,
}) => {
  if (!isOpen) return null;

  const { hotelInfo } = hotelConfig;

  const links = [
    { name: 'O Hotel', href: '/hotel' },
    { name: 'Acomodações', href: '/acomodacoes' },
    { name: 'Experiências', href: '/experiencias' },
    { name: 'Gastronomia', href: '/gastronomia' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Ofertas Exclusivas', href: '/ofertas' },
    { name: 'Destino & Localização', href: '/destino' },
    { name: 'Eventos & Casamentos', href: '/eventos' },
    { name: 'Dúvidas Frequentes', href: '/faq' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-hotel-navy-950/90 backdrop-blur-md text-white flex flex-col justify-between p-6 sm:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de Navegação Principal"
    >
      {/* Topo com Logo e Fechar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <span className="font-serif text-lg tracking-wider block text-hotel-gold-300">
            {hotelInfo.name}
          </span>
          <span className="text-[10px] tracking-[0.25em] text-white/60 uppercase">
            {hotelInfo.neighborhood} — {hotelInfo.city}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-hotel-gold-400"
          aria-label="Fechar menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Links de navegação */}
      <nav className="my-auto py-6 overflow-y-auto space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block text-xl font-serif tracking-wide text-white/90 hover:text-hotel-gold-300 transition-colors py-1"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Ações e Contato */}
      <div className="pt-6 border-t border-white/10 space-y-3">
        <button
          onClick={() => {
            onClose();
            trackBookingCtaClick('mobile_menu');
            onOpenBookingModal();
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-hotel-gold-500 hover:bg-hotel-gold-600 text-white font-medium text-xs uppercase tracking-[0.2em] rounded-none shadow-md transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Reservar Agora com Benefícios
        </button>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <a
            href={`https://wa.me/${hotelInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mobile_menu', hotelInfo.whatsapp)}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs tracking-wider rounded-none transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            WhatsApp
          </a>
          <a
            href={`tel:${hotelInfo.phone}`}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs tracking-wider rounded-none transition-colors"
          >
            <Phone className="w-4 h-4 text-hotel-gold-300" />
            {hotelInfo.phoneFormatted}
          </a>
        </div>
      </div>
    </div>
  );
};
