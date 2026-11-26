import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Logo } from './Logo';
import { Search, Menu, X, HelpCircle, Gift, Gamepad2, ArrowRight, Layers, Users, User, LogOut } from 'lucide-react';
import type { User as UserType } from '../types/auth';

export type ActiveLayoutType = 'menu_utama' | 'list_game' | 'about_us';

interface NavbarProps {
  onSearchClick: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeLayout: ActiveLayoutType;
  onChangeLayout: (layout: ActiveLayoutType) => void;
  activeSection?: string;
  currentUser: UserType | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: FC<NavbarProps> = ({
  onSearchClick,
  onNavigateSection,
  activeLayout,
  onChangeLayout,
  activeSection = 'beranda',
  currentUser,
  onOpenAuthModal,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const layoutTabs = [
    {
      id: 'menu_utama' as ActiveLayoutType,
      label: 'Beranda',
      icon: Gamepad2,
    },
    {
      id: 'list_game' as ActiveLayoutType,
      label: 'Katalog Game',
      icon: Layers,
    },
    {
      id: 'about_us' as ActiveLayoutType,
      label: 'Tentang Kami',
      icon: Users,
    },
  ];

  const infoLinks = [
    { id: 'promo', label: 'Promo', icon: Gift },
    { id: 'cara-topup', label: 'Panduan' },
    { id: 'bantuan', label: 'Bantuan', icon: HelpCircle },
  ];

  const handleLayoutClick = (layoutId: ActiveLayoutType) => {
    setMobileMenuOpen(false);
    onChangeLayout(layoutId);
  };

  const handleSectionClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#0A0B0E]/95 backdrop-blur-md border-b border-[#1E212B] py-2.5'
            : 'bg-[#0A0B0E]/80 backdrop-blur-sm border-b border-transparent py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                handleLayoutClick('menu_utama');
              }}
              className="flex items-center cursor-pointer shrink-0"
              aria-label="ZeraStore Beranda"
            >
              <Logo size="sm" showTagline={false} />
            </a>

            {/* Minimalist Segmented Tabs (Desktop): Beranda, Katalog Game, Tentang Kami */}
            <nav className="hidden md:flex items-center bg-[#12141A] p-1 rounded-xl border border-[#1E212B]">
              {layoutTabs.map((tab) => {
                const isActive = activeLayout === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleLayoutClick(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#0A0B0E] bg-[#FFE600] font-bold shadow-xs'
                        : 'text-zera-muted hover:text-white hover:bg-[#181B24]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Secondary links (Promo, Panduan, Bantuan) */}
            <div className="hidden lg:flex items-center gap-1">
              {infoLinks.map((link) => {
                const isSectionActive = activeLayout === 'menu_utama' && activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleSectionClick(link.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      isSectionActive
                        ? 'text-[#FFE600] font-bold bg-[#FFE600]/10'
                        : 'text-zera-muted hover:text-[#FFE600]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Right Actions: Search CTA & Sign Up / Log In User Profile */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={onSearchClick}
                className="flex items-center gap-2 bg-[#12141A] hover:bg-[#181B24] text-white border border-[#1E212B] hover:border-[#FFE600]/50 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                aria-label="Cari Game"
              >
                <Search className="w-3.5 h-3.5 text-[#FFE600]" />
                <span className="hidden sm:inline text-zera-muted">Cari Game</span>
              </button>

              {/* User Authentication Pill / Menu */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#12141A] hover:bg-[#181B24] border border-[#1E212B] hover:border-[#FFE600]/50 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#FFE600] text-[#0A0B0E] font-bold flex items-center justify-center text-[10px]">
                      {currentUser.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-mono text-xs hidden sm:inline max-w-[90px] truncate">
                      @{currentUser.username}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#12141A] border border-[#1E212B] p-2 shadow-xl z-50 animate-in fade-in duration-150">
                      <div className="px-2.5 py-1.5 border-b border-[#1E212B] mb-1">
                        <div className="text-xs font-bold text-white truncate">@{currentUser.username}</div>
                        <div className="text-[10px] text-zera-muted truncate">{currentUser.email}</div>
                      </div>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-400 hover:bg-[#181B24] rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181B24] hover:bg-[#FFE600] text-zera-white hover:text-[#0A0B0E] border border-[#1E212B] hover:border-[#FFE600] text-xs font-semibold transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Masuk / Daftar</span>
                </button>
              )}

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-lg bg-[#12141A] border border-[#1E212B] text-zera-muted hover:text-white transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#FFE600]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Minimalist Sub Bar on mobile for fast layout switching */}
          <div className="flex md:hidden items-center justify-between gap-1 mt-2 pt-2 border-t border-[#1E212B]/70">
            {layoutTabs.map((tab) => {
              const isActive = activeLayout === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleLayoutClick(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#FFE600] text-[#0A0B0E] font-bold shadow-xs'
                      : 'bg-[#12141A] text-zera-muted border border-[#1E212B]'
                  }`}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Minimalist Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative bg-[#12141A] border-t border-[#1E212B] rounded-t-2xl p-5 shadow-2xl z-50 animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-[#1E212B] rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zera-muted">
                Navigasi Halaman
              </span>
              {currentUser ? (
                <span className="text-[11px] font-mono text-[#FFE600]">@{currentUser.username}</span>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="text-xs text-[#FFE600] font-semibold"
                >
                  Masuk / Daftar
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {layoutTabs.map((tab) => {
                const isActive = activeLayout === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleLayoutClick(tab.id)}
                    className={`flex items-center justify-between w-full p-2.5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#FFE600] text-[#0A0B0E] font-bold'
                        : 'bg-[#181B24] text-white border border-[#1E212B]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#1E212B] pt-3 space-y-1 mb-4">
              {infoLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleSectionClick(link.id)}
                  className="flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-xs text-zera-muted hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-30" />
                </button>
              ))}
            </div>

            {currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#181B24] text-red-400 text-xs font-semibold mb-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun (@{currentUser.username})</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSearchClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FFE600] text-[#0A0B0E] font-tech font-bold text-xs uppercase cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Cari Game</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
