import type { FC } from 'react';
import { Search, Zap, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import type { PromoBanner } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExploreClick: () => void;
  featuredPromo: PromoBanner;
  onPromoClick: (gameSlug: string) => void;
}

export const Hero: FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onExploreClick,
  featuredPromo,
  onPromoClick,
}) => {
  return (
    <section id="beranda" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      {/* Subtle single ambient warmth */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/8 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Search, Call to Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5">
            {/* Minimal Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141A] border border-[#1E212B] text-xs font-mono text-[#FFE600]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600]"></span>
              <span>Katalog Top Up Game Terpercaya</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-gaming font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Top Up Cepat, <br className="hidden sm:inline" />
              <span className="text-[#FFE600]">Push Rank Tanpa Batas</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm md:text-base text-zera-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Beli Diamond MLBB, Free Fire, UC PUBG, Robux, dan game lainnya dengan harga transparan, metode pembayaran lengkap, dan konfirmasi instan via WhatsApp resmi.
            </p>

            {/* Minimalist Search Bar */}
            <div className="max-w-lg mx-auto lg:mx-0 pt-1 space-y-3">
              <div className="flex items-center bg-[#12141A] border border-[#1E212B] focus-within:border-[#FFE600] rounded-xl px-3 py-1.5 transition-colors">
                <Search className="w-4 h-4 text-[#FFE600] shrink-0 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari game (MLBB, Free Fire, PUBG, Roblox...)"
                  className="w-full bg-transparent border-none text-white text-xs sm:text-sm placeholder-zera-muted/50 focus:outline-none py-1.5"
                  aria-label="Cari Game di ZeraStore"
                />
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange('')}
                    className="px-2 py-0.5 text-xs text-zera-muted hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                ) : (
                  <button
                    onClick={onExploreClick}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-bold text-xs uppercase cursor-pointer"
                  >
                    <span>Cari</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFE600] hover:bg-[#FFF04B] text-[#0A0B0E] font-gaming font-bold text-xs uppercase tracking-wider transition-all active:scale-98 cursor-pointer shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Jelajahi Game</span>
                </button>
                <a
                  href="#cara-topup"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#12141A] hover:bg-[#181B24] border border-[#1E212B] text-zera-muted hover:text-white font-medium text-xs transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>Panduan Top Up</span>
                </a>
              </div>
            </div>

            {/* Minimalist Trust Markers */}
            <div className="pt-3 border-t border-[#1E212B] flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-zera-muted">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#FFE600]" /> Konfirmasi Cepat
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#FFE600]" /> 100% Legal
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#FFE600]" /> Harga Hemat
              </span>
            </div>
          </div>

          {/* Right Column: Clean Minimalist Promo Banner */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#12141A] border border-[#1E212B] p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-gaming font-bold bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/25">
                  {featuredPromo.badge}
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  Aktif Hari Ini
                </span>
              </div>

              <div>
                <h3 className="font-gaming font-bold text-lg text-white mb-1">
                  {featuredPromo.title}
                </h3>
                <p className="text-xs text-zera-muted leading-relaxed">
                  {featuredPromo.subtitle}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#1E212B] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-zera-muted uppercase">Diskon Spesial</div>
                  <div className="font-gaming font-bold text-base text-[#FFE600]">
                    {featuredPromo.discount}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-zera-muted uppercase">Kode Promo</div>
                  <div className="font-mono text-xs px-2 py-0.5 rounded bg-[#181B24] text-white border border-[#1E212B]">
                    {featuredPromo.code || 'ZERASTORE'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onPromoClick(featuredPromo.gameSlug)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FFE600] hover:bg-[#FFF04B] text-[#0A0B0E] font-tech font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Lihat Promo Game Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
