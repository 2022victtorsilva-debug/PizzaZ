import { motion } from 'motion/react';
import { 
  Baby, 
  SunMedium, 
  Armchair, 
  Cake, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle,
  Users,
  CheckCircle2
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';
import { generateReservationWhatsAppUrl } from '../utils/whatsapp';

export default function FamilyExperienceSection() {
  const features = [
    {
      icon: Baby,
      title: 'Brinquedoteca Equipada & Segura',
      description: 'Um espaço lúdico, higienizado e colorido para os pequenos brincarem com segurança enquanto você relaxa e saboreia sua refeição.',
    },
    {
      icon: SunMedium,
      title: 'Mesas Externas & Salão Arejado',
      description: 'Desfrute do clima agradável com mesas ao ar livre, iluminação acolhedora e distanciamento confortável entre as mesas.',
    },
    {
      icon: Armchair,
      title: 'Cadeirinhas Altas para Bebês',
      description: 'Estrutura completa para receber famílias com bebês e crianças com máxima comodidade e conforto.',
    },
    {
      icon: Cake,
      title: 'Comemorações & Aniversários',
      description: 'Celebre momentos felizes com quem você ama. Fazemos reservas de mesas para grupos sem taxas abusivas.',
    },
  ];

  return (
    <section 
      id="espaco"
      className="py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Images Collage */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative grid grid-cols-2 gap-4">
              
              {/* Image 1: Restaurant Ambiance */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80"
                  alt="Ambiente acolhedor Pizza Z"
                  className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Image 2: Outdoor seating */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 mt-6">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80"
                  alt="Mesas externas Pizza Z"
                  className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating verified label badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-zinc-300 dark:border-zinc-700 text-center min-w-[200px]">
                <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 mb-0.5">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-950 dark:text-white">
                    Aprovado por Pais
                  </span>
                </div>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                  Espaço amplo e brinquedoteca
                </p>
              </div>

            </div>
          </motion.div>

          {/* Text Content & Features */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-3 border border-emerald-200 dark:border-emerald-900/50">
              <Baby className="w-3.5 h-3.5" />
              Ambiente Perfeito para a Família
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display mb-4">
              Mais do que uma pizzaria, um lugar para construir boas memórias
            </h2>

            <p className="text-base text-zinc-700 dark:text-zinc-200 leading-relaxed mb-8">
              Localizada no <strong>Jardim de Todos Os Santos em Senador Canedo</strong>, a Pizza Z foi desenhada para receber com carinho desde casais até grandes famílias com crianças. Nosso salão combina ambiente acolhedor, mesas externas frescas e a queridinha brinquedoteca.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex-shrink-0 flex items-center justify-center text-rose-500 shadow-sm mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-zinc-700 dark:text-zinc-200 leading-relaxed font-normal">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <a
                id="reserve-table-whatsapp-btn"
                href={generateReservationWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reservar Mesa no WhatsApp</span>
              </a>

              <a
                href="#localizacao"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 transition-colors"
              >
                <span>Ver Como Chegar</span>
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
