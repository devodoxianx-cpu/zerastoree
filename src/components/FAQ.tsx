import { useState } from 'react';
import type { FC } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { STORE_SETTINGS } from '../data/settings';

export const FAQ: FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="bantuan" className="py-10 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1E212B]">
      <div className="mb-6">
        <span className="text-[11px] font-mono text-[#FFE600] uppercase tracking-wider block mb-1">
          Bantuan
        </span>
        <h2 className="font-gaming font-extrabold text-xl sm:text-2xl text-white">
          Pertanyaan Umum (FAQ)
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-2">
        {FAQS_DATA.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-xl transition-all overflow-hidden border ${
                isOpen
                  ? 'bg-[#12141A] border-[#FFE600]/40'
                  : 'bg-[#12141A]/60 border-[#1E212B]'
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left text-xs sm:text-sm font-medium text-white transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-gaming font-bold text-xs sm:text-sm pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-6 h-6 rounded-md bg-[#181B24] border border-[#1E212B] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#FFE600]' : 'text-zera-muted'
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-3.5 sm:px-4 pb-4 pt-1 text-xs text-zera-muted leading-relaxed border-t border-[#1E212B]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Support prompt */}
      <div className="mt-6 p-4 rounded-xl bg-[#12141A] border border-[#1E212B] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <h4 className="font-gaming font-bold text-white text-sm">Ada kendala transaksi?</h4>
          <p className="text-xs text-zera-muted mt-0.5">
            Admin resmi ZeraStore siap membantu melalui WhatsApp.
          </p>
        </div>
        <a
          href={`https://wa.me/${STORE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo Admin ZeraStore! Saya butuh bantuan informasi top-up.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFE600] text-[#0A0B0E] font-tech font-bold text-xs uppercase hover:bg-[#FFF04B] transition-colors shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>Chat WhatsApp Admin</span>
        </a>
      </div>
    </section>
  );
};
