import React from 'react';
import type { Metadata } from 'next';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { RoomCard } from '@/components/rooms/RoomCard';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';
import { Sparkles, ShieldCheck } from 'lucide-react';

const { hotelInfo, rooms } = hotelConfig;

export const metadata: Metadata = {
  title: `Acomodações & Suítes de Luxo em Búzios | ${hotelInfo.name}`,
  description: `Descubra nossas 24 suítes e vilas exclusivas na Ferradura. Vista mar panorâmica, piscinas privativas, camas King Size e enxoval de 400 fios.`,
};

export default function RoomsPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Acomodações' }]} />

        {/* Cabeçalho Editorial */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">Acomodações & Refúgios</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            O conforto absoluto desenhado em sintonia com o mar.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Cada suíte foi concebida para oferecer privacidade, amplitude e integração sensorial com a natureza da Ferradura. Escolha o refúgio perfeito para seus dias de descanso.
          </p>
        </div>

        {/* Selo Informativo de Reserva Direta */}
        <div className="mb-12 p-4 bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Garantia de Menor Tarifa:</strong> Reservando diretamente em nosso site oficial, você recebe 10% de desconto adicional comparado a qualquer OTA e espumante de boas-vindas na sua suíte.
            </span>
          </div>
        </div>

        {/* Grid de Acomodações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </div>

      {/* Seção de Vantagens da Reserva Direta */}
      <DirectBookingBenefits />
    </div>
  );
}
