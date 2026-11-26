import { useState, useEffect } from 'react';
import { Navbar, type ActiveLayoutType } from './components/Navbar';
import { Hero } from './components/Hero';
import { GameCatalog } from './components/GameCatalog';
import { AboutUs } from './components/AboutUs';
import { Promotions } from './components/Promotions';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowToTopUp } from './components/HowToTopUp';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { GameDetailModal } from './components/GameDetailModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { TermsPrivacyModal } from './components/TermsPrivacyModal';
import { AuthModal } from './components/AuthModal';
import { LightningDecorations } from './components/LightningDecorations';
import { GameCard } from './components/GameCard';
import { GAMES_DATA } from './data/games';
import { PROMOTIONS_DATA } from './data/promotions';
import type { GameItem, GameCategory } from './types';
import type { User } from './types/auth';
import { getCurrentUser, logoutUser } from './utils/auth';
import { ArrowRight, Layers } from 'lucide-react';

export function App() {
  // 3 Layout views: 'menu_utama' (Beranda), 'list_game' (Katalog Game), 'about_us' (Tentang Kami)
  const [activeLayout, setActiveLayout] = useState<ActiveLayoutType>('menu_utama');

  // Search & Filter State for Catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('Semua Game');

  // Active section for anchor scrolling
  const [activeSection, setActiveSection] = useState('beranda');

  // Game selected for top-up modal
  const [selectedModalGame, setSelectedModalGame] = useState<GameItem | null>(null);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Load persisted user session if exists
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Prepared order for WhatsApp modal
  const [preparedOrder, setPreparedOrder] = useState<{
    gameName: string;
    packageName: string;
    paymentMethod: string;
    priceFormatted: string;
    orderId: string;
    waUrl: string;
    waMessage: string;
  } | null>(null);

  // Terms / Privacy Policy Modal state
  const [policyModal, setPolicyModal] = useState<{
    isOpen: boolean;
    type: 'terms' | 'privacy';
  }>({
    isOpen: false,
    type: 'terms',
  });

  const handleSwitchLayout = (layout: ActiveLayoutType) => {
    setActiveLayout(layout);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a game card is clicked, open the GameDetailModal (with full top-up + payment methods)
  const handleSelectGameForTopUp = (game: GameItem) => {
    setSelectedModalGame(game);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'about_us') {
      handleSwitchLayout('about_us');
      return;
    }
    if (sectionId === 'katalog') {
      handleSwitchLayout('list_game');
      return;
    }
    if (sectionId === 'beranda') {
      handleSwitchLayout('menu_utama');
      return;
    }
    if (activeLayout !== 'menu_utama') {
      setActiveLayout('menu_utama');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchTrigger = () => {
    setActiveLayout('list_game');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePromoGameSelect = (gameSlug: string) => {
    const targetGame = GAMES_DATA.find((g) => g.slug === gameSlug);
    if (targetGame) {
      handleSelectGameForTopUp(targetGame);
    } else {
      setActiveLayout('list_game');
    }
  };

  const handleOrderPrepared = (orderSummary: {
    gameName: string;
    packageName: string;
    paymentMethod: string;
    priceFormatted: string;
    orderId: string;
    waUrl: string;
    waMessage: string;
  }) => {
    setSelectedModalGame(null);
    setPreparedOrder(orderSummary);
  };

  // Featured games preview for Beranda
  const featuredGames = GAMES_DATA.slice(0, 6);

  return (
    <div className="min-h-screen relative bg-[#0A0B0E] text-[#F5F7FA] font-sans antialiased flex flex-col selection:bg-[#FFE600]/30 selection:text-[#FFE600] overflow-x-hidden">
      {/* Global Background Layer Decoration with Noticeable Electric Lightning & Mesh Gradients */}
      <LightningDecorations variant="global" />

      {/* Sticky Header with 3 Layout Tabs (Beranda, Katalog Game, Tentang Kami) & Auth Button */}
      <Navbar
        onSearchClick={handleSearchTrigger}
        onNavigateSection={handleNavigateSection}
        activeLayout={activeLayout}
        onChangeLayout={handleSwitchLayout}
        activeSection={activeSection}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Areas based on Active Layout */}
      <main className="flex-1 relative">
        {/* ============================================================== */}
        {/* LAYOUT 1: MENU UTAMA (Beranda, Promo, Panduan, FAQ)          */}
        {/* ============================================================== */}
        {activeLayout === 'menu_utama' && (
          <div className="animate-in fade-in duration-200 relative">
            <LightningDecorations variant="hero" />

            {/* Hero Section */}
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onExploreClick={() => handleSwitchLayout('list_game')}
              featuredPromo={PROMOTIONS_DATA[0]}
              onPromoClick={handlePromoGameSelect}
            />

            {/* Popular Games Showcase Section inside Menu Utama */}
            <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1E212B] relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                <div>
                  <span className="text-[11px] font-mono text-[#FFE600] uppercase tracking-wider block mb-1">
                    Game Paling Sering Di-Top Up
                  </span>
                  <h2 className="font-gaming font-extrabold text-xl sm:text-2xl text-white">
                    Pilihan Game Populer
                  </h2>
                </div>

                <button
                  onClick={() => handleSwitchLayout('list_game')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12141A] hover:bg-[#181B24] border border-[#1E212B] hover:border-[#FFE600]/40 text-xs text-zera-muted hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <Layers className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>Lihat Semua ({GAMES_DATA.length} Game)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of 6 Popular Games with new custom image icons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {featuredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onSelectGame={handleSelectGameForTopUp}
                  />
                ))}
              </div>
            </section>

            {/* Promotions Section */}
            <Promotions
              promos={PROMOTIONS_DATA}
              onSelectPromo={handlePromoGameSelect}
            />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* How to Top Up */}
            <HowToTopUp />

            {/* Frequently Asked Questions */}
            <FAQ />
          </div>
        )}

        {/* ============================================================== */}
        {/* LAYOUT 2: LIST GAME TOP UP (Dedicated Game Catalog Layout)    */}
        {/* ============================================================== */}
        {activeLayout === 'list_game' && (
          <div className="animate-in fade-in duration-200 relative">
            <LightningDecorations variant="catalog" />
            <GameCatalog
              games={GAMES_DATA}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectGame={handleSelectGameForTopUp}
              isStandaloneLayout={true}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* LAYOUT 3: ABOUT US (Tentang Kami - 6 Kotak Profil Admin & Info) */}
        {/* ============================================================== */}
        {activeLayout === 'about_us' && (
          <div className="animate-in fade-in duration-200 relative">
            <LightningDecorations variant="about" />
            <AboutUs />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenPolicy={(type) => setPolicyModal({ isOpen: true, type })}
      />

      {/* Top Up Order Modal: Form ID Akun + Paket Nominal + Metode Pembayaran Lengkap */}
      <GameDetailModal
        game={selectedModalGame}
        onClose={() => setSelectedModalGame(null)}
        onOrderPrepared={handleOrderPrepared}
      />

      {/* WhatsApp Order & Confirmation Modal */}
      <WhatsAppModal
        isOpen={!!preparedOrder}
        onClose={() => setPreparedOrder(null)}
        orderSummary={preparedOrder}
      />

      {/* Sign Up & Log In Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Terms & Privacy Policy Modal */}
      <TermsPrivacyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ ...policyModal, isOpen: false })}
        type={policyModal.type}
      />
    </div>
  );
}

export default App;
