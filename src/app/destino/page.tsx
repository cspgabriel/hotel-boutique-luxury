import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Sun, Waves, Compass, ArrowRight } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';

const { hotelInfo, location } = hotelConfig;

export const metadata: Metadata = {
  title: `Guia do Destino: Búzios & Praia da Ferradura | ${hotelInfo.name}`,
  description: `Descubra as praias, passeios náuticos, gastronomia da Rua das Pedras e os segredos de Búzios com as recomendações de nosso concierge.`,
};

export default function DestinationPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'O Destino' }]} />

        {/* Hero Editorial do Destino */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">{location.eyebrow}</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            O charme atemporal da península mais deslumbrante do Brasil.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Mais de 20 praias de personalidades únicas, águas cristalinas, enseadas protegidas e uma atmosfera cosmopolita que encanta viajantes do mundo todo há décadas.
          </p>
        </div>

        {/* Imagem Panorâmica */}
        <div className="relative aspect-[21/9] overflow-hidden shadow-luxury mb-16 bg-hotel-slate-900">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
            alt="Praia de águas calmas em Búzios com areias claras"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Seção 1: Por que a Ferradura é Especial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <span className="eyebrow">Localização Privilegiada</span>
            <h2 className="section-title">
              A calmaria de uma baía em formato de ferradura.
            </h2>
            <p className="text-sm sm:text-base text-hotel-slate-800/85 leading-relaxed font-light">
              Diferente das praias de mar aberto voltadas para os ventos atlânticos, a Praia da Ferradura é uma enseada quase fechada por morros cobertos de vegetação nativa. Suas águas calmas, mornas e sem ondas parecem uma gigantesca piscina natural, perfeita para banhos tranquilos, stand-up paddle, caiaque e contemplação.
            </p>
            <p className="text-sm text-hotel-slate-800/80 leading-relaxed font-light">
              O Vila Solarium está situado a apenas 80 metros da areia, permitindo que você vá e venha com total comodidade, usufruindo de serviço de praia privativo sem precisar de carro ou deslocamentos complexos.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-hotel-sand-200 shadow-sm space-y-3">
              <Sun className="w-6 h-6 text-hotel-gold-600" />
              <h3 className="font-serif text-lg text-hotel-navy-950 font-normal">
                Microclima Solar
              </h3>
              <p className="text-xs text-hotel-slate-800/75 leading-relaxed font-light">
                Búzios desfruta de mais de 260 dias ensolarados ao ano, com índice pluviométrico muito inferior ao da capital do Rio de Janeiro.
              </p>
            </div>

            <div className="p-6 bg-white border border-hotel-sand-200 shadow-sm space-y-3">
              <Waves className="w-6 h-6 text-hotel-gold-600" />
              <h3 className="font-serif text-lg text-hotel-navy-950 font-normal">
                Mar Calmo & Seguro
              </h3>
              <p className="text-xs text-hotel-slate-800/75 leading-relaxed font-light">
                Ideal para casais que buscam paz e famílias com crianças que desejam relaxar sem a preocupação de correntes fortes.
              </p>
            </div>
          </div>
        </div>

        {/* Guia de Atrações & Distâncias */}
        <div className="bg-white p-8 sm:p-12 border border-hotel-sand-200 shadow-sm mb-16">
          <div className="max-w-3xl mb-8">
            <span className="eyebrow">Itinerário Recomendado</span>
            <h2 className="section-title">
              Distâncias e Pontos Imperdíveis
            </h2>
            <p className="section-subtitle">
              Tempo aproximado a partir do hotel para as principais atrações de Búzios e aeroportos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {location.pointsOfInterest.map((poi, idx) => (
              <div key={idx} className="p-5 bg-hotel-sand-50 border border-hotel-sand-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base text-hotel-navy-950 font-medium">
                    {poi.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-hotel-gold-100 text-hotel-gold-800">
                    {poi.category}
                  </span>
                </div>
                <p className="text-xs text-hotel-slate-800/75 leading-relaxed font-light">
                  {poi.description}
                </p>
                <div className="text-[11px] text-hotel-gold-700 font-medium pt-1">
                  {poi.walkingMinutes ? `${poi.walkingMinutes} min a pé` : `${poi.drivingMinutes} min de carro`} ({poi.distanceKm} km)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
