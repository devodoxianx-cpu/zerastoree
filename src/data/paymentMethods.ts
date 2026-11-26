export interface PaymentMethodItem {
  id: string;
  name: string;
  category: 'QRIS' | 'E-Wallet' | 'Virtual Account' | 'Convenience Store';
  badge?: string;
  adminFee: number;
  adminFeeFormatted: string;
  iconName: string;
  description: string;
  speed: string;
  isPopular?: boolean;
}

export const PAYMENT_METHODS: PaymentMethodItem[] = [
  // QRIS
  {
    id: 'qris',
    name: 'QRIS (Semua E-Wallet & M-Banking)',
    category: 'QRIS',
    badge: 'BEBAS BIAYA ADMIN',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'QrCode',
    description: 'Scan via BCA, Mandiri, GoPay, OVO, DANA, ShopeePay, dll.',
    speed: 'Otomatis 1 Detik',
    isPopular: true,
  },

  // E-Wallets
  {
    id: 'dana',
    name: 'DANA',
    category: 'E-Wallet',
    badge: 'POPULER',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'Wallet',
    description: 'Bayar langsung dengan saldo DANA Anda.',
    speed: 'Instan',
    isPopular: true,
  },
  {
    id: 'gopay',
    name: 'GoPay',
    category: 'E-Wallet',
    badge: 'INSTAN',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'Smartphone',
    description: 'Pembayaran cepat via aplikasi GoPay atau Gojek.',
    speed: 'Instan',
    isPopular: true,
  },
  {
    id: 'ovo',
    name: 'OVO',
    category: 'E-Wallet',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'CreditCard',
    description: 'Konfirmasi via notifikasi push aplikasi OVO.',
    speed: 'Instan',
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    category: 'E-Wallet',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'ShoppingBag',
    description: 'Pembayaran langsung lewat saldo ShopeePay.',
    speed: 'Instan',
  },

  // Virtual Account / Bank Transfer
  {
    id: 'bca-va',
    name: 'BCA Virtual Account',
    category: 'Virtual Account',
    badge: 'REKOMENDASI',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'Building2',
    description: 'Transfer via BCA Mobile, myBCA, KlikBCA, atau ATM BCA.',
    speed: 'Otomatis 24 Jam',
    isPopular: true,
  },
  {
    id: 'mandiri-va',
    name: 'Mandiri Virtual Account',
    category: 'Virtual Account',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'Building2',
    description: 'Transfer via Livin\' by Mandiri atau ATM Mandiri.',
    speed: 'Otomatis 24 Jam',
  },
  {
    id: 'bri-va',
    name: 'BRI Virtual Account (BRIVA)',
    category: 'Virtual Account',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'Building2',
    description: 'Transfer via BRImo atau ATM BRI.',
    speed: 'Otomatis 24 Jam',
  },
  {
    id: 'bni-va',
    name: 'BNI Virtual Account',
    category: 'Virtual Account',
    adminFee: 0,
    adminFeeFormatted: 'Rp 0',
    iconName: 'Building2',
    description: 'Transfer via BNI Mobile Banking atau ATM BNI.',
    speed: 'Otomatis 24 Jam',
  },

  // Convenience Store / Retail
  {
    id: 'alfamart',
    name: 'Alfamart / Alfamidi',
    category: 'Convenience Store',
    adminFee: 2500,
    adminFeeFormatted: '+Rp 2.500',
    iconName: 'Store',
    description: 'Bayar tunai di seluruh gerai Alfamart terdekat.',
    speed: 'Verifikasi Kasir',
  },
  {
    id: 'indomaret',
    name: 'Indomaret',
    category: 'Convenience Store',
    adminFee: 2500,
    adminFeeFormatted: '+Rp 2.500',
    iconName: 'Store',
    description: 'Tunjukkan kode bayar ke kasir gerai Indomaret.',
    speed: 'Verifikasi Kasir',
  },
];

