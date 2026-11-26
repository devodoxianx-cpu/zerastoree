import type { FC } from 'react';
import { Gamepad2, ShoppingBag, MessageSquare, AlertCircle, ShieldAlert } from 'lucide-react';

export const HowToTopUp: FC = () => {
  const steps = [
    {
      number: "01",
      icon: Gamepad2,
      title: "Pilih Game",
      description: "Pilih game yang ingin kamu top up di katalog ZeraStore."
    },
    {
      number: "02",
      icon: ShoppingBag,
      title: "Pilih Nominal & Bayar",
      description: "Tentukan nominal item, pilih metode pembayaran, dan masukkan ID akun."
    },
    {
      number: "03",
      icon: MessageSquare,
      title: "Kirim via WhatsApp",
      description: "Klik 'Pesan via WA', format pesanan rapi siap dikirim ke admin resmi kami."
    }
  ];

  return (
    <section id="cara-topup" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1E212B]">
      <div className="mb-6">
        <span className="text-[11px] font-mono text-[#FFE600] uppercase tracking-wider block mb-1">
          Panduan Praktis
        </span>
        <h2 className="font-gaming font-extrabold text-xl sm:text-2xl text-white">
          3 Langkah Mudah Top Up
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="rounded-xl bg-[#12141A] border border-[#1E212B] p-4 sm:p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#181B24] border border-[#1E212B] flex items-center justify-center text-[#FFE600]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-gaming font-bold text-xl text-zera-muted/30">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-gaming font-bold text-sm sm:text-base text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-zera-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notices */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-[#12141A] border border-[#1E212B] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
          <div className="text-xs text-zera-muted leading-relaxed">
            <strong className="text-white font-medium block">Jam Operasional:</strong>
            Pesanan dikonfirmasi oleh admin resmi via WhatsApp setiap hari pukul 08:00 - 23:00 WIB.
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#12141A] border border-[#1E212B] flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zera-muted leading-relaxed">
            <strong className="text-amber-400 font-medium block">Keamanan Akun:</strong>
            ZeraStore tidak pernah meminta kata sandi akun, password email, maupun kode OTP.
          </div>
        </div>
      </div>
    </section>
  );
};
