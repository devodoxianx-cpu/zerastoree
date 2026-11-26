import type { PromoBanner } from '../types';

export const PROMOTIONS_DATA: PromoBanner[] = [
  {
    id: "promo-1",
    title: "Flash Sale Mobile Legends",
    subtitle: "Weekly Diamond Pass hemat hingga 15% untuk persiapan push rank Mythic!",
    code: "ZERAMLBB",
    discount: "HEMAT 15%",
    gameSlug: "mobile-legends",
    badge: "FLASH SALE",
    bgColor: "from-yellow-500/25 to-amber-600/30"
  },
  {
    id: "promo-2",
    title: "Booyah Pass Free Fire",
    subtitle: "Top Up 355 & 720 Diamond harga spesial. Dapatkan bundle eksklusif sekarang!",
    code: "BOOYAHZERA",
    discount: "HOT PRICE",
    gameSlug: "free-fire",
    badge: "LIMITED OFFER",
    bgColor: "from-amber-500/25 to-yellow-600/30"
  },
  {
    id: "promo-3",
    title: "Promo Blessing Welkin Moon",
    subtitle: "Genshin Impact Welkin Moon termurah untuk tabungan Primogems karakter baru!",
    code: "GENSHINZERA",
    discount: "BEST VALUE",
    gameSlug: "genshin-impact",
    badge: "BEST SELLER",
    bgColor: "from-yellow-400/25 to-amber-500/30"
  }
];
