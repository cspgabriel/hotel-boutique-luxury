// Helper para dataLayer e rastreamento de eventos sem quebrar caso scripts externos não estejam carregados

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  // Envia para dataLayer (GTM)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
    timestamp: new Date().toISOString(),
  });

  // Envia para GA4 gtag se disponível
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // Log informativo em ambiente de desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event: ${eventName}]`, params);
  }
}

// Eventos específicos de conversão e intenção em hotelaria
export function trackBookingSearch(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}) {
  trackEvent('search_availability', {
    search_term: 'booking_engine',
    checkin_date: params.checkIn,
    checkout_date: params.checkOut,
    number_of_guests: params.guests,
    number_of_rooms: params.rooms,
  });
}

export function trackBookingCtaClick(location: string, roomSlug?: string) {
  trackEvent('click_booking_cta', {
    cta_placement: location,
    room_slug: roomSlug || 'general',
  });
}

export function trackWhatsAppClick(source: string, destination: string) {
  trackEvent('contact_whatsapp', {
    contact_source: source,
    channel: 'whatsapp',
    destination: destination,
  });
}

export function trackPhoneClick(source: string) {
  trackEvent('contact_phone', {
    contact_source: source,
    channel: 'phone',
  });
}

export function trackRoomView(roomName: string, slug: string, price: number) {
  trackEvent('view_item', {
    item_type: 'accommodation',
    item_id: slug,
    item_name: roomName,
    value: price,
    currency: 'BRL',
  });
}

export function trackFormSubmission(formType: 'contact' | 'event_rfp' | 'newsletter') {
  trackEvent('form_submission', {
    form_type: formType,
    status: 'success',
  });
}

export function trackOfferView(offerTitle: string, slug: string) {
  trackEvent('view_promotion', {
    promotion_id: slug,
    promotion_name: offerTitle,
  });
}
