export interface ImageAsset {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'quarto' | 'banheiro' | 'tecnologia' | 'conforto' | 'servico';
  iconName: string;
}

export interface RoomCategory {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  sizeM2: number;
  maxGuests: number;
  bedType: string;
  viewType: string;
  startingPrice: number;
  featured: boolean;
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  amenities: string[]; // Lista de nomes de comodidades
  directBookingPerk: string;
  cancellationPolicy: string;
  highlightPoints: string[];
}

export interface DirectBookingBenefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface ExperienceItem {
  slug: string;
  title: string;
  category: 'wellness' | 'lazer' | 'gastronomica' | 'exclusiva' | 'natureza';
  subtitle: string;
  description: string;
  highlights: string[];
  schedule?: string;
  image: ImageAsset;
}

export interface DiningSpace {
  slug: string;
  name: string;
  role: 'restaurante' | 'bar' | 'cafe' | 'room-service';
  concept: string;
  description: string;
  chef?: string;
  hours: {
    title: string;
    time: string;
  }[];
  menuHighlights: {
    category: string;
    items: {
      name: string;
      description: string;
      price?: string;
    }[];
  }[];
  image: ImageAsset;
  gallery: ImageAsset[];
  reservationRequired: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'hotel' | 'acomodacoes' | 'gastronomia' | 'lazer' | 'eventos' | 'destino';
  url: string;
  alt: string;
}

export interface SpecialOffer {
  slug: string;
  title: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  validityPeriod: string;
  bookingWindow: string;
  includes: string[];
  terms: string[];
  startingPrice?: number;
  discountPercentage?: number;
  promoCode?: string;
  coverImage: ImageAsset;
}

export interface PointOfInterest {
  name: string;
  category: 'aeroporto' | 'praia' | 'centro' | 'atracao' | 'restaurante' | 'transporte';
  distanceKm: number;
  drivingMinutes: number;
  walkingMinutes?: number;
  description: string;
}

export interface EventSpace {
  slug: string;
  name: string;
  areaM2: number;
  ceilingHeightM: number;
  maxCapacity: number;
  layouts: {
    format: 'auditorio' | 'banquete' | 'coquetel' | 'escolar' | 'em-u' | 'reuniao';
    capacity: number;
  }[];
  description: string;
  features: string[];
  image: ImageAsset;
}

export interface Testimonial {
  id: string;
  author: string;
  origin: string;
  roomStayed: string;
  rating: number; // 1 a 5
  source: 'Google' | 'TripAdvisor' | 'Direto';
  sourceUrl?: string;
  date: string;
  title: string;
  content: string;
  verifiedGuest: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'reservas' | 'estadia' | 'politicas' | 'servicos' | 'gastronomia';
}

export interface HotelConfig {
  hotelInfo: {
    name: string;
    legalName: string;
    cnpj: string;
    category: string; // Ex: Boutique Hotel de Luxo
    starRating: number;
    destinationName: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    fullAddress: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    whatsappWelcomeMessage: string;
    emailReservas: string;
    emailGeral: string;
    emailEventos: string;
    instagram: string;
    instagramUrl: string;
    checkInTime: string;
    checkOutTime: string;
    currency: string;
    currencySymbol: string;
    siteUrl: string;
  };

  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImage: ImageAsset;
    videoPoster?: string;
  };

  about: {
    eyebrow: string;
    headline: string;
    narrative: string;
    historyParagraph: string;
    stats: {
      label: string;
      value: string;
    }[];
    highlights: {
      title: string;
      description: string;
    }[];
    featuredImages: ImageAsset[];
  };

  bookingEngine: {
    provider: 'omnibees' | 'cloudbeds' | 'synxis' | 'bookassist' | 'custom' | 'direct';
    directUrl: string;
    engineBaseUrl?: string;
    hotelCode?: string;
  };

  directBookingBenefits: DirectBookingBenefit[];
  rooms: RoomCategory[];
  experiences: ExperienceItem[];
  dining: DiningSpace[];
  gallery: GalleryPhoto[];
  offers: SpecialOffer[];
  location: {
    eyebrow: string;
    headline: string;
    description: string;
    mapEmbedUrl: string;
    pointsOfInterest: PointOfInterest[];
  };
  events: {
    eyebrow: string;
    headline: string;
    description: string;
    spaces: EventSpace[];
  };
  socialProof: {
    averageRating: number;
    totalReviews: number;
    googleRating: number;
    tripAdvisorRating: number;
    awards: {
      title: string;
      entity: string;
      year: string;
    }[];
    testimonials: Testimonial[];
  };
  faqs: FAQItem[];
  policies: {
    checkInCheckOut: string;
    cancellation: string;
    childrenAndExtraBeds: string;
    pets: string;
    smoking: string;
    paymentMethods: string[];
  };
  analytics: {
    gtmId?: string;
    ga4Id?: string;
    metaPixelId?: string;
  };
}
