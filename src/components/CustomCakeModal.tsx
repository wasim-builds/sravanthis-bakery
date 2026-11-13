import React, { useState } from 'react';
import { X, Sparkles, Check, Cake, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BakeryProduct, CartItem } from '../types/bakery';

interface CustomCakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cake: BakeryProduct | null;
  onAddToCart: (item: CartItem) => void;
}

export const CustomCakeModal: React.FC<CustomCakeModalProps> = ({
  isOpen,
  onClose,
  cake,
  onAddToCart,
}) => {
  if (!isOpen || !cake) return null;

  const [message, setMessage] = useState('');
  const [style, setStyle] = useState<'chocolate-plaque' | 'white-fondant' | 'direct-piping'>('chocolate-plaque');
  const [dietary, setDietary] = useState<'eggless' | 'traditional'>('eggless');
  const [selectedWeight, setSelectedWeight] = useState(cake.variants[0]?.weight || '500g (Serves 4-6)');

  const currentVariant = cake.variants.find((v) => v.weight === selectedWeight) || cake.variants[0];
  const price = currentVariant ? currentVariant.price : 650;

  const handleAddCustomCake = () => {
    onAddToCart({
      productId: `${cake.id}-custom`,
      name: `${cake.name} (Custom Inscribed)`,
      image: cake.image,
      selectedWeight: selectedWeight,
      price: price,
      quantity: 1,
      customMessage: message.trim() || 'Happy Celebration!',
      customStyle: style,
      dietaryChoice: dietary,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-bakery-burgundy via-bakery-burgundyDark to-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-bakery-gold/20 flex items-center justify-center text-bakery-gold">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-signika font-bold text-lg leading-tight">Personalize Your Celebration Cake</h3>
              <p className="text-xs text-bakery-cream/80">Hand-piped by our master pastry chefs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Live Preview Display */}
          <div className="relative bg-stone-900 rounded-2xl p-6 text-center text-white overflow-hidden shadow-inner">
            <img 
              src={cake.image} 
              alt={cake.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs"
            />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-bakery-gold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Live Piping Plaque Preview
              </span>

              {/* Simulated Plaque */}
              <div className={`mt-1 px-6 py-3.5 rounded-2xl shadow-xl border max-w-md w-full transition-all ${
                style === 'chocolate-plaque'
                  ? 'bg-gradient-to-r from-[#2A150D] to-[#1C0D07] border-amber-800 text-bakery-gold font-serif italic'
                  : style === 'white-fondant'
                  ? 'bg-gradient-to-r from-stone-100 to-amber-50 border-stone-300 text-bakery-burgundy font-serif font-bold'
                  : 'bg-black/50 border-white/20 text-amber-200 font-sans font-medium'
              }`}>
                <div className="text-base md:text-lg tracking-wide drop-shadow-sm min-h-[1.75rem]">
                  {message ? `"${message}"` : <span className="opacity-40 italic">Type your cake message below...</span>}
                </div>
                <div className="text-[10px] mt-1 opacity-70 tracking-wider uppercase font-sans">
                  {dietary === 'eggless' ? '🌿 100% Eggless Pure Veg' : '🥚 Traditional French Recipe'} · {style.replace('-', ' ')}
                </div>
              </div>
            </div>
          </div>

          {/* 1. Message Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-700">1. Message on Cake (Max 35 Characters)</label>
              <span className="text-[11px] font-mono text-stone-500">{message.length}/35</span>
            </div>
            <input
              type="text"
              maxLength={35}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Happy 30th Birthday Priya! ❤️"
              className="w-full text-sm font-medium p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-bakery-burgundy focus:ring-1 focus:ring-bakery-burgundy"
            />
            <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
              <Info className="w-3 h-3 text-bakery-amber" /> Inscribed with edible food-grade cocoa butter calligraphy.
            </p>
          </div>

          {/* 2. Plaque Style Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">2. Inscription Plaque Style</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'chocolate-plaque', label: 'Dark Chocolate Plaque', desc: 'Gold leaf calligraphy on 70% dark chocolate', badge: 'Popular' },
                { id: 'white-fondant', label: 'White Fondant Banner', desc: 'Elegant rolled sugar banner with burgundy script', badge: 'Classic' },
                { id: 'direct-piping', label: 'Direct Cream Piping', desc: 'Hand-piped buttercream lettering directly on glaze', badge: 'Artisanal' },
              ].map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setStyle(s.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    style === s.id
                      ? 'border-bakery-burgundy bg-bakery-burgundy/5 ring-1 ring-bakery-burgundy'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">{s.label}</span>
                    {style === s.id && <Check className="w-3.5 h-3.5 text-bakery-burgundy" />}
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1 leading-snug">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Dietary Choice */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">3. Dietary Preference</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDietary('eggless')}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  dietary === 'eggless'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-emerald-600 flex items-center justify-center p-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-bold">100% Eggless (Pure Veg)</div>
                    <div className="text-[10px] text-stone-500">Baked in dedicated veg oven</div>
                  </div>
                </div>
                {dietary === 'eggless' && <Check className="w-4 h-4 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => setDietary('traditional')}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  dietary === 'traditional'
                    ? 'border-bakery-burgundy bg-bakery-burgundy/5 text-bakery-burgundy ring-1 ring-bakery-burgundy'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-bakery-amber flex items-center justify-center p-0.5">
                    <span className="w-2 h-2 rounded-full bg-bakery-amber"></span>
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-bold">Traditional Parisian</div>
                    <div className="text-[10px] text-stone-500">Rich egg-yolk sponge recipe</div>
                  </div>
                </div>
                {dietary === 'traditional' && <Check className="w-4 h-4 text-bakery-burgundy" />}
              </button>
            </div>
          </div>

          {/* 4. Weight Swatches */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">4. Select Cake Weight / Serving</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {cake.variants.map((v) => (
                <button
                  type="button"
                  key={v.weight}
                  onClick={() => setSelectedWeight(v.weight)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    selectedWeight === v.weight
                      ? 'bg-bakery-burgundy text-white border-bakery-burgundy font-bold shadow-xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-xs">{v.weight}</div>
                  <div className={`text-[11px] ${selectedWeight === v.weight ? 'text-bakery-gold' : 'text-bakery-burgundy font-semibold'}`}>
                    ₹{v.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Action Button Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400">Total Price</div>
            <div className="text-xl font-signika font-bold text-bakery-burgundy">
              ₹{price.toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAddCustomCake}
            className="flex-1 bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white py-3 px-6 rounded-2xl font-bold text-sm shadow-warm hover:shadow-warm-hover transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-bakery-gold" />
            <span>Add Inscribed Cake to Basket</span>
          </button>
        </div>

      </div>
    </div>
  );
};
