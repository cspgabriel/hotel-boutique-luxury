'use client';

import React from 'react';
import Link from 'next/link';
import { Maximize2, Users, Bed, Eye, ArrowRight, Calendar, Sparkles } from 'lucide-react';
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
    <article className="group bg-white border border-hotel-sand-200/80 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-500 flex flex-col">
      {/* Imagem Imersiva com Badge */}
      <div className="relative aspect-[16/10] overflow-hidden bg-hotel-slate-900">
        <img
          src={room.coverImage.url}
          alt={room.coverImage.alt}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Metragem e Vista Flutuante */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-medium text-hotel-navy-950">
            {room.sizeM2} m²
          </span>
          <span className="px-2.5 py-1 bg-hotel-navy-950/80 backdrop-blur-md text-[10px] uppercase tracking-wider font-medium text-white">
            {room.viewType}
          </span>
        </div>

        {/* Período / Tarifa Flutuante na Imagem */}
        <div className="absolute bottom-4 right-4 text-right">
          <span className="text-[10px] uppercase tracking-wider text-white/80 block">A partir de</span>
          <span className="text-lg sm:text-xl font-serif text-white font-medium drop-shadow-md">
            {formatCurrency(room.startingPrice)}
            <span className="text-xs font-sans font-light text-white/80"> /noite</span>
          </span>
        </div>
      </div>

      {/* Conteúdo Editorial da Acomodação */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-hotel-gold-600 block mb-1">
            {room.tagline}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-hotel-navy-950 font-normal mb-3 group-hover:text-hotel-gold-700 transition-colors">
            <Link href={`/acomodacoes/${room.slug}`} onClick={handleDetailsClick}>
              {room.name}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light mb-6 line-clamp-2">
            {room.shortDescription}
          </p>

          {/* Especificações Visuais Rápidas */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-hotel-sand-200 text-xs text-hotel-slate-800 font-light mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-hotel-gold-600 shrink-0" />
              <span>Até {room.maxGuests} hóspedes</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-3.5 h-3.5 text-hotel-gold-600 shrink-0" />
              <span className="truncate">{room.bedType.split('(')[0]}</span>
            </div>
          </div>

          {/* Cortesia da Reserva Direta */}
          {room.directBookingPerk && (
            <div className="flex items-start gap-2 bg-hotel-sand-50 p-2.5 mb-6 text-[11px] text-hotel-slate-800 border-l-2 border-hotel-gold-500">
              <Sparkles className="w-3.5 h-3.5 text-hotel-gold-600 shrink-0 mt-0.5" />
              <span><strong>Benefício Direto:</strong> {room.directBookingPerk}</span>
            </div>
          )}
        </div>

        {/* Botões de Ação com Dupla Intenção */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href={`/acomodacoes/${room.slug}`}
            onClick={handleDetailsClick}
            className="btn-secondary text-center text-[10px] py-3 px-3 flex items-center justify-center gap-1.5"
          >
            <span>Conhecer</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={handleBookClick}
            className="btn-primary text-center text-[10px] py-3 px-3 flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3 h-3" />
            <span>Reservar</span>
          </button>
        </div>
      </div>
    </article>
  );
};
