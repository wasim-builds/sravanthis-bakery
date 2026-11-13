import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check, Sparkles } from 'lucide-react';
import { BakeryProduct, CartItem } from '../types/bakery';

interface ProductCardProps {
  product: BakeryProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: BakeryProduct) => void;
  onAddToCart: (item: CartItem) => void;
  onQuickView: (product: BakeryProduct) => void;
  onPersonalizeCake?: (product: BakeryProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onPersonalizeCake
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const discountPercent = Math.round(
    ((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      selectedWeight: currentVariant.weight,
      price: currentVariant.price,
      quantity: 1
    });

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1200);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-card hover:shadow-warm-hover transition-all duration-300 flex flex-col justify-between group">
      
      {/* Top Image Section */}
      <div className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-bakery-burgundy text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-bakery-amber text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              ⭐ Bestseller
            </span>
          )}
        </div>

        {/* Dietary Icon: Green Eggless / Veg Mark */}
        {product.isEggless && (
          <div className="absolute top-2.5 right-11 bg-white/90 backdrop-blur-xs p-1 rounded-sm shadow-xs border border-green-600/30">
            <div className="w-3.5 h-3.5 border border-green-600 flex items-center justify-center p-0.5">
              <div className="w-2 h-2 rounded-full bg-green-600" />
            </div>
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-white backdrop-blur-xs rounded-full shadow-md text-stone-600 hover:text-red-500 transition-colors z-10"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>

        {/* Hover Quick View Button */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-1.5 bg-white/95 text-bakery-burgundy hover:bg-bakery-burgundy hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm transition-all transform hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-bakery-crust">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-signika font-bold text-base text-bakery-burgundy group-hover:text-bakery-crust transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Weight Swatches (MinnieIntiRuchulu Style) */}
        <div>
          <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
            Select Size / Weight:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((variant, idx) => {
              const isSelected = selectedVariantIndex === idx;
              return (
                <button
                  key={variant.weight}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                    isSelected
                      ? 'bg-bakery-creamWarm text-bakery-burgundy border-2 border-bakery-burgundy font-bold shadow-xs'
                      : 'bg-stone-100 text-stone-600 border border-stone-200 hover:border-bakery-amber'
                  }`}
                >
                  {variant.weight}
                </button>
              );
            })}
          </div>
        </div>

        {/* Personalize Cake Button if Cake category */}
        {product.category.toLowerCase() === 'cakes' && onPersonalizeCake && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPersonalizeCake(product);
            }}
            className="w-full mt-2 py-1.5 px-2 bg-amber-50 hover:bg-amber-100/80 border border-amber-300 text-bakery-burgundy rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-bakery-amber" />
            <span>Personalize with Message</span>
          </button>
        )}

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
          
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-signika font-bold text-base sm:text-lg text-bakery-burgundy">
                ₹ {currentVariant.price.toFixed(2)}
              </span>
              {currentVariant.originalPrice > currentVariant.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹ {currentVariant.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-green-700 font-medium">In Stock · Baked Fresh</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isAddedFeedback}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold text-xs transition-all shadow-xs transform active:scale-95 ${
              isAddedFeedback
                ? 'bg-green-600 text-white'
                : 'bg-bakery-amber hover:bg-bakery-crust text-white hover:shadow-warm'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};
