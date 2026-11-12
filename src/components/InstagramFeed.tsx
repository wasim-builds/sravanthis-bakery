import React from 'react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const InstagramFeed: React.FC = () => {
  const photos = [
    {
      img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80",
      caption: "Morning lamination on our 27-layer butter croissants 🥐"
    },
    {
      img: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=400&q=80",
      caption: "Cracking crust on our 36-hr heritage country sourdough boule 🥖"
    },
    {
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
      caption: "Belgian dark chocolate ganache pouring over birthday gateaux 🎂"
    },
    {
      img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80",
      caption: "Warm brown butter & Maldon flaky sea salt cookies 🍪"
    },
    {
      img: "https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?auto=format&fit=crop&w=400&q=80",
      caption: "Crispy tandoori paneer tikka puffs fresh out of the convection oven 🔥"
    },
    {
      img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=400&q=80",
      caption: "Swedish cardamom pearl sugar cinnamon knots ✨"
    }
  ];

  return (
    <section className="bg-bakery-creamLight py-12 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 text-center sm:text-left gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-bakery-amber">
              @sravanthis.bakery
            </span>
            <h2 className="font-signika text-2xl font-bold text-bakery-burgundy mt-1">
              Fresh Out of the Oven Gallery
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow Us on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {photos.map((p, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden group shadow-xs cursor-pointer"
            >
              <img
                src={p.img}
                alt={p.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                <p className="text-white text-[11px] font-medium leading-tight line-clamp-3">
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
