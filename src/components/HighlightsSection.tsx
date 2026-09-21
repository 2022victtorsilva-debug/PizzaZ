import { motion } from 'motion/react';
import { 
  Flame, 
  Baby, 
  Truck, 
  Award, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  HeartHandshake 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';

export default function HighlightsSection() {
  const pillars = [
    {
      icon: Flame,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      borderColor: 'border-rose-100 dark:border-rose-900/40',
      title: 'Massa Artesanal & Ingredientes Nobres',
      description: 'Fermentação lenta natural que garante leveza digestiva, bordas douradas e crocantes, queijos selecionados e molho rústico de tomates frescos.',
    },
    {
      icon: Baby,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-100 dark:border-emerald-900/40',
      title: 'Ambiente Familiar com Brinquedoteca',
      description: 'Espaço pensado com carinho para crianças brincarem com segurança, cadeirinhas altas para bebês, além de mesas externas arejadas e salão climatizado.',
    },
    {
      icon: Truck,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      borderColor: 'border-rose-100 dark:border-rose-900/40',
      title: 'Entrega Ágil em Senador Canedo',
      description: 'Caixas térmicas lacradas e rota otimizada para que a pizza chegue quentinha, mantendo o queijo borbulhante e a crocância original.',
    },
    {
      icon: Award,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-100 dark:border-emerald-900/40',
      title: 'Tradição & Mais de 820 Avaliações',
      description: 'Nota 4.3 no Google com mais de 820 avaliações de clientes reais de Senador Canedo que comprovam nosso padrão de atendimento e sabor.',
    },
  ];

  return (
    <section 
      id="diferenciais"
      className="py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-900/50">
            <Sparkles className="w-3.5 h-3.5" />
            Padrão de Excelência Pizza Z
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display mb-4">
            Por que somos a pizzaria mais lembrada da cidade
          </h2>
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-200">
            Unimos gastronomia autêntica, velocidade no preparo e conforto acolhedor para que cada visita ou entrega seja uma experiência memorável.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-300 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${pillar.bgColor} ${pillar.borderColor} border flex items-center justify-center mb-5 ${pillar.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Institutional Numbers Banner */}
        <div className="mt-12 bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-300 dark:border-zinc-800 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-rose-500 font-display">
              4.3 ★
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1 block">
              Google Review Score
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white font-display">
              +820
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1 block">
              Avaliações Verificadas
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
              R$ 20–80
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1 block">
              Preço Justo por Pessoa
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white font-display">
              23:30
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1 block">
              Aberto até Tarde
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
