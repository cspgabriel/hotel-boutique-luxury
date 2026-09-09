import { hotelConfig } from '@/data/hotel.config';
import { RoomCategory, FAQItem } from '@/types/hotel';

export function getHotelSchema() {
  const { hotelInfo } = hotelConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${hotelInfo.siteUrl}/#hotel`,
    name: hotelInfo.name,
    legalName: hotelInfo.legalName,
    description: hotelConfig.hero.headline,
    url: hotelInfo.siteUrl,
    telephone: hotelInfo.phoneFormatted,
    email: hotelInfo.emailReservas,
    image: [
      hotelConfig.hero.backgroundImage.url,
      ...hotelConfig.about.featuredImages.map((img) => img.url),
    ],
    starRating: {
      '@type': 'Rating',
      ratingValue: hotelInfo.starRating,
    },
    priceRange: 'R$ 980 - R$ 2.400',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Credit Card, PIX, Bank Transfer, Cash',
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotelInfo.fullAddress,
      addressLocality: hotelInfo.city,
      addressRegion: hotelInfo.state,
      postalCode: hotelInfo.postalCode,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: hotelInfo.coordinates.latitude,
      longitude: hotelInfo.coordinates.longitude,
    },
    checkinTime: hotelInfo.checkInTime,
    checkoutTime: hotelInfo.checkOutTime,
    petsAllowed: true,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: hotelConfig.socialProof.averageRating,
      reviewCount: hotelConfig.socialProof.totalReviews,
      bestRating: '5',
      worstRating: '1',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Piscina de borda infinita aquecida', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Spa holístico completo', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurante autoral de frutos do mar', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi 6 de alta velocidade gratuito', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Estacionamento privativo com recarga para veículos elétricos', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Acesso à praia em 80 metros', value: true },
    ],
  };
}

export function getRoomSchema(room: RoomCategory) {
  const { hotelInfo } = hotelConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.shortDescription,
    url: `${hotelInfo.siteUrl}/acomodacoes/${room.slug}`,
    image: room.gallery.map((img) => img.url),
    bed: {
      '@type': 'BedDetails',
      typeOfBed: room.bedType,
    },
    occupancy: {
      '@type': 'QuantitativeValue',
      value: room.maxGuests,
      unitCode: 'C62',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: room.sizeM2,
      unitCode: 'MTK',
    },
    amenityFeature: room.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    offers: {
      '@type': 'Offer',
      price: room.startingPrice,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${hotelInfo.siteUrl}/acomodacoes/${room.slug}`,
      validFrom: '2026-01-01',
    },
  };
}

export function getRestaurantSchema() {
  const { hotelInfo } = hotelConfig;
  const restaurant = hotelConfig.dining[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: restaurant.description,
    image: restaurant.image.url,
    servesCuisine: 'Contemporânea Costeira, Frutos do Mar',
    telephone: hotelInfo.phoneFormatted,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotelInfo.fullAddress,
      addressLocality: hotelInfo.city,
      addressRegion: hotelInfo.state,
      addressCountry: 'BR',
    },
    priceRange: 'R$ 78 - R$ 190',
  };
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
