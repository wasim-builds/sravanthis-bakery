import React from 'react';
import { Truck, MessageCircle, Clock, Calendar } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenSubscription?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenSubscription }) => {
  return (
    <div className="bg-bakery-burgundyDark text-bakery-cream text-xs sm:text-sm py-2 px-4 border-b border-bakery-burgundy">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-bakery-gold shrink-0 animate-pulse" />
          <span>
            <strong className="text-white">Worldwide & Pan-India Express Delivery:</strong> Vacuum-sealed fresh shipping!
          </span>
          {onOpenSubscription && (
            <button
              onClick={onOpenSubscription}
              className="hidden lg:inline-flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-bakery-gold border border-bakery-gold/40 px-2 py-0.5 rounded-full font-semibold transition-colors text-[11px] ml-2"
            >
              <Calendar className="w-3 h-3 text-bakery-amber" />
              <span>Bread Club (Save 10%)</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <span className="hidden md:flex items-center gap-1.5 text-bakery-cream/90">
            <Clock className="w-3.5 h-3.5 text-bakery-amber" /> Fresh batches dispatched twice daily (7 AM & 3 PM)
          </span>
          <a 
            href="https://wa.me/919876543210?text=Hi%20Sravanthi's%20Bakery,%20I%20would%20like%20to%20order%20fresh%20bakes!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white hover:text-bakery-gold font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-bakery-whatsapp" />
            <span>Order via WhatsApp: <strong>+91 98765 43210</strong></span>
          </a>
        </div>
      </div>
    </div>
  );
};
