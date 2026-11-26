import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { GameItem, PackageItem, GameCategory } from '../types';
import { PACKAGES_DATA } from '../data/packages';
import { STORE_SETTINGS } from '../data/settings';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import type { PaymentMethodItem } from '../data/paymentMethods';
import { formatIDR, generateOrderId, generateWhatsAppMessage } from '../utils/whatsapp';
import { validatePlayerFields } from '../utils/validation';
import {
  ArrowLeft,
  ShieldCheck,
  QrCode,
  Wallet,
  Building2,
  Store,
  CreditCard,
  Smartphone,
  ShoppingBag,
  Info,
  AlertCircle,
  MessageSquare,
  ChevronRight,
  Check,
  Search,
  Gamepad2
} from 'lucide-react';

interface TopUpLayoutProps {
  game: GameItem | null;
  allGames: GameItem[];
  onSelectGame: (game: GameItem) => void;
  onResetGame: () => void;
  onBackToHome: () => void;
  onOrderPrepared: (summary: {
    gameName: string;
    packageName: string;
    paymentMethod: string;
    priceFormatted: string;
    orderId: string;
    waUrl: string;
    waMessage: string;
  }) => void;
}

export const TopUpLayout: FC<TopUpLayoutProps> = ({
  game,
  allGames,
  onSelectGame,
  onResetGame,
  onBackToHome,
  onOrderPrepared,
}) => {
  // Neutral state: Search & Category filter when selecting game
  const [neutralSearch, setNeutralSearch] = useState('');
  const [neutralCategory, setNeutralCategory] = useState<GameCategory>('Semua Game');

  const categories: GameCategory[] = [
    'Semua Game',
    'MOBA',
    'Battle Royale',
    'RPG',
    'FPS',
    'Casual',
  ];

  const packages = game ? (PACKAGES_DATA[game.id] || []) : [];

  // Selected package
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(() => {
    return packages.find((p) => p.popular) || packages[0] || null;
  });

  // Selected payment category & method
  const [selectedPaymentCategory, setSelectedPaymentCategory] = useState<string>('Semua');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodItem>(
    PAYMENT_METHODS[0] // Default to QRIS
  );

  // Package Category Group Filter
  const categoryGroups = Array.from(
    new Set(packages.map((p) => p.categoryGroup).filter(Boolean))
  ) as string[];
  const [activePkgGroup, setActivePkgGroup] = useState<string>('Semua');

  // Filtered packages
  const filteredPackages = packages.filter((pkg) => {
    if (activePkgGroup === 'Semua') return true;
    return pkg.categoryGroup === activePkgGroup;
  });

  // Player Account Input Fields
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  // Buyer Phone & Notes
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Reset states when target game changes
  useEffect(() => {
    if (game) {
      const pkgs = PACKAGES_DATA[game.id] || [];
      const defaultPkg = pkgs.find((p) => p.popular) || pkgs[0] || null;
      setSelectedPackage(defaultPkg);
      setActivePkgGroup('Semua');

      const initial: Record<string, string> = {};
      game.fields.forEach((f) => {
        if (f.type === 'select' && f.options && f.options.length > 0) {
          initial[f.id] = f.options[0];
        } else {
          initial[f.id] = '';
        }
      });
      setFieldValues(initial);
      setErrors({});
      setHasAttemptedSubmit(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [game]);

  const handleInputChange = (fieldId: string, value: string) => {
    const updated = { ...fieldValues, [fieldId]: value };
    setFieldValues(updated);

    if (hasAttemptedSubmit && game) {
      const validation = validatePlayerFields(game.fields, updated);
      setErrors(validation.errors);
    }
  };

  const getFinalPrice = (method: PaymentMethodItem): number => {
    if (!selectedPackage) return 0;
    return selectedPackage.price + method.adminFee;
  };

  const handleOrderSubmit = () => {
    if (!game) return;
    setHasAttemptedSubmit(true);

    const validation = validatePlayerFields(game.fields, fieldValues);
    if (!validation.isValid) {
      setErrors(validation.errors);
      const el = document.getElementById('step-account-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!selectedPackage) {
      alert('Silakan pilih salah satu paket item top up terlebih dahulu.');
      return;
    }

    if (!selectedPaymentMethod) {
      alert('Silakan pilih salah satu metode pembayaran.');
      return;
    }

    const orderId = generateOrderId();
    const finalPrice = getFinalPrice(selectedPaymentMethod);

    const result = generateWhatsAppMessage({
      game,
      pkg: {
        ...selectedPackage,
        price: finalPrice,
      },
      fieldValues,
      settings: STORE_SETTINGS,
      paymentMethod: selectedPaymentMethod.name,
      customerPhone,
      orderId,
      notes,
    });

    onOrderPrepared({
      gameName: game.name,
      packageName: selectedPackage.name,
      paymentMethod: selectedPaymentMethod.name,
      priceFormatted: formatIDR(finalPrice),
      orderId: result.orderId,
      waUrl: result.url,
      waMessage: result.message,
    });
  };

  const renderPaymentIcon = (iconName: string) => {
    switch (iconName) {
      case 'QrCode':
        return <QrCode className="w-4 h-4 text-[#FFE600]" />;
      case 'Wallet':
        return <Wallet className="w-4 h-4 text-[#FFE600]" />;
      case 'Building2':
        return <Building2 className="w-4 h-4 text-[#FFE600]" />;
      case 'Store':
        return <Store className="w-4 h-4 text-[#FFE600]" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 text-[#FFE600]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-[#FFE600]" />;
      default:
        return <CreditCard className="w-4 h-4 text-[#FFE600]" />;
    }
  };

  const paymentCategories = ['Semua', 'QRIS', 'E-Wallet', 'Virtual Account', 'Convenience Store'];

  const filteredPaymentMethods = PAYMENT_METHODS.filter((m) => {
    if (selectedPaymentCategory === 'Semua') return true;
    return m.category === selectedPaymentCategory;
  });

  // Filter for neutral game selection
  const filteredGamesForSelection = allGames.filter((g) => {
    const matchCat = neutralCategory === 'Semua Game' || g.category === neutralCategory;
    const matchSearch =
      g.name.toLowerCase().includes(neutralSearch.toLowerCase()) ||
      g.publisher.toLowerCase().includes(neutralSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // =========================================================================
  // NEUTRAL STATE: Jika game belum dipilih saat laman top up dibuka
  // =========================================================================
  if (!game) {
    return (
      <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-zera-muted mb-6 pb-3 border-b border-[#1E212B]">
          <button onClick={onBackToHome} className="hover:text-[#FFE600] transition-colors">
            Beranda
          </button>
          <span>/</span>
          <span className="text-[#FFE600] font-semibold">Pilih Game Top Up</span>
        </div>

        {/* Minimalist Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFE600] uppercase mb-1">
            <Gamepad2 className="w-4 h-4 text-[#FFE600]" />
            <span>Langkah Pertama</span>
          </div>
          <h1 className="font-gaming font-extrabold text-2xl sm:text-3xl text-white">
            Pilih Game yang Ingin Di-Top Up
          </h1>
          <p className="text-xs sm:text-sm text-zera-muted mt-1 leading-relaxed">
            Silakan tentukan game favoritmu untuk melanjutkan ke pengisian akun, pemilihan nominal paket, dan metode pembayaran.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setNeutralCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  neutralCategory === cat
                    ? 'bg-[#FFE600] text-[#0A0B0E] font-bold shadow-sm'
                    : 'bg-[#12141A] text-zera-muted hover:text-white border border-[#1E212B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-zera-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={neutralSearch}
              onChange={(e) => setNeutralSearch(e.target.value)}
              placeholder="Cari game..."
              className="w-full bg-[#12141A] border border-[#1E212B] focus:border-[#FFE600] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-zera-muted/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Neutral Game Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredGamesForSelection.map((g) => (
            <div
              key={g.id}
              onClick={() => onSelectGame(g)}
              className="group rounded-xl bg-[#12141A] border border-[#1E212B] hover:border-[#FFE600]/60 p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-[#181B24] border border-[#1E212B] mb-2.5">
                <img
                  src={g.icon || g.coverImage}
                  alt={g.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div>
                <div className="text-[10px] font-mono text-zera-muted uppercase truncate">
                  {g.publisher}
                </div>
                <h3 className="font-gaming font-bold text-xs sm:text-sm text-white group-hover:text-[#FFE600] transition-colors truncate">
                  {g.name}
                </h3>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#1E212B] flex items-center justify-between text-[11px]">
                <span className="text-[10px] font-mono text-[#FFE600]">{g.category}</span>
                <span className="font-semibold text-white group-hover:text-[#FFE600] flex items-center">
                  Pilih <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // ACTIVE GAME STATE: Top Up Form for the chosen game (Minimalist UI)
  // =========================================================================
  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      {/* Breadcrumb Navigation & Back to neutral switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[#1E212B]">
        <div className="flex items-center gap-2 text-xs font-mono">
          <button onClick={onBackToHome} className="text-zera-muted hover:text-[#FFE600] transition-colors">
            Beranda
          </button>
          <span className="text-zera-muted">/</span>
          <button onClick={onResetGame} className="text-zera-muted hover:text-[#FFE600] transition-colors">
            Pilih Game
          </button>
          <span className="text-zera-muted">/</span>
          <span className="text-[#FFE600] font-semibold">{game.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetGame}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12141A] hover:bg-[#181B24] border border-[#1E212B] hover:border-[#FFE600]/40 text-xs text-zera-muted hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>Ganti Game</span>
          </button>

          <select
            value={game.id}
            onChange={(e) => {
              const target = allGames.find((g) => g.id === e.target.value);
              if (target) onSelectGame(target);
            }}
            className="bg-[#12141A] border border-[#1E212B] focus:border-[#FFE600] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            {allGames.map((g) => (
              <option key={g.id} value={g.id} className="bg-[#12141A] text-white">
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Form (Col 8) | Sticky Order Summary (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-5">
          {/* Minimalist Game Header Banner */}
          <div className="rounded-xl bg-[#12141A] border border-[#1E212B] p-4 sm:p-5 flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#FFE600]/40 shrink-0 bg-[#0A0B0E]">
              <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase text-[#FFE600] bg-[#FFE600]/10 px-2 py-0.5 rounded font-bold">
                  {game.category}
                </span>
                <span className="text-[10px] font-mono text-zera-muted">{game.publisher}</span>
              </div>
              <h1 className="font-gaming font-extrabold text-lg sm:text-2xl text-white truncate">
                {game.name}
              </h1>
              <p className="text-xs text-zera-muted line-clamp-1 mt-0.5">{game.description}</p>
            </div>
          </div>

          {/* STEP 1: DATA AKUN */}
          <section id="step-account-form" className="rounded-xl bg-[#12141A] border border-[#1E212B] p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#1E212B]">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="font-gaming font-bold text-sm sm:text-base text-white">
                  Masukkan Data Akun
                </h2>
              </div>
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tanpa Password</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {game.fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label htmlFor={`topup-${field.id}`} className="block text-xs font-medium text-white">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      id={`topup-${field.id}`}
                      value={fieldValues[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className={`w-full bg-[#181B24] border rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                        errors[field.id] ? 'border-red-500' : 'border-[#1E212B] focus:border-[#FFE600]'
                      }`}
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#12141A] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`topup-${field.id}`}
                      type={field.type === 'number' ? 'tel' : 'text'}
                      inputMode={field.type === 'number' ? 'numeric' : 'text'}
                      value={fieldValues[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full bg-[#181B24] border rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-zera-muted/40 focus:outline-none transition-colors ${
                        errors[field.id] ? 'border-red-500' : 'border-[#1E212B] focus:border-[#FFE600]'
                      }`}
                    />
                  )}

                  {errors[field.id] ? (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors[field.id]}</span>
                    </p>
                  ) : (
                    field.helperText && <p className="text-[10px] text-zera-muted">{field.helperText}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2 text-[11px] text-zera-muted bg-[#181B24] p-2.5 rounded-lg border border-[#1E212B]">
              <Info className="w-3.5 h-3.5 text-[#FFE600] shrink-0 mt-0.5" />
              <span>{game.idGuide}</span>
            </div>
          </section>

          {/* STEP 2: PILIH NOMINAL ITEM */}
          <section className="rounded-xl bg-[#12141A] border border-[#1E212B] p-4 sm:p-5 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#1E212B]">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="font-gaming font-bold text-sm sm:text-base text-white">
                  Pilih Nominal Top Up
                </h2>
              </div>

              {categoryGroups.length > 1 && (
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  <button
                    onClick={() => setActivePkgGroup('Semua')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                      activePkgGroup === 'Semua'
                        ? 'bg-[#FFE600] text-[#0A0B0E] font-bold'
                        : 'bg-[#181B24] text-zera-muted hover:text-white border border-[#1E212B]'
                    }`}
                  >
                    Semua
                  </button>
                  {categoryGroups.map((group) => (
                    <button
                      key={group}
                      onClick={() => setActivePkgGroup(group)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all whitespace-nowrap ${
                        activePkgGroup === group
                          ? 'bg-[#FFE600] text-[#0A0B0E] font-bold'
                          : 'bg-[#181B24] text-zera-muted hover:text-white border border-[#1E212B]'
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredPackages.map((pkg) => {
                const isSelected = selectedPackage?.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`relative p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#181B24] border-[#FFE600] shadow-sm scale-[1.01]'
                        : 'bg-[#0A0B0E] border-[#1E212B] hover:border-[#FFE600]/40 hover:bg-[#181B24]'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 right-2 bg-[#FFE600] text-[#0A0B0E] text-[9px] font-gaming font-bold px-1.5 py-0.2 rounded shadow">
                        POPULER
                      </div>
                    )}

                    <div>
                      <div className="font-gaming font-bold text-xs sm:text-sm text-white line-clamp-1 mb-0.5">
                        {pkg.name}
                      </div>
                      <div className="text-[10px] text-zera-muted line-clamp-1">{pkg.amount}</div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#1E212B] flex items-end justify-between">
                      <div>
                        {pkg.originalPrice && (
                          <div className="text-[10px] text-zera-muted line-through font-mono">
                            {formatIDR(pkg.originalPrice)}
                          </div>
                        )}
                        <div className="font-gaming font-bold text-xs sm:text-sm text-[#FFE600]">
                          {formatIDR(pkg.price)}
                        </div>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'border-[#FFE600] bg-[#FFE600] text-[#0A0B0E]' : 'border-[#1E212B]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 3: PILIH METODE PEMBAYARAN */}
          <section className="rounded-xl bg-[#12141A] border border-[#1E212B] p-4 sm:p-5 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#1E212B]">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="font-gaming font-bold text-sm sm:text-base text-white">
                  Pilih Metode Pembayaran
                </h2>
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {paymentCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPaymentCategory(cat)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-all whitespace-nowrap ${
                      selectedPaymentCategory === cat
                        ? 'bg-[#FFE600] text-[#0A0B0E] font-bold'
                        : 'bg-[#181B24] text-zera-muted hover:text-white border border-[#1E212B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredPaymentMethods.map((method) => {
                const isSelected = selectedPaymentMethod?.id === method.id;
                const priceForThisMethod = getFinalPrice(method);

                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#181B24] border-[#FFE600] shadow-sm'
                        : 'bg-[#0A0B0E] border-[#1E212B] hover:border-[#FFE600]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#181B24] border border-[#1E212B] flex items-center justify-center">
                        {renderPaymentIcon(method.iconName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-gaming font-bold text-xs text-white">
                            {method.name}
                          </span>
                        </div>
                        <div className="text-[10px] text-zera-muted font-mono">
                          {method.speed} • {method.adminFeeFormatted}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-gaming font-bold text-xs text-[#FFE600]">
                        {formatIDR(priceForThisMethod)}
                      </div>
                      <div className="mt-0.5 flex justify-end">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#FFE600] bg-[#FFE600]' : 'border-[#1E212B]'
                          }`}
                        >
                          {isSelected && <div className="w-1 h-1 rounded-full bg-[#0A0B0E]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 4: KONTAK & CATATAN */}
          <section className="rounded-xl bg-[#12141A] border border-[#1E212B] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#1E212B]">
              <span className="w-6 h-6 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-black text-xs flex items-center justify-center">
                4
              </span>
              <h2 className="font-gaming font-bold text-sm sm:text-base text-white">
                Kontak WhatsApp & Catatan (Opsional)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="cust-phone" className="text-xs text-zera-muted">
                  Nomor WhatsApp Anda:
                </label>
                <input
                  id="cust-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full bg-[#181B24] border border-[#1E212B] focus:border-[#FFE600] rounded-lg px-3 py-2 text-xs text-white placeholder-zera-muted/40 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="cust-notes" className="text-xs text-zera-muted">
                  Catatan untuk Admin:
                </label>
                <input
                  id="cust-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Butuh cepat min"
                  className="w-full bg-[#181B24] border border-[#1E212B] focus:border-[#FFE600] rounded-lg px-3 py-2 text-xs text-white placeholder-zera-muted/40 focus:outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
          <div className="rounded-xl bg-[#12141A] border border-[#FFE600]/40 p-4 sm:p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#1E212B]">
              <h3 className="font-gaming font-bold text-xs uppercase tracking-wider text-white">
                Ringkasan Pesanan
              </h3>
              <span className="text-[10px] font-mono text-[#FFE600] bg-[#FFE600]/10 px-2 py-0.5 rounded font-bold">
                LANGKAH 5
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zera-muted">Game:</span>
                <span className="font-medium text-white">{game.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zera-muted">Paket Nominal:</span>
                <span className="font-bold text-[#FFE600]">
                  {selectedPackage ? selectedPackage.name : 'Belum dipilih'}
                </span>
              </div>
              {game.fields.map((f) => {
                const val = fieldValues[f.id];
                if (!val) return null;
                return (
                  <div key={f.id} className="flex justify-between text-[11px]">
                    <span className="text-zera-muted">{f.label}:</span>
                    <span className="font-mono text-white">{val}</span>
                  </div>
                );
              })}
              <div className="flex justify-between pt-1 border-t border-[#1E212B]">
                <span className="text-zera-muted">Metode Bayar:</span>
                <span className="font-medium text-white">{selectedPaymentMethod?.name}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zera-muted">Biaya Admin:</span>
                <span className="font-mono text-emerald-400">
                  {selectedPaymentMethod?.adminFeeFormatted}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#1E212B]">
                <span className="font-semibold text-white">Total:</span>
                <span className="font-gaming font-extrabold text-lg text-[#FFE600]">
                  {selectedPackage ? formatIDR(getFinalPrice(selectedPaymentMethod)) : 'Rp 0'}
                </span>
              </div>
            </div>

            <button
              onClick={handleOrderSubmit}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFE600] hover:bg-[#FFF04B] text-[#0A0B0E] font-gaming font-bold text-xs sm:text-sm tracking-wider uppercase active:scale-98 transition-all cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Pesan via WhatsApp</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Transaksi Aman & Bergaransi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
