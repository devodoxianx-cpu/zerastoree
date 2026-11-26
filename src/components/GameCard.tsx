import { useState } from 'react';
import type { FC } from 'react';
import type { GameItem } from '../types';
import { Gamepad2, ChevronRight } from 'lucide-react';

interface GameCardProps {
  game: GameItem;
  onSelectGame: (game: GameItem) => void;
  isSelected?: boolean;
}

export const GameCard: FC<GameCardProps> = ({ game, onSelectGame, isSelected = false }) => {
  const [imageError, setImageError] = useState(false);

  const imageSrc = game.icon || game.image || game.coverImage;

  return (
    <div
      onClick={() => onSelectGame(game)}
      className={`group rounded-xl bg-[#12141A] border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-[#FFE600] shadow-sm'
          : 'border-[#1E212B] hover:border-[#FFE600]/50 hover:-translate-y-0.5'
      }`}
    >
      {/* Game App Icon Container with new user-provided images */}
      <div className="p-2.5 pb-0">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#181B24] border border-[#1E212B]">
          {!imageError ? (
            <img
              src={imageSrc}
              alt={game.name}
              onError={() => setImageError(true)}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#181B24] p-3 text-center">
              <Gamepad2 className="w-6 h-6 text-[#FFE600] mb-1" />
              <span className="text-[10px] font-gaming font-bold text-white line-clamp-1">
                {game.name}
              </span>
            </div>
          )}

          {/* Minimal Category Tag */}
          <div className="absolute top-1.5 left-1.5">
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-[#0A0B0E]/80 text-[#FFE600] border border-[#1E212B] backdrop-blur-xs font-semibold">
              {game.category}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content & Action Details */}
      <div className="p-2.5 flex flex-col flex-grow justify-between gap-2">
        <div>
          <div className="text-[10px] font-mono text-zera-muted uppercase truncate">
            {game.publisher}
          </div>
          <h3 className="font-gaming font-bold text-xs sm:text-sm text-white group-hover:text-[#FFE600] transition-colors truncate">
            {game.name}
          </h3>
        </div>

        {/* Minimal Bottom CTA Button */}
        <div className="pt-2 border-t border-[#1E212B] flex items-center justify-between">
          <span className="text-[10px] font-mono text-emerald-400">
            Instan
          </span>

          <div
            className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-md text-[11px] font-tech font-bold uppercase transition-colors ${
              isSelected
                ? 'bg-[#FFE600] text-[#0A0B0E]'
                : 'bg-[#181B24] group-hover:bg-[#FFE600] text-zera-muted group-hover:text-[#0A0B0E]'
            }`}
          >
            <span>Top Up</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
