# 🎮 ZeraStore — Modern Game Top-Up Website

> **"Top Up Cepat, Push Rank Tanpa Batas."**  
> Platform katalog top-up game terpercaya, responsif, dan berestetika cyberpunk modern (*deep black & bright yellow #FFE600*) yang dirancang khusus sebagai pemenuhan **Tugas Project Sekolah**.

---

## 🌟 Fitur Utama

- **Identitas Visual Cyberpunk Kuning Cerah**: Mengusung tema *cyberpunk gaming marketplace* dengan perpaduan latar hitam pekat (`#0A0B0E`, `#12141A`), aksen kuning terang (`#FFE600`, `#FFF04B`), kilatan petir dekoratif (*lightning effects*), dan gradasi halus di setiap layernya.
- **Pemisahan Layout yang Rapi & Terstruktur**:
  1. **Menu Utama / Beranda**: Headline, search bar, banner promo, dan ringkasan keunggulan.
  2. **Top Up Game (Katalog)**: Grid 10 game populer dengan filter kategori dan pemilihan game tujuan.
  3. **Tentang Kami**: Profil tim pengembang dan penegasan tugas project sekolah.
- **Sistem Pembayaran Lengkap**: Setiap pemilihan item top-up dilengkapi simulasi metode pembayaran instan (QRIS, GoPay, OVO, DANA, ShopeePay, Virtual Account BCA/Mandiri/BRI/BNI, serta gerai Alfamart/Indomaret).
- **Sistem Masuk & Daftar Akun (Auth Modal)**:
  - Form Masuk (*Log In*) & Daftar Akun Baru (*Sign Up*) mencakup Username, Email, dan Password.
  - Penyimpanan data lokal (*localStorage*) dan status profil pengguna yang aktif.
- **Katalog 10 Game Terpopuler**:
  1. *Mobile Legends: Bang Bang* (MOBA)
  2. *Garena Free Fire* (Battle Royale)
  3. *PUBG Mobile* (Battle Royale)
  4. *Honor of Kings* (MOBA)
  5. *Genshin Impact* (RPG)
  6. *Roblox* (Casual)
  7. *Call of Duty: Mobile* (FPS)
  8. *Valorant* (FPS)
  9. *Wuthering Waves* (RPG)
  10. *Zenless Zone Zero* (RPG)
- **Validasi Data Akun Pemain**:
  - Format input spesifik tiap game (User ID + Zone ID, UID + Server, Riot ID + Tag, dll).
  - Jaminan keamanan: tidak meminta kata sandi maupun kode OTP.
- **Integrasi WhatsApp Admin**:
  - Admin resmi: **085879146250**
  - Pembuatan nomor pesanan otomatis (contoh: `ZR-928104`) dan template pesan terstruktur rapi.

---

## 👥 Tim Pengembang (Tugas Project Sekolah)

Website ini dikembangkan bersama sebagai karya tugas project sekolah oleh:
1. **Achmad Fahri Santosa**
2. **Ahmad Zaky Ramadhan**
3. **Hafizh Ataya Putra**
4. **Imam Aprilianto**
5. **Nur Ihsan Ahmad Muttaqin**
6. **Zaldi Akmal Faiz**

*Catatan: Seluruh produk, item, dan transaksi dalam website ini disimulasikan untuk keperluan demonstrasi tugas project sekolah non-komersial.*

---

## 🛠️ Teknologi yang Digunakan

- **React 18** (Komponen modular & state reaktif)
- **TypeScript 5** (Strict & type-safe)
- **Vite 6** (Build tool ultra-cepat)
- **Tailwind CSS 3** (Utility-first styling & tema cyberpunk)
- **Lucide React** (Ikon interaktif)

---

## 🚀 Cara Menjalankan Project

### 1. Install Dependensi
```bash
npm install
```

### 2. Jalankan Mode Pengembangan (Local Server)
```bash
npm run dev
```
Buka browser di `http://localhost:5173/`.

### 3. Build untuk Produksi
```bash
npm run build
```

---

## 📤 Panduan Upload ke GitHub (Web Browser)
Jika mengunggah lewat tombol **"Upload files"** di web GitHub (batas maks 100 file):
- Folder `node_modules/` **tidak boleh diunggah** karena berisi ribuan package pihak ketiga yang otomatis terunduh kembali lewat perintah `npm install`.
- Seluruh kode sumber inti website ini hanya berjumlah **57 file** (jauh di bawah batas 100 file).
- Anda dapat langsung men-drag seluruh isi folder `ZStore_Upload_GitHub` yang telah disiapkan tanpa kendala.
