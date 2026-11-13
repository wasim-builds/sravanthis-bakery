import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, Check, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/bakery';

export interface BreadPlan {
  id: string;
  name: string;
  weight: string;
  basePrice: number;
  discountedPrice: number;
  description: string;
  image: string;
  badge?: string;
}

export const SUBSCRIPTION_BREADS: BreadPlan[] = [
  {
    id: 'country-sourdough',
    name: 'San Francisco Country Sourdough',
    weight: '850g Family Loaf',
    basePrice: 320,
    discountedPrice: 288,
    description: 'Wild yeast levain fermented for 36 hours. Open airy crumb with blistered, caramelized crust.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller'
  },
  {
    id: 'whole-wheat-flax',
    name: '100% Whole Wheat & Roasted Flax',
    weight: '800g Hearth Loaf',
    basePrice: 290,
    discountedPrice: 261,
    description: 'Stoneground Khapli emmer wheat with roasted golden flax seeds. High fiber & nutrient rich.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    badge: 'High Fiber'
  },
  {
    id: 'garlic-rosemary',
    name: 'Roasted Garlic & Fresh Rosemary Boule',
    weight: '750g Artisan Boule',
    basePrice: 350,
    discountedPrice: 315,
    description: 'Infused with slow-confit whole garlic cloves and aromatic garden rosemary in virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    badge: 'Chef Favorite'
  },
  {
    id: 'olive-sundried-tomato',
    name: 'Kalamata Olive & Sun-Dried Tomato',
    weight: '800g Batard',
    basePrice: 375,
    discountedPrice: 335,
    description: 'Greek Kalamata olives paired with tangy sun-dried tomatoes and Mediterranean oregano.',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'german-rye',
    name: 'Traditional German Vollkornbrot (Rye)',
    weight: '650g Dense Block',
    basePrice: 345,
    discountedPrice: 310,
    description: 'Authentic 100% dark rye sourdough with sunflower seeds and pumpkin kernels. Gut healthy.',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=600&q=80',
    badge: '100% Rye'
  }
];

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedBread, setSelectedBread] = useState<string>('country-sourdough');
  const [frequency, setFrequency] = useState<'1x' | '2x' | 'daily'>('2x');
  const [slot, setSlot] = useState<'morning' | 'evening'>('morning');
  const [planDuration, setPlanDuration] = useState<'4weeks' | '12weeks'>('4weeks');
  const [deliveryDays, setDeliveryDays] = useState<string[]>(['Tuesday', 'Friday']);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeBread = SUBSCRIPTION_BREADS.find(b => b.id === selectedBread) || SUBSCRIPTION_BREADS[0];

  // Frequency calculations
  const deliveriesPerWeek = frequency === '1x' ? 1 : frequency === '2x' ? 2 : 6;
  const totalWeeks = planDuration === '4weeks' ? 4 : 12;
  const totalDeliveries = deliveriesPerWeek * totalWeeks;

  // Additional 5% discount for 12 weeks commitment
  const durationMultiplier = planDuration === '12weeks' ? 0.85 : 0.90;
  const unitPrice = Math.round(activeBread.basePrice * durationMultiplier);
  const totalPrice = unitPrice * totalDeliveries;
  const originalTotalPrice = activeBread.basePrice * totalDeliveries;
  const totalSavings = originalTotalPrice - totalPrice;

  const handleDayToggle = (day: string) => {
    if (frequency === '1x') {
      setDeliveryDays([day]);
    } else if (frequency === '2x') {
      if (deliveryDays.includes(day)) {
        if (deliveryDays.length > 1) {
          setDeliveryDays(deliveryDays.filter(d => d !== day));
        }
      } else {
        if (deliveryDays.length >= 2) {
          setDeliveryDays([deliveryDays[1], day]);
        } else {
          setDeliveryDays([...deliveryDays, day]);
        }
      }
    }
  };

  const handleFrequencyChange = (freq: '1x' | '2x' | 'daily') => {
    setFrequency(freq);
    if (freq === '1x') setDeliveryDays(['Saturday']);
    else if (freq === '2x') setDeliveryDays(['Tuesday', 'Friday']);
    else setDeliveryDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  };

  const handleWhatsAppActivate = () => {
    setIsSubmitting(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const msg = 
      `*🍞 NEW SRAVANTHI'S BREAD CLUB SUBSCRIPTION*\n` +
      `-----------------------------------------\n` +
      `*Plan*: ${activeBread.name} (${activeBread.weight})\n` +
      `*Schedule*: ${frequency.toUpperCase()} (${deliveryDays.join(', ')})\n` +
      `*Delivery Slot*: ${slot === 'morning' ? 'Morning (7:00 - 8:30 AM)' : 'Evening (5:00 - 6:30 PM)'}\n` +
      `*Duration*: ${planDuration === '4weeks' ? '1 Month (4 Weeks)' : '3 Months Season Pass (12 Weeks)'}\n` +
      `*Total Deliveries*: ${totalDeliveries} warm loaves\n` +
      `*Total Amount*: ₹${totalPrice.toLocaleString('en-IN')} (Saved ₹${totalSavings.toLocaleString('en-IN')} with Bread Club 10% Discount)\n` +
      `*Free Doorstep Delivery*: Guaranteed\n` +
      `-----------------------------------------\n` +
      `*Customer*: ${customerName || 'Loyal Bread Lover'}\n` +
      `*Phone*: ${customerPhone || 'Provided on WhatsApp'}\n` +
      `*Address*: ${customerAddress || 'Please confirm address'}\n` +
      `-----------------------------------------\n` +
      `_Please confirm my subscription schedule & share ICICI UPI payment link!_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: `sub-${activeBread.id}-${frequency}-${planDuration}`,
      name: `Bread Club: ${activeBread.name} (${frequency.toUpperCase()} - ${planDuration === '4weeks' ? '4 Wks' : '12 Wks'})`,
      selectedWeight: `${totalDeliveries} Loaves (${activeBread.weight})`,
      price: totalPrice,
      image: activeBread.image,
      quantity: 1,
      customMessage: `Delivery Days: ${deliveryDays.join(', ')} | Slot: ${slot === 'morning' ? 'Morning (7:00 - 8:30 AM)' : 'Evening (5:00 - 6:30 PM)'} | Zero delivery fee`
    });

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });

    onClose();
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-lg bg-[#FCF7F0] rounded-2xl shadow-2xl border border-[#F1DBBB] p-8 text-center animate-scale-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
            <Check className="w-8 h-8 text-green-700" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#56150E] mb-2">
            Subscription Request Sent!
          </h3>
          <p className="text-sm text-stone-600 mb-6 leading-relaxed">
            WhatsApp conversation opened with Sravanthi's Bakery team. We will verify your doorstep address and schedule your first hot bake delivery!
          </p>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/80 text-left text-xs space-y-1.5 mb-6 text-stone-700">
            <p><strong>Loaf:</strong> {activeBread.name}</p>
            <p><strong>Schedule:</strong> {frequency.toUpperCase()} ({deliveryDays.join(', ')})</p>
            <p><strong>Slot:</strong> {slot === 'morning' ? 'Morning (7:00 – 8:30 AM)' : 'Evening (5:00 – 6:30 PM)'}</p>
            <p><strong>Total Deliveries:</strong> {totalDeliveries} warm loaves (Saved ₹{totalSavings})</p>
          </div>
          <button
            onClick={() => {
              setIsSuccess(false);
              onClose();
            }}
            className="w-full py-3 bg-[#56150E] text-[#F1DBBB] rounded-xl font-bold hover:bg-[#3d0f0a] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#FCF7F0] rounded-2xl shadow-2xl border border-[#F1DBBB]/60 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-[#56150E] text-[#F1DBBB] flex items-center justify-between border-b border-[#F1DBBB]/20">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-[#F1DBBB]/10 rounded-xl text-[#F1DBBB] border border-[#F1DBBB]/20">
              <Calendar className="w-6 h-6 text-[#F1DBBB]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
                  Sravanthi's Artisan Bread Club
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-500 text-stone-950 rounded-full tracking-wider uppercase font-sans animate-pulse">
                  Save 10% – 15%
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#F1DBBB]/80 font-sans mt-0.5">
                Never run out of warm, wild-fermented sourdough. Delivered at 7 AM before breakfast.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#F1DBBB] transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1: Select Your Staple Loaf */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#56150E] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#56150E] text-[#F1DBBB] flex items-center justify-center text-xs">1</span>
                Choose Your Daily Staple Loaf
              </h3>
              <span className="text-xs text-[#8B4513] font-medium">Bake fermented for 36 hours</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SUBSCRIPTION_BREADS.map(bread => {
                const isSelected = selectedBread === bread.id;
                return (
                  <div
                    key={bread.id}
                    onClick={() => setSelectedBread(bread.id)}
                    className={`cursor-pointer rounded-xl p-3 border transition-all text-left relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#56150E] bg-white ring-2 ring-[#56150E]/20 shadow-md'
                        : 'border-[#F1DBBB] bg-[#FFFBF7] hover:border-[#8B4513]/50'
                    }`}
                  >
                    {bread.badge && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-semibold bg-[#8B4513] text-white rounded-full">
                        {bread.badge}
                      </span>
                    )}
                    <div>
                      <img 
                        src={bread.image} 
                        alt={bread.name} 
                        className="w-full h-24 object-cover rounded-lg mb-2 shadow-sm"
                      />
                      <h4 className="font-serif font-bold text-sm text-[#56150E] leading-snug">
                        {bread.name}
                      </h4>
                      <p className="text-[11px] text-[#8B4513] font-medium mt-0.5">{bread.weight}</p>
                      <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                        {bread.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#F1DBBB]/40 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#56150E]">₹{bread.discountedPrice}</span>
                        <span className="text-xs text-stone-400 line-through">₹{bread.basePrice}</span>
                        <span className="text-[10px] text-green-700 font-semibold">/ loaf</span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#56150E] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Frequency & Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#F1DBBB]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#56150E] flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#56150E] text-[#F1DBBB] flex items-center justify-center text-xs">2</span>
                Delivery Frequency
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1x', label: '1x / Week', desc: '4 loaves / mo', sub: 'Weekend table' },
                  { id: '2x', label: '2x / Week', desc: '8 loaves / mo', sub: 'Most Popular', highlight: true },
                  { id: 'daily', label: 'Daily (6x)', desc: '24 loaves / mo', sub: 'For large families' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleFrequencyChange(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      frequency === item.id
                        ? 'border-[#56150E] bg-white ring-2 ring-[#56150E]/20 shadow-sm'
                        : 'border-[#F1DBBB] bg-[#FFFBF7] hover:border-[#8B4513]/40'
                    }`}
                  >
                    {item.highlight && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.2 text-[9px] font-bold bg-[#C86A24] text-white rounded-full whitespace-nowrap shadow-xs">
                        {item.sub}
                      </span>
                    )}
                    <div className="font-serif font-bold text-sm text-[#56150E]">{item.label}</div>
                    <div className="text-[11px] text-[#8B4513] font-medium">{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Day Selector (for 1x and 2x) */}
              {frequency !== 'daily' && (
                <div className="mt-3">
                  <label className="text-xs text-stone-600 block mb-1.5 font-medium">
                    Select your {frequency === '1x' ? 'preferred delivery day' : 'two delivery days'}:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                      const isPicked = deliveryDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleDayToggle(day)}
                          className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
                            isPicked
                              ? 'bg-[#56150E] text-white border-[#56150E]'
                              : 'bg-white text-stone-700 border-[#F1DBBB] hover:border-[#8B4513]'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Time Slot & Plan Duration */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#56150E] flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#56150E] text-[#F1DBBB] flex items-center justify-center text-xs">3</span>
                  Preferred Delivery Window
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSlot('morning')}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                      slot === 'morning'
                        ? 'border-[#56150E] bg-white ring-2 ring-[#56150E]/20 shadow-sm'
                        : 'border-[#F1DBBB] bg-[#FFFBF7]'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-[#8B4513]" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#56150E]">Early Morning</div>
                      <div className="text-[11px] text-stone-500">7:00 AM – 8:30 AM</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSlot('evening')}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                      slot === 'evening'
                        ? 'border-[#56150E] bg-white ring-2 ring-[#56150E]/20 shadow-sm'
                        : 'border-[#F1DBBB] bg-[#FFFBF7]'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-[#8B4513]" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#56150E]">Evening Dinner</div>
                      <div className="text-[11px] text-stone-500">5:00 PM – 6:30 PM</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Commitment Plan */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#56150E] block mb-2">
                  Subscription Duration & Extra Savings
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlanDuration('4weeks')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      planDuration === '4weeks'
                        ? 'border-[#56150E] bg-white ring-2 ring-[#56150E]/20 shadow-sm'
                        : 'border-[#F1DBBB] bg-[#FFFBF7]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#56150E]">1 Month Trial</span>
                      <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">10% OFF</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">4 weeks commitment</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlanDuration('12weeks')}
                    className={`p-2.5 rounded-xl border text-left transition-all relative ${
                      planDuration === '12weeks'
                        ? 'border-[#56150E] bg-white ring-2 ring-[#56150E]/20 shadow-sm'
                        : 'border-[#F1DBBB] bg-[#FFFBF7]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#56150E]">3 Months Pass</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">15% OFF</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">12 weeks (Best Value)</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery & Contact Details */}
          <div className="pt-3 border-t border-[#F1DBBB]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#56150E] flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[#56150E] text-[#F1DBBB] flex items-center justify-center text-xs">4</span>
              Doorstep Delivery Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sravanthi Reddy"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#F1DBBB] bg-white focus:outline-none focus:border-[#56150E]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#F1DBBB] bg-white focus:outline-none focus:border-[#56150E]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">Address & Pincode</label>
                <input
                  type="text"
                  placeholder="Flat, building, street, pincode"
                  value={customerAddress}
                  onChange={e => setCustomerAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#F1DBBB] bg-white focus:outline-none focus:border-[#56150E]"
                />
              </div>
            </div>
          </div>

          {/* Bread Club Guarantees */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8B4513]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span><strong>Pause Anytime:</strong> Travelling? Pause or resume with 1 click on WhatsApp.</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8B4513]" />
              <span><strong>Free Delivery:</strong> Zero shipping fees on all subscription cycles.</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span><strong>5 AM Warm Bake:</strong> Fresh out of oven straight to your porch.</span>
            </div>
          </div>
        </div>

        {/* Footer & Action Bar */}
        <div className="px-6 py-4 bg-white border-t border-[#F1DBBB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold text-[#56150E]">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-stone-400 line-through">
                ₹{originalTotalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                Save ₹{totalSavings.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Includes {totalDeliveries} fresh deliveries (₹{unitPrice}/loaf) • Doorstep delivery included
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#56150E] text-[#56150E] hover:bg-[#56150E]/5 text-xs font-bold tracking-wide transition-colors"
            >
              Add To Cart
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleWhatsAppActivate}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Activate via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
