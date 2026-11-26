import type { GameItem, PackageItem, StoreSettings } from '../types';

export const formatIDR = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const generateOrderId = (): string => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `ZR-${randomNum}`;
};

export interface GenerateWhatsAppProps {
  game: GameItem;
  pkg: PackageItem;
  fieldValues: Record<string, string>;
  settings: StoreSettings;
  paymentMethod?: string;
  customerPhone?: string;
  orderId?: string;
  notes?: string;
}

export const generateWhatsAppMessage = ({
  game,
  pkg,
  fieldValues,
  settings,
  paymentMethod,
  customerPhone,
  orderId = generateOrderId(),
  notes,
}: GenerateWhatsAppProps): { message: string; url: string; orderId: string } => {
  const fieldList = game.fields
    .map((field) => {
      const val = fieldValues[field.id] || '-';
      return `• ${field.label}: ${val}`;
    })
    .join('\n');

  const notesText = notes && notes.trim().length > 0 ? `\n📝 *Catatan Pembeli:* ${notes.trim()}\n` : '';
  const customerContact = customerPhone && customerPhone.trim().length > 0 ? `• No. WA Pembeli: ${customerPhone.trim()}\n` : '';
  const paymentMethodText = paymentMethod ? `💳 *METODE PEMBAYARAN:* ${paymentMethod}\n` : '';

  const message = `Halo Admin *${settings.storeName}*! 👋
Saya ingin order top up game dari website katalog:

━━━━━━━━━━━━━━━━━━━━
🎮 *GAME:* ${game.name}
📦 *PAKET:* ${pkg.name} (${pkg.amount})
💰 *ESTIMASI TOTAL:* ${formatIDR(pkg.price)}
${paymentMethodText}🔖 *ORDER ID:* ${orderId}
━━━━━━━━━━━━━━━━━━━━

📋 *DATA AKUN PEMAIN:*
${fieldList}
${customerContact}${notesText}
Mohon konfirmasi pesanan saya dan kirimkan instruksi pembayarannya. Terima kasih! ✨`;

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return { message, url, orderId };
};
