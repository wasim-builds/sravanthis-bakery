import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Clock, MessageCircle, Check, Sparkles } from 'lucide-react';
import { BakeryProduct, CartItem } from '../types/bakery';

interface ProductQuickViewModalProps {
  product: BakeryProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onPersonalizeCake?: (product: BakeryProduct) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onPersonalizeCake
}) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      selectedWeight: currentVariant.weight,
      price: currentVariant.price,
      quantity: quantity
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Sravanthi's Bakery! I'd like to order: ${product.name} (${currentVariant.weight}) x ${quantity} qty for ₹${currentVariant.price * quantity}.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-800 bg-white/80 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-stone-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isEggless && (
              <span className="absolute bottom-3 left-3 bg-white/95 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-600" /> 100% Eggless
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-bakery-crust">
                {product.category}
              </span>
              
              <h2 className="font-signika font-bold text-xl text-bakery-burgundy mt-1">
                {product.name}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-stone-700">{product.rating.toFixed(1)}</span>
                <span>({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-3">
                <span className="font-signika font-bold text-2xl text-bakery-burgundy">
                  ₹ {(currentVariant.price * quantity).toFixed(2)}
                </span>
                {currentVariant.originalPrice > currentVariant.price && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹ {(currentVariant.originalPrice * quantity).toFixed(2)}
                  </span>
                )}
                <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                  Save ₹{((currentVariant.originalPrice - currentVariant.price) * quantity).toFixed(0)}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Size / Weight Selection */}
              <div className="mt-4">
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Select Size / Package:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.weight}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                        selectedVariantIdx === idx
                          ? 'bg-bakery-burgundy text-white font-bold shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {v.weight} - ₹{v.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ingredients & Shelf Life */}
              <div className="mt-4 pt-3 border-t border-stone-100 text-xs space-y-1.5 text-stone-600">
                <div className="flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-bakery-crust shrink-0 mt-0.5" />
                  <span><strong>Ingredients:</strong> {product.ingredients.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-bakery-amber shrink-0" />
                  <span><strong>Shelf Life:</strong> {product.shelfLife}</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + WhatsApp */}
            <div className="space-y-2.5 pt-2">
              {/* Cake Customization Trigger */}
              {product.category.toLowerCase() === 'cakes' && onPersonalizeCake && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onPersonalizeCake(product);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100/80 text-bakery-burgundy border border-amber-300 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-bakery-amber" />
                  <span>Personalize with Piping Message & Plaque</span>
                </button>
              )}
              <div className="flex items-center gap-3">
                
                {/* Quantity adjust */}
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-stone-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm shadow-md transition-all ${
                    isAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart · ₹{(currentVariant.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Quick Order Link */}
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-300 py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-bakery-whatsapp" />
                <span>Instant Order via WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
