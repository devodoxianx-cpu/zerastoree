import type { FC } from 'react';
import type { PromoBanner } from '../types';
import { Tag, ArrowRight, Clock } from 'lucide-react';

interface PromotionsProps {
  promos: PromoBanner[];
  onSelectPromo: (gameSlug: string) => void;
}

export const Promotions: FC<PromotionsProps> = ({ promos, onSelectPromo }) => {
  return (
    <section id="promo" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1E212B]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <span className="text-[11px] font-mono text-[#FFE600] uppercase tracking-wider block mb-1">
            Penawaran Spesial
          </span>
          <h2 className="font-gaming font-extrabold text-xl sm:text-2xl text-white">
            Promo Paket Game
          </h2>
          <p className="text-xs sm:text-sm text-zera-muted mt-1 max-w-xl">
            Manfaatkan harga promo katalog untuk top up game favoritmu dengan lebih hemat.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-zera-muted bg-[#12141A] border border-[#1E212B] px-2.5 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-[#FFE600]" />
          <span>Update Mingguan</span>
        </div>
      </div>

      {/* Promo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="group rounded-xl bg-[#12141A] border border-[#1E212B] hover:border-[#FFE600]/40 p-4 sm:p-5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-gaming font-bold bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/25">
                  {promo.badge}
                </span>
                <span className="font-gaming font-bold text-xs text-[#FFE600] bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                  {promo.discount}
                </span>
              </div>

              <h3 className="font-gaming font-bold text-base text-white group-hover:text-[#FFE600] transition-colors mb-1.5">
                {promo.title}
              </h3>
              <p className="text-xs text-zera-muted leading-relaxed mb-4">
                {promo.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1E212B] flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-[#FFE600]" />
                <span className="font-mono text-xs text-white font-medium">
                  {promo.code}
                </span>
              </div>

              <button
                onClick={() => onSelectPromo(promo.gameSlug)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#181B24] group-hover:bg-[#FFE600] text-zera-muted group-hover:text-[#0A0B0E] font-tech font-bold text-xs uppercase transition-colors cursor-pointer"
              >
                <span>Lihat Game</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
