import React from 'react';
import type { Metadata } from 'next';
import { MapPin, Navigation, Car, Plane, MessageCircle } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';

const { hotelInfo, location } = hotelConfig;

export const metadata: Metadata = {
  title: `Localização & Como Chegar | ${hotelInfo.name} Búzios`,
  description: `Saiba como chegar ao ${hotelInfo.name} na Praia da Ferradura em Búzios. Rotas de carro, serviço de transfer privativo dos aeroportos e mapa interativo.`,
};

export default function LocationPage() {
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotelInfo.name}, ${hotelInfo.fullAddress}`
  )}`;

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Localização' }]} />

        {/* Hero Editorial */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">Localização Exclusiva</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            Como chegar ao seu refúgio na Ferradura.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Localizado a 80 metros do mar calmo da Praia da Ferradura e a apenas 7 minutos da icônica Rua das Pedras. Veja como chegar com facilidade.
          </p>
        </div>

        {/* Informações de Endereço e Botões de Rota */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center bg-white p-6 sm:p-8 border border-hotel-sand-200 shadow-sm">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-hotel-gold-700">
              <MapPin className="w-5 h-5 shrink-0" />
              <span className="text-xs uppercase tracking-wider font-semibold">Endereço Oficial:</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-hotel-navy-950 font-normal">
              {hotelInfo.fullAddress}
            </p>
            <p className="text-xs text-hotel-slate-800/60 font-mono">
              Coordenadas GPS: {hotelInfo.coordinates.latitude}, {hotelInfo.coordinates.longitude}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-3.5 text-center flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Abrir no Google Maps</span>
            </a>
            <a
              href={`https://wa.me/${hotelInfo.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de agendar o transfer privativo do hotel para minha chegada.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-3.5 text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Agendar Transfer do Hotel</span>
            </a>
          </div>
        </div>

        {/* Mapa Interativo Full */}
        <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-white p-2 border border-hotel-sand-200 shadow-luxury mb-16">
          <iframe
            title="Mapa Oficial do Vila Solarium Boutique Hotel"
            src={location.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Guias de Rota */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 border border-hotel-sand-200 shadow-sm space-y-4">
            <div className="p-3 bg-hotel-sand-50 w-fit text-hotel-gold-600">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-hotel-navy-950 font-normal">
              A partir do Rio de Janeiro
            </h3>
            <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light">
              Cerca de 175 km (aproximadamente 2h30). Saída pela Ponte Rio-Niterói, seguindo pela BR-101 até Rio Bonito e depois pela Via Lagos (RJ-124) com asfalto duplicado e excelente sinalização até Búzios.
            </p>
          </div>

          <div className="bg-white p-8 border border-hotel-sand-200 shadow-sm space-y-4">
            <div className="p-3 bg-hotel-sand-50 w-fit text-hotel-gold-600">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-hotel-navy-950 font-normal">
              Aeroporto de Cabo Frio (CFB)
            </h3>
            <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light">
              Localizado a apenas 31 km do hotel (40 minutos). Oferece voos comerciais diretos de Belo Horizonte e São Paulo em alta temporada e opera jatos executivos com hangaragem.
            </p>
          </div>

          <div className="bg-white p-8 border border-hotel-sand-200 shadow-sm space-y-4">
            <div className="p-3 bg-hotel-sand-50 w-fit text-hotel-gold-600">
              <Navigation className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-hotel-navy-950 font-normal">
              Transfer e Heliponto
            </h3>
            <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light">
              Oferecemos transfer privativo em vans e SUVs executivos blindados a partir do GIG e SDU. Voos de helicóptero para o Heliponto de Búzios levam apenas 35 minutos a partir da capital.
            </p>
          </div>
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
