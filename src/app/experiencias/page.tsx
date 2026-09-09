import React from 'react';
import type { Metadata } from 'next';

import { Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';

const { hotelInfo, experiences } = hotelConfig;

export const metadata: Metadata = {
  title: `Experiências, Spa & Bem-Estar em Búzios | ${hotelInfo.name}`,
  description: `Viva momentos inesquecíveis: Spa holístico, piscina aquecida de borda infinita, passeios privativos de veleiro e yoga matinal na Ferradura.`,
};

export default function ExperiencesPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Experiências' }]} />

        {/* Hero da Seção */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">Momentos Sob Medida</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            O tempo desacelera para você se reconectar com o que importa.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Criamos uma curadoria de vivências imersivas pensadas para despertar os sentidos, relaxar profundamente o corpo e revelar os recantos mais deslumbrantes de Búzios.
          </p>
        </div>

        {/* Lista de Experiências Editoriais */}
        <div className="space-y-16 mb-20">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={exp.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-hotel-sand-200/80 p-6 sm:p-10 shadow-sm"
              >
                <div
                  className={`lg:col-span-6 relative aspect-[16/11] overflow-hidden shadow-luxury ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={exp.image.url}
                    alt={exp.image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-hotel-navy-950 text-white text-[10px] uppercase tracking-wider font-semibold">
                    {exp.category}
                  </span>
                </div>

                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-hotel-gold-600 block mb-1">
                      {exp.subtitle}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-hotel-navy-950 font-normal">
                      {exp.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-hotel-slate-800/85 leading-relaxed font-light">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-hotel-navy-950 block">
                      O que está incluso:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-hotel-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Horários */}
                  {exp.schedule && (
                    <div className="flex items-center gap-2 text-xs text-hotel-slate-800/70 border-t border-hotel-sand-200 pt-3">
                      <Clock className="w-4 h-4 text-hotel-gold-600" />
                      <span>{exp.schedule}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/${hotelInfo.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de agendar ou saber mais sobre a experiência: ${exp.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Agendar com o Concierge</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
