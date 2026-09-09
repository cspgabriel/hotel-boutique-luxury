import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';
import { formatCurrency } from '@/lib/utils';

interface OfferDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return hotelConfig.offers.map((offer) => ({
    slug: offer.slug,
  }));
}

export async function generateMetadata({ params }: OfferDetailPageProps): Promise<Metadata> {
  const offer = hotelConfig.offers.find((o) => o.slug === params.slug);
  if (!offer) return { title: 'Oferta não encontrada' };

  return {
    title: `${offer.title} | ${hotelConfig.hotelInfo.name}`,
    description: offer.shortDescription,
  };
}

export default function OfferDetailPage({ params }: OfferDetailPageProps) {
  const offer = hotelConfig.offers.find((o) => o.slug === params.slug);
  if (!offer) notFound();

  const { hotelInfo } = hotelConfig;
  const whatsappUrl = `https://wa.me/${hotelInfo.whatsapp}?text=${encodeURIComponent(
    `Olá! Gostaria de reservar o pacote promocional: *${offer.title}* com código *${offer.promoCode || 'DIRETO'}*.`
  )}`;

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: 'Ofertas', href: '/ofertas' },
            { name: offer.title },
          ]}
        />

        {/* Hero da Oferta */}
        <div className="py-6 sm:py-8 max-w-4xl">
          <span className="eyebrow">{offer.badge}</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-hotel-navy-950 font-normal leading-tight mb-4">
            {offer.title}
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            {offer.shortDescription}
          </p>
        </div>

        {/* Imagem de Capa e Box de Conversão */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="relative aspect-[16/10] overflow-hidden shadow-luxury bg-hotel-slate-900">
              <img
                src={offer.coverImage.url}
                alt={offer.coverImage.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Descrição Completa */}
            <div className="bg-white p-6 sm:p-10 border border-hotel-sand-200 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl text-hotel-navy-950 font-normal">
                Detalhes do Pacote
              </h2>
              <p className="text-sm sm:text-base text-hotel-slate-800/85 leading-relaxed font-light">
                {offer.fullDescription}
              </p>

              {/* O que está incluso */}
              <div className="pt-4 border-t border-hotel-sand-200 space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-hotel-navy-950">
                  O que está incluso neste pacote:
                </h3>
                <div className="space-y-2">
                  {offer.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-hotel-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-hotel-gold-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Termos e Condições */}
              <div className="pt-4 border-t border-hotel-sand-200 space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-hotel-slate-800/70">
                  Condições da Oferta:
                </h3>
                <ul className="list-disc list-inside text-xs text-hotel-slate-800/60 font-light space-y-1">
                  {offer.terms.map((term, i) => (
                    <li key={i}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Box de Reserva da Oferta */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white border-2 border-hotel-gold-400 p-6 sm:p-8 shadow-luxury space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-hotel-slate-800/60 block mb-1">
                  Período e Validade
                </span>
                <p className="text-xs text-hotel-slate-800 font-medium">
                  {offer.validityPeriod}
                </p>
              </div>

              {offer.startingPrice && (
                <div className="py-3 border-y border-hotel-sand-200">
                  <span className="text-[10px] uppercase tracking-wider text-hotel-slate-800/60 block">Pacote a partir de</span>
                  <span className="font-serif text-3xl text-hotel-navy-950 font-medium">
                    {formatCurrency(offer.startingPrice)}
                  </span>
                </div>
              )}

              {offer.promoCode && (
                <div className="bg-hotel-sand-50 p-3 border border-hotel-sand-200 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-hotel-slate-800/70 block mb-1">
                    Código Promocional:
                  </span>
                  <span className="font-mono text-sm font-bold tracking-widest text-hotel-gold-700">
                    {offer.promoCode}
                  </span>
                </div>
              )}

              <div className="space-y-3">
                <Link
                  href={`/reservas?promo=${offer.promoCode || ''}`}
                  className="btn-primary w-full py-4 text-center flex items-center justify-center gap-2 bg-hotel-navy-950 hover:bg-hotel-gold-600 text-white"
                >
                  <Calendar className="w-4 h-4 text-hotel-gold-400" />
                  <span>Reservar Oferta Agora</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-medium tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Reservar pelo WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
