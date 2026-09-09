import React from 'react';
import type { Metadata } from 'next';

import { MessageCircle, Phone } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';
import { getFAQSchema } from '@/lib/schema';

const { hotelInfo, faqs } = hotelConfig;

export const metadata: Metadata = {
  title: `Perguntas Frequentes (FAQ) | ${hotelInfo.name} Búzios`,
  description: `Tire suas dúvidas sobre check-in, check-out, políticas de cancelamento, café da manhã, pets, estacionamento e reservas diretas no ${hotelInfo.name}.`,
};

export default function FAQPage() {
  const faqSchema = getFAQSchema(faqs);

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Dúvidas Frequentes' }]} />

        {/* Hero Editorial */}
        <div className="py-8 sm:py-12 text-center">
          <span className="eyebrow">Central de Ajuda & Dúvidas</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            Perguntas Frequentes
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed max-w-2xl mx-auto">
            Reunimos as respostas para as principais dúvidas sobre sua estadia, horários, reservas diretas e facilidades do hotel.
          </p>
        </div>

        {/* Accordion Completo */}
        <div className="bg-white p-6 sm:p-10 border border-hotel-sand-200 shadow-sm mb-16">
          <FAQAccordion items={faqs} defaultOpenIndex={0} />
        </div>

        {/* Caixa de Suporte Humanizado */}
        <div className="bg-hotel-navy-950 text-white p-8 border border-white/10 text-center space-y-4 mb-16">
          <h3 className="font-serif text-2xl font-normal">
            Não encontrou o que procurava?
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
            Nossa equipe de concierge e recepção está à disposição 24 horas para esclarecer qualquer questão e cuidar dos seus planos de viagem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${hotelInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
            <a
              href={`tel:${hotelInfo.phone}`}
              className="btn-secondary text-white border-white/40 hover:bg-white hover:text-hotel-navy-950 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Ligar: {hotelInfo.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
