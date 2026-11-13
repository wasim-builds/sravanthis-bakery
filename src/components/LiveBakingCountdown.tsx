import React, { useState, useEffect } from 'react';
import { Flame, Sparkles } from 'lucide-react';

export const LiveBakingCountdown: React.FC = () => {
  // Cycle batches every 45 minutes
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    const now = Math.floor(Date.now() / 1000);
    const cycle = 45 * 60;
    return cycle - (now % cycle);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 45 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentBatch = minutes > 25 
    ? 'Stone-Baked Heritage Sourdough' 
    : minutes > 10 
    ? 'Golden French Butter Croissants' 
    : 'Cardamom Brioche & Cinnamon Swirls';

  return (
    <div className="bg-amber-900/90 border-y border-amber-700/50 text-bakery-cream px-3 py-1.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
          </span>
          <div className="flex items-center gap-1.5 font-medium">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="text-orange-200 uppercase tracking-wider text-[10px] font-bold">Oven Batch Active:</span>
            <span className="text-white font-bold">{currentBatch}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono bg-black/30 px-2.5 py-0.5 rounded-full border border-orange-500/30">
          <span className="text-[10px] uppercase font-sans text-amber-200">Coming out hot in:</span>
          <span className="font-bold text-orange-300 tracking-wider text-xs">{formattedTime}</span>
          <Sparkles className="w-3 h-3 text-bakery-gold" />
        </div>
      </div>
    </div>
  );
};
