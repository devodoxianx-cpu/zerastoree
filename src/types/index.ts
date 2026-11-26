export type GameCategory = 'Semua Game' | 'MOBA' | 'Battle Royale' | 'RPG' | 'FPS' | 'Casual';

export interface RequiredField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
  helperText?: string;
  required: boolean;
}

export interface GameItem {
  id: string;
  name: string;
  slug: string;
  category: 'MOBA' | 'Battle Royale' | 'RPG' | 'FPS' | 'Casual';
  publisher: string;
  icon: string;
  image?: string;
  coverImage: string;
  bannerImage: string;
  badge?: string;
  description: string;
  idGuide: string;
  fields: RequiredField[];
}

export interface PackageItem {
  id: string;
  gameId: string;
  name: string;
  amount: string;
  price: number;
  originalPrice?: number;
  bonus?: string;
  popular?: boolean;
  categoryGroup?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  code?: string;
  discount: string;
  gameSlug: string;
  badge: string;
  bgColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

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

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string; // e.g. "6281234567890" (configurable)
  currency: string;
  isWhatsAppConfigured: boolean;
  operatingHours: string;
  supportEmail: string;
  instagramHandle: string;
  tiktokHandle: string;
  disclaimer: string;
}

export interface OrderState {
  game: GameItem | null;
  package: PackageItem | null;
  fieldValues: Record<string, string>;
  paymentMethod: string;
  customerPhone?: string;
  notes?: string;
}
