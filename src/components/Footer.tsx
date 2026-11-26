import type { FC } from 'react';
import { Logo } from './Logo';
import { STORE_SETTINGS } from '../data/settings';
import { MessageSquare, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPolicy: (type: 'terms' | 'privacy') => void;
}

export const Footer: FC<FooterProps> = ({ onNavigateSection, onOpenPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0B0E] border-t border-[#1E212B] pt-10 pb-6 text-zera-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <Logo size="sm" showTagline={false} />
            <p className="text-xs text-zera-muted leading-relaxed">
              Platform katalog top-up game praktis untuk gamer Indonesia. Diamond, UC, Robux, dan voucher resmi dengan konfirmasi WhatsApp cepat.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-2">
            <h4 className="font-gaming font-bold text-xs text-white uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('beranda')}
                  className="hover:text-[#FFE600] transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('katalog')}
                  className="hover:text-[#FFE600] transition-colors cursor-pointer"
                >
                  Katalog Game
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about_us')}
                  className="hover:text-[#FFE600] transition-colors cursor-pointer"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('promo')}
                  className="hover:text-[#FFE600] transition-colors cursor-pointer"
                >
                  Promo Spesial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('cara-topup')}
                  className="hover:text-[#FFE600] transition-colors cursor-pointer"
                >
                  Panduan Top Up
                </button>
              </li>
            </ul>
          </div>

          {/* Game Categories Column */}
          <div className="space-y-2">
            <h4 className="font-gaming font-bold text-xs text-white uppercase tracking-wider">
              Game Populer
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="text-zera-muted hover:text-white transition-colors">Mobile Legends</li>
              <li className="text-zera-muted hover:text-white transition-colors">Free Fire</li>
              <li className="text-zera-muted hover:text-white transition-colors">PUBG Mobile</li>
              <li className="text-zera-muted hover:text-white transition-colors">Genshin Impact</li>
              <li className="text-zera-muted hover:text-white transition-colors">Roblox Robux</li>
            </ul>
          </div>

          {/* Customer Support Column */}
          <div className="space-y-2.5">
            <h4 className="font-gaming font-bold text-xs text-white uppercase tracking-wider">
              Customer Support
            </h4>
            <p className="text-xs text-zera-muted">
              WhatsApp Admin Resmi: <span className="text-white font-mono font-medium">0858-7914-6250</span>
            </p>
            <a
              href={`https://wa.me/${STORE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo Admin ZeraStore, saya butuh bantuan top up.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12141A] hover:bg-[#181B24] border border-[#FFE600]/30 text-[#FFE600] text-xs font-semibold transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Hubungi Admin WhatsApp</span>
            </a>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Verifikasi Resmi Tanpa Password</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-[#1E212B] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div className="text-zera-muted">
            © {new Date().getFullYear()} <span className="text-white font-medium">ZeraStore</span> • Prototipe Karya Tugas Project Sekolah.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-[#FFE600] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-[#1E212B]">•</span>
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-[#FFE600] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#1E212B]">•</span>
            <button
              onClick={scrollToTop}
              className="p-1 rounded-md bg-[#12141A] border border-[#1E212B] text-zera-muted hover:text-[#FFE600] transition-colors cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
