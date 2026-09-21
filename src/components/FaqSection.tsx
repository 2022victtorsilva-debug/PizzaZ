import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { FAQS_DATA, RESTAURANT_INFO } from '../data/mockData';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq"
      className="py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-900/50">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-display mb-3">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Tudo o que você precisa saber sobre nossos pedidos, delivery, brinquedoteca e formas de pagamento.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-zinc-950 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div className={`p-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-transform duration-200 ${isOpen ? 'rotate-180 text-rose-600 dark:text-rose-400' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 pt-2 text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Contact Box if question not found */}
        <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-zinc-950 dark:text-white">
              Ainda tem alguma dúvida especial?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200">
              Nossa equipe está disponível no WhatsApp para responder rapidamente.
            </p>
          </div>

          <a
            href={generateDirectWhatsAppUrl('Olá, Pizza Z! Gostaria de tirar uma dúvida sobre os pedidos.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 transition-all flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
