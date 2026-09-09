'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Home, Search, Tag, ArrowRight } from 'lucide-react';
import { getTodayDateString, getFutureDateString, calculateNights } from '@/lib/utils';
import { trackBookingSearch } from '@/lib/analytics';
import { hotelConfig } from '@/data/hotel.config';

interface BookingBarProps {
  className?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  initialRooms?: number;
  promoCode?: string;
  variant?: 'hero' | 'contained';
}

export const BookingBar: React.FC<BookingBarProps> = ({
  className = '',
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  initialRooms = 1,
  promoCode = '',
  variant = 'hero',
}) => {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || getFutureDateString(3));
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || getFutureDateString(6));
  const [guests, setGuests] = useState<number>(initialGuests);
  const [rooms, setRooms] = useState<number>(initialRooms);
  const [code, setCode] = useState<string>(promoCode);
  const [showPromoInput, setShowPromoInput] = useState<boolean>(!!promoCode);

  const nights = calculateNights(checkIn, checkOut);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Rastreia evento no dataLayer
    trackBookingSearch({
      checkIn,
      checkOut,
      guests,
      rooms,
    });

    // Encaminha para a página interna de disponibilidade e reserva com query params
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString(),
      rooms: rooms.toString(),
      ...(code ? { promo: code } : {}),
    });

    router.push(`/reservas?${query.toString()}`);
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto ${className} ${
        variant === 'hero'
          ? 'bg-white/95 backdrop-blur-xl shadow-luxury border border-white/40 p-4 sm:p-6 rounded-none'
          : 'bg-white shadow-md border border-hotel-sand-200 p-4 sm:p-6 rounded-none'
      }`}
    >
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-2">
          {/* Campo Check-in */}
          <div className="relative p-2.5 bg-hotel-sand-50 border border-hotel-sand-200 hover:border-hotel-gold-400 transition-colors">
            <label htmlFor="checkin-date" className="block text-[10px] uppercase tracking-[0.2em] font-medium text-hotel-slate-800/70 mb-1">
              Check-in
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-hotel-gold-600 shrink-0" />
              <input
                id="checkin-date"
                type="date"
                min={getTodayDateString()}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value >= checkOut) {
                    // Ajusta checkOut automaticamente para o dia seguinte
                    const nextDay = new Date(e.target.value);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setCheckOut(nextDay.toISOString().split('T')[0]);
                  }
                }}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Campo Check-out */}
          <div className="relative p-2.5 bg-hotel-sand-50 border border-hotel-sand-200 hover:border-hotel-gold-400 transition-colors">
            <div className="flex items-center justify-between">
              <label htmlFor="checkout-date" className="block text-[10px] uppercase tracking-[0.2em] font-medium text-hotel-slate-800/70 mb-1">
                Check-out
              </label>
              {nights > 0 && (
                <span className="text-[10px] font-medium text-hotel-gold-600">
                  {nights} {nights === 1 ? 'diária' : 'diárias'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-hotel-gold-600 shrink-0" />
              <input
                id="checkout-date"
                type="date"
                min={checkIn || getTodayDateString()}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Campo Hóspedes */}
          <div className="relative p-2.5 bg-hotel-sand-50 border border-hotel-sand-200 hover:border-hotel-gold-400 transition-colors">
            <label htmlFor="guests-count" className="block text-[10px] uppercase tracking-[0.2em] font-medium text-hotel-slate-800/70 mb-1">
              Hóspedes
            </label>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-hotel-gold-600 shrink-0" />
              <select
                id="guests-count"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Hóspede</option>
                <option value={2}>2 Hóspedes</option>
                <option value={3}>3 Hóspedes</option>
                <option value={4}>4 Hóspedes</option>
                <option value={5}>5 Hóspedes</option>
                <option value={6}>6+ Hóspedes</option>
              </select>
            </div>
          </div>

          {/* Campo Quartos */}
          <div className="relative p-2.5 bg-hotel-sand-50 border border-hotel-sand-200 hover:border-hotel-gold-400 transition-colors">
            <label htmlFor="rooms-count" className="block text-[10px] uppercase tracking-[0.2em] font-medium text-hotel-slate-800/70 mb-1">
              Quartos
            </label>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-hotel-gold-600 shrink-0" />
              <select
                id="rooms-count"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Quarto</option>
                <option value={2}>2 Quartos</option>
                <option value={3}>3 Quartos</option>
                <option value={4}>4+ Quartos</option>
              </select>
            </div>
          </div>

          {/* Botão de Busca */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full h-full min-h-[48px] py-3.5 px-4 bg-hotel-navy-950 hover:bg-hotel-gold-600 text-white text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Buscar</span>
            </button>
          </div>
        </div>

        {/* Linha inferior: Cupom Promocional + Garantia de Melhor Tarifa */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 text-[11px] text-hotel-slate-800/80 gap-2">
          <div className="flex items-center gap-2">
            {!showPromoInput ? (
              <button
                type="button"
                onClick={() => setShowPromoInput(true)}
                className="inline-flex items-center gap-1.5 text-hotel-gold-700 hover:text-hotel-gold-800 font-medium hover:underline"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Possui código promocional?</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-hotel-slate-800/70">Código:</span>
                <input
                  type="text"
                  placeholder="Ex: ROMANCE26"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="px-2.5 py-1 text-xs border border-hotel-sand-300 uppercase font-mono tracking-wider focus:outline-none focus:border-hotel-gold-500 bg-white"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Melhor tarifa garantida reservando direto pelo site</span>
          </div>
        </div>
      </form>
    </div>
  );
};
