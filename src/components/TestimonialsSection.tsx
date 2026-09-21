import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  MessageSquare, 
  Heart, 
  CheckCircle, 
  Sparkles, 
  ThumbsUp, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { REVIEWS_DATA, RESTAURANT_INFO } from '../data/mockData';

export default function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('tudo');

  const filterButtons = [
    { id: 'tudo', label: 'Avaliar Tudo (826)' },
    { id: 'brinquedoteca', label: 'Brinquedoteca' },
    { id: 'atendimento', label: 'Atendimento & Serviço' },
    { id: 'entrega', label: 'Entrega Rápida' },
    { id: 'recheio', label: 'Recheio & Sabor' },
  ];

  const filteredReviews = REVIEWS_DATA.filter((rev) => {
    if (activeFilter === 'tudo') return true;
    return rev.categoryTag === activeFilter;
  });

  return (
    <section 
      id="avaliacoes"
      className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-900/50">
              <Star className="w-3.5 h-3.5 fill-rose-500" />
              Reputação Comprovada no Google
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
              O que dizem os clientes de Senador Canedo
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              Depoimentos reais extraídos de avaliações verificadas do perfil da Pizza Z no Google Maps.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-5">
            <div className="text-center">
              <span className="text-4xl font-extrabold text-zinc-900 dark:text-white font-display">
                {RESTAURANT_INFO.rating}
              </span>
              <div className="flex items-center text-amber-400 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < 4 ? 'fill-amber-400' : 'fill-amber-400/40 text-amber-400'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="border-l border-zinc-200 dark:border-zinc-800 pl-4 text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block text-sm">
                {RESTAURANT_INFO.reviewCount} Avaliações
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 block mt-0.5">
                Faixa: {RESTAURANT_INFO.priceRange} por pessoa
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
                98% Recomendam
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeFilter === btn.id
                  ? 'bg-zinc-950 dark:bg-rose-500 text-white dark:text-white shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-300 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                          {rev.author}
                        </h4>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block">
                        {rev.badge} • {rev.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Context badge (e.g. Refeição no local | Jantar | R$ 60–80) */}
                <div className="inline-block px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 mb-3">
                  {rev.context}
                </div>

                {/* Review Text */}
                <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
                  "{rev.text}"
                </p>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
                <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-rose-600 dark:fill-rose-400" />
                  <span>Avaliação Verificada do Google</span>
                </span>
                {rev.likes !== undefined && rev.likes > 0 && (
                  <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.likes} pessoa curtiu</span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
