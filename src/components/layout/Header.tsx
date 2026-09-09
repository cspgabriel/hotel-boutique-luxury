'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, Calendar } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { MobileMenu } from './MobileMenu';
import { trackBookingCtaClick, trackPhoneClick } from '@/lib/analytics';

interface HeaderProps {
  onOpenBookingModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { hotelInfo } = hotelConfig;
  const isSolid = !isHomePage || isScrolled;

  // 6 itens essenciais no menu principal para respeitar o limite de 7 e evitar quebras
  const navLinks = [
    { name: 'O Hotel', href: '/hotel' },
    { name: 'Acomodações', href: '/acomodacoes' },
    { name: 'Experiências', href: '/experiencias' },
    { name: 'Gastronomia', href: '/gastronomia' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Contato', href: '/contato' },
  ];

  const handleBookingClick = () => {
    trackBookingCtaClick('header_desktop');
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      window.location.href = '/reservas';
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isSolid
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 text-hotel-slate-950 border-b border-hotel-sand-200'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-4 sm:py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo e Tagline — Protegido contra quebras de linha indesejadas */}
          <Link href="/" className="group flex flex-col shrink-0">
            <span
              className={`font-serif text-lg sm:text-xl lg:text-2xl font-medium tracking-wider whitespace-nowrap transition-colors ${
                isSolid
                  ? 'text-hotel-navy-950 group-hover:text-hotel-gold-700'
                  : 'text-white group-hover:text-hotel-gold-200 drop-shadow-sm'
              }`}
            >
              Vila Solarium
            </span>
            <span
              className={`text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-medium whitespace-nowrap transition-colors ${
                isSolid ? 'text-hotel-slate-700' : 'text-white/85'
              }`}
            >
              Boutique Hotel & Spa · {hotelInfo.destinationName}
            </span>
          </Link>

          {/* Navegação Desktop com whitespace-nowrap rigoroso */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" aria-label="Menu principal">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.18em] whitespace-nowrap transition-colors py-1 relative font-medium ${
                    isSolid
                      ? isActive
                        ? 'text-hotel-gold-700 font-semibold'
                        : 'text-hotel-slate-900 hover:text-hotel-gold-700'
                      : isActive
                      ? 'text-hotel-gold-300 font-semibold drop-shadow-sm'
                      : 'text-white/95 hover:text-white drop-shadow-sm'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-hotel-gold-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Ações Direitas (Telefone + Reservar CTA + Mobile Menu Button) com whitespace-nowrap */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Telefone: visível apenas quando há folga de largura na tela */}
            <a
              href={`tel:${hotelInfo.phone}`}
              onClick={() => trackPhoneClick('header')}
              className={`hidden 2xl:flex items-center gap-1.5 text-xs tracking-wider whitespace-nowrap transition-colors font-medium ${
                isSolid
                  ? 'text-hotel-slate-800 hover:text-hotel-gold-700'
                  : 'text-white/95 hover:text-white drop-shadow-sm'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-hotel-gold-600 shrink-0" />
              <span>{hotelInfo.phoneFormatted}</span>
            </a>

            {/* CTA Reservar Agora — sempre em linha única, sem espremer */}
            <button
              onClick={handleBookingClick}
              className={`hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap transition-all duration-300 shadow-sm shrink-0 ${
                isSolid
                  ? 'bg-hotel-navy-950 text-white hover:bg-hotel-gold-600'
                  : 'bg-white text-hotel-navy-950 hover:bg-hotel-gold-500 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Reservar agora</span>
            </button>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`xl:hidden p-2 rounded-none transition-colors focus:outline-none focus:ring-2 focus:ring-hotel-gold-500 shrink-0 ${
                isSolid
                  ? 'text-hotel-navy-950 hover:bg-hotel-sand-100'
                  : 'text-white hover:bg-white/15'
              }`}
              aria-label="Abrir menu de navegação"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenBookingModal={() => {
          if (onOpenBookingModal) onOpenBookingModal();
          else window.location.href = '/reservas';
        }}
      />
    </>
  );
};
