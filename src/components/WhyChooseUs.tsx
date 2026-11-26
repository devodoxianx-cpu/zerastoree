import type { FC } from 'react';
import { Gamepad2, Receipt, Send, Smartphone } from 'lucide-react';

export const WhyChooseUs: FC = () => {
  const benefits = [
    {
      icon: Gamepad2,
      title: "Pilihan Game Populer",
      description: "Mulai dari Mobile Legends, Free Fire, PUBG, hingga Genshin Impact dan Roblox semua tersedia lengkap.",
    },
    {
      icon: Receipt,
      title: "Harga Transparan",
      description: "Semua harga paket dicantumkan dengan jelas dalam Rupiah (IDR) tanpa biaya siluman atau biaya tersembunyi.",
    },
    {
      icon: Send,
      title: "Pemesanan via WA",
      description: "Format otomatis langsung terhubung ke WhatsApp resmi admin. Tanpa registrasi akun yang membuang waktu.",
    },
    {
      icon: Smartphone,
      title: "Tampilan Mobile Friendly",
      description: "Dioptimalkan khusus untuk smartphone Android, iPhone, tablet, hingga PC dengan antarmuka yang bersih.",
    }
  ];

  return (
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1E212B]">
      <div className="mb-6">
        <span className="text-[11px] font-mono text-[#FFE600] uppercase tracking-wider block mb-1">
          Layanan ZeraStore
        </span>
        <h2 className="font-gaming font-extrabold text-xl sm:text-2xl text-white">
          Mengapa Memilih Kami?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-[#12141A] border border-[#1E212B] hover:border-[#FFE600]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#181B24] border border-[#1E212B] flex items-center justify-center text-[#FFE600] mb-3">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-gaming font-bold text-sm sm:text-base text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-zera-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#1E212B] text-[10px] font-mono text-emerald-400">
                ✓ Layanan Terjamin
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
