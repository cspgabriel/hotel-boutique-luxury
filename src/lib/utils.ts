export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatShortDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export function buildWhatsAppBookingLink(
  phone: string,
  checkIn?: string,
  checkOut?: string,
  guests?: number,
  roomName?: string
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  let message = 'Olá! Gostaria de verificar disponibilidade no hotel.';
  
  if (roomName) {
    message += ` Tenho interesse na acomodação: *${roomName}*.`;
  }
  if (checkIn && checkOut) {
    message += ` Período desejado: de *${formatShortDate(checkIn)}* até *${formatShortDate(checkOut)}*.`;
  }
  if (guests) {
    message += ` Número de hóspedes: *${guests} pessoa(s)*.`;
  }
  message += ' Poderiam me informar tarifas exclusivas para reserva direta com os benefícios do site?';

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getFutureDateString(daysAhead: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}
