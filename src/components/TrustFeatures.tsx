import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Truck } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-bakery-amber" />,
      title: "100% Fresh Daily at 5:00 AM",
      desc: "Every single loaf, croissant, and pastry is kneaded, proofed, and baked fresh every morning."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-bakery-amber" />,
      title: "Real Butter & Natural Flours",
      desc: "Never any margarine, palm oil, or cake premixes. Only pure dairy butter and unbleached stoneground flours."
    },
    {
      icon: <Truck className="w-8 h-8 text-bakery-amber" />,
      title: "Express City & Vacuum Shipping",
      desc: "Same-day 2-hour delivery across Hyderabad & vacuum-sealed pan-India courier that preserves crispy freshness."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-bakery-amber" />,
      title: "Authentic Inti Ruchulu Heritage",
      desc: "Handcrafted in small batches following cherished traditional family recipes and artisanal European methods."
    }
  ];

  return (
    <section className="bg-bakery-creamWarm py-12 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-signika text-2xl sm:text-3xl font-bold text-bakery-burgundy">
            Why Food Lovers Cherish Minnie's Bakehouse
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Pure ingredients, authentic recipes, and time-honored artisanal baking standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-warm transition-all flex flex-col items-center text-center group hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-bakery-creamLight flex items-center justify-center mb-4 group-hover:bg-bakery-cream transition-colors">
                {feat.icon}
              </div>
              <h3 className="font-signika font-bold text-base text-bakery-burgundy mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
