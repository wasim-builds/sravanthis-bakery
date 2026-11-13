import React, { useState } from 'react';
import { X, Search, CheckCircle2, Flame, Clock, PackageCheck, Truck, MessageCircle, Sparkles } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = ''
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId || 'SB-729401');
  const [trackedOrder, setTrackedOrder] = useState(() => ({
    id: initialOrderId || 'SB-729401',
    customer: 'Valued Customer',
    items: 'San Francisco Sourdough (850g) + 2x Butter Croissants',
    timeOrdered: '06:15 AM Today',
    estimatedDelivery: '07:45 AM – 08:15 AM (Morning Batch)',
    currentStep: 2, // 1: Prepped, 2: Baking, 3: Packing, 4: Out for delivery
    batchNumber: 'BATCH-HYD-049',
    deliveryPartner: 'Dunzo Express Thermal Courier (Hyderabad Core)',
    hotOvenTemp: '240°C Wood-Fired Hearth'
  }));

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // Simulate looking up order
    const cleaned = searchInput.trim().toUpperCase();
    setTrackedOrder({
      id: cleaned.startsWith('SB-') ? cleaned : `SB-${cleaned}`,
      customer: 'Valued Customer',
      items: 'Artisanal Bakes & Loaves Assortment',
      timeOrdered: '06:30 AM Today',
      estimatedDelivery: '07:45 AM – 08:30 AM Today',
      currentStep: 2,
      batchNumber: `BATCH-${cleaned.slice(-4) || '9201'}`,
      deliveryPartner: 'Fresh Express Thermal Courier',
      hotOvenTemp: '240°C Stone Deck Hearth'
    });
  };

  const steps = [
    {
      step: 1,
      title: 'Flour Sifting & 36h Proofing',
      time: '05:00 AM',
      description: 'Organic unbleached flour fermented with wild levain culture.',
      icon: Clock,
      completed: true
    },
    {
      step: 2,
      title: 'Stone Hearth Baking (240°C)',
      time: '06:20 AM',
      description: 'Baking on European refractory stone for blistered, crackly ear crust.',
      icon: Flame,
      current: true,
      completed: false
    },
    {
      step: 3,
      title: 'Cooling & Eco Vacuum-Sealing',
      time: '07:05 AM (Est)',
      description: 'Cooled on artisan wire racks, vacuum-sealed to preserve moist crumb.',
      icon: PackageCheck,
      completed: false
    },
    {
      step: 4,
      title: 'Express Doorstep Delivery',
      time: '07:45 AM (Est)',
      description: 'Dispatched in insulated thermal pouch straight to your door.',
      icon: Truck,
      completed: false
    }
  ];

  const whatsappInquiryUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi Sravanthi's Bakery! I am tracking my order ${trackedOrder.id}. Could you please share the live delivery dispatch status?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-4 max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-bakery-burgundy to-bakery-burgundyDark text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-300 border border-orange-400/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-signika font-bold text-base sm:text-lg leading-tight">Live Oven & Order Tracker</h3>
              <p className="text-[11px] sm:text-xs text-bakery-cream/80">Real-time status from our stone ovens to your doorstep</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="p-4 bg-bakery-creamWarm/80 border-b border-stone-200 shrink-0">
          <form onSubmit={handleSearch} className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. SB-729401) or Phone"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg text-xs sm:text-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-bakery-burgundy/20 focus:border-bakery-burgundy bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-bakery-amber hover:bg-bakery-crust text-white text-xs font-bold rounded-lg transition-colors shrink-0"
            >
              Track
            </button>
          </form>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-left">
          {/* Order Overview Banner */}
          <div className="bg-bakery-creamLight rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-bakery-burgundy">{trackedOrder.id}</span>
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  {trackedOrder.batchNumber}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 line-clamp-1">{trackedOrder.items}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">Estimated Delivery</span>
              <span className="text-xs font-bold text-green-700">{trackedOrder.estimatedDelivery}</span>
            </div>
          </div>

          {/* Active Oven Alert */}
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-orange-50 border border-orange-200/80 text-xs text-orange-950">
            <Flame className="w-5 h-5 text-orange-600 shrink-0 animate-pulse" />
            <div>
              <strong>Currently In The Hearth:</strong> Baked at {trackedOrder.hotOvenTemp}. Aromas fill our Kondapur kitchen!
            </div>
          </div>

          {/* Timeline Visual Steps */}
          <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.step} className="relative flex items-start gap-4">
                  {/* Step Marker */}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                      st.completed
                        ? 'bg-green-600 border-green-600 text-white'
                        : st.current
                        ? 'bg-orange-500 border-orange-500 text-white ring-4 ring-orange-100 animate-pulse'
                        : 'bg-white border-stone-300 text-stone-400'
                    }`}
                  >
                    {st.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          st.current
                            ? 'text-orange-950 font-extrabold'
                            : st.completed
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {st.title}
                      </h4>
                      <span className="text-[10px] font-mono font-medium text-stone-500">{st.time}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{st.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Courier Details */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Courier: <strong>{trackedOrder.deliveryPartner}</strong></span>
            <span className="text-green-700 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Hot & Fresh
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-stone-100 flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-2.5 px-4 bg-bakery-whatsapp hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Delivery Status on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
