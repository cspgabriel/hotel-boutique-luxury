'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Users, Calendar, Building2 } from 'lucide-react';
import { trackFormSubmission } from '@/lib/analytics';

export const EventRfpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    organizerName: '',
    email: '',
    phone: '',
    companyOrFamily: '',
    eventType: 'casamento',
    estimatedDate: '',
    guestCount: '50-80',
    needsLodging: 'sim',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.organizerName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Por favor, preencha seu nome, e-mail e telefone para que nossa equipe comercial elabore a proposta.');
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      trackFormSubmission('event_rfp');
    } catch {
      setStatus('error');
      setErrorMessage('Erro ao submeter a solicitação. Seus dados continuam salvos.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 text-center animate-fadeIn">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl text-emerald-900 font-normal mb-2">
          Solicitação de Proposta Recebida!
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800/80 max-w-lg mx-auto leading-relaxed mb-6 font-light">
          Nossa Gerência de Eventos e Banquetes analisará a data solicitada ({formData.estimatedDate || 'a definir'}) e enviará uma proposta detalhada com plantas, opções gastronômicas e tarifas de bloqueio em até 24 horas úteis.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs uppercase tracking-wider text-emerald-900 font-medium underline hover:text-emerald-700"
        >
          Enviar outra cotação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-10 border border-hotel-sand-200 shadow-sm">
      {status === 'error' && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="organizerName" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Nome do Responsável *
          </label>
          <input
            id="organizerName"
            type="text"
            name="organizerName"
            required
            value={formData.organizerName}
            onChange={handleChange}
            placeholder="Ex: Dra. Camila Siqueira"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          />
        </div>

        <div>
          <label htmlFor="companyOrFamily" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Empresa / Noivos / Família
          </label>
          <input
            id="companyOrFamily"
            type="text"
            name="companyOrFamily"
            value={formData.companyOrFamily}
            onChange={handleChange}
            placeholder="Ex: Grupo Alpha ou Noivos Camila & Lucas"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rfp-email" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            E-mail Corporativo ou Pessoal *
          </label>
          <input
            id="rfp-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="camila@empresa.com.br"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          />
        </div>

        <div>
          <label htmlFor="rfp-phone" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Telefone / WhatsApp Direto *
          </label>
          <input
            id="rfp-phone"
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="(21) 98888-7777"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="eventType" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Tipo de Evento
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          >
            <option value="casamento">Mini-Wedding / Casamento</option>
            <option value="corporativo">Convenção / Encontro Executivo</option>
            <option value="social">Aniversário / Celebração Social</option>
            <option value="workshop">Workshop / Treinamento Imersivo</option>
          </select>
        </div>

        <div>
          <label htmlFor="guestCount" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Estimativa de Pessoas
          </label>
          <select
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          >
            <option value="ate-30">Até 30 convidados</option>
            <option value="30-60">30 a 60 convidados</option>
            <option value="60-100">60 a 100 convidados</option>
            <option value="100-140">100 a 140 convidados</option>
          </select>
        </div>

        <div>
          <label htmlFor="needsLodging" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Bloqueio de Quartos?
          </label>
          <select
            id="needsLodging"
            name="needsLodging"
            value={formData.needsLodging}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          >
            <option value="sim">Sim, para a maioria do grupo</option>
            <option value="parcial">Apenas para VIPs / Noivos</option>
            <option value="nao">Não, apenas locação de espaço</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="rfp-message" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
          Data Prevista e Detalhes do Projeto
        </label>
        <textarea
          id="rfp-message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Ex: Previsão para outubro de 2026, cerimônia no deck ao pôr do sol e jantar no salão principal..."
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full py-4 flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processando solicitação...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Solicitar Proposta Executiva Personalizada</span>
          </>
        )}
      </button>
    </form>
  );
};
