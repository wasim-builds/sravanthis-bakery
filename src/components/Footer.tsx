import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-bakery-burgundyDark text-white border-t-4 border-bakery-gold">
      
      {/* Newsletter Bar */}
      <div className="bg-bakery-burgundy py-8 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-signika font-bold text-xl text-bakery-cream">
              Join the Fresh Bake Club & Save 10%
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Receive secret weekend bake drops, sourdough recipes, and special celebration offers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2.5 rounded-full text-xs text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-bakery-amber flex-1 min-w-[220px]"
            />
            <button
              type="submit"
              className="bg-bakery-amber hover:bg-bakery-crust text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow-sm flex items-center gap-1.5 transition-all shrink-0"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bakery-burgundy text-bakery-gold flex items-center justify-center font-bold text-xl border border-bakery-cream">
                🥐
              </div>
              <span className="font-signika text-2xl font-bold text-bakery-cream">
                Sravanthi's Bakery
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              Handcrafting traditional warmth and European baking excellence. Naturally wild-fermented sourdoughs, layered pure-butter croissants, rich artisanal cakes, and nostalgic treats baked fresh twice daily.
            </p>

            <div className="text-xs text-stone-400 space-y-1.5 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bakery-gold shrink-0" />
                <span>Bakehouse Kitchen: Plot 42, Silicon Valley Road, Kondapur, Hyderabad - 500084</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bakery-gold shrink-0" />
                <span>Hotline: +91 98765 43210 / +91 40 2345 6789</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bakery-gold shrink-0" />
                <span>Email: orders@sravanthisbakery.com</span>
              </p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-signika font-bold text-sm text-bakery-cream uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onSelectCategory('sourdough')} className="hover:text-bakery-gold transition-colors">
                  Artisanal Sourdough
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('croissants')} className="hover:text-bakery-gold transition-colors">
                  Butter Croissants & Flaky
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cakes')} className="hover:text-bakery-gold transition-colors">
                  Belgian Cakes & Gateaux
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cookies')} className="hover:text-bakery-gold transition-colors">
                  Crunchy Cookies & Biscotti
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('savoury')} className="hover:text-bakery-gold transition-colors">
                  Savoury Puffs & Quiches
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('healthy')} className="hover:text-bakery-gold transition-colors">
                  Millet & Healthy Bakes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-signika font-bold text-sm text-bakery-cream uppercase tracking-wider mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><a href="#track" className="hover:text-bakery-gold transition-colors">Track Live Order</a></li>
              <li><a href="#shipping" className="hover:text-bakery-gold transition-colors">Express Delivery Policy</a></li>
              <li><a href="#storage" className="hover:text-bakery-gold transition-colors">Bread Care & Storage Guide</a></li>
              <li><a href="#bulk" className="hover:text-bakery-gold transition-colors">Wedding & Custom Cake Inquiry</a></li>
              <li><a href="#faq" className="hover:text-bakery-gold transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#terms" className="hover:text-bakery-gold transition-colors">Terms of Service & Refund Policy</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Timings */}
          <div>
            <h4 className="font-signika font-bold text-sm text-bakery-cream uppercase tracking-wider mb-3">
              Kitchen Timings
            </h4>
            <div className="text-xs text-stone-300 space-y-2">
              <p>
                <strong>Batch #1 Out:</strong><br />
                7:00 AM (Warm Breakfast Breads)
              </p>
              <p>
                <strong>Batch #2 Out:</strong><br />
                3:30 PM (Evening Tea Croissants & Buns)
              </p>
              <div className="pt-2">
                <span className="inline-block bg-white/10 px-2.5 py-1 rounded text-[11px] font-semibold text-bakery-gold border border-bakery-gold/20">
                  FSSAI Lic: 13624014000321
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Sravanthi's Bakery (Inspired by Minnie Inti Ruchulu). All rights reserved.</p>
          
          <div className="flex items-center gap-2">
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">UPI</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">Google Pay</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">Visa</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">Mastercard</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">RuPay</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">NetBanking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
