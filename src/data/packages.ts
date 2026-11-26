import type { PackageItem } from '../types';

export const PACKAGES_DATA: Record<string, PackageItem[]> = {
  mlbb: [
    { id: "ml-wdp", gameId: "mlbb", name: "Weekly Diamond Pass", amount: "210 Total Diamonds", price: 28500, originalPrice: 32000, bonus: "+210 DM (Cicil 7 Hari)", popular: true, categoryGroup: "Langganan" },
    { id: "ml-86", gameId: "mlbb", name: "86 Diamonds", amount: "78 + 8 Bonus", price: 21500, originalPrice: 24000, categoryGroup: "Diamonds" },
    { id: "ml-172", gameId: "mlbb", name: "172 Diamonds", amount: "156 + 16 Bonus", price: 43000, originalPrice: 47000, categoryGroup: "Diamonds" },
    { id: "ml-257", gameId: "mlbb", name: "257 Diamonds", amount: "234 + 23 Bonus", price: 64500, originalPrice: 70000, popular: true, categoryGroup: "Diamonds" },
    { id: "ml-344", gameId: "mlbb", name: "344 Diamonds", amount: "312 + 32 Bonus", price: 86000, originalPrice: 95000, categoryGroup: "Diamonds" },
    { id: "ml-429", gameId: "mlbb", name: "429 Diamonds", amount: "390 + 39 Bonus", price: 107500, originalPrice: 118000, categoryGroup: "Diamonds" },
    { id: "ml-514", gameId: "mlbb", name: "514 Diamonds", amount: "468 + 46 Bonus", price: 128500, originalPrice: 140000, categoryGroup: "Diamonds" },
    { id: "ml-706", gameId: "mlbb", name: "706 Diamonds", amount: "625 + 81 Bonus", price: 172000, originalPrice: 190000, popular: true, categoryGroup: "Diamonds" },
    { id: "ml-twilight", gameId: "mlbb", name: "Twilight Pass", amount: "Skin Miya & Rewards", price: 145000, originalPrice: 160000, categoryGroup: "Langganan" }
  ],
  ff: [
    { id: "ff-70", gameId: "ff", name: "70 Diamonds", amount: "70 DM", price: 10000, originalPrice: 12000, categoryGroup: "Diamonds" },
    { id: "ff-140", gameId: "ff", name: "140 Diamonds", amount: "140 DM", price: 20000, originalPrice: 23000, categoryGroup: "Diamonds" },
    { id: "ff-355", gameId: "ff", name: "355 Diamonds", amount: "355 DM", price: 50000, originalPrice: 56000, popular: true, categoryGroup: "Diamonds" },
    { id: "ff-720", gameId: "ff", name: "720 Diamonds", amount: "720 DM", price: 100000, originalPrice: 112000, popular: true, categoryGroup: "Diamonds" },
    { id: "ff-1450", gameId: "ff", name: "1,450 Diamonds", amount: "1450 DM", price: 200000, originalPrice: 225000, categoryGroup: "Diamonds" },
    { id: "ff-member-wk", gameId: "ff", name: "Membership Mingguan", amount: "450 DM + Box", price: 30000, originalPrice: 35000, categoryGroup: "Membership" },
    { id: "ff-member-mo", gameId: "ff", name: "Membership Bulanan", amount: "1900 DM + Box", price: 115000, originalPrice: 130000, categoryGroup: "Membership" }
  ],
  pubgm: [
    { id: "pubg-60", gameId: "pubgm", name: "60 UC", amount: "60 Unknown Cash", price: 15000, originalPrice: 18000, categoryGroup: "UC" },
    { id: "pubg-325", gameId: "pubgm", name: "325 UC", amount: "300 + 25 Bonus", price: 75000, originalPrice: 85000, popular: true, categoryGroup: "UC" },
    { id: "pubg-660", gameId: "pubgm", name: "660 UC", amount: "600 + 60 Bonus", price: 150000, originalPrice: 168000, popular: true, categoryGroup: "UC" },
    { id: "pubg-1800", gameId: "pubgm", name: "1,800 UC", amount: "1500 + 300 Bonus", price: 380000, originalPrice: 420000, categoryGroup: "UC" },
    { id: "pubg-rp", gameId: "pubgm", name: "Royale Pass Upgrade", amount: "Upgrade RP Season", price: 155000, originalPrice: 175000, categoryGroup: "Pass" }
  ],
  hok: [
    { id: "hok-80", gameId: "hok", name: "80 Tokens", amount: "80 Tokens", price: 16000, originalPrice: 18000, categoryGroup: "Tokens" },
    { id: "hok-240", gameId: "hok", name: "240 Tokens", amount: "240 + 10 Bonus", price: 48000, originalPrice: 54000, categoryGroup: "Tokens" },
    { id: "hok-400", gameId: "hok", name: "400 Tokens", amount: "400 + 25 Bonus", price: 80000, originalPrice: 90000, popular: true, categoryGroup: "Tokens" },
    { id: "hok-1200", gameId: "hok", name: "1,200 Tokens", amount: "1200 + 100 Bonus", price: 239000, originalPrice: 265000, categoryGroup: "Tokens" },
    { id: "hok-pass", gameId: "hok", name: "Weekly Card", amount: "Daily Tokens", price: 15000, originalPrice: 18000, categoryGroup: "Pass" }
  ],
  genshin: [
    { id: "gi-welkin", gameId: "genshin", name: "Blessing of the Welkin Moon", amount: "300 Genesis + 2700 Primo", price: 79000, originalPrice: 89000, popular: true, categoryGroup: "Blessing" },
    { id: "gi-60", gameId: "genshin", name: "60 Genesis Crystals", amount: "60 Crystals", price: 16500, originalPrice: 19000, categoryGroup: "Crystals" },
    { id: "gi-330", gameId: "genshin", name: "300+30 Genesis Crystals", amount: "330 Crystals", price: 79000, originalPrice: 89000, categoryGroup: "Crystals" },
    { id: "gi-1090", gameId: "genshin", name: "980+110 Genesis Crystals", amount: "1090 Crystals", price: 249000, originalPrice: 279000, popular: true, categoryGroup: "Crystals" },
    { id: "gi-2240", gameId: "genshin", name: "1,980+260 Genesis Crystals", amount: "2240 Crystals", price: 479000, originalPrice: 539000, categoryGroup: "Crystals" }
  ],
  roblox: [
    { id: "rbx-80", gameId: "roblox", name: "80 Robux", amount: "80 R$", price: 16000, originalPrice: 19000, categoryGroup: "Robux" },
    { id: "rbx-400", gameId: "roblox", name: "400 Robux", amount: "400 R$", price: 78000, originalPrice: 88000, popular: true, categoryGroup: "Robux" },
    { id: "rbx-800", gameId: "roblox", name: "800 Robux", amount: "800 R$", price: 155000, originalPrice: 175000, popular: true, categoryGroup: "Robux" },
    { id: "rbx-1700", gameId: "roblox", name: "1,700 Robux", amount: "1700 R$", price: 310000, originalPrice: 345000, categoryGroup: "Robux" },
    { id: "rbx-4500", gameId: "roblox", name: "4,500 Robux", amount: "4500 R$", price: 775000, originalPrice: 870000, categoryGroup: "Robux" }
  ],
  codm: [
    { id: "cod-53", gameId: "codm", name: "53 CP", amount: "53 CP", price: 10000, originalPrice: 12000, categoryGroup: "CP" },
    { id: "cod-265", gameId: "codm", name: "265 CP", amount: "265 CP", price: 50000, originalPrice: 57000, categoryGroup: "CP" },
    { id: "cod-530", gameId: "codm", name: "530 CP", amount: "530 CP", price: 100000, originalPrice: 115000, popular: true, categoryGroup: "CP" },
    { id: "cod-1060", gameId: "codm", name: "1,060 CP", amount: "1060 CP", price: 200000, originalPrice: 228000, categoryGroup: "CP" }
  ],
  valorant: [
    { id: "val-475", gameId: "valorant", name: "475 VP", amount: "475 Riot VP", price: 55000, originalPrice: 62000, categoryGroup: "Points" },
    { id: "val-1000", gameId: "valorant", name: "1,000 VP", amount: "1000 Riot VP", price: 110000, originalPrice: 125000, popular: true, categoryGroup: "Points" },
    { id: "val-2050", gameId: "valorant", name: "2,050 VP", amount: "2050 Riot VP", price: 220000, originalPrice: 245000, popular: true, categoryGroup: "Points" },
    { id: "val-3650", gameId: "valorant", name: "3,650 VP", amount: "3650 Riot VP", price: 380000, originalPrice: 420000, categoryGroup: "Points" }
  ],
  wutheringwaves: [
    { id: "wuwa-sub", gameId: "wutheringwaves", name: "Lunite Subscription", amount: "300 + 2700 Lunite", price: 79000, originalPrice: 89000, popular: true, categoryGroup: "Subscription" },
    { id: "wuwa-300", gameId: "wutheringwaves", name: "300 Lunite", amount: "300 + 30 Bonus", price: 79000, originalPrice: 89000, categoryGroup: "Lunite" },
    { id: "wuwa-980", gameId: "wutheringwaves", name: "980 Lunite", amount: "980 + 110 Bonus", price: 249000, originalPrice: 279000, categoryGroup: "Lunite" },
    { id: "wuwa-1980", gameId: "wutheringwaves", name: "1,980 Lunite", amount: "1980 + 260 Bonus", price: 479000, originalPrice: 539000, categoryGroup: "Lunite" }
  ],
  zzz: [
    { id: "zzz-sub", gameId: "zzz", name: "Inter-Knot Membership", amount: "300 + 2700 Polychrome", price: 79000, originalPrice: 89000, popular: true, categoryGroup: "Membership" },
    { id: "zzz-300", gameId: "zzz", name: "300 Monochrome", amount: "300 + 30 Bonus", price: 79000, originalPrice: 89000, categoryGroup: "Monochrome" },
    { id: "zzz-980", gameId: "zzz", name: "980 Monochrome", amount: "980 + 110 Bonus", price: 249000, originalPrice: 279000, popular: true, categoryGroup: "Monochrome" },
    { id: "zzz-1980", gameId: "zzz", name: "1,980 Monochrome", amount: "1980 + 260 Bonus", price: 479000, originalPrice: 539000, categoryGroup: "Monochrome" }
  ]
};
