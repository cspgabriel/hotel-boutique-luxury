'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { trackFormSubmission } from '@/lib/analytics';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Dúvidas sobre Reserva',
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

    // Validação básica de segurança
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Simulação de envio com timeout realista
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      trackFormSubmission('contact');
    } catch {
      setStatus('error');
      setErrorMessage('Ocorreu um erro ao enviar sua mensagem. Seus dados foram preservados. Tente novamente ou use nosso WhatsApp.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 text-center animate-fadeIn">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl text-emerald-900 font-normal mb-2">
          Mensagem recebida com sucesso!
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800/80 max-w-md mx-auto leading-relaxed mb-6 font-light">
          Agradecemos seu contato. Nossa equipe de concierge responderá por e-mail ou WhatsApp em até 2 horas úteis.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              email: '',
              phone: '',
              subject: 'Dúvidas sobre Reserva',
              message: '',
            });
          }}
          className="text-xs uppercase tracking-wider text-emerald-900 font-medium underline hover:text-emerald-700"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 border border-hotel-sand-200 shadow-sm">
      {status === 'error' && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Nome Completo *
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Beatriz Albuquerque"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            E-mail de Contato *
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="nome@email.com"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Telefone / WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(21) 99999-9999"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
            Assunto
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
          >
            <option value="Dúvidas sobre Reserva">Dúvidas sobre Reserva</option>
            <option value="Reserva de Mesa no Restaurante">Reserva de Mesa no Restaurante Maresia</option>
            <option value="Agendamento de Spa">Agendamento de Spa & Terapias</option>
            <option value="Transfer e Receptivo">Serviço de Transfer & Receptivo</option>
            <option value="Imprensa e Parcerias">Assessoria de Imprensa / Parcerias</option>
            <option value="Outro assunto">Outro assunto</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-[0.18em] font-medium text-hotel-slate-800/80 mb-1.5">
          Sua Mensagem *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Como podemos tornar sua experiência inesquecível?"
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-hotel-sand-300 focus:border-hotel-gold-500 focus:outline-none transition-colors bg-hotel-sand-50/40"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Enviando mensagem...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Enviar Mensagem ao Concierge</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-hotel-slate-800/50 text-center font-light">
        Seus dados estão protegidos sob nossa Política de Privacidade. Não enviamos spam.
      </p>
    </form>
  );
};
