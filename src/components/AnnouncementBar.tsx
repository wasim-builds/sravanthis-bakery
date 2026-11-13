import React from 'react';
import { Truck, MessageCircle, Clock, Calendar } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenSubscription?: () => void;
  onOpenOrderTracking?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ 
  onOpenSubscription,
  onOpenOrderTracking 
}) => {
  return (
    <div className="bg-bakery-burgundyDark text-bakery-cream text-xs sm:text-sm py-2 px-3 sm:px-4 border-b border-bakery-burgundy">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-bakery-gold shrink-0 animate-pulse" />
            <span>
              <strong className="text-white">Worldwide & Pan-India:</strong> Vacuum-sealed fresh delivery!
            </span>
          </div>

          {onOpenOrderTracking && (
            <button
              onClick={onOpenOrderTracking}
              className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-bakery-cream hover:text-white border border-white/20 px-2 py-0.5 rounded-full font-semibold transition-colors text-[11px]"
            >
              <span>📍 Track Order</span>
            </button>
          )}

          {onOpenSubscription && (
            <button
              onClick={onOpenSubscription}
              className="hidden lg:inline-flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-bakery-gold border border-bakery-gold/40 px-2.5 py-0.5 rounded-full font-semibold transition-colors text-[11px]"
            >
              <Calendar className="w-3 h-3 text-bakery-amber" />
              <span>Bread Club (Save 10%)</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <span className="hidden md:flex items-center gap-1.5 text-bakery-cream/90">
            <Clock className="w-3.5 h-3.5 text-bakery-amber" /> Fresh batches twice daily (7 AM & 3 PM)
          </span>
          <a 
            href="https://wa.me/919876543210?text=Hi%20Sravanthi's%20Bakery,%20I%20would%20like%20to%20order%20fresh%20bakes!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white hover:text-bakery-gold font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-bakery-whatsapp" />
            <span>Order on WhatsApp: <strong>+91 98765 43210</strong></span>
          </a>
        </div>
      </div>
    </div>
  );
};
