import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_PHONE } from '../constants';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${STORE_PHONE.replace(/[+\s]/g, '')}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-colors flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" className="text-white" />
      <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
        Chat with us!
      </span>
    </motion.a>
  );
}
