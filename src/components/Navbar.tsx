import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, PhoneCall, Sparkles, Calendar } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSubscription?: () => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSubscription,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const navLinks = [
    { id: 'all', label: 'Shop All' },
    { id: 'sourdough', label: 'Sourdough' },
    { id: 'croissants', label: 'Croissants' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'cookies', label: 'Cookies & Biscotti' },
    { id: 'savoury', label: 'Savoury Puffs' },
    { id: 'healthy', label: 'Millet & Healthy' },
    { id: 'about', label: 'Our Story' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-bakery-burgundy hover:bg-bakery-creamWarm rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setShowSearchMobile(!showSearchMobile)}
              className="p-2 text-bakery-burgundy hover:bg-bakery-creamWarm rounded-lg focus:outline-none ml-1"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo / Brand Name */}
          <div className="flex items-center cursor-pointer" onClick={() => onSelectCategory('all')}>
            <div className="w-11 h-11 rounded-full bg-bakery-burgundy text-bakery-gold flex items-center justify-center font-bold text-2xl shadow-inner mr-3 shrink-0 border-2 border-bakery-cream">
              🥐
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-signika text-2xl sm:text-3xl font-bold tracking-tight text-bakery-burgundy">
                  Sravanthi's
                </span>
                <span className="font-signika text-xl sm:text-2xl font-normal text-bakery-crust">
                  Bakery
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-stone-500 font-medium tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-bakery-amber" /> Handcrafted Inti Ruchulu
              </p>
            </div>
          </div>

          {/* Search bar on Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search sourdough, chocolate cakes, croissants, cookies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bakery-burgundy/30 focus:border-bakery-burgundy text-sm text-stone-800 transition-all placeholder:text-stone-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600 text-xs bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bread Club Subscription Button */}
            {onOpenSubscription && (
              <button
                onClick={onOpenSubscription}
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-full transition-all shadow-2xs hover:scale-105"
                title="Sravanthi's Artisan Bread Club"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>Bread Club <span className="text-[10px] bg-amber-700 text-white font-bold px-1.5 py-0.2 rounded-full ml-0.5">10% OFF</span></span>
              </button>
            )}

            {/* Quick Call / Help */}
            <a
              href="tel:+919876543210"
              className="hidden sm:flex items-center gap-1.5 text-xs text-stone-600 hover:text-bakery-burgundy px-3 py-1.5 rounded-full border border-stone-200 hover:border-bakery-burgundy/40 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-bakery-amber" />
              <span className="font-medium">Call Us</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-stone-700 hover:text-bakery-burgundy hover:bg-bakery-creamWarm rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Total */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-sm hover:shadow-warm transition-all transform active:scale-95 group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-bakery-cream group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bakery-amber text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col items-start text-left leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-bakery-cream font-medium">Cart</span>
                <span className="text-xs font-bold text-white">₹ {cartTotal.toFixed(2)}</span>
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Expansion */}
        {showSearchMobile && (
          <div className="py-2.5 px-1 border-t border-stone-100 lg:hidden">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search all bakes, cakes, breads..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-300 bg-stone-50 focus:outline-none focus:border-bakery-burgundy text-sm"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            </div>
          </div>
        )}

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-center border-t border-stone-100 py-2.5 gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = selectedCategory === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectCategory(link.id)}
                className={`transition-all pb-0.5 border-b-2 ${
                  isActive
                    ? 'border-bakery-burgundy text-bakery-burgundy font-semibold'
                    : 'border-transparent text-stone-600 hover:text-bakery-burgundy hover:border-bakery-amber/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-black/40 z-50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="font-signika font-bold text-lg text-bakery-burgundy">Sravanthi's Bakery</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-3 mt-4">
                {onOpenSubscription && (
                  <button
                    onClick={() => {
                      onOpenSubscription();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold bg-amber-100 text-amber-900 border border-amber-300 transition-colors shadow-2xs"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-700" />
                      Artisan Bread Club
                    </span>
                    <span className="text-[10px] font-bold bg-amber-700 text-white px-2 py-0.5 rounded-full">Save 10%</span>
                  </button>
                )}
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onSelectCategory(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === link.id
                        ? 'bg-bakery-burgundy text-white font-semibold'
                        : 'text-stone-700 hover:bg-bakery-creamWarm'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-100 pt-4 text-xs text-stone-500 space-y-2">
              <p>📍 Fresh Bakes, Kondapur & Banjara Hills, Hyderabad</p>
              <p>⏰ Open Daily: 7:00 AM – 10:30 PM</p>
              <a
                href="https://wa.me/919876543210"
                className="flex items-center justify-center gap-2 bg-bakery-whatsapp text-white py-2.5 rounded-lg font-semibold mt-2"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
