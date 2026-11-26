import type { FC } from 'react';
import { X, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { STORE_SETTINGS } from '../data/settings';

interface TermsPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export const TermsPrivacyModal: FC<TermsPrivacyModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#12141A] border border-[#1E212B] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E212B] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
              {type === 'terms' ? <FileText className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-gaming font-bold text-lg text-white">
                {type === 'terms' ? 'Syarat & Ketentuan Layanan' : 'Kebijakan Privasi'}
              </h3>
              <p className="text-xs text-zera-muted">{STORE_SETTINGS.storeName} Catalog Policy</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#181B24] text-zera-muted hover:text-white hover:bg-[#1E212B] transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-zera-muted leading-relaxed">
          {type === 'terms' ? (
            <>
              <div>
                <h4 className="font-semibold text-white mb-1">1. Ruang Lingkup Layanan</h4>
                <p>
                  ZeraStore beroperasi sebagai platform katalog pemesanan voucher dan top up game. Seluruh transaksi dan konfirmasi pembelian diproses secara langsung melalui admin WhatsApp resmi kami.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">2. Ketepatan Data Akun Pemain</h4>
                <p>
                  Pelanggan bertanggung jawab penuh atas kebenaran User ID, Zone ID, Server, atau Riot ID yang dicantumkan saat pemesanan. ZeraStore tidak bertanggung jawab atas kesalahan pengisian nominal yang disebabkan oleh kekeliruan data ID dari pihak pembeli.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">3. Konfirmasi & Pembayaran</h4>
                <p>
                  Estimasi harga yang ditampilkan pada katalog dapat berubah sewaktu-waktu sesuai penyesuaian penyedia. Pembayaran dapat dilakukan via QRIS, DANA, GoPay, OVO, ShopeePay, Transfer Bank VA, maupun Minimarket.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">4. Keamanan Akun</h4>
                <p>
                  ZeraStore TIDAK PERNAH meminta login password akun game, password email, maupun kode verifikasi OTP. Jangan pernah menyerahkan informasi sensitif tersebut kepada siapa pun.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold text-white mb-1">1. Data yang Dikumpulkan</h4>
                <p>
                  Kami hanya mengumpulkan data publik karakter dalam game seperti User ID, Zone ID, dan Nickname/Server yang mutlak diperlukan untuk menyelesaikan pengisian diamond/item game Anda.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">2. Penggunaan Informasi</h4>
                <p>
                  Data pemain yang dimasukkan hanya digunakan semata-mata untuk mengidentifikasi akun tujuan pengisian item pada game yang bersangkutan dan tidak akan diperjualbelikan kepada pihak ketiga.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">3. Tanpa Penyimpanan Kata Sandi</h4>
                <p>
                  Situs ini bersifat statis dan tidak memiliki sistem login pengguna atau penyimpanan kartu kredit/rekening pada server kami. Seluruh proses percakapan dilindungi oleh enkripsi end-to-end WhatsApp.
                </p>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-[#1E212B] flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Ketentuan Berlaku untuk Seluruh Transaksi</span>
            </span>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#FFE600] text-[#0A0B0E] font-tech font-bold text-xs uppercase hover:bg-[#FFF04B] transition-colors cursor-pointer"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
