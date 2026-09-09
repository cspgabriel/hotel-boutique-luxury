import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  Maximize2,
  Bed,
  Eye,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { RoomAmenitiesGrid } from '@/components/rooms/RoomAmenitiesGrid';
import { DirectBookingBenefits } from '@/components/booking/DirectBookingBenefits';
import { formatCurrency, buildWhatsAppBookingLink } from '@/lib/utils';
import { getRoomSchema } from '@/lib/schema';

interface RoomDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return hotelConfig.rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: RoomDetailPageProps): Promise<Metadata> {
  const room = hotelConfig.rooms.find((r) => r.slug === params.slug);
  if (!room) return { title: 'Acomodação não encontrada' };

  return {
    title: `${room.name} | ${hotelConfig.hotelInfo.name}`,
    description: room.shortDescription,
    openGraph: {
      title: `${room.name} — ${hotelConfig.hotelInfo.name}`,
      description: room.shortDescription,
      images: [
        {
          url: room.coverImage.url,
          width: 1200,
          height: 800,
          alt: room.coverImage.alt,
        },
      ],
    },
  };
}

export default function RoomDetailPage({ params }: RoomDetailPageProps) {
  const room = hotelConfig.rooms.find((r) => r.slug === params.slug);
  if (!room) notFound();

  const { hotelInfo } = hotelConfig;
  const roomSchema = getRoomSchema(room);
  const whatsappUrl = buildWhatsAppBookingLink(hotelInfo.whatsapp, undefined, undefined, room.maxGuests, room.name);

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      {/* Schema.org HotelRoom */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: 'Acomodações', href: '/acomodacoes' },
            { name: room.name },
          ]}
        />

        {/* Título e Tagline */}
        <div className="py-6 sm:py-8 max-w-4xl">
          <span className="eyebrow">{room.tagline}</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-hotel-navy-950 font-normal leading-tight mb-4">
            {room.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-hotel-slate-800/70 font-light">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-hotel-gold-600" />
              {room.sizeM2} m² de área privativa
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-hotel-gold-600" />
              Até {room.maxGuests} hóspedes
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-hotel-gold-600" />
              {room.bedType}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-hotel-gold-600" />
              {room.viewType}
            </span>
          </div>
        </div>

        {/* Galeria da Acomodação (Mosaico Editorial) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
          <div className="md:col-span-8 aspect-[16/10] overflow-hidden shadow-luxury bg-hotel-slate-900">
            <img
              src={room.gallery[0]?.url || room.coverImage.url}
              alt={room.gallery[0]?.alt || room.coverImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-4 flex flex-col gap-4">
            {room.gallery.slice(1, 3).map((img, i) => (
              <div key={i} className="aspect-[16/10] overflow-hidden shadow-luxury bg-hotel-slate-900">
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal & Box Lateral Flutuante de Reserva (CRO) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Coluna Esquerda: Descrição, Comodidades, Políticas */}
          <div className="lg:col-span-8 space-y-10">
            {/* Descrição Longa */}
            <div className="bg-white p-6 sm:p-10 border border-hotel-sand-200 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl text-hotel-navy-950 font-normal">
                Sobre este refúgio
              </h2>
              <p className="text-sm sm:text-base text-hotel-slate-800/85 leading-relaxed font-light">
                {room.fullDescription}
              </p>

              {/* Pontos de Destaque */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-hotel-sand-200">
                {room.highlightPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-hotel-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comodidades Completas */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-hotel-navy-950 font-normal">
                Comodidades & Confortos da Suíte
              </h2>
              <RoomAmenitiesGrid amenities={room.amenities} />
            </div>

            {/* Políticas Relevantes da Acomodação */}
            <div className="bg-white p-6 sm:p-8 border border-hotel-sand-200 shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-hotel-navy-950 font-normal">
                Políticas da Acomodação
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-hotel-slate-800/80 font-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-hotel-gold-500 mt-2 shrink-0" />
                  <span><strong>Cancelamento:</strong> {room.cancellationPolicy}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-hotel-gold-500 mt-2 shrink-0" />
                  <span><strong>Horários:</strong> Check-in a partir das {hotelInfo.checkInTime} | Check-out até às {hotelInfo.checkOutTime}.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-hotel-gold-500 mt-2 shrink-0" />
                  <span><strong>Não Fumantes:</strong> Ambiente 100% livre de fumaça.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Coluna Direita: Caixa de Conversão Direta (Sticky Booking Box) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white border-2 border-hotel-gold-400 p-6 sm:p-8 shadow-luxury">
              <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-hotel-sand-200">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-hotel-slate-800/60 block">Diária a partir de</span>
                  <span className="font-serif text-3xl text-hotel-navy-950 font-medium">
                    {formatCurrency(room.startingPrice)}
                  </span>
                  <span className="text-xs text-hotel-slate-800/60 font-light"> /noite</span>
                </div>
                <span className="px-2.5 py-1 bg-hotel-gold-100 text-hotel-gold-800 text-[10px] uppercase tracking-wider font-semibold">
                  Melhor Tarifa
                </span>
              </div>

              {/* Benefício Exclusivo da Reserva Direta */}
              <div className="bg-hotel-sand-50 p-3.5 mb-6 border border-hotel-sand-200 text-xs text-hotel-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-hotel-gold-700 font-medium">
                  <Sparkles className="w-4 h-4 text-hotel-gold-600 shrink-0" />
                  <span>Incluso na Reserva Direta:</span>
                </div>
                <p className="text-[11px] text-hotel-slate-800/80 font-light">
                  {room.directBookingPerk}
                </p>
                <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Garantia de menor preço sem taxas extras</span>
                </div>
              </div>

              {/* Ações de Reserva */}
              <div className="space-y-3">
                <Link
                  href={`/reservas?room=${room.slug}`}
                  className="btn-primary w-full py-4 text-center flex items-center justify-center gap-2 bg-hotel-navy-950 hover:bg-hotel-gold-600 text-white shadow-md"
                >
                  <Calendar className="w-4 h-4 text-hotel-gold-400" />
                  <span>Reservar Esta Suíte</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-medium tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Consultar via WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-hotel-slate-800/50 text-center font-light mt-4">
                Confirmação imediata e suporte humanizado antes e durante sua viagem.
              </p>
            </div>
          </div>
        </div>
      </div>

      <DirectBookingBenefits />
    </div>
  );
}
