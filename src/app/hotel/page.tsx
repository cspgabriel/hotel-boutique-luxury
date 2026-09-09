import React from 'react';
import type { Metadata } from 'next';

import { Leaf, Sparkles, HeartHandshake } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';

const { hotelInfo, about } = hotelConfig;

export const metadata: Metadata = {
  title: `Sobre o Hotel — Nossa História e Filosofia | ${hotelInfo.name}`,
  description: `Conheça a história, arquitetura integrada e filosofia de hospitalidade sustentável do ${hotelInfo.name} em ${hotelInfo.destinationName}.`,
};

export default function HotelPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'O Hotel' }]} />

        {/* Hero Editorial da Página Sobre */}
        <div className="py-8 sm:py-12 max-w-4xl">
          <span className="eyebrow">{about.eyebrow}</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            Um santuário onde a brisa do oceano desacelera o ritmo do mundo.
          </h1>
          <p className="text-base sm:text-xl text-hotel-slate-800/80 font-light leading-relaxed">
            {about.narrative}
          </p>
        </div>

        {/* Imagem de Destaque com Proporção Ampla */}
        <div className="relative aspect-[21/9] overflow-hidden shadow-luxury mb-16 bg-hotel-slate-900">
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=85"
            alt="Espaços de descanso e jardins integrados à costeira de Búzios"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Narrativa Histórica e Pilares */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 py-8 border-b border-hotel-sand-200">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-hotel-gold-600 font-semibold block">
              Origem & Propósito
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-hotel-navy-950 font-normal">
              A essência autêntica de Búzios preservada em cada traço.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm text-hotel-slate-800/85 leading-relaxed font-light">
            <p>
              {about.historyParagraph}
            </p>
            <p>
              Acreditamos que o verdadeiro luxo contemporâneo não reside no excesso ou na ostentação fria, mas no tempo de qualidade, no silêncio restaurador, na brisa que entra desimpedida pelas amplas janelas de madeira e no acolhimento caloroso de quem tem paixão genuína por receber.
            </p>
            <p>
              Nossa equipe é formada majoritariamente por talentos nascidos ou radicados na Região dos Lagos, trazendo para cada gesto a simpatia e o conhecimento íntimo das enseadas, das marés e das histórias que tornam este balneário um patrimônio afetivo de viajantes do mundo inteiro.
            </p>
          </div>
        </div>

        {/* Os 3 Pilares Fundamentais */}
        <div className="py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Nossos Valores</span>
            <h3 className="section-title">
              Os pilares que guiam nossa hospitalidade
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-hotel-sand-200 shadow-sm space-y-4">
              <div className="p-3 bg-hotel-sand-50 w-fit text-hotel-gold-600">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-hotel-navy-950 font-normal">
                Sustentabilidade Costeira
              </h4>
              <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light">
                Autossuficiência parcial via energia fotovoltaica, banimento de plásticos de uso único, estação de compostagem orgânica e proteção integral da restinga nativa.
              </p>
            </div>

            <div className="bg-white p-8 border border-hotel-sand-200 shadow-sm space-y-4">
              <div className="p-3 bg-hotel-sand-50 w-fit text-hotel-gold-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-hotel-navy-950 font-normal">
                Atenção aos Detalhes
              </h4>
              <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light">
                Do menu de travesseiros com 3 densidades diferentes aos amenities orgânicos formulados com óleos essenciais da Mata Atlântica e cerâmicas artesanais moldadas à mão.
              </p>
            </div>

            <div className="bg-white p-8 border border-hotel-sand-200 shadow-sm space-y-4">
              <div className="p-3 bg-hotel-sand-50 w-fit text-hotel-gold-600">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-hotel-navy-950 font-normal">
                Hospitalidade Humanizada
              </h4>
              <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light">
                Tratamento atencioso e individualizado pelo nome. Nosso concierge antecipa suas preferências antes mesmo de você desempacotar suas malas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefícios e CTA */}
      <DirectBookingBenefits />
    </div>
  );
}
