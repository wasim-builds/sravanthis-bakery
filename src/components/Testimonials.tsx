import React from 'react';
import { Star, Quote, PenLine, Sparkles, ShieldCheck } from 'lucide-react';
import { CustomerReview } from '../types/bakery';

interface TestimonialsProps {
  testimonials: CustomerReview[];
  onOpenWriteReview?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  onOpenWriteReview
}) => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100/80 px-2.5 py-1 rounded-full text-bakery-crust text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-bakery-amber" />
              <span>Customer Love & Community Wall</span>
            </div>
            <h2 className="font-signika text-2xl sm:text-3xl md:text-4xl font-bold text-bakery-burgundy">
              Loved by Thousands of Home Foodies
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-xl">
              Authentic stories from sourdough lovers, birthday families, and artisan pastry fans across India.
            </p>
          </div>

          {onOpenWriteReview && (
            <button
              onClick={onOpenWriteReview}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-bakery-amber hover:bg-bakery-crust text-white text-xs sm:text-sm font-bold shadow-warm hover:shadow-warm-hover transition-all transform hover:-translate-y-0.5 active:scale-95 shrink-0 mx-auto sm:mx-0"
            >
              <PenLine className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          )}
        </div>

        {/* Responsive Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-bakery-creamLight p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-warm transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Quote className="w-7 h-7 text-bakery-amber/40 group-hover:text-bakery-amber transition-colors" />
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed line-clamp-4">
                  "{t.review}"
                </p>

                {t.product && (
                  <span className="inline-block mt-3 px-2 py-0.5 bg-amber-100/60 text-bakery-crust text-[10px] font-semibold rounded-md border border-amber-200/50">
                    🥖 {t.product}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-200/70">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-bakery-amber/40 shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-signika font-bold text-xs sm:text-sm text-bakery-burgundy truncate">{t.name}</h3>
                    {t.verified !== false && (
                      <span title="Verified Customer" className="inline-flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 font-medium truncate">{t.location} · {t.date || 'Verified Buyer'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
