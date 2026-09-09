import React from 'react';
import type { Metadata } from 'next';
import { Users, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { EventRfpForm } from '@/components/forms/EventRfpForm';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';

const { hotelInfo, events } = hotelConfig;

export const metadata: Metadata = {
  title: `Casamentos & Eventos Corporativos em Búzios | ${hotelInfo.name}`,
  description: `Realize seu mini-wedding de frente para o mar ou sua convenção executiva no ${hotelInfo.name}. Espaços integrados, gastronomia sob medida e bloqueio de suítes.`,
};

export default function EventsPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Eventos & Casamentos' }]} />

        {/* Hero Editorial */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">{events.eyebrow}</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            O cenário inesquecível para grandes celebrações e decisões.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            {events.description}
          </p>
        </div>

        {/* Espaços Disponíveis */}
        <div className="space-y-16 mb-20">
          {events.spaces.map((space) => (
            <div
              key={space.slug}
              className="bg-white border border-hotel-sand-200/80 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 relative aspect-[16/11] overflow-hidden shadow-luxury">
                <img
                  src={space.image.url}
                  alt={space.image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-hotel-navy-950 font-normal">
                    {space.name}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-hotel-gold-700 font-medium mt-1">
                    <span>{space.areaM2} m² de área</span>
                    <span>•</span>
                    <span>Capacidade para até {space.maxCapacity} convidados</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-hotel-slate-800/85 leading-relaxed font-light">
                  {space.description}
                </p>

                {/* Formatos e Capacidades */}
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-hotel-navy-950 block">
                    Capacidades por Formato:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {space.layouts.map((layout, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-hotel-sand-50 border border-hotel-sand-200 text-xs text-hotel-slate-800"
                      >
                        <strong className="capitalize">{layout.format}:</strong> {layout.capacity} pax
                      </span>
                    ))}
                  </div>
                </div>

                {/* Infraestrutura */}
                <div className="space-y-1.5 pt-2 border-t border-hotel-sand-200 text-xs text-hotel-slate-800">
                  {space.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulário de RFP Dedicado */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="eyebrow">Solicitação de Proposta (RFP)</span>
            <h2 className="section-title mb-3">
              Planeje seu evento conosco
            </h2>
            <p className="section-subtitle mx-auto">
              Preencha os dados preliminares para receber uma cotação detalhada com plantas, menus personalizados e tarifas de grupo.
            </p>
          </div>

          <EventRfpForm />
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
