import React from 'react';
import { Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onCategoryClick: (catId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onCategoryClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-bakery-burgundyDark via-bakery-burgundy to-bakery-burgundyDeep text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-bakery-gold">
      {/* Subtle background texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-repeat pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#f1dbbb 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-bakery-cream/30 text-xs sm:text-sm text-bakery-cream font-medium">
            <Sparkles className="w-4 h-4 text-bakery-gold" />
            <span>Authentic Homemade Taste · Fresh Bakes Out at 7:00 AM</span>
          </div>

          <h1 className="font-signika text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
            Baked with <span className="text-bakery-gold font-serif italic">Love</span>, <br />
            Crafted for <span className="underline decoration-bakery-amber decoration-4 underline-offset-8">Pure Joy</span>.
          </h1>

          <p className="text-stone-200 text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
            Inspired by authentic home recipes, our artisanal bakehouse delivers naturally wild-fermented sourdoughs, 27-layer butter croissants, rich celebratory cakes, and signature savouries baked daily with 100% pure butter and zero preservatives.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2.5 bg-bakery-amber hover:bg-bakery-crust text-white font-semibold px-6 py-3.5 rounded-full shadow-warm hover:shadow-warm-hover transform hover:-translate-y-0.5 transition-all text-sm sm:text-base group"
            >
              <ShoppingBag className="w-5 h-5 text-bakery-cream" />
              <span>Explore Fresh Bakes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onCategoryClick('sourdough')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3.5 rounded-full border border-white/20 hover:border-white/40 transition-colors text-sm sm:text-base"
            >
              <span>🥖 Sourdoughs & Breads</span>
            </button>
          </div>

          {/* Micro trust highlights */}
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/10 text-left text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-bakery-gold shrink-0" />
              <span>100% Pure Dairy Butter</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-bakery-gold shrink-0" />
              <span>36-Hr Sourdough Ferment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🌿</span>
              <span>Zero Chemicals or Mixes</span>
            </div>
          </div>
        </div>

        {/* Right Visual Image Card / Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm sm:max-w-md">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-bakery-gold to-bakery-amber rounded-3xl blur-xl opacity-30 animate-pulse" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-bakery-cream/40 bg-bakery-burgundyDeep">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
                alt="Freshly baked sourdough and croissants"
                className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Badge on Image */}
              <div className="absolute top-4 right-4 bg-bakery-burgundy/90 backdrop-blur-md text-white border border-bakery-gold/40 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                <span>Oven Fresh: Batch #04</span>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-stone-200 flex items-center justify-between text-stone-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-bakery-creamWarm flex items-center justify-center text-2xl shrink-0">
                    🥐
                  </div>
                  <div>
                    <h2 className="font-signika font-bold text-sm text-bakery-burgundy">French Butter Croissants</h2>
                    <p className="text-[11px] text-stone-500 font-medium">Warm, flaky & 100% pure butter</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-400 line-through block">₹ 150</span>
                  <span className="font-bold text-bakery-crust text-sm">₹ 135</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
