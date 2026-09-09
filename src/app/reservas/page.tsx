'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { Calendar, Users, ShieldCheck, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';
import { formatCurrency, formatShortDate, calculateNights, getTodayDateString, getFutureDateString, buildWhatsAppBookingLink } from '@/lib/utils';
import { trackBookingCtaClick } from '@/lib/analytics';

function ReservasContent() {
  const searchParams = useSearchParams();

  const initialCheckIn = searchParams.get('checkIn') || getFutureDateString(3);
  const initialCheckOut = searchParams.get('checkOut') || getFutureDateString(6);
  const initialGuests = Number(searchParams.get('guests')) || 2;
  const initialRoom = searchParams.get('room') || '';
  const initialPromo = searchParams.get('promo') || '';

  const [checkIn, setCheckIn] = useState<string>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut);
  const [guests, setGuests] = useState<number>(initialGuests);
  const [selectedRoomSlug] = useState<string>(initialRoom);
  const [promoCode, setPromoCode] = useState<string>(initialPromo);

  const { hotelInfo, rooms, bookingEngine } = hotelConfig;
  const nights = calculateNights(checkIn, checkOut);

  // Filtragem de acomodações que comportam o número de hóspedes
  const availableRooms = rooms.filter((r) => r.maxGuests >= guests);

  const handleBookEngine = (roomSlug: string, roomName: string) => {
    trackBookingCtaClick('reservas_engine_redirect', roomSlug);

    // Se o hotel tiver engine externa configurada (Omnibees, Cloudbeds, etc.)
    if (bookingEngine.provider !== 'direct' && bookingEngine.engineBaseUrl) {
      const url = `${bookingEngine.engineBaseUrl}?checkin=${checkIn}&checkout=${checkOut}&adults=${guests}&room=${roomSlug}&promo=${promoCode}`;
      window.open(url, '_blank');
      return;
    }

    // Caso contrário, abre WhatsApp oficial com o resumo exato da cotação
    const whatsappUrl = buildWhatsAppBookingLink(hotelInfo.whatsapp, checkIn, checkOut, guests, roomName);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Motor de Reservas' }]} />

        {/* Hero do Motor de Reservas */}
        <div className="py-6 sm:py-10 max-w-3xl">
          <span className="eyebrow">Canal Oficial de Reservas</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-hotel-navy-950 font-normal leading-tight mb-4">
            Disponibilidade & Tarifas Diretas
          </h1>
          <p className="text-sm sm:text-base text-hotel-slate-800/80 font-light leading-relaxed">
            Reserve sem intermediários com a Melhor Tarifa Garantida, espumante na suíte e flexibilidade exclusiva.
          </p>
        </div>

        {/* Barra de Ajuste de Datas e Hóspedes */}
        <div className="bg-white p-5 sm:p-6 border border-hotel-sand-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
              <label htmlFor="res-checkin" className="block text-[10px] uppercase tracking-wider font-semibold text-hotel-slate-800/70 mb-1">
                Data de Entrada
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                <input
                  id="res-checkin"
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
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
              <div className="flex items-center justify-between">
                <label htmlFor="res-checkout" className="block text-[10px] uppercase tracking-wider font-semibold text-hotel-slate-800/70 mb-1">
                  Data de Saída
                </label>
                <span className="text-[10px] font-semibold text-hotel-gold-700">
                  {nights} {nights === 1 ? 'diária' : 'diárias'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                <input
                  id="res-checkout"
                  type="date"
                  min={checkIn || getTodayDateString()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
              <label htmlFor="res-guests" className="block text-[10px] uppercase tracking-wider font-semibold text-hotel-slate-800/70 mb-1">
                Hóspedes
              </label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                <select
                  id="res-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-hotel-slate-950 focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Hóspede</option>
                  <option value={2}>2 Hóspedes</option>
                  <option value={3}>3 Hóspedes</option>
                  <option value={4}>4 Hóspedes</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
              <label htmlFor="res-promo" className="block text-[10px] uppercase tracking-wider font-semibold text-hotel-slate-800/70 mb-1">
                Cupom Promocional
              </label>
              <input
                id="res-promo"
                type="text"
                placeholder="Código promocional"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="w-full bg-transparent text-xs sm:text-sm font-mono tracking-wider text-hotel-slate-950 focus:outline-none uppercase py-0.5"
              />
            </div>
          </div>
        </div>

        {/* Comparativo de Valor: Reserva Direta vs Booking.com / OTAs */}
        <div className="bg-hotel-navy-950 text-white p-6 sm:p-8 border border-white/10 shadow-luxury mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-hotel-gold-400 font-medium block mb-1">
                Transparência & Economia Real
              </span>
              <h2 className="font-serif text-2xl font-normal">
                Por que reservar pelo canal oficial?
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>Garantia de 10% a 15% menor tarifa vs agências externas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs sm:text-sm">
            {/* Coluna Canal Oficial */}
            <div className="bg-white/5 p-5 border border-hotel-gold-500/40 space-y-3">
              <div className="flex items-center justify-between text-hotel-gold-300 font-semibold text-sm">
                <span>Reservando pelo Site do Hotel</span>
                <span className="px-2 py-0.5 bg-hotel-gold-500/20 text-hotel-gold-300 text-[10px] uppercase">
                  Recomendado
                </span>
              </div>
              <ul className="space-y-2 text-white/80 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Melhor tarifa sem taxas de comissão</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Garrafa de espumante e trufas de cortesia</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prioridade para Early Check-in e Late Check-out</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Atendimento direto pelo WhatsApp sem centrais de atendimento</span>
                </li>
              </ul>
            </div>

            {/* Coluna OTAs */}
            <div className="bg-white/5 p-5 border border-white/10 space-y-3 opacity-70">
              <span className="font-semibold text-white block text-sm">
                Reservando via Booking.com / Agências Externas
              </span>
              <ul className="space-y-2 text-white/70 font-light">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Tarifas com sobretaxa de intermediação</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Sem mimos ou espumante de boas-vindas</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Horários rígidos de entrada e saída</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Dificuldade e demora na resolução de alterações de datas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Listagem de Acomodações Disponíveis com Valores Calculados */}
        <div className="space-y-8 mb-16">
          <h2 className="font-serif text-2xl text-hotel-navy-950 font-normal">
            Suítes disponíveis para {formatShortDate(checkIn)} até {formatShortDate(checkOut)} ({nights} {nights === 1 ? 'noite' : 'noites'} · {guests} hóspede{guests > 1 ? 's' : ''}):
          </h2>

          <div className="space-y-6">
            {availableRooms.map((room) => {
              const estimatedTotal = room.startingPrice * nights;
              const isPreselected = selectedRoomSlug === room.slug;

              return (
                <div
                  key={room.slug}
                  className={`bg-white border transition-all duration-300 p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8 ${
                    isPreselected ? 'border-hotel-gold-500 ring-2 ring-hotel-gold-400/30' : 'border-hotel-sand-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center max-w-3xl">
                    <img
                      src={room.coverImage.url}
                      alt={room.coverImage.alt}
                      className="w-full sm:w-48 aspect-[4/3] object-cover shrink-0 shadow-sm"
                    />
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-hotel-gold-600">
                        {room.tagline}
                      </span>
                      <h3 className="font-serif text-2xl text-hotel-navy-950 font-normal">
                        {room.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-hotel-slate-800/70 font-light">
                        <span>{room.sizeM2} m²</span>
                        <span>•</span>
                        <span>Até {room.maxGuests} pessoas</span>
                        <span>•</span>
                        <span>{room.bedType.split('(')[0]}</span>
                        <span>•</span>
                        <span className="text-hotel-navy-950 font-medium">{room.viewType}</span>
                      </div>
                      <p className="text-xs text-hotel-slate-800/80 leading-relaxed font-light line-clamp-2 pt-1">
                        {room.shortDescription}
                      </p>
                      <div className="text-[11px] text-emerald-800 font-medium pt-1">
                        ✓ {room.directBookingPerk}
                      </div>
                    </div>
                  </div>

                  {/* Preço e Botão de Reserva */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 border-hotel-sand-200 gap-4 shrink-0 min-w-[220px]">
                    <div className="lg:text-right">
                      <span className="text-[10px] uppercase tracking-wider text-hotel-slate-800/60 block">
                        Total estimado ({nights} noites)
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl font-medium text-hotel-navy-950 block">
                        {formatCurrency(estimatedTotal)}
                      </span>
                      <span className="text-[11px] text-hotel-slate-800/60 font-light block">
                        {formatCurrency(room.startingPrice)} /noite · Café incluso
                      </span>
                    </div>

                    <button
                      onClick={() => handleBookEngine(room.slug, room.name)}
                      className="btn-primary w-full sm:w-auto lg:w-full py-3.5 flex items-center justify-center gap-2 bg-hotel-navy-950 hover:bg-hotel-gold-600 text-white"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-hotel-gold-400" />
                      <span>Garantir Reserva Direta</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}

export default function ReservasPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-20 text-center text-sm text-hotel-slate-800">
          Carregando motor de disponibilidade...
        </div>
      }
    >
      <ReservasContent />
    </Suspense>
  );
}
