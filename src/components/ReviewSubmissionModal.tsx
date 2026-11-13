import React, { useState } from 'react';
import { X, Star, Check, Heart, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CustomerReview } from '../types/bakery';
import { PRODUCTS } from '../data/bakeryProducts';

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: CustomerReview) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
];

export const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Hyderabad');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]?.name || 'San Francisco Country Sourdough');
  const [reviewText, setReviewText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) {
      alert('Please fill in your name and review message.');
      return;
    }

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || 'Hyderabad',
      avatar: selectedAvatar,
      rating,
      product: selectedProduct,
      review: reviewText.trim(),
      date: 'Just now',
      verified: true
    };

    onSubmitReview(newReview);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setName('');
      setReviewText('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-4 max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-bakery-burgundy to-bakery-burgundyDark text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-bakery-gold/20 flex items-center justify-center text-bakery-gold border border-bakery-gold/30">
              <Star className="w-5 h-5 fill-bakery-gold text-bakery-gold" />
            </div>
            <div>
              <h3 className="font-signika font-bold text-base sm:text-lg leading-tight">Share Your Bakery Love</h3>
              <p className="text-[11px] sm:text-xs text-bakery-cream/80">Help other foodies discover authentic bakes</p>
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

        {/* Success screen */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4 flex flex-col items-center justify-center flex-1">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto border border-green-200">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-signika font-bold text-2xl text-bakery-burgundy">Thank You So Much!</h4>
            <p className="text-sm text-stone-600 max-w-sm">
              Your feedback warms our ovens! Your review has been published to our community wall.
            </p>
          </div>
        ) : (
          /* Form Body */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-left flex-1">
            {/* Star Rating Picker */}
            <div className="text-center py-2 bg-bakery-creamWarm/70 rounded-xl border border-stone-200/80">
              <label className="block text-xs font-bold text-bakery-burgundy uppercase tracking-wider mb-1.5">
                Your Overall Rating
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = (hoverRating || rating) >= star;
                  return (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-stone-300 hover:scale-125 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          filled ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs text-bakery-crust font-medium block mt-1">
                {rating === 5 ? '⭐ Pure perfection! Best bakery in town' : rating === 4 ? 'Great experience & taste!' : 'Help us improve'}
              </span>
            </div>

            {/* Name & City Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-bakery-burgundy/20 focus:border-bakery-burgundy"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your City / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Kondapur, Hyderabad"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-bakery-burgundy/20 focus:border-bakery-burgundy"
                />
              </div>
            </div>

            {/* Product selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Which Bake Did You Enjoy Most?</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-bakery-burgundy/20 focus:border-bakery-burgundy bg-white"
              >
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.name}>
                    {prod.name}
                  </option>
                ))}
                <option value="Artisan Sourdough Loaf">Artisan Bread Club Loaf</option>
                <option value="Curated Assorted Treat Box">Curated Assorted Treat Box</option>
              </select>
            </div>

            {/* Avatar picker */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">Choose Avatar</label>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {AVATAR_PRESETS.map((av, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedAvatar(av)}
                    className={`relative rounded-full shrink-0 transition-all ${
                      selectedAvatar === av
                        ? 'ring-3 ring-bakery-burgundy ring-offset-2 scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={av} alt="avatar" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Review text */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-stone-700">Your Review *</label>
                <span className="text-[10px] text-stone-400">{reviewText.length}/500 chars</span>
              </div>
              <textarea
                required
                rows={3}
                maxLength={500}
                placeholder="Tell us about the texture, aroma, crust, and your morning experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-bakery-burgundy/20 focus:border-bakery-burgundy resize-none"
              />
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 text-[11px] text-stone-600">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
              <span>Reviews are verified by our master baker to maintain community trust.</span>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-bakery-burgundy hover:bg-bakery-burgundyDark text-white font-bold rounded-xl shadow-md hover:shadow-warm transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>Submit My Review</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
