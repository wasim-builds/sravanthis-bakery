import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { BakeryProduct, CartItem } from '../types/bakery';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: BakeryProduct[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (item: CartItem) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-bakery-creamWarm">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            <span className="font-signika font-bold text-lg text-bakery-burgundy">
              Your Wishlist ({wishlist.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-stone-100">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-bakery-creamWarm flex items-center justify-center text-3xl">
                ❤️
              </div>
              <h3 className="font-signika font-bold text-lg text-bakery-burgundy">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Save your favorite breads, croissants, and celebratory cakes here to order later!
              </p>
            </div>
          ) : (
            wishlist.map((prod) => {
              const defaultVariant = prod.variants[0];

              return (
                <div key={prod.id} className="pt-3.5 first:pt-0 flex gap-3 items-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-16 h-16 rounded-lg object-cover border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-signika font-bold text-sm text-bakery-burgundy truncate">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-stone-500">{prod.category} · {defaultVariant.weight}</p>
                    <p className="text-xs font-bold text-stone-900 mt-0.5">
                      ₹ {defaultVariant.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onAddToCart({
                          productId: prod.id,
                          name: prod.name,
                          image: prod.image,
                          selectedWeight: defaultVariant.weight,
                          price: defaultVariant.price,
                          quantity: 1
                        });
                        onRemoveFromWishlist(prod.id);
                      }}
                      className="bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white p-2 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs"
                      title="Move to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(prod.id)}
                      className="text-stone-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200">
          <button
            onClick={onClose}
            className="w-full bg-bakery-amber hover:bg-bakery-crust text-white py-2.5 rounded-xl font-semibold text-xs transition-colors"
          >
            Back to Bakes
          </button>
        </div>
      </div>
    </div>
  );
};
