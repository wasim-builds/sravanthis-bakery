import { BakeryProduct, CategoryItem } from '../types/bakery';

export const CATEGORIES: CategoryItem[] = [
  {
    id: "all",
    name: "Shop All",
    iconImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80",
    badge: "Hot"
  },
  {
    id: "sourdough",
    name: "Sourdough Breads",
    iconImage: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=300&q=80",
    badge: "Fresh 5 AM"
  },
  {
    id: "croissants",
    name: "Croissants & Flaky",
    iconImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80",
    badge: "100% Butter"
  },
  {
    id: "cakes",
    name: "Celebration Cakes",
    iconImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80",
    badge: "Eggless Opt"
  },
  {
    id: "cookies",
    name: "Artisan Cookies",
    iconImage: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "savoury",
    name: "Savoury Puffs",
    iconImage: "https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "healthy",
    name: "Millet & Healthy",
    iconImage: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=300&q=80",
    badge: "Guilt Free"
  },
  {
    id: "beverages",
    name: "Coffee & Spreads",
    iconImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"
  }
];

export const PRODUCTS: BakeryProduct[] = [
  {
    id: "classic-sourdough-boule",
    name: "Heritage Country Sourdough Boule",
    category: "sourdough",
    description: "Naturally wild-fermented for 36 hours with our century-old starter. Crisp blistered caramelized crust with an airy, moist, aromatic crumb.",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 142,
    isBestseller: true,
    isEggless: true,
    isFreshBake: true,
    shelfLife: "4 Days at room temp, 14 days frozen",
    ingredients: ["Stone-ground wheat flour", "Rye starter", "Filtered mountain water", "Guerande sea salt"],
    variants: [
      { weight: "450 Grms", price: 210, originalPrice: 240, inStock: true },
      { weight: "850 Grms", price: 380, originalPrice: 420, inStock: true },
      { weight: "1.2 Kg Boule", price: 520, originalPrice: 580, inStock: true }
    ]
  },
  {
    id: "french-butter-croissant",
    name: "Normandy French Butter Croissant",
    category: "croissants",
    description: "Laminated with 84% fat French Normandy churned butter. Boasts 27 gossamer-thin honeycomb layers with supreme shatter and melt-in-mouth richness.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 218,
    isBestseller: true,
    isEggless: false,
    isFreshBake: true,
    shelfLife: "2 Days fresh, reheat in oven for 3 mins",
    ingredients: ["T55 French wheat flour", "84% French churned butter", "Whole milk", "Organic sugar", "Sea salt"],
    variants: [
      { weight: "Single Piece", price: 135, originalPrice: 150, inStock: true },
      { weight: "Box of 4", price: 490, originalPrice: 560, inStock: true },
      { weight: "Box of 8 Party Pack", price: 920, originalPrice: 1080, inStock: true }
    ]
  },
  {
    id: "pain-au-chocolat",
    name: "Valrhona Dark Chocolate Pain Au Chocolat",
    category: "croissants",
    description: "Golden flaky golden puff pastry rolled around dual batons of bittersweet 66% Valrhona French dark chocolate.",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 96,
    isBestseller: true,
    isEggless: false,
    isFreshBake: true,
    shelfLife: "2 Days fresh",
    ingredients: ["French flour", "Pure butter", "66% Valrhona chocolate batons", "Farm milk"],
    variants: [
      { weight: "Single Piece", price: 160, originalPrice: 180, inStock: true },
      { weight: "Box of 4", price: 590, originalPrice: 680, inStock: true },
      { weight: "Box of 6 Deluxe", price: 850, originalPrice: 990, inStock: true }
    ]
  },
  {
    id: "belgian-truffle-cake",
    name: "Royal Belgian Dark Chocolate Truffle Cake",
    category: "cakes",
    description: "Decadent layers of moist Dutch cocoa sponge enveloped in silky 70% dark Belgian ganache and chocolate curls. Rich, luscious, and deeply satisfying.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 310,
    isBestseller: true,
    isEggless: true,
    isFreshBake: true,
    shelfLife: "4 Days refrigerated",
    ingredients: ["Belgian dark couverture chocolate", "Dutch cocoa", "Madagascar vanilla bean", "Dairy cream"],
    variants: [
      { weight: "500 Grms", price: 650, originalPrice: 750, inStock: true },
      { weight: "1 Kg", price: 1199, originalPrice: 1399, inStock: true },
      { weight: "1.5 Kg Celebration", price: 1749, originalPrice: 1999, inStock: true }
    ]
  },
  {
    id: "cardamom-pistachio-mawa-cake",
    name: "Irani Cardamom & Pistachio Mawa Cake",
    category: "cakes",
    description: "Inspired by old-world bakery nostalgia. Slow-cooked rich khoya mawa cake infused with freshly cracked green cardamom and slivered Iranian pistachios.",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 84,
    isBestseller: false,
    isEggless: true,
    isFreshBake: true,
    shelfLife: "7 Days room temp",
    ingredients: ["Slow-reduced milk mawa", "Green cardamom pods", "Iranian pistachios", "Pure cow ghee"],
    variants: [
      { weight: "350 Grms Loaf", price: 340, originalPrice: 380, inStock: true },
      { weight: "700 Grms Round", price: 620, originalPrice: 700, inStock: true },
      { weight: "1 Kg Gift Box", price: 890, originalPrice: 999, inStock: true }
    ]
  },
  {
    id: "sea-salt-double-choc-cookies",
    name: "Brown Butter & Sea Salt Chocolate Chunk Cookies",
    category: "cookies",
    description: "Nutty nutty caramelized brown butter cookies packed with melted pools of dark chocolate chunks and topped with Maldon flaky sea salt.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 167,
    isBestseller: true,
    isEggless: true,
    shelfLife: "30 Days in airtight tin",
    ingredients: ["Toasted brown butter", "Belgian dark chocolate chunks", "Dark brown sugar", "Maldon sea salt flakes"],
    variants: [
      { weight: "250 Grms Jar", price: 299, originalPrice: 350, inStock: true },
      { weight: "500 Grms Tin", price: 549, originalPrice: 650, inStock: true },
      { weight: "1 Kg Family Cask", price: 999, originalPrice: 1200, inStock: true }
    ]
  },
  {
    id: "almond-cranberry-biscotti",
    name: "Twice-Baked Almond & Cranberry Biscotti",
    category: "cookies",
    description: "Classic Italian cantucci baked twice to crispy perfection. Packed with toasted whole California almonds and tart cranberries. Perfect dunker for coffee or tea.",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewsCount: 59,
    isBestseller: false,
    isEggless: true,
    shelfLife: "45 Days sealed",
    ingredients: ["Roasted California almonds", "Dried cranberries", "Vanilla extract", "Unbleached wheat flour"],
    variants: [
      { weight: "200 Grms Box", price: 260, originalPrice: 300, inStock: true },
      { weight: "400 Grms Tin", price: 480, originalPrice: 560, inStock: true },
      { weight: "800 Grms Tin", price: 880, originalPrice: 1050, inStock: true }
    ]
  },
  {
    id: "paneer-tikka-puff",
    name: "Flaky Tandoori Paneer Tikka Puff",
    category: "savoury",
    description: "Golden multi-layered puff pastry filled with charcoal-marinated cottage cheese cubes, roasted bell peppers, and royal spices.",
    image: "https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 123,
    isBestseller: true,
    isEggless: true,
    isFreshBake: true,
    shelfLife: "1 Day fresh, reheat in oven or air fryer",
    ingredients: ["Fresh malai paneer", "Tandoori masala", "Puff pastry dough", "Coriander", "Ghee"],
    variants: [
      { weight: "Pack of 2", price: 150, originalPrice: 180, inStock: true },
      { weight: "Pack of 4", price: 280, originalPrice: 340, inStock: true },
      { weight: "Party Pack of 8", price: 520, originalPrice: 640, inStock: true }
    ]
  },
  {
    id: "caramelized-onion-focaccia",
    name: "Rosemary & Balsamic Onion Sourdough Focaccia",
    category: "sourdough",
    description: "Generously dimpled olive oil dough studded with sweet slow-caramelized onions, fresh garden rosemary, and cherry tomatoes.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 78,
    isBestseller: false,
    isEggless: true,
    isFreshBake: true,
    shelfLife: "3 Days room temp",
    ingredients: ["Extra virgin olive oil", "Caramelized red onions", "Fresh rosemary sprigs", "Sea salt flakes"],
    variants: [
      { weight: "Small Slab (350g)", price: 230, originalPrice: 260, inStock: true },
      { weight: "Large Slab (700g)", price: 420, originalPrice: 480, inStock: true }
    ]
  },
  {
    id: "ragi-almond-health-loaf",
    name: "Sprouted Ragi & Multi-Seed Wellness Loaf",
    category: "healthy",
    description: "100% refined-flour free! Baked with sprouted finger millet (ragi), flax seeds, pumpkin seeds, sunflower seeds, and rolled oats. High fiber and low glycemic.",
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 91,
    isBestseller: true,
    isEggless: true,
    isGlutenFree: false,
    shelfLife: "5 Days refrigerated",
    ingredients: ["Sprouted ragi flour", "Pumpkin seeds", "Sunflower seeds", "Chia seeds", "Raw forest honey"],
    variants: [
      { weight: "400 Grms Loaf", price: 240, originalPrice: 270, inStock: true },
      { weight: "800 Grms Loaf", price: 440, originalPrice: 500, inStock: true }
    ]
  },
  {
    id: "cinnamon-swirl-brioche-buns",
    name: "Swedish Cardamom & Cinnamon Brioche Rolls",
    category: "croissants",
    description: "Tender, pillowy enriched brioche dough knotted with Saigon cinnamon butter and coarse pearl sugar crunch. A heavenly morning treat.",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 147,
    isBestseller: true,
    isEggless: false,
    isFreshBake: true,
    shelfLife: "3 Days room temp",
    ingredients: ["Enriched brioche dough", "Saigon cinnamon", "Brown sugar glaze", "Pearl sugar crystals"],
    variants: [
      { weight: "Box of 2 Buns", price: 220, originalPrice: 250, inStock: true },
      { weight: "Box of 4 Buns", price: 399, originalPrice: 480, inStock: true },
      { weight: "Box of 6 Family Pack", price: 560, originalPrice: 680, inStock: true }
    ]
  },
  {
    id: "artisanal-salted-caramel-spread",
    name: "Artisanal Sea Salt Caramel Jar",
    category: "beverages",
    description: "Slow-kettled golden caramel made with heavy cream, churned butter, and Maldon fleur de sel. Luscious spread for toast, croissants, waffles, or by the spoonful.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 65,
    isBestseller: false,
    isEggless: true,
    shelfLife: "90 Days refrigerated",
    ingredients: ["Heavy cream", "Cane sugar", "Churned butter", "Fleur de sel"],
    variants: [
      { weight: "220 Grms Glass Jar", price: 280, originalPrice: 320, inStock: true },
      { weight: "450 Grms Glass Jar", price: 499, originalPrice: 590, inStock: true }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: "Priya Ramesh",
    location: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    review: "The Country Sourdough tastes just like the bakeries in Paris! It arrived warm and fragrant at 8 AM. My whole family is hooked.",
    product: "Heritage Country Sourdough Boule",
    rating: 5
  },
  {
    name: "Vikram Malhotra",
    location: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    review: "Ordered the Belgian Truffle Cake for my wife's birthday. The 70% dark chocolate ganache was rich without being overly sweet. 10/10!",
    product: "Royal Belgian Dark Chocolate Truffle Cake",
    rating: 5
  },
  {
    name: "Sneha Reddy",
    location: "Vijayawada",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    review: "Pan-India vacuum shipping worked flawlessly. The butter croissants and brown butter cookies arrived crispy and intact within 24 hours.",
    product: "Normandy French Butter Croissant",
    rating: 5
  }
];
