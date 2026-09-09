import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';

const { hotelInfo, offers } = hotelConfig;

export const metadata: Metadata = {
  title: `Pacotes Exclusivos & Ofertas Especiais | ${hotelInfo.name}`,
  description: `Aproveite as ofertas do ${hotelInfo.name} em Búzios. Pacotes românticos, desconto de reserva antecipada e retiros de bem-estar com café incluso.`,
};

export default function OffersPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Ofertas' }]} />

        {/* Hero Editorial */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">Ofertas Exclusivas do Site</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            Condições privilegiadas para momentos inesquecíveis.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Pacotes desenhados com benefícios especiais que você só encontra reservando diretamente pelo nosso canal oficial.
          </p>
        </div>

        {/* Grid de Ofertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {offers.map((offer) => (
            <article
              key={offer.slug}
              className="bg-white border border-hotel-sand-200/80 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-hotel-slate-900">
                <img
                  src={offer.coverImage.url}
                  alt={offer.coverImage.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-hotel-navy-950 text-white text-[10px] uppercase tracking-wider font-semibold">
                  {offer.badge}
                </span>
                {offer.discountPercentage && (
                  <span className="absolute bottom-4 right-4 px-3 py-1 bg-hotel-gold-500 text-white text-xs font-bold font-mono">
                    {offer.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif text-xl text-hotel-navy-950 font-normal mb-3 group-hover:text-hotel-gold-700 transition-colors">
                    <Link href={`/ofertas/${offer.slug}`}>{offer.title}</Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light mb-4">
                    {offer.shortDescription}
                  </p>

                  <div className="space-y-1.5 py-3 border-t border-hotel-sand-200 text-xs text-hotel-slate-800/70 font-light">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-hotel-gold-600" />
                      <span>{offer.validityPeriod}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/ofertas/${offer.slug}`}
                    className="btn-primary w-full py-3.5 text-center flex items-center justify-center gap-2"
                  >
                    <span>Conhecer Pacote & Reservar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
