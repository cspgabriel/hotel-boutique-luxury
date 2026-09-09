import type { Metadata, Viewport } from 'next';
import './globals.css';
import { hotelConfig } from '@/data/hotel.config';
import { getHotelSchema } from '@/lib/schema';
import { ClientLayoutShell } from '@/components/layout/ClientLayoutShell';
import { DemoBanner } from '@/components/layout/DemoBanner';

const { hotelInfo, hero } = hotelConfig;

/**
 * Modo demo: publicacao como vitrine comercial (ex.: /demo/boutique).
 * Forca noindex para o hotel ficticio nunca competir em busca com clientes reais.
 */
const isDemo = Boolean(process.env.NEXT_PUBLIC_DEMO_BANNER);

export const viewport: Viewport = {
  themeColor: '#0F1D2F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(hotelInfo.siteUrl),
  title: {
    default: `${hotelInfo.name} — Hotel Boutique & Spa em ${hotelInfo.destinationName}`,
    template: `%s | ${hotelInfo.name}`,
  },
  description: `${hero.headline} ${hero.subheadline}`,
  keywords: [
    `hotel em ${hotelInfo.city}`,
    `hotel boutique ${hotelInfo.destinationName}`,
    `hotel de luxo ${hotelInfo.neighborhood}`,
    `pousada de luxo ${hotelInfo.destinationName}`,
    `reserva direta ${hotelInfo.name}`,
    `hotel com spa e piscina de borda infinita`,
  ],
  authors: [{ name: hotelInfo.legalName }],
  creator: hotelInfo.name,
  publisher: hotelInfo.name,
  robots: {
    index: !isDemo,
    follow: true,
    googleBot: {
      index: !isDemo,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: hotelInfo.siteUrl,
    title: `${hotelInfo.name} — ${hotelInfo.category}`,
    description: hero.headline,
    siteName: hotelInfo.name,
    images: [
      {
        url: hero.backgroundImage.url,
        width: 1200,
        height: 630,
        alt: hero.backgroundImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${hotelInfo.name} — ${hotelInfo.category}`,
    description: hero.headline,
    images: [hero.backgroundImage.url],
  },
  alternates: {
    canonical: hotelInfo.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hotelSchema = getHotelSchema();

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Schema.org estruturado em JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body className="antialiased bg-hotel-sand-50 text-hotel-slate-900">
        <DemoBanner />
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}
