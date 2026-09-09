import React from 'react';
import type { Metadata } from 'next';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { GalleryLightbox } from '@/components/ui/GalleryLightbox';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';

const { hotelInfo, gallery } = hotelConfig;

export const metadata: Metadata = {
  title: `Galeria de Fotos do Hotel, Suítes e Gastronomia | ${hotelInfo.name}`,
  description: `Explore as imagens do ${hotelInfo.name} em Búzios. Piscina com vista mar, suítes sofisticadas, gastronomia autoral e a Praia da Ferradura.`,
};

export default function GalleryPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Galeria' }]} />

        {/* Hero Editorial */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">Galeria Fotográfica</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            Cada ângulo pensado para inspirar sua próxima viagem.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Navegue por nossas acomodações, espaços de lazer, restaurante e a natureza exuberante que envolve o hotel na enseada da Ferradura.
          </p>
        </div>

        {/* Componente Lightbox com Filtros */}
        <div className="mb-20">
          <GalleryLightbox photos={gallery} />
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
