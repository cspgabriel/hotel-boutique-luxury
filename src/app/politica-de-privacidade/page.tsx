import React from 'react';
import type { Metadata } from 'next';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const { hotelInfo } = hotelConfig;

export const metadata: Metadata = {
  title: `Política de Privacidade e Proteção de Dados (LGPD) | ${hotelInfo.name}`,
  description: `Saiba como o ${hotelInfo.name} coleta, utiliza e protege seus dados pessoais em estrita conformidade com a LGPD (Lei nº 13.709/2018).`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Política de Privacidade' }]} />

        <div className="py-8 sm:py-12">
          <span className="eyebrow">Segurança & Transparência</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-hotel-navy-950 font-normal leading-[1.15] mb-6">
            Política de Privacidade e Proteção de Dados (LGPD)
          </h1>
          <p className="text-xs text-hotel-slate-800/60 font-light">
            Última atualização: Setembro de 2026 · Em conformidade com a Lei Federal nº 13.709/2018 (LGPD)
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 border border-hotel-sand-200 shadow-sm space-y-8 text-xs sm:text-sm text-hotel-slate-800/85 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              1. Identificação do Controlador
            </h2>
            <p>
              O <strong>{hotelInfo.legalName}</strong>, inscrito no CNPJ sob o nº {hotelInfo.cnpj}, com sede em {hotelInfo.fullAddress}, é o Controlador dos dados pessoais tratados através deste website e de nossos canais diretos de atendimento e reserva.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              2. Dados Coletados e Finalidade do Tratamento
            </h2>
            <p>
              Coletamos apenas os dados estritamente necessários para a prestação dos serviços de hotelaria de alto padrão:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Dados de Identificação e Contato:</strong> Nome completo, e-mail, telefone/WhatsApp, CPF/Passaporte e endereço, utilizados para formalizar reservas, emissão de Nota Fiscal Eletrônica e cumprimento das normas da EMBRATUR (Ficha Nacional de Registro de Hóspedes - FNRH).</li>
              <li><strong>Dados de Pagamento:</strong> Processados em ambiente criptografado por gateways de pagamento certificados (PCI-DSS) para efetivação de pré-autorizações e quitações de diárias.</li>
              <li><strong>Preferências de Estadia:</strong> Informações de restrições alimentares, solicitações de berço ou datas comemorativas, coletadas com seu consentimento para personalizar sua experiência.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              3. Compartilhamento Seguro de Dados
            </h2>
            <p>
              Não comercializamos nem compartilhamos seus dados pessoais com terceiros para fins de monetização externa. O compartilhamento ocorre apenas quando indispensável:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Com o motor de reservas e operadoras de cartões para liquidação financeira da hospedagem;</li>
              <li>Com órgãos governamentais e fazendários para cumprimento de obrigação legal ou fiscal;</li>
              <li>Com prestadores de serviços tecnológicos sob rigorosos contratos de sigilo e conformidade.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              4. Seus Direitos como Titular de Dados
            </h2>
            <p>
              Em respeito ao artigo 18 da LGPD, você pode, a qualquer momento, solicitar a confirmação do tratamento, acesso aos dados, correção de informações incompletas ou revogação de consentimento para comunicações promocionais, através do e-mail oficial: <a href={`mailto:${hotelInfo.emailGeral}`} className="text-hotel-gold-700 underline">{hotelInfo.emailGeral}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-hotel-navy-950 font-normal">
              5. Segurança da Informação
            </h2>
            <p>
              Adotamos medidas técnicas e administrativas aptas a proteger seus dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas de destruição, perda ou alteração, com tráfego 100% criptografado via protocolo HTTPS/SSL.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
