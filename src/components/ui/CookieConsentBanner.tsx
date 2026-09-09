'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Settings, Check, X } from 'lucide-react';

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
    // Verifica se usuário já definiu preferências
    const saved = localStorage.getItem('hotel_cookie_consent');
    if (!saved) {
      // Delay suave para não assustar o visitante no 1º frame
      const timer = setTimeout(() => setIsVisible(true), 1200);
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
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-hotel-navy-950/95 backdrop-blur-md text-white border-t border-white/10 shadow-2xl animate-slideUp"
      role="region"
      aria-label="Consentimento de Cookies e Privacidade"
    >
      <div className="max-w-6xl mx-auto">
        {!showPreferences ? (
          /* Visão Inicial */
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start gap-3.5 max-w-3xl">
              <div className="p-2.5 bg-white/10 rounded-none shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-hotel-gold-400" />
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-normal mb-1">
                  Respeitamos sua privacidade e seus dados (LGPD)
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Utilizamos cookies próprios e de terceiros para garantir o funcionamento seguro do motor de reservas, analisar o tráfego do site e aprimorar sua experiência de navegação. Você pode aceitar todos os cookies, recusar os opcionais ou personalizar suas escolhas.{' '}
                  <Link href="/cookies" className="underline hover:text-hotel-gold-300">
                    Saiba mais em nossa Política de Cookies
                  </Link>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2.5 text-xs tracking-wider border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Personalizar
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2.5 text-xs tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Apenas Essenciais
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 text-xs tracking-wider font-medium bg-hotel-gold-500 hover:bg-hotel-gold-600 text-white transition-colors"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        ) : (
          /* Modal/Gaveta de Personalização Granular */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="font-serif text-base font-normal flex items-center gap-2 text-hotel-gold-300">
                <Settings className="w-4 h-4" />
                Configuração de Preferências de Privacidade
              </h4>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-1 text-white/60 hover:text-white"
                aria-label="Voltar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Necessários */}
              <div className="p-3 bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white">1. Cookies Necessários</span>
                  <span className="text-[10px] text-emerald-400 font-medium uppercase">Sempre Ativo</span>
                </div>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  Essenciais para a navegação básica, segurança do carrinho de reservas e lembrança da sessão.
                </p>
              </div>

              {/* Analíticos */}
              <div className="p-3 bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white">2. Cookies Analíticos</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-hotel-gold-500"></div>
                  </label>
                </div>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  Permitem medir visitas de forma anônima no Google Analytics para entender quais acomodações são mais acessadas.
                </p>
              </div>

              {/* Marketing */}
              <div className="p-3 bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white">3. Cookies de Marketing</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({ ...preferences, marketing: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-hotel-gold-500"></div>
                  </label>
                </div>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  Utilizados para exibir ofertas sazonais relevantes e limitar repetição de anúncios em redes sociais.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleSaveCustom}
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-medium bg-hotel-gold-500 hover:bg-hotel-gold-600 text-white transition-colors"
              >
                Salvar Preferências Selecionadas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
