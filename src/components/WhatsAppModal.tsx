import { useState } from 'react';
import type { FC } from 'react';
import { X, MessageSquare, Copy, Check, ExternalLink, CreditCard } from 'lucide-react';
import { STORE_SETTINGS } from '../data/settings';

export interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderSummary: {
    gameName: string;
    packageName: string;
    paymentMethod?: string;
    priceFormatted: string;
    orderId: string;
    waUrl: string;
    waMessage: string;
  } | null;
}

export const WhatsAppModal: FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  orderSummary,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !orderSummary) return null;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(orderSummary.waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const finalPhone = STORE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '');
    const finalUrl = `https://wa.me/${finalPhone}?text=${encodeURIComponent(orderSummary.waMessage)}`;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#12141A] border border-[#FFE600]/40 rounded-2xl p-5 sm:p-6 shadow-xl z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1E212B] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-gaming font-bold text-base text-white">
                Siap Menghubungkan WhatsApp
              </h3>
              <p className="text-[11px] font-mono text-[#FFE600]">
                Order ID: {orderSummary.orderId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-[#181B24] text-zera-muted hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3.5">
          {/* Order Quick Summary Card */}
          <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#1E212B] space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-zera-muted">Game:</span>
              <span className="font-bold text-white">{orderSummary.gameName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zera-muted">Paket Item:</span>
              <span className="font-bold text-[#FFE600]">{orderSummary.packageName}</span>
            </div>
            {orderSummary.paymentMethod && (
              <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#1E212B]">
                <span className="text-zera-muted flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-[#FFE600]" />
                  Metode Bayar:
                </span>
                <span className="font-medium text-white">{orderSummary.paymentMethod}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-[#1E212B] pt-1.5">
              <span className="text-zera-muted font-medium">Estimasi Pembayaran:</span>
              <span className="font-gaming font-bold text-sm text-[#FFE600]">
                {orderSummary.priceFormatted}
              </span>
            </div>
          </div>

          {/* Preview Format Chat */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-zera-muted uppercase">Pesan Otomatis:</span>
              <button
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1 text-[11px] text-[#FFE600] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin!' : 'Salin Pesan'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-[#0A0B0E] border border-[#1E212B] text-[11px] text-zera-muted font-mono whitespace-pre-wrap max-h-32 overflow-y-auto leading-relaxed select-all">
              {orderSummary.waMessage}
            </pre>
          </div>

          <div className="text-[11px] text-zera-muted bg-[#181B24] p-2.5 rounded-lg border border-[#1E212B]">
            Nomor WhatsApp Admin Resmi: <span className="text-white font-mono font-semibold">0858-7914-6250</span>
          </div>

          {/* Action Button: Buka WhatsApp */}
          <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFE600] hover:bg-[#FFF04B] text-[#0A0B0E] font-gaming font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Buka WhatsApp Sekarang</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="sm:w-auto px-4 py-3 rounded-xl bg-[#181B24] text-zera-muted hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
