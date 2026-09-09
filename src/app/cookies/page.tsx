'use client';

import React, { useState, useEffect } from 'react';
import { hotelConfig } from '@/data/hotel.config';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Shield, Settings, CheckCircle2 } from 'lucide-react';

export default function CookiesPage() {
  const { hotelInfo } = hotelConfig;

  const [savedPrefs, setSavedPrefs] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });
  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hotel_cookie_consent');
    if (saved) {
      try {
        setSavedPrefs(JSON.parse(saved));
      } catch {
        // fallback
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('hotel_cookie_consent', JSON.stringify(savedPrefs));
    setFeedback(true);
    setTimeout(() => setFeedback(false), 3000);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-hotel-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: 'Gestão de Cookies' }]} />

        <div className="py-8 sm:py-12">
          <span className="eyebrow">Privacidade do Usuário</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-hotel-navy-950 font-normal leading-[1.15] mb-6">
            Política e Gerenciamento de Cookies (LGPD)
          </h1>
          <p className="text-base sm:text-lg text-hotel-slate-800/80 font-light leading-relaxed">
            Explicamos com transparência como utilizamos cookies para personalizar sua experiência, manter o motor de reservas seguro e analisar o tráfego de forma anônima.
          </p>
        </div>

        {/* Painel de Preferências Granular */}
        <div className="bg-white p-8 sm:p-12 border border-hotel-sand-200 shadow-sm space-y-8 mb-12">
          <div className="flex items-center justify-between pb-4 border-b border-hotel-sand-200">
            <div>
              <h2 className="font-serif text-2xl text-hotel-navy-950 font-normal">
                Suas Preferências Atuais
              </h2>
              <p className="text-xs text-hotel-slate-800/60 font-light mt-1">
                Você pode alterar ou revogar seu consentimento a qualquer momento.
              </p>
            </div>
            {feedback && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Preferências salvas com sucesso!
              </span>
            )}
          </div>

          <div className="space-y-6">
            {/* 1. Necessários */}
            <div className="p-4 bg-hotel-sand-50 border border-hotel-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-1">
                  <strong className="text-sm text-hotel-navy-950 font-medium">1. Cookies Estritamente Necessários</strong>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 uppercase font-semibold">
                    Obrigatório
                  </span>
                </div>
                <p className="text-xs text-hotel-slate-800/75 leading-relaxed font-light">
                  Fundamentais para que o site funcione corretamente, mantendo as datas selecionadas, segurança do carrinho de reservas e autenticação. Não podem ser desativados.
                </p>
              </div>
              <span className="text-xs text-hotel-slate-800/50 font-medium shrink-0">Sempre Ativo</span>
            </div>

            {/* 2. Analíticos */}
            <div className="p-4 bg-hotel-sand-50 border border-hotel-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <strong className="text-sm text-hotel-navy-950 font-medium block mb-1">
                  2. Cookies Analíticos e de Desempenho
                </strong>
                <p className="text-xs text-hotel-slate-800/75 leading-relaxed font-light">
                  Ajudam a entender como os visitantes interagem com o site, coletando métricas anônimas de páginas mais visitadas e eventuais erros de navegação.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={savedPrefs.analytics}
                  onChange={(e) => setSavedPrefs({ ...savedPrefs, analytics: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-hotel-sand-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hotel-gold-500"></div>
              </label>
            </div>

            {/* 3. Marketing */}
            <div className="p-4 bg-hotel-sand-50 border border-hotel-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <strong className="text-sm text-hotel-navy-950 font-medium block mb-1">
                  3. Cookies de Marketing & Mídia
                </strong>
                <p className="text-xs text-hotel-slate-800/75 leading-relaxed font-light">
                  Permitem exibir ofertas sazonais relevantes e medir o retorno de campanhas em redes sociais sem exibir anúncios excessivos.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={savedPrefs.marketing}
                  onChange={(e) => setSavedPrefs({ ...savedPrefs, marketing: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-hotel-sand-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hotel-gold-500"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="btn-primary py-3 px-8 text-xs tracking-wider"
            >
              Salvar Minhas Preferências de Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
