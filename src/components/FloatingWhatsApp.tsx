import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Support chat" className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip */}
      <div className="hidden sm:block mr-3 bg-white text-stone-800 text-xs font-semibold py-1.5 px-3 rounded-full shadow-lg border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        👋 Need help ordering? Chat on WhatsApp
      </div>

      {/* Floating Action Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Sravanthi's%20Bakery!%20I%20have%20a%20question%20about%20your%20fresh%20bakes."
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-bakery-whatsapp hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-warm hover:shadow-2xl transition-all transform hover:scale-110 active:scale-95 animate-pulse"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
      </a>
    </aside>
  );
};
