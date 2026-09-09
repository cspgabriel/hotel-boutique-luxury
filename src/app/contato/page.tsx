import React from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ContactForm } from '@/components/forms/ContactForm';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';

const { hotelInfo, location } = hotelConfig;

export const metadata: Metadata = {
  title: `Contato, Reservas & Concierge | ${hotelInfo.name} Búzios`,
  description: `Fale diretamente com nossa equipe de concierge e reservas. Telefone, WhatsApp, e-mail, mapa e formulário de atendimento do ${hotelInfo.name}.`,
};

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Contato' }]} />

        {/* Hero Editorial */}
        <div className="py-8 sm:py-12 max-w-3xl">
          <span className="eyebrow">Atendimento Dedicado</span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-hotel-navy-950 font-normal leading-[1.12] mb-6">
            Estamos prontos para receber você.
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Dúvidas sobre acomodações, reservas de mesa no restaurante ou roteiros personalizados em Búzios? Fale diretamente com nossa recepção e concierge.
          </p>
        </div>

        {/* Grid de Contato: Formulário + Dados Diretos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Formulário */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-2xl text-hotel-navy-950 font-normal mb-6">
              Envie uma mensagem
            </h2>
            <ContactForm />
          </div>

          {/* Dados de Contato e Horários */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 sm:p-8 border border-hotel-sand-200 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl text-hotel-navy-950 font-normal">
                Canais Diretos
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-hotel-slate-800 font-light">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${hotelInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/70 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-900 font-medium">WhatsApp VIP / Reservas:</strong>
                    <span>{hotelInfo.whatsappFormatted}</span>
                  </div>
                </a>

                {/* Telefone */}
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="flex items-start gap-3 p-3 bg-hotel-sand-50 border border-hotel-sand-200 hover:border-hotel-gold-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-hotel-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-hotel-navy-950 font-medium">Telefone da Recepção:</strong>
                    <span>{hotelInfo.phoneFormatted}</span>
                  </div>
                </a>

                {/* E-mails */}
                <div className="flex items-start gap-3 p-3 bg-hotel-sand-50 border border-hotel-sand-200">
                  <Mail className="w-5 h-5 text-hotel-gold-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div>
                      <strong className="block text-hotel-navy-950 font-medium">Reservas de Suítes:</strong>
                      <a href={`mailto:${hotelInfo.emailReservas}`} className="hover:text-hotel-gold-600">
                        {hotelInfo.emailReservas}
                      </a>
                    </div>
                    <div>
                      <strong className="block text-hotel-navy-950 font-medium">Eventos & Casamentos:</strong>
                      <a href={`mailto:${hotelInfo.emailEventos}`} className="hover:text-hotel-gold-600">
                        {hotelInfo.emailEventos}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start gap-3 p-3 bg-hotel-sand-50 border border-hotel-sand-200">
                  <MapPin className="w-5 h-5 text-hotel-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-hotel-navy-950 font-medium">Endereço:</strong>
                    <span className="leading-relaxed">{hotelInfo.fullAddress}</span>
                  </div>
                </div>

                {/* Horários */}
                <div className="flex items-start gap-3 p-3 bg-hotel-sand-50 border border-hotel-sand-200">
                  <Clock className="w-5 h-5 text-hotel-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-hotel-navy-950 font-medium">Horários de Atendimento:</strong>
                    <span>Recepção e Concierge: 24 horas todos os dias.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa Embutido */}
        <div className="aspect-[21/9] w-full bg-white p-2 border border-hotel-sand-200 shadow-luxury mb-16">
          <iframe
            title="Localização do Hotel no Mapa"
            src={location.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
