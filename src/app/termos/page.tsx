import React from 'react';
import type { Metadata } from 'next';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const { hotelInfo, policies } = hotelConfig;

export const metadata: Metadata = {
  title: `Termos de Uso e Regras de Hospedagem | ${hotelInfo.name}`,
  description: `Consulte os termos, regras de check-in, políticas de cancelamento, regras de convivência e condições contratuais do ${hotelInfo.name}.`,
};

export default function TermsPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Termos e Condições' }]} />

        <div className="py-8 sm:py-12">
          <span className="eyebrow">Normas Operacionais</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-hotel-navy-950 font-normal leading-[1.15] mb-6">
            Termos de Uso & Políticas de Hospedagem
          </h1>
          <p className="text-xs text-hotel-slate-800/60 font-light">
            Vigência: 2026 · Condições aplicáveis a todas as reservas diretas
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 border border-hotel-sand-200 shadow-sm space-y-8 text-xs sm:text-sm text-hotel-slate-800/85 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              1. Horários de Check-in e Check-out
            </h2>
            <p>
              O check-in inicia-se impreterivelmente às {hotelInfo.checkInTime} e o check-out encerra-se às {hotelInfo.checkOutTime}. Early check-in e late check-out são cortesias exclusivas para hóspedes diretos mediante consulta prévia e disponibilidade na data pretendida.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              2. Política de Cancelamento e No-Show
            </h2>
            <p>
              {policies.cancellation} O não comparecimento na data reservada (no-show) sem aviso prévio acarretará a perda do valor da primeira diária e o cancelamento das noites subsequentes para liberação do inventário.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              3. Hospedagem de Menores de Idade
            </h2>
            <p>
              Em cumprimento ao Estatuto da Criança e do Adolescente (Lei nº 8.069/90), a hospedagem de menores de 18 anos é condicionada à apresentação de documento oficial com foto e acompanhamento dos pais ou autorização legal expressa com firma reconhecida. {policies.childrenAndExtraBeds}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              4. Política de Animais de Estimação (Pet Friendly)
            </h2>
            <p>
              {policies.pets} Os tutores são responsáveis pela higiene, guia nas áreas comuns e tranquilidade do animal durante a permanência.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              5. Convivência, Silêncio e Fumo
            </h2>
            <p>
              {policies.smoking} Prezamos pela atmosfera de tranquilidade absoluta; solicita-se moderação no volume sonoro em áreas comuns a partir das 22:00.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
