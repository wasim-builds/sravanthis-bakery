# Sravanthi's Bakery — Comprehensive Product Roadmap & Enhancement Plan

**Project**: Sravanthi's Bakery (E-Commerce Web Experience)  
**Repository**: [https://github.com/wasim-builds/sravanthis-bakery](https://github.com/wasim-builds/sravanthis-bakery)  
**Local Workspace**: `/home/wasim/dev/bakery-website`  
**Base Architecture**: React 18, Vite 6, TypeScript 5.7, Tailwind CSS 3.4, Lucide Icons, Canvas Confetti  
**Inspiration & Benchmark**: [Minnie Inti Ruchulu](https://minnieintiruchulu.com/)

---

## 1. Current Completed State (Phase 1 Delivered)

- [x] **Reverse-Engineered Heritage Theme**: Deep burgundy (`#56150E`), warm cream (`#F1DBBB`, `#FCF7F0`), amber crust (`#8B4513`, `#C86A24`), gold badges, and Signika/Poppins typography.
- [x] **Top Dual Announcement Bar**: Worldwide & Pan-India express delivery notification + WhatsApp quick ordering hotline.
- [x] **Header & Navigation**: Brand logo with warm bread emblem, live search with instant cross-category search, wishlist indicator, and shopping basket with live total counter.
- [x] **Hero Showcase**: Artisanal bakes narrative, batch status badge, and immediate shopping CTAs.
- [x] **Circular Story Bubbles**: Horizontal scrollable categories with badges (`Sourdough`, `Croissants`, `Cakes`, `Cookies`, `Savoury`, `Healthy`).
- [x] **Interactive Product Cards**: Dynamic weight/size swatches (`450g / 850g / 1.2kg` or `Single / Box of 4`), instant price recalculation, discount ribbons, vegetarian/eggless marks, and wishlist toggle.
- [x] **Quick View Modal**: Detailed ingredient list, shelf-life instructions, package selector, quantity stepper, and quick WhatsApp link.
- [x] **Slide-Out Cart Basket**: Animated **Free Delivery Progress Meter** (₹499 threshold), quantity controls, item remover, and custom baking instructions note.
- [x] **Multi-Channel Ordering**:
  - **1-Click WhatsApp Direct Order**: Automatically constructs formatted order message with items, selected weights, quantities, subtotal, and baking notes.
  - **Interactive Checkout Modal**: Address and contact form, fresh bake delivery slot selector (Morning / Noon / Evening), payment method picker, and celebratory confetti animation.
- [x] **Trust Features & Testimonials**: 100% fresh daily at 5 AM, real dairy butter, zero preservatives, customer quotes from Hyderabad & Bengaluru.
- [x] **Instagram & Footer**: Oven-fresh photo grid, kitchen timings, FSSAI compliance badge, newsletter signup, and sticky floating WhatsApp widget.
- [x] **Git & GitHub Integration**: Repository created, committed with SSH signatures, and pushed to `wasim-builds/sravanthis-bakery` (branch `main`).

---

## 2. Completed Phase 2 Enhancements (Delivered)

### Track A: High-Impact Customer Conversion Features
- [x] **Custom Cake Personalization & Piping Message Modal**:
  - Live preview of edible cocoa calligraphy on dark chocolate plaque, white fondant ribbon, or direct cream piping.
  - Dietary choice toggle: 100% Eggless (Pure Veg) vs. Traditional Parisian.
  - Serving & weight swatches with automatic dynamic price updates.
  - Inscribed details persisted to cart and integrated into WhatsApp direct order string.
- [x] **"Build Your Own Assorted Box" Modal (Croissants, Cookies & Puffs)**:
  - Supports curated Box of 4 (₹399, save ₹100) or Box of 6 (₹579, save ₹180).
  - Dynamic progress counter showing remaining items with encouraging feedback.
  - Mix and match across 8 artisanal viennoiseries and savoury bakes.
- [x] **Pincode Delivery Radius Checker**:
  - Validates 6-digit Indian postal pincodes with automatic detection of Hyderabad metropolitan core (⚡ Same-day 2-hour express via Porter/Dunzo) vs. Pan-India express air cargo (🚚 24–48h vacuum-sealed).
  - Persists validated pincode to `localStorage` and auto-populates in CheckoutModal.
- [x] **Live Oven Baking Countdown Ticker**:
  - Real-time animated ticker showing current hot oven batch and dynamic countdown timer (MM:SS) cycling through sourdoughs, croissants, and brioches.

### Track B: Payments & Retention
- [x] **Dynamic Zero-Fee UPI QR Code Generator**:
  - Integrated into Checkout modal with crisp SVG QR code for `upi://pay?pa=sravanthisbakery@icici`.
  - 1-Click mobile deep links for Google Pay, PhonePe, and Paytm / BHIM.
  - 1-Click copy UPI ID with animated feedback.

---

## 3. Completed Phase 3 Enhancements (Delivered)

### Track A: Artisan Bread Club (Weekly Sourdough Subscription Model)
- [x] **"Subscribe & Save 10% – 15%" Sourdough Subscription Modal**:
  - 5 Signature 36-hour wild-fermented loaves:
    1. San Francisco Country Sourdough (850g Family Loaf)
    2. 100% Whole Wheat & Roasted Flax (800g Hearth Loaf)
    3. Roasted Garlic & Fresh Rosemary Boule (750g Artisan Boule)
    4. Kalamata Olive & Sun-Dried Tomato (800g Batard)
    5. Traditional German Vollkornbrot (100% Dark Rye, 650g Dense Block)
  - Customizable delivery frequency: 1x/week, 2x/week, or Daily morning bakes.
  - Interactive delivery day toggles (e.g. Tuesday + Friday).
  - Morning (7:00 – 8:30 AM before breakfast) vs. Evening (5:00 – 6:30 PM before dinner) slot picker.
  - 4-Week Monthly Pass vs. 12-Week Season Pass (extra 5% discount).
  - Dynamic price, total deliveries, and savings calculation with instant visual breakdown.
  - Dual action pathways: 1-Click WhatsApp schedule activation with confetti + direct Add to Cart integration.

### Track B: Progressive Web App (PWA) & Offline Shell
- [x] **Full PWA Manifest (`manifest.webmanifest`)**:
  - Standalone app display mode with theme color `#56150E` and background `#FCF7F0`.
  - App icons, shortcuts (Artisan Bread Club, Fresh Bakes Catalog, Custom Cakes).
- [x] **Offline Service Worker (`sw.js`)**:
  - Pre-caches critical app shell (`/`, `/index.html`, `/manifest.webmanifest`, `/header_sravanthis_bakery.png`).
  - Stale-while-revalidate strategy for static images and Google Fonts.
  - Network-first navigation fallback for zero-downtime offline browsing.
- [x] **Omnipresent UI Entry Points**:
  - Header Navbar: Dedicated "Bread Club (10% OFF)" desktop pill & mobile drawer button.
  - Top Announcement Bar: Interactive "Bread Club (Save 10%)" badge.
  - Hero Showcase: Prominent "Artisan Bread Club (-10%)" gradient action CTA.
  - Cart Basket: Dynamic "Plan:" tag for subscription items with doorstep delivery note.

---

## 4. Deployment & Production Hosting Options

1. **Vercel / Cloudflare Pages / GitHub Pages**:
   - Add automated GitHub Actions deployment workflow (`.github/workflows/deploy.yml`) to deploy the Vite build instantly on every push.
2. **Domain Configuration**:
   - Support custom domain mapping (*e.g., `sravanthisbakery.com`*).

---

## 5. Quick Resume Commands for Next Session

```bash
# 1. Navigate to workspace
cd /home/wasim/dev/bakery-website

# 2. Start local development server
bun run dev

# 3. Open in browser
# http://localhost:5173
```
