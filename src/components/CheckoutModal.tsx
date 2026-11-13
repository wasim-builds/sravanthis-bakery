import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/bakery';
import { UpiPaymentWidget } from './UpiPaymentWidget';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState(() => {
    return localStorage.getItem('sravanthi_bakery_pincode') || '500081';
  });
  const [timeSlot, setTimeSlot] = useState('Morning 7:00 AM – 10:00 AM (Fresh Morning Bake)');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const randomId = 'SB-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderConfirmed(true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-bakery-burgundy text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥖</span>
            <span className="font-signika font-bold text-lg text-bakery-cream">
              {orderConfirmed ? 'Order Confirmed!' : 'Express Checkout'}
            </span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="font-signika font-bold text-2xl text-bakery-burgundy">
              Thank You for Your Order!
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
              Your order <strong className="text-bakery-crust">#{orderId}</strong> has been received by our head baker. We will dispatch your oven-fresh treats for the selected slot:
            </p>

            <div className="bg-bakery-creamWarm p-3.5 rounded-xl border border-bakery-cream text-xs text-stone-700 text-left space-y-1">
              <p><strong>Customer:</strong> {name} ({phone})</p>
              <p><strong>Delivery To:</strong> {address}, {pincode}</p>
              <p><strong>Dispatch Window:</strong> {timeSlot}</p>
              <p><strong>Total Amount:</strong> ₹{total.toFixed(2)} ({paymentMethod.toUpperCase()})</p>
            </div>

            {paymentMethod === 'upi' && (
              <UpiPaymentWidget amount={total} orderId={orderId} />
            )}

            <p className="text-[11px] text-stone-400">
              A confirmation WhatsApp & SMS receipt has been dispatched to your phone.
            </p>

            <button
              onClick={onClose}
              className="bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Quick Order Overview */}
            <div className="bg-bakery-creamLight p-3 rounded-xl border border-stone-200 text-xs flex justify-between items-center text-stone-700">
              <span>{items.reduce((acc, it) => acc + it.quantity, 0)} Items in Basket</span>
              <span className="font-bold text-bakery-burgundy text-sm">Total: ₹{total.toFixed(2)}</span>
            </div>

            {/* Personal Details */}
            <div className="space-y-3">
              <h4 className="font-signika font-bold text-sm text-bakery-burgundy flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-bakery-amber" /> 1. Delivery Contact & Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-bakery-burgundy"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-bakery-burgundy"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat/House No, Building name, Street, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-bakery-burgundy"
                />
              </div>

              <div className="w-1/2">
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Postal Pincode *</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:outline-none focus:border-bakery-burgundy"
                />
              </div>
            </div>

            {/* Delivery Slot */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <h4 className="font-signika font-bold text-sm text-bakery-burgundy flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-bakery-amber" /> 2. Preferred Fresh Delivery Slot
              </h4>

              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-bakery-burgundy font-medium text-stone-700"
              >
                <option value="Morning 7:00 AM – 10:00 AM (Fresh Morning Bake)">
                  🌅 Morning 7:00 AM – 10:00 AM (Fresh Morning Bake)
                </option>
                <option value="Afternoon 1:00 PM – 4:00 PM (Fresh Noon Batch)">
                  ☀️ Afternoon 1:00 PM – 4:00 PM (Fresh Noon Batch)
                </option>
                <option value="Evening 5:00 PM – 8:00 PM (Evening Tea Treats)">
                  🌆 Evening 5:00 PM – 8:00 PM (Evening Tea Treats)
                </option>
              </select>
            </div>

            {/* Payment Method */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <h4 className="font-signika font-bold text-sm text-bakery-burgundy flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-bakery-amber" /> 3. Payment Method
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR Code' },
                  { id: 'card', label: 'Cards' },
                  { id: 'cod', label: 'Pay on Delivery' }
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`py-2 px-2 text-xs rounded-lg font-medium text-center border transition-all ${
                      paymentMethod === m.id
                        ? 'bg-bakery-burgundy text-white border-bakery-burgundy font-bold shadow-xs'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'upi' && (
                <UpiPaymentWidget amount={total} orderId="PREVIEW" />
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white py-3 rounded-xl font-bold text-sm shadow-warm hover:shadow-warm-hover transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-bakery-gold" />
                <span>Confirm Order · ₹{total.toFixed(2)}</span>
              </button>
              <p className="text-[10px] text-stone-400 text-center mt-2">
                🔒 Safe & encrypted checkout · 100% Satisfaction Guarantee
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
