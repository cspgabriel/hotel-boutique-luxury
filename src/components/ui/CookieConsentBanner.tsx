'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Settings, X } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('hotel_cookie_consent');
    if (!saved) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('hotel_cookie_consent', JSON.stringify(prefs));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md md:max-w-lg z-50 bg-white border border-hotel-sand-300 shadow-2xl p-4 sm:p-5 animate-slideUp text-hotel-slate-900"
      role="region"
      aria-label="Consentimento de Cookies e Privacidade"
    >
      {!showPreferences ? (
        /* Visão Compacta Flutuante — Não obstrui o conteúdo da página */
        <div className="space-y-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-hotel-navy-950 font-medium text-xs sm:text-sm">
              <Shield className="w-4 h-4 text-hotel-gold-600 shrink-0" />
              <span>Privacidade & Cookies (LGPD)</span>
            </div>
            <button
              onClick={handleRejectNonEssential}
              className="p-1 text-hotel-slate-400 hover:text-hotel-slate-700 transition-colors"
              aria-label="Dispensar cookies opcionais"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-hotel-slate-800 leading-relaxed font-normal">
            Utilizamos cookies para assegurar o funcionamento das reservas e analisar visitas de forma anônima.{' '}
            <Link href="/cookies" className="text-hotel-gold-700 underline font-medium hover:text-hotel-gold-800">
              Política de Cookies
            </Link>.
          </p>

          {/* Botões com Pesos Equilibrados — Sem Dark Patterns */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={handleRejectNonEssential}
              className="px-2 py-2 text-[11px] font-medium border border-hotel-sand-300 bg-hotel-sand-50 hover:bg-hotel-sand-100 text-hotel-slate-900 transition-colors text-center"
            >
              Apenas Essenciais
            </button>

            <button
              onClick={() => setShowPreferences(true)}
              className="px-2 py-2 text-[11px] font-medium border border-hotel-sand-300 bg-white hover:bg-hotel-sand-50 text-hotel-slate-900 transition-colors text-center"
            >
              Personalizar
            </button>

            <button
              onClick={handleAcceptAll}
              className="px-2 py-2 text-[11px] font-medium border border-hotel-navy-950 bg-hotel-navy-950 hover:bg-hotel-navy-900 text-white transition-colors text-center"
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      ) : (
        /* Modal Compacto de Configuração Granular */
        <div className="space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-hotel-sand-200">
            <span className="text-xs font-semibold text-hotel-navy-950 flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-hotel-gold-600" />
              Preferências de Cookies
            </span>
            <button
              onClick={() => setShowPreferences(false)}
              className="p-1 text-hotel-slate-400 hover:text-hotel-slate-700"
              aria-label="Voltar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-[11px]">
            {/* Necessários */}
            <div className="p-2 bg-hotel-sand-50 border border-hotel-sand-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-hotel-navy-950 block">Necessários</span>
                <span className="text-hotel-slate-600">Essenciais para reservas e segurança.</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold uppercase">Ativo</span>
            </div>

            {/* Analíticos */}
            <div className="p-2 bg-hotel-sand-50 border border-hotel-sand-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-hotel-navy-950 block">Estatísticas</span>
                <span className="text-hotel-slate-600">Medição de audiência anônima.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 text-hotel-gold-600 focus:ring-hotel-gold-500 rounded cursor-pointer"
              />
            </div>

            {/* Marketing */}
            <div className="p-2 bg-hotel-sand-50 border border-hotel-sand-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-hotel-navy-950 block">Marketing</span>
                <span className="text-hotel-slate-600">Ofertas sazonais relevantes.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="w-4 h-4 text-hotel-gold-600 focus:ring-hotel-gold-500 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setShowPreferences(false)}
              className="px-3 py-1.5 text-xs text-hotel-slate-700 hover:text-hotel-navy-950 font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveCustom}
              className="px-4 py-1.5 text-xs font-semibold bg-hotel-navy-950 hover:bg-hotel-navy-900 text-white transition-colors"
            >
              Salvar Escolhas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
