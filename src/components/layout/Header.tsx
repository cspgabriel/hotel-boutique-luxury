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
      if (window.scrollY > 50) {
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

  // No Hero da homepage o header começa transparente, em páginas internas ele tem fundo sólido para contraste ideal
  const isSolid = !isHomePage || isScrolled;

  const navLinks = [
    { name: 'O Hotel', href: '/hotel' },
    { name: 'Acomodações', href: '/acomodacoes' },
    { name: 'Experiências', href: '/experiencias' },
    { name: 'Gastronomia', href: '/gastronomia' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Localização', href: '/localizacao' },
    { name: 'Ofertas', href: '/ofertas' },
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isSolid
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 text-hotel-slate-900 border-b border-hotel-sand-200/50'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo e Tagline */}
          <Link href="/" className="group flex flex-col">
            <span
              className={`font-serif text-lg sm:text-xl lg:text-2xl tracking-wider transition-colors font-medium ${
                isSolid ? 'text-hotel-navy-950 group-hover:text-hotel-gold-600' : 'text-white group-hover:text-hotel-gold-200'
              }`}
            >
              {hotelInfo.name}
            </span>
            <span
              className={`text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-light transition-colors ${
                isSolid ? 'text-hotel-slate-800/60' : 'text-white/75'
              }`}
            >
              {hotelInfo.neighborhood} · {hotelInfo.destinationName}
            </span>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden xl:flex items-center gap-7" aria-label="Menu principal">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[12px] uppercase tracking-[0.18em] transition-colors py-1 relative font-medium ${
                    isSolid
                      ? isActive
                        ? 'text-hotel-gold-600 font-semibold'
                        : 'text-hotel-slate-800 hover:text-hotel-gold-600'
                      : isActive
                      ? 'text-hotel-gold-300 font-semibold'
                      : 'text-white/90 hover:text-white'
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

          {/* Ações Direitas (Telefone + Reservar CTA + Mobile Trigger) */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${hotelInfo.phone}`}
              onClick={() => trackPhoneClick('header')}
              className={`hidden md:flex items-center gap-2 text-xs tracking-wider transition-colors ${
                isSolid ? 'text-hotel-slate-800/80 hover:text-hotel-gold-600' : 'text-white/90 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-hotel-gold-500" />
              <span>{hotelInfo.phoneFormatted}</span>
            </a>

            <button
              onClick={handleBookingClick}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm ${
                isSolid
                  ? 'bg-hotel-navy-900 text-white hover:bg-hotel-gold-600'
                  : 'bg-white text-hotel-slate-900 hover:bg-hotel-gold-500 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservar agora</span>
            </button>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`xl:hidden p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-hotel-gold-500 ${
                isSolid
                  ? 'text-hotel-slate-900 hover:bg-hotel-sand-100'
                  : 'text-white hover:bg-white/10'
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
