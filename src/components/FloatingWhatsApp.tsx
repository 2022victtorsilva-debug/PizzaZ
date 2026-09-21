import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      id="floating-whatsapp-container"
      className="fixed bottom-5 right-5 z-40 flex items-end gap-3 pointer-events-auto"
    >
      {/* Tooltip speech bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="hidden sm:flex items-center gap-2 bg-white dark:bg-zinc-900 px-3.5 py-2 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fazer Pedido no WhatsApp</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
              aria-label="Fechar dica"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        id="floating-whatsapp-btn"
        href={generateDirectWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp da Pizza Z"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center relative group transition-colors"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white/10" />
      </motion.a>
    </div>
  );
}
