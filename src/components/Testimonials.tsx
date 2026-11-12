import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/bakeryProducts';

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-bakery-amber">
            Customer Love
          </span>
          <h2 className="font-signika text-2xl sm:text-3xl font-bold text-bakery-burgundy mt-1">
            Loved by Thousands of Home Foodies
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Real feedback from sourdough connoisseurs and cake lovers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-bakery-creamLight p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-warm transition-all flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-bakery-amber/40 mb-2" />
                <div className="flex text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-stone-200/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-bakery-amber/30"
                />
                <div>
                  <h3 className="font-signika font-bold text-sm text-bakery-burgundy">{t.name}</h3>
                  <p className="text-[11px] text-stone-400 font-medium">{t.location} · Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
