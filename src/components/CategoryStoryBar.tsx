import React from 'react';
import { CATEGORIES } from '../data/bakeryProducts';

interface CategoryStoryBarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryStoryBar: React.FC<CategoryStoryBarProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="bg-white py-6 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-signika text-lg sm:text-xl font-bold text-bakery-burgundy flex items-center gap-2">
            <span>✨ Explore by Fresh Bake Category</span>
          </h2>
          <span className="text-xs text-stone-500 font-medium hidden sm:inline-block">
            Scroll horizontally to view all items &rarr;
          </span>
        </div>

        {/* Circular Stories Horizontal Scroll */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center flex-shrink-0 group focus:outline-none transition-transform"
              >
                {/* Circle Wrapper */}
                <div className="relative mb-2">
                  <div
                    className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full p-1 transition-all duration-300 ${
                      isSelected
                        ? 'ring-4 ring-bakery-burgundy ring-offset-2 scale-105 shadow-md'
                        : 'ring-2 ring-stone-200 group-hover:ring-bakery-amber group-hover:scale-105'
                    }`}
                  >
                    <img
                      src={cat.iconImage}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full filter brightness-95 group-hover:brightness-105 transition-all"
                    />
                  </div>

                  {cat.badge && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-bakery-amber text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Category Label */}
                <span
                  className={`text-xs sm:text-sm text-center font-medium max-w-[80px] sm:max-w-[100px] leading-tight transition-colors line-clamp-2 ${
                    isSelected
                      ? 'text-bakery-burgundy font-bold underline decoration-bakery-amber decoration-2 underline-offset-4'
                      : 'text-stone-700 group-hover:text-bakery-burgundy'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
