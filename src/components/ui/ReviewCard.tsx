import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { Testimonial } from '@/types/hotel';

interface ReviewCardProps {
  review: Testimonial;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white p-6 sm:p-8 border border-hotel-sand-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-hotel-sand-200/80 -z-0 pointer-events-none" />

      <div>
        {/* Estrelas */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-hotel-sand-300'
              }`}
            />
          ))}
          <span className="text-[10px] uppercase tracking-wider font-semibold text-hotel-slate-800/60 ml-2">
            via {review.source}
          </span>
        </div>

        {/* Título do Depoimento */}
        <h4 className="font-serif text-base sm:text-lg text-hotel-navy-950 font-normal mb-2 leading-snug">
          "{review.title}"
        </h4>

        {/* Texto do Depoimento */}
        <p className="text-xs sm:text-sm text-hotel-slate-800/80 leading-relaxed font-light mb-6 italic">
          {review.content}
        </p>
      </div>

      {/* Autor, Local e Suíte */}
      <div className="pt-4 border-t border-hotel-sand-200 flex items-center justify-between text-xs">
        <div>
          <div className="flex items-center gap-1.5 font-medium text-hotel-navy-950">
            <span>{review.author}</span>
            {review.verifiedGuest && (
              <span title="Hóspede Verificado">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </span>
            )}
          </div>
          <span className="text-[11px] text-hotel-slate-800/60 block font-light">
            {review.origin} · {review.roomStayed}
          </span>
        </div>
        <span className="text-[10px] text-hotel-slate-800/40">
          {review.date}
        </span>
      </div>
    </div>
  );
};
