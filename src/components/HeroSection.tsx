import { motion } from 'motion/react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Baby, 
  UtensilsCrossed, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp';

export default function HeroSection() {
  return (
    <section 
      id="inicio"
      className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-200 dark:border-zinc-800"
    >
      {/* Subtle organic light gradient behind */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-30 dark:opacity-20 blur-3xl bg-gradient-to-tr from-rose-500/30 via-emerald-500/20 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Institutional Value & High Conversion */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Credibility Tag & Google Rating */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <div 
                id="hero-google-rating-badge"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-sm"
              >
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-zinc-900 dark:text-white">4.3</span>
                </div>
                <span className="text-zinc-400 dark:text-zinc-600">•</span>
                <span className="text-zinc-600 dark:text-zinc-400">826 Avaliações no Google</span>
              </div>

              <div 
                id="hero-status-pill"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-medium text-emerald-700 dark:text-emerald-400"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Aberto até 23:30</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.12] mb-5 font-display">
              A verdadeira tradição da pizza feita com paixão em{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500">
                Senador Canedo
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Pizzaria renomada com massa de longa fermentação, queijos nobres derretidos no ponto exato e recheios generosos. Ambiente amplo com{' '}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">brinquedoteca completa</strong>,{' '}
              mesas ao ar livre e entrega ágil para toda a cidade.
            </p>

            {/* High Conversion CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9">
              <motion.a
                id="hero-primary-whatsapp-cta"
                href={generateDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 transition-all text-center"
              >
                <MessageCircle className="w-5 h-5 fill-white/10" />
                <span>Pedir pelo WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.a>

              <a
                id="hero-menu-scroll-cta"
                href="#cardapio"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700/80 transition-colors shadow-sm"
              >
                <UtensilsCrossed className="w-4 h-4 text-rose-500" />
                <span>Ver Cardápio & Preços</span>
              </a>

              <a
                id="hero-call-cta"
                href={`tel:${RESTAURANT_INFO.whatsappPhone}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Ligar para pedidos ou reservas"
              >
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{RESTAURANT_INFO.whatsappDisplay}</span>
              </a>
            </div>

            {/* Corporate Confidence & Facility Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs">
              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 border border-rose-200 dark:border-rose-900/40">
                  <Baby className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-zinc-950 dark:text-white">Brinquedoteca</span>
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">Segura e monitorada</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-zinc-950 dark:text-white">Massa Artesanal</span>
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">Fermentação lenta</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 col-span-2 sm:col-span-1">
                <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-zinc-950 dark:text-white">Mesas Externas</span>
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">Ambiente arejado</span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Hero Visual Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main pizza showcase card */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900 group">
                <div className="aspect-[4/3] sm:aspect-square relative overflow-hidden bg-zinc-900">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                    alt="Pizza Especial Pizza Z Senador Canedo"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  
                  {/* Floating Price & Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-500 text-white shadow-md">
                      Destaque da Casa
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-900/80 backdrop-blur-md text-zinc-200 border border-zinc-700/60">
                      R$ 20–80 por pessoa
                    </span>
                  </div>

                  {/* Caption on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-wider font-semibold text-rose-400">
                      Receita Consagrada
                    </span>
                    <h3 className="text-xl font-bold font-display mt-0.5">
                      Pizza Carne de Sol & 4 Queijos Especial
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                      Queijo derretido, borda tostada crocante e recheio de dar água na boca.
                    </p>
                  </div>
                </div>

                {/* Sub-bar below image */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      <div className="w-6 h-6 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-zinc-900">
                        AS
                      </div>
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-zinc-900">
                        RC
                      </div>
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-zinc-900">
                        AA
                      </div>
                    </div>
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                      Aprovado por milhares de famílias
                    </span>
                  </div>

                  <a 
                    href="#avaliacoes"
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1"
                  >
                    <span>Ver opiniões</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Floating review card quote */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden sm:block absolute -bottom-6 -left-6 max-w-xs bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100">
                    Anauê Sâmara
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 italic">
                  "Pizza SABOROSA! O preparo foi rápido, atendimento impecável e o espaço com brinquedoteca é nota 10."
                </p>
              </motion.div>

              {/* Quick speed badge */}
              <div className="absolute -top-4 -right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Preparo Rápido</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
