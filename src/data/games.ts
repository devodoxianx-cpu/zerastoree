import type { GameItem } from '../types';

export const GAMES_DATA: GameItem[] = [
  {
    id: "mlbb",
    name: "Mobile Legends: Bang Bang",
    slug: "mobile-legends",
    category: "MOBA",
    publisher: "Moonton",
    icon: "/images/games/mobile-legends.jpg",
    image: "/images/games/mobile-legends.jpg",
    coverImage: "/images/games/mobile-legends.jpg",
    bannerImage: "/images/games/mobile-legends.jpg",
    badge: "POPULER",
    description: "Top up Diamond Mobile Legends: Bang Bang resmi dan cepat. Dapatkan skin hero impian dan push rank Mythic tanpa hambatan!",
    idGuide: "Buka profil MLBB di pojok kiri atas. Contoh format: User ID '12345678' dan Zone ID '2042'.",
    fields: [
      {
        id: "userId",
        label: "User ID",
        placeholder: "Contoh: 12345678",
        type: "number",
        helperText: "Ketik 8-10 digit User ID akun MLBB Anda.",
        required: true,
      },
      {
        id: "zoneId",
        label: "Zone ID",
        placeholder: "Contoh: 2042",
        type: "number",
        helperText: "4-5 digit angka di dalam tanda kurung (Zone ID).",
        required: true,
      }
    ]
  },
  {
    id: "ff",
    name: "Garena Free Fire",
    slug: "free-fire",
    category: "Battle Royale",
    publisher: "Garena",
    icon: "/images/games/free-fire.jpg",
    image: "/images/games/free-fire.jpg",
    coverImage: "/images/games/free-fire.jpg",
    bannerImage: "/images/games/free-fire.jpg",
    badge: "HOT DEAL",
    description: "Beli Diamond Free Fire instan dan murah. Siap Booyah dengan bundle, senjata evo, dan elite pass terkini!",
    idGuide: "Klik avatar profil di pojok kiri atas lobi Free Fire. Salin User ID (UID) akun Anda.",
    fields: [
      {
        id: "userId",
        label: "Player ID (UID)",
        placeholder: "Contoh: 1234567890",
        type: "number",
        helperText: "Ketik 9-10 digit Player ID Free Fire Anda.",
        required: true,
      }
    ]
  },
  {
    id: "pubgm",
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    category: "Battle Royale",
    publisher: "Level Infinite",
    icon: "/images/games/pubg-mobile.jpg",
    image: "/images/games/pubg-mobile.jpg",
    coverImage: "/images/games/pubg-mobile.jpg",
    bannerImage: "/images/games/pubg-mobile.jpg",
    badge: "FAVORIT",
    description: "Top up Unknown Cash (UC) PUBG Mobile mudah dan aman. Upgrade Royale Pass dan spin crate skin eksklusif!",
    idGuide: "Buka menu profil di game PUBG Mobile, Player ID terletak di bawah nama avatar karakter.",
    fields: [
      {
        id: "userId",
        label: "Player ID (Character ID)",
        placeholder: "Contoh: 5123456789",
        type: "number",
        helperText: "Ketik 10 digit Character ID PUBG Mobile Anda.",
        required: true,
      }
    ]
  },
  {
    id: "hok",
    name: "Honor of Kings",
    slug: "honor-of-kings",
    category: "MOBA",
    publisher: "Level Infinite / TiMi Studio",
    icon: "/images/games/honor-of-kings.jpg",
    image: "/images/games/honor-of-kings.jpg",
    coverImage: "/images/games/honor-of-kings.jpg",
    bannerImage: "/images/games/honor-of-kings.jpg",
    badge: "NEW EVENT",
    description: "Isi Tokens Honor of Kings tercepat. Buka hero terkuat, skin kolaborasi anime, dan raih rank Grandmaster!",
    idGuide: "Buka Pengaturan game > Akun > Salin Player UID akun Honor of Kings Anda.",
    fields: [
      {
        id: "userId",
        label: "Player UID",
        placeholder: "Contoh: 618491823901",
        type: "text",
        helperText: "UID pemain dapat dilihat di menu Pengaturan Akun.",
        required: true,
      }
    ]
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    slug: "genshin-impact",
    category: "RPG",
    publisher: "HoYoverse",
    icon: "/images/games/genshin-impact.jpg",
    image: "/images/games/genshin-impact.jpg",
    coverImage: "/images/games/genshin-impact.jpg",
    bannerImage: "/images/games/genshin-impact.jpg",
    badge: "BEST SELLER",
    description: "Top up Genesis Crystals & Blessing of the Welkin Moon resmi via UID. Tarik karakter bintang 5 impianmu di Teyvat!",
    idGuide: "Buka menu Paimon di pojok kiri atas. UID 9 digit tertera di sudut kanan bawah layar.",
    fields: [
      {
        id: "userId",
        label: "UID Pemain",
        placeholder: "Contoh: 812345678",
        type: "number",
        helperText: "UID 9 digit akun Genshin Impact.",
        required: true,
      },
      {
        id: "server",
        label: "Server",
        placeholder: "Pilih Server",
        type: "select",
        options: ["Asia", "America", "Europe", "TW, HK, MO"],
        helperText: "Pastikan server sesuai dengan region akun Anda.",
        required: true,
      }
    ]
  },
  {
    id: "roblox",
    name: "Roblox",
    slug: "roblox",
    category: "Casual",
    publisher: "Roblox Corporation",
    icon: "/images/games/roblox.jpg",
    image: "/images/games/roblox.jpg",
    coverImage: "/images/games/roblox.jpg",
    bannerImage: "/images/games/roblox.jpg",
    badge: "TRENDING",
    description: "Beli Robux instan dan mudah. Kustomisasi avatar Roblox sesukamu dan akses game pass favorit di Blox Fruits, Pet Sim, dll!",
    idGuide: "Masukkan Username Roblox yang aktif (bukan Display Name). Pastikan penulisan huruf besar/kecil benar.",
    fields: [
      {
        id: "userId",
        label: "Roblox Username",
        placeholder: "Contoh: Robloxgamer_id",
        type: "text",
        helperText: "Username asli akun Roblox Anda (tanpa tanda @).",
        required: true,
      }
    ]
  },
  {
    id: "codm",
    name: "Call of Duty: Mobile",
    slug: "cod-mobile",
    category: "FPS",
    publisher: "Garena",
    icon: "/images/games/cod-mobile.png",
    image: "/images/games/cod-mobile.png",
    coverImage: "/images/games/cod-mobile.png",
    bannerImage: "/images/games/cod-mobile.png",
    badge: "POPULER",
    description: "Top up CP Call of Duty: Mobile instan. Beli Battle Pass, lucky draw senjata mythic, dan kuasai medan pertempuran!",
    idGuide: "Buka profil CODM, klik tab kedua (Player Profile), salin nomor OpenID Anda.",
    fields: [
      {
        id: "userId",
        label: "OpenID",
        placeholder: "Contoh: 1234567890987654321",
        type: "text",
        helperText: "OpenID dapat disalin dari profil akun game Anda.",
        required: true,
      }
    ]
  },
  {
    id: "valorant",
    name: "Valorant",
    slug: "valorant",
    category: "FPS",
    publisher: "Riot Games",
    icon: "/images/games/valorant.jpg",
    image: "/images/games/valorant.jpg",
    coverImage: "/images/games/valorant.jpg",
    bannerImage: "/images/games/valorant.jpg",
    badge: "HOT",
    description: "Isi Valorant Points (VP) server Indonesia / APAC. Beli skin Phantom Kuronami, Vandal Prime, dan Night Market!",
    idGuide: "Format Riot ID: NamaAkun#TAG (Contoh: JettMain#IND).",
    fields: [
      {
        id: "userId",
        label: "Riot ID + Tagline",
        placeholder: "Contoh: JettMain#IND",
        type: "text",
        helperText: "Sertakan tanda '#' dan tagline region Anda.",
        required: true,
      }
    ]
  },
  {
    id: "wutheringwaves",
    name: "Wuthering Waves",
    slug: "wuthering-waves",
    category: "RPG",
    publisher: "Kuro Games",
    icon: "/images/games/wuthering-waves.jpg",
    image: "/images/games/wuthering-waves.jpg",
    coverImage: "/images/games/wuthering-waves.jpg",
    bannerImage: "/images/games/wuthering-waves.jpg",
    badge: "UPDATE BARU",
    description: "Top up Lunite & Lunite Subscription Wuthering Waves cepat dan terpercaya. Raih resonator bintang 5 impianmu!",
    idGuide: "Buka menu terminal di game WuWa, 9 digit UID terlihat di sudut kanan bawah.",
    fields: [
      {
        id: "userId",
        label: "UID Rover",
        placeholder: "Contoh: 501234567",
        type: "number",
        helperText: "Ketik 9 digit UID akun Wuthering Waves.",
        required: true,
      },
      {
        id: "server",
        label: "Server",
        placeholder: "Pilih Server",
        type: "select",
        options: ["Asia", "America", "Europe", "SEA", "HMT"],
        helperText: "Pilih server tempat Rover kamu bermain.",
        required: true,
      }
    ]
  },
  {
    id: "zzz",
    name: "Zenless Zone Zero",
    slug: "zenless-zone-zero",
    category: "RPG",
    publisher: "HoYoverse",
    icon: "/images/games/zenless-zone-zero.jpg",
    image: "/images/games/zenless-zone-zero.jpg",
    coverImage: "/images/games/zenless-zone-zero.jpg",
    bannerImage: "/images/games/zenless-zone-zero.jpg",
    badge: "TRENDING",
    description: "Beli Monochrome & Inter-Knot Membership Zenless Zone Zero resmi UID. Jelajahi Hollow dengan Agent favoritmu!",
    idGuide: "Buka Menu Pause di game ZZZ. UID 8-9 digit tertera di bawah avatar Proxy.",
    fields: [
      {
        id: "userId",
        label: "UID Proxy",
        placeholder: "Contoh: 100234567",
        type: "number",
        helperText: "UID akun Zenless Zone Zero Anda.",
        required: true,
      },
      {
        id: "server",
        label: "Server",
        placeholder: "Pilih Server",
        type: "select",
        options: ["Asia", "America", "Europe", "TW, HK, MO"],
        helperText: "Pilih server game Anda.",
        required: true,
      }
    ]
  }
];
