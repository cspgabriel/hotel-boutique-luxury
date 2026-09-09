import React from 'react';
import {
  Wifi,
  Tv,
  Wind,
  Coffee,
  Wine,
  Shield,
  Bath,
  Sparkles,
  Waves,
  Sun,
  Laptop,
  CheckCircle2,
} from 'lucide-react';

interface RoomAmenitiesGridProps {
  amenities: string[];
}

export const RoomAmenitiesGrid: React.FC<RoomAmenitiesGridProps> = ({ amenities }) => {
  // Helper para mapear ícone de acordo com o texto da comodidade
  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('wi-fi')) return <Wifi className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('tv') || lower.includes('airplay')) return <Tv className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('ar-condicionado')) return <Wind className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('cafeteira') || lower.includes('nespresso') || lower.includes('café')) return <Coffee className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('adega') || lower.includes('minibar')) return <Wine className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('banheira') || lower.includes('ducha')) return <Bath className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('piscina') || lower.includes('deck')) return <Waves className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('varanda') || lower.includes('terraço') || lower.includes('jardim')) return <Sun className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('trabalho') || lower.includes('usb')) return <Laptop className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('cofre')) return <Shield className="w-4 h-4 text-hotel-gold-600" />;
    if (lower.includes('amenities') || lower.includes('enxoval') || lower.includes('trussardi')) return <Sparkles className="w-4 h-4 text-hotel-gold-600" />;
    return <CheckCircle2 className="w-4 h-4 text-hotel-gold-600" />;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {amenities.map((amenity, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3.5 bg-white border border-hotel-sand-200/80 hover:border-hotel-gold-300 transition-colors"
        >
          <div className="p-2 bg-hotel-sand-50 rounded-none shrink-0 mt-0.5">
            {getAmenityIcon(amenity)}
          </div>
          <span className="text-xs sm:text-sm text-hotel-slate-800 leading-snug font-light">
            {amenity}
          </span>
        </div>
      ))}
    </div>
  );
};
