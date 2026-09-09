'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { RoomCategory } from '@/types/hotel';
import { formatCurrency } from '@/lib/utils';
import { trackBookingCtaClick, trackRoomView } from '@/lib/analytics';

interface RoomCardProps {
  room: RoomCategory;
  onBookNow?: (roomSlug: string) => void;
  priority?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onBookNow }) => {
  const handleDetailsClick = () => {
    trackRoomView(room.name, room.slug, room.startingPrice);
  };

  const handleBookClick = () => {
    trackBookingCtaClick('room_card', room.slug);
    if (onBookNow) {
      onBookNow(room.slug);
    } else {
      window.location.href = `/reservas?room=${room.slug}`;
    }
  };

  return (
    <article className="group bg-white border border-hotel-sand-200 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col h-full">
      {/* 1. Fotografia 100% Desobstruída (sem tags e sem preços sobre a imagem) */}
      <Link
        href={`/acomodacoes/${room.slug}`}
        onClick={handleDetailsClick}
        className="relative aspect-[16/10] overflow-hidden bg-hotel-slate-900 block"
        aria-label={`Ver detalhes de ${room.name}`}
      >
        <img
          src={room.coverImage.url}
          alt={room.coverImage.alt}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </Link>

      {/* 2. Conteúdo Editorial Estruturado e Acessível */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div>
          {/* Eyebrow de Categoria / Tagline com alto contraste */}
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-hotel-gold-700 block mb-1.5">
            {room.tagline}
          </span>

          {/* Título Completo sem Truncamento (com altura mínima para alinhamento uniforme) */}
          <h3 className="font-serif text-xl sm:text-2xl text-hotel-navy-950 font-normal leading-snug min-h-[3.5rem] flex items-start group-hover:text-hotel-gold-700 transition-colors">
            <Link href={`/acomodacoes/${room.slug}`} onClick={handleDetailsClick}>
              {room.name}
            </Link>
          </h3>

          {/* Especificações Visuais em Linha Limpa */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-hotel-slate-800 font-medium py-2.5 border-y border-hotel-sand-200/80 mb-3.5">
            <span>{room.sizeM2} m²</span>
            <span className="text-hotel-sand-400">•</span>
            <span>Até {room.maxGuests} hóspedes</span>
            <span className="text-hotel-sand-400">•</span>
            <span>{room.bedType.split('(')[0]}</span>
            <span className="text-hotel-sand-400">•</span>
            <span className="text-hotel-navy-950 font-semibold">{room.viewType}</span>
          </div>

          {/* Tarifa em Destaque Visual Limpo e Claro */}
          <div className="mb-3.5 flex items-baseline gap-1.5">
            <span className="text-xs text-hotel-slate-700 font-normal">A partir de</span>
            <span className="font-serif text-2xl sm:text-3xl font-medium text-hotel-navy-950">
              {formatCurrency(room.startingPrice)}
            </span>
            <span className="text-xs text-hotel-slate-700 font-normal">/noite</span>
          </div>

          {/* Descrição com Alto Contraste (WCAG compliant) */}
          <p className="text-xs sm:text-sm text-hotel-slate-800 leading-relaxed font-normal mb-4">
            {room.shortDescription}
          </p>

          {/* Cortesia da Reserva Direta em Box Suave */}
          {room.directBookingPerk && (
            <div className="flex items-start gap-2 bg-emerald-50/70 p-2.5 text-xs text-emerald-900 border-l-2 border-emerald-600 mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Benefício Direto:</strong> {room.directBookingPerk}</span>
            </div>
          )}
        </div>

        {/* 3. Botões de Ação Imediatamente Visíveis (sem depender de hover) */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-hotel-sand-200/60">
          <Link
            href={`/acomodacoes/${room.slug}`}
            onClick={handleDetailsClick}
            className="btn-secondary text-center text-xs py-3 px-3 flex items-center justify-center gap-1.5 font-medium"
          >
            <span>Ver Detalhes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleBookClick}
            className="btn-primary text-center text-xs py-3 px-3 flex items-center justify-center gap-1.5 font-medium"
          >
            <Calendar className="w-3.5 h-3.5 text-hotel-gold-400" />
            <span>Reservar</span>
          </button>
        </div>
      </div>
    </article>
  );
};
