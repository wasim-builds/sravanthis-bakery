import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types/bakery';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, weight: string, newQty: number) => void;
  onRemoveItem: (productId: string, weight: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [orderNote, setOrderNote] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const deliveryFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;

  // Build WhatsApp pre-filled order string
  const orderListText = items
    .map((item, idx) => `${idx + 1}. ${item.name} (${item.selectedWeight}) x ${item.quantity} = ₹${item.price * item.quantity}`)
    .join('%0A');

  const whatsappOrderUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Sravanthi's Bakery! 🥖%0AI would like to place an order:%0A%0A${decodeURIComponent(orderListText)}%0A%0ASubtotal: ₹${subtotal}%0ADelivery: ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}%0ATotal: ₹${total}%0A${orderNote ? 'Special Note: ' + orderNote : ''}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-bakery-creamWarm">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-bakery-burgundy" />
            <span className="font-signika font-bold text-lg text-bakery-burgundy">
              Your Fresh Basket ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-4 bg-bakery-creamLight border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span className="text-bakery-crust">
                Add <strong>₹{remainingForFreeShipping}</strong> more for <span className="text-green-700 underline font-bold">FREE Express Delivery</span>!
              </span>
            ) : (
              <span className="text-green-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> You unlocked FREE Express Delivery!
              </span>
            )}
            <span className="text-stone-500">{shippingPercent}%</span>
          </div>

          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-bakery-amber to-green-600 rounded-full transition-all duration-500"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Items Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-bakery-creamWarm flex items-center justify-center text-3xl">
                🥖
              </div>
              <h3 className="font-signika font-bold text-lg text-bakery-burgundy">Your basket is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Treat yourself to freshly baked sourdoughs, butter croissants, cakes, and artisan cookies!
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white px-5 py-2 rounded-full text-xs font-semibold shadow-xs"
              >
                Browse Fresh Bakes
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.selectedWeight}`} className="pt-3.5 first:pt-0 flex gap-3 items-center">
                
                {/* Product thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border border-stone-200 shrink-0 bg-stone-50"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-signika font-bold text-sm text-bakery-burgundy truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Package: <span className="text-bakery-crust font-semibold">{item.selectedWeight}</span>
                  </p>
                  <p className="text-xs font-bold text-stone-800 mt-0.5">
                    ₹ {item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-stone-50 shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.selectedWeight, item.quantity - 1)}
                    className="px-2 py-1 text-xs font-bold text-stone-600 hover:bg-stone-200"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.selectedWeight, item.quantity + 1)}
                    className="px-2 py-1 text-xs font-bold text-stone-600 hover:bg-stone-200"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.productId, item.selectedWeight)}
                  className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
            
            {/* Special Instructions Note */}
            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                Special Baking / Delivery Instructions:
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="e.g. Please slice sourdough thick, deliver before 8 AM..."
                rows={2}
                className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-bakery-burgundy bg-white"
              />
            </div>

            {/* Calculations */}
            <div className="space-y-1 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-900">₹ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Delivery:</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-bold uppercase">Free</span>
                  ) : (
                    `₹ ${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-bakery-burgundy pt-1.5 border-t border-stone-200">
                <span>Final Total:</span>
                <span className="text-base">₹ {total.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-stone-400 text-center">Inclusive of all local GST taxes</p>
            </div>

            {/* Checkout & WhatsApp Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white font-semibold py-3 px-4 rounded-xl shadow-warm hover:shadow-warm-hover transition-all text-sm group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-colors text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant 1-Click Order via WhatsApp</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
