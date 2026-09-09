'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { BookingModal } from '@/components/booking/BookingModal';
import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';

export const ClientLayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onOpenBookingModal={() => setBookingModalOpen(true)} />
      <main className="flex-grow">{children}</main>
      <Footer />
      <MobileStickyBar onOpenBookingModal={() => setBookingModalOpen(true)} />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
      <CookieConsentBanner />
    </div>
  );
};
