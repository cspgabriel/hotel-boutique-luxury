import React from 'react';
import Link from 'next/link';
import { Compass, Home, Bed, ArrowRight } from 'lucide-react';
import { hotelConfig } from '@/data/hotel.config';

export default function NotFound() {
  const { hotelInfo } = hotelConfig;

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-16 bg-hotel-sand-50 px-4">
      <div className="max-w-lg w-full bg-white p-8 sm:p-12 border border-hotel-sand-200 shadow-luxury text-center space-y-6">
        <div className="w-16 h-16 bg-hotel-sand-100 text-hotel-gold-600 rounded-full flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-hotel-gold-600 block mb-2">
            Erro 404 · Página não encontrada
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-hotel-navy-950 font-normal leading-tight">
            Parece que você navegou para águas desconhecidas.
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light">
          A página ou suíte que você estava procurando pode ter mudado de endereço ou não está mais disponível temporariamente.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="btn-primary w-full sm:w-auto py-3 px-6 flex items-center justify-center gap-2 text-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Voltar ao hotel</span>
          </Link>

          <Link
            href="/acomodacoes"
            className="btn-secondary w-full sm:w-auto py-3 px-6 flex items-center justify-center gap-2 text-xs"
          >
            <Bed className="w-3.5 h-3.5" />
            <span>Ver acomodações</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-hotel-sand-200">
          <p className="text-xs text-hotel-slate-800/60 font-light">
            Precisa de ajuda com uma reserva?{' '}
            <a
              href={`https://wa.me/${hotelInfo.whatsapp}`}
              className="text-hotel-gold-700 underline hover:text-hotel-gold-800"
            >
              Fale com nosso Concierge no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
