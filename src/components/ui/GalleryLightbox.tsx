'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryPhoto } from '@/types/hotel';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  initialCategory?: string;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photos,
  initialCategory = 'todos',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const categories = [
    { id: 'todos', name: 'Todas as Fotos' },
    { id: 'hotel', name: 'O Hotel' },
    { id: 'acomodacoes', name: 'Suítes & Vilas' },
    { id: 'gastronomia', name: 'Gastronomia' },
    { id: 'lazer', name: 'Piscina & Spa' },
    { id: 'eventos', name: 'Eventos & Casamentos' },
    { id: 'destino', name: 'Praia & Destino' },
  ];

  const filteredPhotos =
    activeCategory === 'todos'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  // Navegação no lightbox por teclado
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredPhotos.length]);

  return (
    <div>
      {/* Botões de Filtro por Categoria */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedIndex(null);
            }}
            className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 font-medium ${
              activeCategory === cat.id
                ? 'bg-hotel-navy-950 text-white shadow-sm'
                : 'bg-white border border-hotel-sand-200 text-hotel-slate-800/80 hover:border-hotel-gold-400'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid de Imagens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden bg-hotel-slate-900 cursor-pointer shadow-sm border border-hotel-sand-200/60"
          >
            <img
              src={photo.url}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
              <div className="flex items-center justify-between text-white">
                <span className="font-serif text-sm font-light drop-shadow-md">
                  {photo.title}
                </span>
                <span className="p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Lightbox Fullscreen */}
      {selectedIndex !== null && filteredPhotos[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador ampliado de imagens"
        >
          {/* Botão Fechar */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Fechar galeria"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navegação: Foto Anterior */}
          <button
            onClick={() =>
              setSelectedIndex(
                (selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length
              )
            }
            className="absolute left-4 sm:left-8 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Imagem Ampliada com Legenda */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredPhotos[selectedIndex].url}
              alt={filteredPhotos[selectedIndex].alt}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-serif text-lg font-light">
                {filteredPhotos[selectedIndex].title}
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Foto {selectedIndex + 1} de {filteredPhotos.length}
              </p>
            </div>
          </div>

          {/* Navegação: Próxima Foto */}
          <button
            onClick={() =>
              setSelectedIndex((selectedIndex + 1) % filteredPhotos.length)
            }
            className="absolute right-4 sm:right-8 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
