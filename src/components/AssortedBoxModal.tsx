import React, { useState } from 'react';
import { X, Gift, Plus, Minus, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/bakery';

interface AssortedBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

interface BoxItemOption {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

const TREAT_OPTIONS: BoxItemOption[] = [
  {
    id: 'box-croissant',
    name: 'Normandy Butter Croissant',
    category: 'Viennoiserie',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
    description: '36 layers of French butter and honeycomb crumb',
  },
  {
    id: 'box-chocolat',
    name: 'Valrhona Pain au Chocolat',
    category: 'Viennoiserie',
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=500&q=80',
    description: 'Double chocolate batons in flaky laminated dough',
  },
  {
    id: 'box-cruffin',
    name: 'Almond Frangipane Cruffin',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    description: 'Croissant-muffin hybrid with roasted almond cream',
  },
  {
    id: 'box-brioche',
    name: 'Cardamom Cinnamon Brioche Swirl',
    category: 'Sweet',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=500&q=80',
    description: 'Buttery brioche rolled with Ceylon cinnamon & cardamom',
  },
  {
    id: 'box-cookie',
    name: 'Belgian Double Choco Chunk Cookie',
    category: 'Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&q=80',
    description: 'Crisp chewy cookie with molten dark chocolate pools',
  },
  {
    id: 'box-shortbread',
    name: 'Pistachio Cardamom Shortbread',
    category: 'Cookies',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80',
    description: 'Melt-in-mouth Scottish shortbread infused with pistachios',
  },
  {
    id: 'box-puff',
    name: 'Spiced Paneer & Onion Puff',
    category: 'Savoury',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=500&q=80',
    description: 'Flaky golden puff with Malabar spiced cottage cheese',
  },
  {
    id: 'box-focaccia',
    name: 'Garlic Rosemary Focaccia Square',
    category: 'Savoury',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=500&q=80',
    description: 'Dimpled olive oil bread with roasted garlic bulbs',
  },
];

export const AssortedBoxModal: React.FC<AssortedBoxModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [boxSize, setBoxSize] = useState<4 | 6>(4);
  const [selections, setSelections] = useState<Record<string, number>>({});

  const totalSelected = Object.values(selections).reduce((sum, n) => sum + n, 0);
  const isFull = totalSelected === boxSize;
  const price = boxSize === 4 ? 399 : 579;
  const originalPrice = boxSize === 4 ? 499 : 749;

  const handleIncrement = (id: string) => {
    if (totalSelected >= boxSize) return;
    setSelections((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    if (!selections[id]) return;
    setSelections((prev) => {
      const next = { ...prev };
      if (next[id] <= 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  };

  const handleAddToCart = () => {
    if (!isFull) return;

    const itemsSummary = Object.entries(selections)
      .map(([id, count]) => {
        const item = TREAT_OPTIONS.find((t) => t.id === id);
        return `${count}x ${item?.name || id}`;
      });

    onAddToCart({
      productId: `assorted-box-${boxSize}-${Date.now()}`,
      name: `Artisanal Treat Box (Curated Box of ${boxSize})`,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
      selectedWeight: `Box of ${boxSize} Handcrafted Bakes`,
      price: price,
      quantity: 1,
      assortedItems: itemsSummary,
    });

    try {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-4">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-bakery-burgundy via-bakery-burgundyDark to-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-bakery-gold/20 flex items-center justify-center text-bakery-gold">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-signika font-bold text-lg leading-tight">Build Your Own Artisanal Treat Box</h3>
              <p className="text-xs text-bakery-cream/80">Mix & match your favorite freshly baked pastries & savouries</p>
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
          
          {/* Box Size Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <div>
              <div className="text-xs font-bold text-stone-800">Select Box Size:</div>
              <div className="text-[11px] text-stone-500">Includes complimentary luxury gift box with golden ribbon</div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              {[
                { size: 4 as const, label: 'Box of 4', price: '₹399', save: 'Save ₹100' },
                { size: 6 as const, label: 'Box of 6', price: '₹579', save: 'Save ₹180' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.size}
                  onClick={() => {
                    setBoxSize(opt.size);
                    setSelections({});
                  }}
                  className={`px-4 py-2 rounded-xl text-center border transition-all ${
                    boxSize === opt.size
                      ? 'bg-bakery-burgundy text-white border-bakery-burgundy font-bold shadow-xs'
                      : 'border-stone-200 text-stone-700 bg-white hover:bg-stone-100'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label} · {opt.price}</div>
                  <div className={`text-[10px] ${boxSize === opt.size ? 'text-bakery-gold' : 'text-emerald-600 font-semibold'}`}>
                    {opt.save}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Counter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-bakery-burgundy flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-bakery-gold" />
                <span>Box Progress: {totalSelected} of {boxSize} Items Picked</span>
              </span>
              <span className={isFull ? 'text-emerald-600' : 'text-stone-500'}>
                {isFull ? '✨ Box Complete!' : `${boxSize - totalSelected} more needed`}
              </span>
            </div>

            <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div
                className={`h-full transition-all duration-300 ${
                  isFull ? 'bg-emerald-600' : 'bg-gradient-to-r from-bakery-amber to-bakery-burgundy'
                }`}
                style={{ width: `${(totalSelected / boxSize) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Item Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TREAT_OPTIONS.map((item) => {
              const count = selections[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                    count > 0
                      ? 'border-bakery-burgundy bg-bakery-burgundy/5 ring-1 ring-bakery-burgundy/40'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-bakery-amber">
                      {item.category}
                    </span>
                    <h4 className="font-signika font-bold text-xs text-stone-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-stone-100 px-2 py-1 rounded-xl border border-stone-200">
                    <button
                      type="button"
                      disabled={count === 0}
                      onClick={() => handleDecrement(item.id)}
                      className="w-6 h-6 rounded-lg bg-white text-stone-700 flex items-center justify-center hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center text-xs font-bold text-stone-800">
                      {count}
                    </span>
                    <button
                      type="button"
                      disabled={totalSelected >= boxSize}
                      onClick={() => handleIncrement(item.id)}
                      className="w-6 h-6 rounded-lg bg-bakery-burgundy text-white flex items-center justify-center hover:bg-bakery-burgundyDark disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-signika font-bold text-bakery-burgundy">
                ₹{price}
              </span>
              <span className="text-xs text-stone-400 line-through">
                ₹{originalPrice}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold">
              Includes Custom Presentation Box & Wax Ribbon
            </span>
          </div>

          <button
            disabled={!isFull}
            onClick={handleAddToCart}
            className="flex-1 max-w-sm bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white py-3 px-6 rounded-2xl font-bold text-xs shadow-warm hover:shadow-warm-hover disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 text-bakery-gold" />
            <span>
              {isFull ? `Add Box of ${boxSize} to Basket` : `Pick ${boxSize - totalSelected} More Items`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
