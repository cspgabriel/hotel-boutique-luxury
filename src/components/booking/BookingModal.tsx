'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Calendar, Users, ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { getTodayDateString, getFutureDateString, buildWhatsAppBookingLink, calculateNights } from '@/lib/utils';
import { trackBookingSearch, trackWhatsAppClick } from '@/lib/analytics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomSlug?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoomSlug,
}) => {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<string>(getFutureDateString(3));
  const [checkOut, setCheckOut] = useState<string>(getFutureDateString(6));
  const [guests, setGuests] = useState<number>(2);
  const [selectedRoom, setSelectedRoom] = useState<string>(preselectedRoomSlug || '');

  useEffect(() => {
    if (preselectedRoomSlug) {
      setSelectedRoom(preselectedRoomSlug);
    }
  }, [preselectedRoomSlug]);

  // Bloqueio do scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { hotelInfo, rooms } = hotelConfig;
  const nights = calculateNights(checkIn, checkOut);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackBookingSearch({
      checkIn,
      checkOut,
      guests,
      rooms: 1,
    });
    onClose();

    const query = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString(),
      ...(selectedRoom ? { room: selectedRoom } : {}),
    });

    router.push(`/reservas?${query.toString()}`);
  };

  const whatsappLink = buildWhatsAppBookingLink(
    hotelInfo.whatsapp,
    checkIn,
    checkOut,
    guests,
    selectedRoom ? rooms.find((r) => r.slug === selectedRoom)?.name : undefined
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-hotel-navy-950/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white shadow-modal border border-hotel-sand-200 overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="bg-hotel-navy-950 text-white p-6 flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-hotel-gold-400 font-medium block mb-1">
              Canal Oficial Direto
            </span>
            <h2 id="booking-modal-title" className="font-serif text-2xl font-normal">
              Planeje sua estadia exclusiva
            </h2>
            <p className="text-xs text-white/70 mt-1 font-light">
              Garantia de melhor tarifa e cortesias exclusivas para hóspedes diretos.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <form onSubmit={handleSearch} className="p-6 space-y-5">
          {/* Seletor de Datas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
              <label htmlFor="modal-checkin" className="block text-[10px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/70 mb-1">
                Data de Entrada
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                <input
                  id="modal-checkin"
                  type="date"
                  min={getTodayDateString()}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) {
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

            <div className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
              <div className="flex items-center justify-between">
                <label htmlFor="modal-checkout" className="block text-[10px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/70 mb-1">
                  Data de Saída
                </label>
                <span className="text-[10px] font-medium text-hotel-gold-600">
                  {nights} {nights === 1 ? 'noite' : 'noites'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                <input
                  id="modal-checkout"
                  type="date"
                  min={checkIn || getTodayDateString()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none cursor-pointer"
                  required
                />
              </div>
            </div>
          </div>

          {/* Hóspedes e Acomodação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
              <label htmlFor="modal-guests" className="block text-[10px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/70 mb-1">
                Hóspedes
              </label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                <select
                  id="modal-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Adulto</option>
                  <option value={2}>2 Adultos</option>
                  <option value={3}>3 Pessoas (Casal + Filho)</option>
                  <option value={4}>4 Pessoas (Família)</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
              <label htmlFor="modal-room" className="block text-[10px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/70 mb-1">
                Preferência de Suíte
              </label>
              <select
                id="modal-room"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none cursor-pointer py-0.5"
              >
                <option value="">Todas as categorias</option>
                {rooms.map((room) => (
                  <option key={room.slug} value={room.slug}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Benefícios Rápidos de Conversão */}
          <div className="bg-hotel-sand-100/60 p-3.5 border border-hotel-sand-200 text-xs space-y-1.5 text-hotel-slate-800">
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garantia de 10% a 15% menor tarifa vs Booking/Expedia</span>
            </div>
            <div className="flex items-center gap-2 text-hotel-gold-800 font-medium">
              <Sparkles className="w-4 h-4 text-hotel-gold-600 shrink-0" />
              <span>Espumante de boas-vindas & café artesanal incluso</span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-hotel-navy-950 hover:bg-hotel-gold-600 text-white font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
            >
              <span>Ver Disponibilidade & Tarifas</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('booking_modal', hotelInfo.whatsapp)}
              className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-medium text-xs tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Prefiro Atendimento VIP pelo WhatsApp</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
