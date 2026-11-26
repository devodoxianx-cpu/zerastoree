import type { FC } from 'react';
import { ShieldCheck, Zap, Users, MessageSquare, Clock, GraduationCap, Code2, BookOpen } from 'lucide-react';
import { STORE_SETTINGS } from '../data/settings';

export const AboutUs: FC = () => {
  // 6 Anggota Tim Project Sekolah (tanpa pembagian peran)
  const teamMembers = [
    {
      id: 1,
      num: "01",
      name: "Achmad Fahri Santosa",
      initials: "AFS",
      tag: "Anggota Tim",
    },
    {
      id: 2,
      num: "02",
      name: "Ahmad Zaky Ramadhan",
      initials: "AZR",
      tag: "Anggota Tim",
    },
    {
      id: 3,
      num: "03",
      name: "Hafizh Ataya Putra",
      initials: "HAP",
      tag: "Anggota Tim",
    },
    {
      id: 4,
      num: "04",
      name: "Imam Aprilianto",
      initials: "IA",
      tag: "Anggota Tim",
    },
    {
      id: 5,
      num: "05",
      name: "Nur Ihsan Ahmad Muttaqin",
      initials: "NIAM",
      tag: "Anggota Tim",
    },
    {
      id: 6,
      num: "06",
      name: "Zaldi Akmal Faiz",
      initials: "ZAF",
      tag: "Anggota Tim",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFE600] uppercase mb-1 bg-[#FFE600]/10 px-2.5 py-1 rounded-full border border-[#FFE600]/25">
          <Users className="w-3.5 h-3.5 text-[#FFE600]" />
          <span>Tentang Kami</span>
        </div>
        <h1 className="font-gaming font-extrabold text-2xl sm:text-4xl text-white mt-1">
          Profil Tim & Pengembang ZeraStore
        </h1>
        <p className="text-xs sm:text-sm text-zera-muted mt-2 leading-relaxed">
          Kenali tim di balik perancangan dan pengembangan website katalog top-up game ZeraStore.
        </p>
      </div>

      {/* BANNER UTAMA: DISCLAIMER TUGAS PROJECT SEKOLAH */}
      <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#181B24] via-[#12141A] to-[#181B24] border-2 border-[#FFE600]/50 shadow-[0_0_25px_rgba(255,230,0,0.1)] relative overflow-hidden">
        {/* Dekorasi kilatan background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE600]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-[#FFE600]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FFE600] text-[#0A0B0E] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,230,0,0.4)]">
            <GraduationCap className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-gaming font-bold text-sm sm:text-base text-white tracking-wide">
                PEMBERITAHUAN RESMI TUGAS SEKOLAH
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FFE600] text-[#0A0B0E] font-extrabold uppercase tracking-wider">
                Project Akademik
              </span>
            </div>
            <p className="text-xs sm:text-sm text-yellow-200/90 mt-1.5 leading-relaxed">
              Website <strong className="text-[#FFE600] font-semibold">ZeraStore</strong> ini dibuat <strong>hanya sekedar Tugas Project sekolah</strong>. Seluruh fungsionalitas katalog game, simulasi metode pembayaran, dan alur top-up disajikan murni sebagai demonstrasi tugas kelompok pembelajaran pembuatan website dan bukan untuk transaksi bisnis atau komersial nyata.
            </p>
          </div>
        </div>
      </div>

      {/* 6 KOTAK PROFIL NAMA ANGGOTA DENGAN DEKORASI TEMA CYBER YELLOW (TANPA PERAN) */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-gaming font-bold text-base sm:text-lg text-white flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#FFE600]" />
          <span>Anggota Tim Project ({teamMembers.length} Orang)</span>
        </h2>
        <span className="text-xs font-mono text-[#FFE600]">Cyber Edition</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group relative rounded-2xl bg-[#12141A] border border-[#1E212B] hover:border-[#FFE600] hover:shadow-[0_0_20px_rgba(255,230,0,0.15)] p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Corner cyber accent decoration */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
              <div className="absolute transform rotate-45 bg-[#FFE600]/15 text-[#FFE600] font-mono text-[8px] font-bold py-0.5 right-[-28px] top-[10px] w-[80px] text-center">
                {member.num}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Cyber Avatar Frame */}
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-[#181B24] border-2 border-[#1E212B] group-hover:border-[#FFE600] flex items-center justify-center font-gaming font-extrabold text-[#FFE600] text-base shrink-0 transition-colors shadow-inner">
                  {member.initials}
                </div>
                {/* Tiny neon yellow indicator dot */}
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#0A0B0E] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#FFE600] animate-pulse"></div>
                </div>
              </div>

              {/* Name & Uniform Tag */}
              <div className="flex-1 min-w-0">
                <h3 className="font-gaming font-bold text-sm sm:text-base text-white group-hover:text-[#FFE600] transition-colors truncate">
                  {member.name}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/25 font-medium">
                    {member.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="mt-4 pt-3 border-t border-[#1E212B] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#FFE600] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-ping"></span>
                <span>Siswa Pengembang</span>
              </span>
              <span className="text-zera-muted">Project Sekolah</span>
            </div>
          </div>
        ))}
      </div>

      {/* TEKS DI BAWAH 6 KOTAK PROFIL ADMIN / TIM */}
      <div className="rounded-2xl bg-[#12141A] border border-[#1E212B] p-6 sm:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFE600] uppercase mb-2 bg-[#FFE600]/10 px-2.5 py-1 rounded-full border border-[#FFE600]/25">
            <BookOpen className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>Latar Belakang Project</span>
          </div>
          <h2 className="font-gaming font-extrabold text-lg sm:text-2xl text-white mb-2">
            Mengenal Lebih Dekat Project ZeraStore
          </h2>
          <p className="text-xs sm:text-sm text-zera-muted leading-relaxed">
            ZeraStore dikembangkan bersama oleh tim beranggotakan 6 orang siswa (Achmad Fahri Santosa, Ahmad Zaky Ramadhan, Hafizh Ataya Putra, Imam Aprilianto, Nur Ihsan Ahmad Muttaqin, dan Zaldi Akmal Faiz) sebagai pemenuhan <strong>Tugas Project sekolah</strong>. Project ini berfokus pada perancangan antarmuka responsif modern bertema gaming cyberpunk kuning, arsitektur komponen React, simulasi alur checkout top-up game populer, serta penerapan fitur autentikasi pengguna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#1E212B]">
          <div className="space-y-1.5 p-4 rounded-xl bg-[#181B24]/50 border border-[#1E212B]">
            <div className="flex items-center gap-2 text-white font-gaming font-bold text-sm">
              <GraduationCap className="w-4 h-4 text-[#FFE600]" />
              <span>Tugas & Edukasi Kelompok</span>
            </div>
            <p className="text-xs text-zera-muted leading-relaxed">
              Materi tugas project mencakup perancangan antarmuka (UI/UX), tata kelola state management modern, responsive design untuk desktop & smartphone, dan kolaborasi tim.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-[#181B24]/50 border border-[#1E212B]">
            <div className="flex items-center gap-2 text-white font-gaming font-bold text-sm">
              <Zap className="w-4 h-4 text-[#FFE600]" />
              <span>Simulasi Alur Checkout</span>
            </div>
            <p className="text-xs text-zera-muted leading-relaxed">
              Fitur pemilihan paket diamond, kalkulasi biaya admin, pemilihan metode bayar (QRIS, VA, E-Wallet), serta pengalihan ke WhatsApp dirancang sebagai alur prototipe interaktif.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-[#181B24]/50 border border-[#1E212B]">
            <div className="flex items-center gap-2 text-white font-gaming font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-[#FFE600]" />
              <span>Non-Komersial & Aman</span>
            </div>
            <p className="text-xs text-zera-muted leading-relaxed">
              Website ini bebas dari transaksi uang nyata ataupun pengumpulan data sensitif. Tidak ada pemungutan biaya komersial apa pun karena semata-mata adalah karya tugas sekolah.
            </p>
          </div>
        </div>

        {/* Contact WhatsApp Admin Project */}
        <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1E212B] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#181B24] border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Kontak WhatsApp Admin / Tim Project</div>
              <div className="text-[11px] text-zera-muted font-mono">
                Nomor Resmi: <span className="text-[#FFE600] font-semibold">{STORE_SETTINGS.whatsappNumber}</span>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${STORE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo Tim Project ZeraStore, saya ingin menanyakan perihal website project sekolah ini.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-bold text-xs uppercase hover:bg-[#FFF04B] transition-colors shrink-0 shadow-[0_0_12px_rgba(255,230,0,0.3)]"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Hubungi Admin WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
