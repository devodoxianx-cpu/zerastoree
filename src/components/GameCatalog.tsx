import type { FC } from 'react';
import type { GameItem, GameCategory } from '../types';
import { GameCard } from './GameCard';
import { Search, RotateCcw } from 'lucide-react';

interface GameCatalogProps {
  games: GameItem[];
  selectedCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectGame: (game: GameItem) => void;
  selectedGameId?: string;
  isStandaloneLayout?: boolean;
}

export const GameCatalog: FC<GameCatalogProps> = ({
  games,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectGame,
  selectedGameId,
  isStandaloneLayout = false,
}) => {
  const categories: GameCategory[] = [
    'Semua Game',
    'MOBA',
    'Battle Royale',
    'RPG',
    'FPS',
    'Casual',
  ];

  // Filter games based on search & category
  const filteredGames = games.filter((game) => {
    const matchesCategory =
      selectedCategory === 'Semua Game' || game.category === selectedCategory;
    const matchesSearch =
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleResetFilters = () => {
    onSelectCategory('Semua Game');
    onSearchChange('');
  };

  return (
    <section
      id="katalog"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        isStandaloneLayout ? 'pt-24 sm:pt-28 pb-16' : 'py-10 sm:py-14'
      }`}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <span className="text-[11px] font-mono text-[#FFE600] uppercase tracking-wider block mb-1">
            Koleksi Terlengkap
          </span>
          <h2 className="font-gaming font-extrabold text-2xl sm:text-3xl text-white">
            Katalog Game Top Up
          </h2>
          <p className="text-xs sm:text-sm text-zera-muted mt-1 max-w-xl">
            Pilih game untuk melihat pilihan nominal diamond, UC, token, atau item top up lainnya.
          </p>
        </div>

        {/* Counter of matching games */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zera-muted">
            <strong className="text-[#FFE600]">{filteredGames.length}</strong> dari {games.length} game
          </span>
          {(searchQuery || selectedCategory !== 'Semua Game') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-zera-muted hover:text-white bg-[#12141A] border border-[#1E212B] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-[#FFE600]" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFE600] text-[#0A0B0E] font-bold shadow-xs'
                    : 'bg-[#12141A] text-zera-muted hover:text-white hover:bg-[#181B24] border border-[#1E212B]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-zera-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari dalam katalog..."
            className="w-full bg-[#12141A] border border-[#1E212B] focus:border-[#FFE600] rounded-xl pl-9 pr-3 py-1.5 text-xs sm:text-sm text-white placeholder-zera-muted/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Game Cards Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onSelectGame={onSelectGame}
              isSelected={selectedGameId === game.id}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 text-center rounded-xl bg-[#12141A] border border-[#1E212B] flex flex-col items-center justify-center max-w-md mx-auto">
          <Search className="w-8 h-8 text-zera-muted mb-2" />
          <h3 className="font-gaming font-bold text-base text-white mb-1">
            Game Tidak Ditemukan
          </h3>
          <p className="text-xs text-zera-muted mb-4">
            Tidak ada game dengan kata kunci "{searchQuery}".
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-bold text-xs uppercase cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      )}
    </section>
  );
};
