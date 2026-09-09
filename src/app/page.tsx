import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Utensils,
  Compass,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { BookingBar } from '@/components/booking/BookingBar';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';
import { RoomCard } from '@/components/rooms/RoomCard';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const { hero, about, rooms, experiences, dining, offers, location, socialProof, faqs, hotelInfo } =
    hotelConfig;

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION CINEMATOGRÁFICO COM BOOKING BAR */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 bg-hotel-navy-950 text-white overflow-hidden">
        {/* Background Image com Overlay Elegante */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero.backgroundImage.url}
            alt={hero.backgroundImage.alt}
            className="w-full h-full object-cover object-center scale-100 animate-fadeIn"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hotel-navy-950 via-hotel-navy-950/40 to-black/60" />
        </div>

        {/* Headline & Conteúdo do Hero */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto pt-6 pb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-hotel-gold-300 rounded-full border border-white/15 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {hero.tagline}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] mb-6 tracking-tight max-w-4xl mx-auto">
            {hero.headline}
          </h1>

          <p className="text-sm sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/reservas" className="btn-primary bg-hotel-gold-500 hover:bg-hotel-gold-600 text-white w-full sm:w-auto">
              <span>{hero.primaryCta}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
            <Link href="/hotel" className="btn-secondary text-white border-white/60 hover:bg-white hover:text-hotel-navy-950 w-full sm:w-auto">
              <span>{hero.secondaryCta}</span>
            </Link>
          </div>
        </div>

        {/* Booking Bar Flutuante no final do Hero */}
        <div className="relative z-20 px-4 sm:px-6 lg:px-8 -mb-6">
          <BookingBar variant="hero" />
        </div>
      </section>

      {/* 2. BENEFÍCIOS DA RESERVA DIRETA */}
      <DirectBookingBenefits />

      {/* 3. APRESENTAÇÃO EDITORIAL DO HOTEL */}
      <section className="py-20 sm:py-28 bg-hotel-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Texto Editorial */}
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow">{about.eyebrow}</span>
              <h2 className="section-title">
                {about.headline}
              </h2>
              <p className="text-sm sm:text-base text-hotel-slate-800/85 leading-relaxed font-light">
                {about.narrative}
              </p>
              <p className="text-sm text-hotel-slate-800/75 leading-relaxed font-light">
                {about.historyParagraph}
              </p>

              {/* Estatísticas Chave */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-hotel-sand-200">
                {about.stats.map((stat, i) => (
                  <div key={i}>
                    <span className="font-serif text-2xl sm:text-3xl text-hotel-navy-950 font-normal block">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-hotel-slate-800/60 font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link href="/hotel" className="btn-secondary inline-flex items-center gap-2">
                  <span>Conheça nossa história</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Imagens Editoriais em Composição */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden shadow-luxury">
                <img
                  src={about.featuredImages[0].url}
                  alt={about.featuredImages[0].alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden shadow-luxury sm:translate-y-8">
                <img
                  src={about.featuredImages[1].url}
                  alt={about.featuredImages[1].alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACOMODAÇÕES (SUÍTES & VILAS) */}
      <section className="py-20 sm:py-28 bg-white border-t border-hotel-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">Acomodações</span>
              <h2 className="section-title mb-4">
                Suítes desenhadas para a contemplação e o descanso profundo.
              </h2>
              <p className="section-subtitle">
                Espaços generosos banhados por luz natural, enxoval nobre e decks integrados à vista de Búzios.
              </p>
            </div>
            <Link href="/acomodacoes" className="btn-secondary shrink-0 inline-flex items-center gap-2 self-start md:self-auto">
              <span>Ver todas as suítes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grid de Quartos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERIÊNCIAS & BEM-ESTAR */}
      <section className="py-20 sm:py-28 bg-hotel-sand-100/40 border-t border-hotel-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">Experiências Imersivas</span>
            <h2 className="section-title mb-4">
              Mais do que hospedagem: memórias para levar pela vida.
            </h2>
            <p className="section-subtitle mx-auto">
              Da serenidade do nosso spa aos encantos de velejar por enseadas desertas, viva Búzios com autenticidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.slug}
                className="group bg-white border border-hotel-sand-200/80 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-hotel-slate-900">
                  <img
                    src={exp.image.url}
                    alt={exp.image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/90 backdrop-blur-md text-[9px] uppercase tracking-wider font-semibold text-hotel-navy-950">
                    {exp.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-hotel-navy-950 font-normal mb-2 group-hover:text-hotel-gold-700 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-hotel-slate-800/80 leading-relaxed font-light mb-4">
                      {exp.description}
                    </p>
                  </div>
                  <Link
                    href="/experiencias"
                    className="text-[11px] uppercase tracking-wider text-hotel-gold-700 font-medium inline-flex items-center gap-1 hover:text-hotel-gold-800"
                  >
                    <span>Saiba mais</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/experiencias" className="btn-primary inline-flex items-center gap-2">
              <span>Descubra todas as experiências</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. GASTRONOMIA AUTORAL */}
      <section className="py-20 sm:py-28 bg-white border-t border-hotel-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden shadow-luxury">
              <img
                src={dining[0].image.url}
                alt={dining[0].image.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow">Gastronomia de Autor</span>
              <h2 className="section-title">
                {dining[0].name}
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-hotel-gold-600">
                {dining[0].concept} · {dining[0].chef}
              </p>
              <p className="text-sm text-hotel-slate-800/85 leading-relaxed font-light">
                {dining[0].description}
              </p>

              {/* Destaques do Menu */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-hotel-navy-950">
                  Criações da Chef Heloísa:
                </h3>
                <div className="space-y-2 border-l-2 border-hotel-gold-400 pl-4 text-xs text-hotel-slate-800">
                  <p><strong>Tartar de Robalo Selvagem:</strong> Com emulsão de tangerina e brotos de coentro.</p>
                  <p><strong>Moqueca Desconstruída:</strong> Garoupa fresca, camarões rosa e farofa crocante de dendê.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link href="/gastronomia" className="btn-primary inline-flex items-center gap-2">
                  <span>Conhecer o restaurante & menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/contato" className="btn-secondary">
                  <span>Reservar mesa</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCALIZAÇÃO & DESTINO */}
      <section className="py-20 sm:py-28 bg-hotel-sand-50 border-t border-hotel-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow">{location.eyebrow}</span>
              <h2 className="section-title">
                {location.headline}
              </h2>
              <p className="text-sm text-hotel-slate-800/85 leading-relaxed font-light">
                {location.description}
              </p>

              {/* Tempos e Distâncias */}
              <div className="space-y-3 pt-2">
                {location.pointsOfInterest.slice(0, 4).map((poi, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-hotel-sand-200 text-xs">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                      <span className="font-medium text-hotel-navy-950">{poi.name}</span>
                    </div>
                    <span className="text-hotel-slate-800/60 font-light">
                      {poi.walkingMinutes ? `${poi.walkingMinutes} min a pé` : `${poi.drivingMinutes} min de carro`} ({poi.distanceKm} km)
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link href="/localizacao" className="btn-secondary inline-flex items-center gap-2">
                  <span>Ver mapa completo e rotas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Mapa Integrado */}
            <div className="lg:col-span-6 aspect-[4/3] bg-white p-2 border border-hotel-sand-200 shadow-luxury">
              <iframe
                title="Mapa de Localização do Hotel Vila Solarium"
                src={location.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. PROVA SOCIAL AUTÊNTICA */}
      <section className="py-20 sm:py-28 bg-white border-t border-hotel-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-hotel-navy-950 ml-1">
                  {socialProof.averageRating} / 5.0
                </span>
                <span className="text-xs text-hotel-slate-800/60">
                  ({socialProof.totalReviews} avaliações verificadas)
                </span>
              </div>
              <h2 className="section-title">
                A experiência contada por quem já viveu nosso refúgio.
              </h2>
            </div>

            {/* Selos de Premiação */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-hotel-sand-100/70 border border-hotel-sand-200 text-xs">
                <Award className="w-4 h-4 text-hotel-gold-600" />
                <span className="font-medium text-hotel-navy-950">TripAdvisor 2025</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialProof.testimonials.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. OFERTAS & PACOTES SAZONAIS */}
      <section className="py-20 sm:py-28 bg-hotel-sand-100/50 border-t border-hotel-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow">Condições Especiais</span>
            <h2 className="section-title mb-4">
              Pacotes exclusivos para estadias memoráveis.
            </h2>
            <p className="section-subtitle mx-auto">
              Vantagens especiais para estadias a dois, retiros de bem-estar e reservas antecipadas com cancelamento flexível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.slug}
                className="bg-white border border-hotel-sand-200 shadow-sm flex flex-col justify-between overflow-hidden group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={offer.coverImage.url}
                    alt={offer.coverImage.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-hotel-navy-950 text-white text-[10px] uppercase tracking-wider font-semibold">
                    {offer.badge}
                  </span>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-hotel-navy-950 font-normal mb-2 group-hover:text-hotel-gold-700 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-hotel-slate-800/80 leading-relaxed font-light mb-4">
                      {offer.shortDescription}
                    </p>
                    <span className="text-[11px] text-hotel-gold-700 block mb-4 font-medium">
                      {offer.validityPeriod}
                    </span>
                  </div>

                  <Link
                    href={`/ofertas/${offer.slug}`}
                    className="btn-secondary text-center text-[10px] py-3 flex items-center justify-center gap-1.5"
                  >
                    <span>Ver detalhes da oferta</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ RESUMIDO */}
      <section className="py-20 sm:py-28 bg-white border-t border-hotel-sand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow">Tire suas dúvidas</span>
            <h2 className="section-title mb-4">
              Perguntas Frequentes
            </h2>
            <p className="section-subtitle mx-auto">
              Transparência e clareza sobre horários, políticas de cancelamento, alimentação e comodidades.
            </p>
          </div>

          <FAQAccordion items={faqs.slice(0, 5)} />

          <div className="text-center mt-10">
            <Link href="/faq" className="text-xs uppercase tracking-[0.18em] text-hotel-navy-950 font-medium hover:text-hotel-gold-600 underline">
              Ver todas as dúvidas frequentes
            </Link>
          </div>
        </div>
      </section>

      {/* 11. BANNER FINAL DE CONVERSÃO & CONFIANÇA */}
      <section className="py-20 bg-hotel-navy-950 text-white border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-hotel-gold-400 font-medium">
            Pronto para viver essa experiência?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
            Reserve diretamente e garanta as melhores condições na sua estadia.
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Menor tarifa garantida, espumante de cortesia na suíte, café artesanal incluso e assistência direta com nosso concierge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/reservas" className="btn-primary bg-hotel-gold-500 hover:bg-hotel-gold-600 text-white w-full sm:w-auto">
              <span>Buscar disponibilidade de suítes</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
            <a
              href={`https://wa.me/${hotelInfo.whatsapp}?text=${encodeURIComponent(hotelInfo.whatsappWelcomeMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-white border-white/40 hover:bg-white hover:text-hotel-navy-950 w-full sm:w-auto"
            >
              <span>Falar no WhatsApp com o Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
