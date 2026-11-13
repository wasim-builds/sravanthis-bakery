import React, { useState, useEffect, useMemo } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { LiveBakingCountdown } from './components/LiveBakingCountdown';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryStoryBar } from './components/CategoryStoryBar';
import { PincodeChecker } from './components/PincodeChecker';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CustomCakeModal } from './components/CustomCakeModal';
import { AssortedBoxModal } from './components/AssortedBoxModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { ReviewSubmissionModal } from './components/ReviewSubmissionModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { TrustFeatures } from './components/TrustFeatures';
import { Testimonials } from './components/Testimonials';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PRODUCTS, TESTIMONIALS } from './data/bakeryProducts';
import { BakeryProduct, CartItem, CustomerReview } from './types/bakery';
import { SlidersHorizontal, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'eggless' | 'bestseller'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  
  // Persisted Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sravanthi_bakery_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persisted Wishlist
  const [wishlist, setWishlist] = useState<BakeryProduct[]>(() => {
    try {
      const saved = localStorage.getItem('sravanthi_bakery_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<BakeryProduct | null>(null);
  const [personalizingCake, setPersonalizingCake] = useState<BakeryProduct | null>(null);
  const [isAssortedBoxOpen, setIsAssortedBoxOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackedOrderId, setTrackedOrderId] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Persisted Customer Reviews
  const [testimonials, setTestimonials] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('sravanthi_bakery_custom_reviews');
      const customReviews: CustomerReview[] = saved ? JSON.parse(saved) : [];
      const defaultReviews: CustomerReview[] = TESTIMONIALS.map((t, idx) => ({
        id: `default-${idx}`,
        name: t.name,
        location: t.location,
        avatar: t.avatar,
        review: t.review,
        product: t.product,
        rating: t.rating,
        verified: true,
        date: 'Verified Buyer'
      }));
      return [...customReviews, ...defaultReviews];
    } catch {
      return TESTIMONIALS.map((t, idx) => ({
        id: `default-${idx}`,
        name: t.name,
        location: t.location,
        avatar: t.avatar,
        review: t.review,
        product: t.product,
        rating: t.rating,
        verified: true,
        date: 'Verified Buyer'
      }));
    }
  });

  const handleAddReview = (newReview: CustomerReview) => {
    setTestimonials((prev) => {
      const updated = [newReview, ...prev];
      try {
        const customReviews = updated.filter((r) => r.id.startsWith('rev-'));
        localStorage.setItem('sravanthi_bakery_custom_reviews', JSON.stringify(customReviews));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Sync cart & wishlist with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sravanthi_bakery_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sravanthi_bakery_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === item.productId && i.selectedWeight === item.selectedWeight
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (productId: string, weight: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, weight);
      return;
    }
    setCart((prev) =>
      prev.map((it) =>
        it.productId === productId && it.selectedWeight === weight
          ? { ...it, quantity: newQty }
          : it
      )
    );
  };

  const handleRemoveItem = (productId: string, weight: string) => {
    setCart((prev) =>
      prev.filter((it) => !(it.productId === productId && it.selectedWeight === weight))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: BakeryProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Cart statistics
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    const hasSearch = searchQuery.trim().length > 0;
    return PRODUCTS.filter((p) => {
      // Category filter: if searching, search across all categories
      if (!hasSearch && selectedCategory !== 'all' && selectedCategory !== 'about' && p.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'eggless' && !p.isEggless) {
        return false;
      }
      if (dietaryFilter === 'bestseller' && !p.isBestseller) {
        return false;
      }
      // Search query
      if (hasSearch) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesIngredients = p.ingredients.some((ing) => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.variants[0].price - b.variants[0].price;
      }
      if (sortBy === 'price-desc') {
        return b.variants[0].price - a.variants[0].price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, dietaryFilter, sortBy]);

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-bakery-creamLight text-bakery-espresso">
      
      {/* Top Banner & Header */}
      <AnnouncementBar 
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
      />
      <LiveBakingCountdown />
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(id) => {
          setSelectedCategory(id);
          scrollToProducts();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Hero Banner Section */}
        <HeroBanner
          onExploreClick={scrollToProducts}
          onCategoryClick={(catId) => {
            setSelectedCategory(catId);
            scrollToProducts();
          }}
          onOpenAssortedBox={() => setIsAssortedBoxOpen(true)}
          onOpenSubscription={() => setIsSubscriptionOpen(true)}
        />

        {/* Circular Story Category Selector */}
        <CategoryStoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            setSelectedCategory(id);
            scrollToProducts();
          }}
        />

        {/* Main Product Catalog Section */}
        <section id="products-section" className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          
          {/* Real-time Pincode & Express Delivery Checker */}
          <PincodeChecker />

          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🥖</span>
                <h2 className="font-signika font-bold text-2xl sm:text-3xl text-bakery-burgundy">
                  {selectedCategory === 'all'
                    ? 'All Artisanal Bakes & Treats'
                    : selectedCategory === 'sourdough'
                    ? 'Naturally Fermented Sourdoughs'
                    : selectedCategory === 'croissants'
                    ? 'Pure Normandy Butter Croissants'
                    : selectedCategory === 'cakes'
                    ? 'Signature Celebration Cakes'
                    : selectedCategory === 'cookies'
                    ? 'Handcrafted Cookies & Biscotti'
                    : selectedCategory === 'savoury'
                    ? 'Flaky Savoury Puffs & Quiches'
                    : selectedCategory === 'healthy'
                    ? 'Sprouted Millet & Wellness Bakes'
                    : 'Specialty Brews & Pantry'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Showing {filteredProducts.length} oven-fresh bakes available for today's batch.
              </p>
            </div>

            {/* Filter Pills & Sorting */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              
              {/* Dietary Filter Buttons */}
              <div className="flex items-center bg-white p-1 rounded-full border border-stone-200 text-xs shadow-2xs">
                <button
                  onClick={() => setDietaryFilter('all')}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                    dietaryFilter === 'all'
                      ? 'bg-bakery-burgundy text-white font-bold'
                      : 'text-stone-600 hover:text-bakery-burgundy'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter('eggless')}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1 ${
                    dietaryFilter === 'eggless'
                      ? 'bg-green-700 text-white font-bold'
                      : 'text-stone-600 hover:text-green-700'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  <span>100% Eggless</span>
                </button>
                <button
                  onClick={() => setDietaryFilter('bestseller')}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                    dietaryFilter === 'bestseller'
                      ? 'bg-bakery-amber text-white font-bold'
                      : 'text-stone-600 hover:text-bakery-amber'
                  }`}
                >
                  ⭐ Bestsellers
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="relative inline-flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500 absolute left-3 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="pl-8 pr-4 py-2 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-700 focus:outline-none focus:border-bakery-burgundy shadow-2xs cursor-pointer"
                >
                  <option value="featured">Sort: Featured Bakes</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

            </div>

          </div>

          {/* Active Search Notification */}
          {searchQuery && (
            <div className="mt-4 flex items-center justify-between bg-stone-100 px-4 py-2 rounded-xl text-xs text-stone-700">
              <span>
                Search results for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} items found)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-bakery-burgundy font-semibold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Product Cards Grid (4 Columns on Desktop, exactly like Minnie Inti Ruchulu) */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 mt-6 p-8">
              <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
              <h3 className="font-signika font-bold text-xl text-bakery-burgundy">No bakes matched your filter</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try selecting "All" or clearing the search query to explore our complete collection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setDietaryFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 bg-bakery-amber hover:bg-bakery-crust text-white text-xs font-bold px-4 py-2 rounded-full"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.some((p) => p.id === product.id);

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={isWishlisted}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onPersonalizeCake={(cake) => setPersonalizingCake(cake)}
                  />
                );
              })}
            </div>
          )}

        </section>

        {/* Why Choose Us & Trust Badges */}
        <TrustFeatures />

        {/* Real Customer Testimonials */}
        <Testimonials 
          testimonials={testimonials}
          onOpenWriteReview={() => setIsWriteReviewOpen(true)}
        />

        {/* Fresh from Oven Instagram Gallery */}
        <InstagramFeed />

      </main>

      {/* Comprehensive Footer */}
      <Footer 
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToProducts();
        }}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        onOpenWriteReview={() => setIsWriteReviewOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
      />

      {/* Modals & Slide-out Drawers */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onPersonalizeCake={(cake) => setPersonalizingCake(cake)}
      />

      <CustomCakeModal
        isOpen={!!personalizingCake}
        onClose={() => setPersonalizingCake(null)}
        cake={personalizingCake}
        onAddToCart={handleAddToCart}
      />

      <AssortedBoxModal
        isOpen={isAssortedBoxOpen}
        onClose={() => setIsAssortedBoxOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={(newId) => {
          if (newId) setTrackedOrderId(newId);
          handleClearCart();
        }}
        onTrackOrder={(id) => {
          setTrackedOrderId(id);
          setIsOrderTrackingOpen(true);
        }}
      />

      <ReviewSubmissionModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
      />

      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        initialOrderId={trackedOrderId}
      />

      {/* Sticky Bottom-Right WhatsApp Floating Action Button */}
      <FloatingWhatsApp />

    </div>
  );
};

export default App;
