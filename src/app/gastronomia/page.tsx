import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Utensils } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';
import { getRestaurantSchema } from '@/lib/schema';

const { hotelInfo, dining } = hotelConfig;

export const metadata: Metadata = {
  title: `Gastronomia Autoral & Restaurante Maresia em Búzios | ${hotelInfo.name}`,
  description: `Sabores do oceano e culinária costeira contemporânea pela Chef Heloísa Prado. Café da manhã artesanal, bar de coquetéis e adega selecionada.`,
};

export default function GastronomyPage() {
  const restaurantSchema = getRestaurantSchema();
  const restaurant = dining[0];
  const bar = dining[1];

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Gastronomia' }]} />

        {/* Hero Editorial */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">Gastronomia de Origem</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            A celebração dos frutos do mar e da terra em Búzios.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Uma jornada gastronômica que une o frescor do peixe trazido diariamente por pescadores locais à sofisticação da alta culinária contemporânea brasileira.
          </p>
        </div>

        {/* Espaço 1: Restaurante Maresia */}
        <div className="bg-white border border-hotel-sand-200/80 p-6 sm:p-12 shadow-sm mb-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/11] overflow-hidden shadow-luxury">
              <img
                src={restaurant.image.url}
                alt={restaurant.image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="eyebrow">{restaurant.chef}</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-hotel-navy-950 font-normal">
                  {restaurant.name}
                </h2>
                <p className="text-xs uppercase tracking-wider text-hotel-gold-600 font-medium mt-1">
                  {restaurant.concept}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-hotel-slate-800/85 leading-relaxed font-light">
                {restaurant.description}
              </p>

              {/* Horários */}
              <div className="bg-hotel-sand-50 p-4 border border-hotel-sand-200 space-y-2 text-xs">
                <span className="font-semibold text-hotel-navy-950 uppercase tracking-wider block text-[10px]">
                  Horários de Funcionamento:
                </span>
                {restaurant.hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between text-hotel-slate-800">
                    <span className="font-medium">{h.title}:</span>
                    <span className="font-light">{h.time}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={`https://wa.me/${hotelInfo.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de fazer uma reserva de mesa no Restaurante Maresia.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Reservar Mesa</span>
                </a>
                <Link href="/contato" className="btn-secondary">
                  <span>Falar com o Maître</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Destaques do Cardápio */}
          <div className="pt-8 border-t border-hotel-sand-200">
            <h3 className="font-serif text-2xl text-hotel-navy-950 font-normal mb-8 text-center">
              Seleção de Pratos em Destaque
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {restaurant.menuHighlights.map((cat, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-hotel-gold-700 pb-2 border-b border-hotel-sand-200">
                    {cat.category}
                  </h4>
                  <div className="space-y-4">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="space-y-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-serif text-sm font-medium text-hotel-navy-950">
                            {item.name}
                          </span>
                          {item.price && (
                            <span className="text-xs text-hotel-gold-700 font-mono font-medium">
                              {item.price}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-hotel-slate-800/70 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Espaço 2: Bar & Adega */}
        <div className="bg-white border border-hotel-sand-200/80 p-6 sm:p-12 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 lg:order-1">
              <div>
                <span className="eyebrow">Sunset & Lounge</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-hotel-navy-950 font-normal">
                  {bar.name}
                </h2>
                <p className="text-xs uppercase tracking-wider text-hotel-gold-600 font-medium mt-1">
                  {bar.concept}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-hotel-slate-800/85 leading-relaxed font-light">
                {bar.description}
              </p>

              {/* Coquetéis de Destaque */}
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-hotel-navy-950 block">
                  Criações da Nossa Coquetelaria:
                </span>
                {bar.menuHighlights[0]?.items.map((drink, i) => (
                  <div key={i} className="p-3 bg-hotel-sand-50 border border-hotel-sand-200">
                    <div className="flex items-center justify-between text-xs font-medium text-hotel-navy-950">
                      <span>{drink.name}</span>
                      <span className="text-hotel-gold-700">{drink.price}</span>
                    </div>
                    <p className="text-[11px] text-hotel-slate-800/70 mt-0.5 font-light">
                      {drink.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/11] overflow-hidden shadow-luxury lg:order-2">
              <img
                src={bar.image.url}
                alt={bar.image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
