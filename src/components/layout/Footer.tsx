import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Award } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';

export const Footer: React.FC = () => {
  const { hotelInfo } = hotelConfig;

  return (
    <footer className="bg-hotel-navy-950 text-hotel-sand-100/90 pt-16 sm:pt-20 pb-28 sm:pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Topo do Footer: Nome, Propósito e Selos */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-white/10 gap-8">
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-3">
              <span className="font-serif text-2xl tracking-wider text-white font-medium block">
                {hotelInfo.name}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-hotel-gold-400 uppercase">
                {hotelInfo.category} · {hotelInfo.destinationName}
              </span>
            </Link>
            <p className="text-xs text-white/60 leading-relaxed font-light mt-2">
              Sua experiência exclusiva de hospitalidade, tranquilidade e alta gastronomia a passos do mar calmo da Ferradura.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/70">
            <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2.5 rounded-none border border-white/10">
              <Award className="w-4 h-4 text-hotel-gold-400 shrink-0" />
              <span>TripAdvisor Travellers' Choice 2025</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2.5 rounded-none border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Reserva Direta 100% Segura</span>
            </div>
          </div>
        </div>

        {/* 4 Colunas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-12 border-b border-white/10 text-xs">
          {/* Coluna 1: Hotel */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-hotel-gold-400 mb-4">
              O Hotel
            </h4>
            <ul className="space-y-2.5 text-white/70 font-light">
              <li>
                <Link href="/hotel" className="hover:text-white transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/acomodacoes" className="hover:text-white transition-colors">
                  Acomodações & Suítes
                </Link>
              </li>
              <li>
                <Link href="/gastronomia" className="hover:text-white transition-colors">
                  Gastronomia Autoral
                </Link>
              </li>
              <li>
                <Link href="/experiencias" className="hover:text-white transition-colors">
                  Spa & Experiências
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="hover:text-white transition-colors">
                  Galeria de Fotos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2: Planeje sua estadia */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-hotel-gold-400 mb-4">
              Planeje sua estadia
            </h4>
            <ul className="space-y-2.5 text-white/70 font-light">
              <li>
                <Link href="/reservas" className="hover:text-white transition-colors font-normal text-hotel-gold-300">
                  Reservas com Benefícios
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="hover:text-white transition-colors">
                  Pacotes & Ofertas
                </Link>
              </li>
              <li>
                <Link href="/destino" className="hover:text-white transition-colors">
                  Guia do Destino
                </Link>
              </li>
              <li>
                <Link href="/localizacao" className="hover:text-white transition-colors">
                  Como Chegar & Mapa
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Dúvidas Frequentes (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Institucional & Eventos */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-hotel-gold-400 mb-4">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-white/70 font-light">
              <li>
                <Link href="/eventos" className="hover:text-white transition-colors">
                  Casamentos & Eventos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Assessoria de Imprensa
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Fale com o Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Legal & Políticas */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-hotel-gold-400 mb-4">
              Legal & Políticas
            </h4>
            <ul className="space-y-2.5 text-white/70 font-light">
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-white transition-colors">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Gestão de Cookies (LGPD)
                </Link>
              </li>
              <li>
                <span className="text-white/40 block pt-1">
                  CNPJ: {hotelInfo.cnpj}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Informações de Contato, Endereço e Redes */}
        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 text-xs text-white/70">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a
              href={`tel:${hotelInfo.phone}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-hotel-gold-400" />
              <span>{hotelInfo.phoneFormatted}</span>
            </a>
            <a
              href={`https://wa.me/${hotelInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {hotelInfo.whatsappFormatted}</span>
            </a>
            <a
              href={`mailto:${hotelInfo.emailReservas}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-hotel-gold-400" />
              <span>{hotelInfo.emailReservas}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-white/60">
              <MapPin className="w-3.5 h-3.5 text-hotel-gold-400" />
              <span>{hotelInfo.fullAddress}</span>
            </span>
            <a
              href={hotelInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors"
              aria-label="Instagram Oficial"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>
            © {new Date().getFullYear()} {hotelInfo.name}. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Desenvolvido com foco em</span>
            <span className="text-hotel-gold-400 font-medium">Reservas Diretas & CRO</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
