import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { GameItem, PackageItem } from '../types';
import { PACKAGES_DATA } from '../data/packages';
import { STORE_SETTINGS } from '../data/settings';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import type { PaymentMethodItem } from '../data/paymentMethods';
import { formatIDR, generateOrderId, generateWhatsAppMessage } from '../utils/whatsapp';
import { validatePlayerFields } from '../utils/validation';
import {
  X,
  AlertCircle,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Info,
  QrCode,
  Wallet,
  Building2,
  Store,
  CreditCard,
  Smartphone,
  ShoppingBag
} from 'lucide-react';

interface GameDetailModalProps {
  game: GameItem | null;
  onClose: () => void;
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

export const GameDetailModal: FC<GameDetailModalProps> = ({
  game,
  onClose,
  onOrderPrepared,
}) => {
  if (!game) return null;

  const packages = PACKAGES_DATA[game.id] || [];

  // Selected package
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(
    packages.length > 0 ? (packages.find((p) => p.popular) || packages[0]) : null
  );

  // Selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodItem>(
    PAYMENT_METHODS[0]
  );

  // Field values
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    game.fields.forEach((f) => {
      if (f.type === 'select' && f.options && f.options.length > 0) {
        initial[f.id] = f.options[0];
      } else {
        initial[f.id] = '';
      }
    });
    return initial;
  });

  // Buyer notes & phone
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Reset when game changes
  useEffect(() => {
    if (packages.length > 0) {
      const defaultPkg = packages.find((p) => p.popular) || packages[0];
      setSelectedPackage(defaultPkg);
    }
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
  }, [game]);

  const handleInputChange = (fieldId: string, value: string) => {
    const updated = { ...fieldValues, [fieldId]: value };
    setFieldValues(updated);

    if (hasAttemptedSubmit) {
      const validation = validatePlayerFields(game.fields, updated);
      setErrors(validation.errors);
    }
  };

  const getFinalPrice = (method: PaymentMethodItem): number => {
    if (!selectedPackage) return 0;
    return selectedPackage.price + method.adminFee;
  };

  const handleOrderSubmit = () => {
    setHasAttemptedSubmit(true);

    const validation = validatePlayerFields(game.fields, fieldValues);
    if (!validation.isValid) {
      setErrors(validation.errors);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-[#12141A] border border-[#1E212B] rounded-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Header with Game Cover Banner */}
        <div className="relative h-32 sm:h-44 w-full bg-[#181B24] overflow-hidden shrink-0">
          <img
            src={game.bannerImage || game.coverImage}
            alt={game.name}
            className="w-full h-full object-cover object-center opacity-40 blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-[#12141A]/70 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-[#0A0B0E]/80 border border-[#1E212B] text-zera-muted hover:text-white hover:border-[#FFE600]/50 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Game Header Details */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-14 flex items-end gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#FFE600] shrink-0 bg-[#0A0B0E]">
              <img
                src={game.coverImage}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase text-[#FFE600] bg-[#FFE600]/10 px-2 py-0.5 rounded border border-[#FFE600]/30 font-bold">
                  {game.category}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-zera-muted">
                  {game.publisher}
                </span>
              </div>
              <h2 className="font-gaming font-bold text-lg sm:text-2xl text-white line-clamp-1 mt-0.5">
                {game.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Step 1: Input Player Account Data */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-gaming font-bold text-sm sm:text-base text-white">
                  Masukkan Data Akun
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tanpa Password Akun</span>
              </span>
            </div>

            {/* Dynamic Input Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 rounded-xl bg-[#0A0B0E] border border-[#1E212B]">
              {game.fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label
                    htmlFor={field.id}
                    className="block text-xs font-medium text-white"
                  >
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      id={field.id}
                      value={fieldValues[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className={`w-full bg-[#181B24] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                        errors[field.id]
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-[#1E212B] focus:border-[#FFE600]'
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
                      id={field.id}
                      type={field.type === 'number' ? 'tel' : 'text'}
                      inputMode={field.type === 'number' ? 'numeric' : 'text'}
                      value={fieldValues[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full bg-[#181B24] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zera-muted/50 focus:outline-none transition-colors ${
                        errors[field.id]
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-[#1E212B] focus:border-[#FFE600]'
                      }`}
                    />
                  )}

                  {errors[field.id] ? (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors[field.id]}</span>
                    </p>
                  ) : (
                    field.helperText && (
                      <p className="text-[10px] text-zera-muted">{field.helperText}</p>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Guide hint */}
            <div className="flex items-start gap-2 text-[11px] text-zera-muted bg-[#181B24] p-2.5 rounded-lg border border-[#1E212B]">
              <Info className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
              <span>{game.idGuide}</span>
            </div>
          </div>

          {/* Step 2: Select Nominal Package */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-gaming font-bold text-sm sm:text-base text-white">
                  Pilih Nominal Top Up
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zera-muted">
                {packages.length} Pilihan Paket
              </span>
            </div>

            {/* Package Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {packages.map((pkg) => {
                const isSelected = selectedPackage?.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`relative p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#181B24] border-[#FFE600] shadow-[0_0_18px_rgba(255,230,0,0.35)] scale-[1.02]'
                        : 'bg-[#0A0B0E] border-[#1E212B] hover:border-[#FFE600]/40 hover:bg-[#181B24]'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 right-2 bg-gradient-to-r from-[#FFE600] to-[#F59E0B] text-[#0A0B0E] text-[9px] font-gaming font-black px-1.5 py-0.5 rounded shadow">
                        POPULER
                      </div>
                    )}

                    <div>
                      <div className="font-gaming font-bold text-xs sm:text-sm text-white line-clamp-1 mb-0.5">
                        {pkg.name}
                      </div>
                      <div className="text-[10px] text-zera-muted line-clamp-1">
                        {pkg.amount}
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#1E212B] flex items-center justify-between">
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
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-[#FFE600] bg-[#FFE600] text-[#0A0B0E]'
                            : 'border-[#1E212B]'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0A0B0E]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Pilih Metode Pembayaran */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-gaming font-bold text-sm sm:text-base text-white">
                  Pilih Metode Pembayaran
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                QRIS & E-Wallet Bebas Admin
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PAYMENT_METHODS.slice(0, 6).map((method) => {
                const isSelected = selectedPaymentMethod?.id === method.id;
                const finalP = getFinalPrice(method);

                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method)}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#181B24] border-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.3)]'
                        : 'bg-[#0A0B0E] border-[#1E212B] hover:border-[#FFE600]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#181B24] border border-[#1E212B] flex items-center justify-center">
                        {renderPaymentIcon(method.iconName)}
                      </div>
                      <div>
                        <div className="font-gaming font-bold text-xs text-white">
                          {method.name}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono">
                          {method.speed}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-gaming font-bold text-xs text-[#FFE600]">
                        {formatIDR(finalP)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional: Buyer Phone & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label htmlFor="modal-phone" className="text-xs text-zera-muted font-medium">
                No. WhatsApp Anda (Opsional):
              </label>
              <input
                id="modal-phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-[#0A0B0E] border border-[#1E212B] focus:border-[#FFE600] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zera-muted/40 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="modal-notes" className="text-xs text-zera-muted font-medium">
                Catatan untuk Admin (Opsional):
              </label>
              <input
                id="modal-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Butuh cepat min"
                className="w-full bg-[#0A0B0E] border border-[#1E212B] focus:border-[#FFE600] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zera-muted/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Order Summary & Instant WhatsApp Checkout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#12141A] via-[#181B24] to-[#12141A] border border-[#FFE600]/40 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E212B] pb-2.5">
              <span className="font-gaming font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                Ringkasan Pesanan
              </span>
              <span className="text-[11px] font-mono text-[#FFE600]">
                Metode: {selectedPaymentMethod?.name || 'QRIS'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zera-muted">Game Dipilih:</span>
                <span className="font-medium text-white">{game.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zera-muted">Paket Nominal:</span>
                <span className="font-bold text-[#FFE600]">
                  {selectedPackage ? selectedPackage.name : 'Belum dipilih'}
                </span>
              </div>
              {game.fields.map((field) => {
                const val = fieldValues[field.id];
                if (!val) return null;
                return (
                  <div key={field.id} className="flex justify-between text-[11px]">
                    <span className="text-zera-muted">{field.label}:</span>
                    <span className="font-mono text-white">{val}</span>
                  </div>
                );
              })}
              <div className="flex justify-between border-t border-[#1E212B] pt-2">
                <span className="text-zera-muted font-medium">Total Pembayaran:</span>
                <span className="font-gaming font-black text-base text-[#FFE600]">
                  {selectedPackage ? formatIDR(getFinalPrice(selectedPaymentMethod)) : 'Rp 0'}
                </span>
              </div>
            </div>

            {/* Big Action Button */}
            <button
              onClick={handleOrderSubmit}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FFE600] to-[#F59E0B] hover:brightness-110 text-[#0A0B0E] font-gaming font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_20px_rgba(255,230,0,0.4)] active:scale-98 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Pesan Sekarang via WhatsApp</span>
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
