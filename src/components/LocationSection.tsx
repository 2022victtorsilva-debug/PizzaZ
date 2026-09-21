import { motion } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Navigation, 
  Share2, 
  CheckCircle, 
  Car,
  ExternalLink 
} from 'lucide-react';
import { useState } from 'react';
import { RESTAURANT_INFO } from '../data/mockData';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp';

export default function LocationSection() {
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Pizza Z Senador Canedo Jardim de Todos Os Santos GO'
  )}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pizza Z - Senador Canedo',
          text: 'Conheça a Pizza Z em Senador Canedo: pizzas deliciosas, brinquedoteca e ambiente aconchegante!',
          url: window.location.href,
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section 
      id="localizacao"
      className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-900/50">
            <MapPin className="w-3.5 h-3.5" />
            Venha nos Visitar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-display mb-3">
            Localização Privilegiada em Senador Canedo
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Fácil acesso, estacionamento amigável e estrutura pronta para receber você, sua família ou seus amigos.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact & Information card */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display">
                    {RESTAURANT_INFO.name}
                  </h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Jardim de Todos Os Santos • Senador Canedo - GO
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Aberto agora</span>
                </div>
              </div>

              {/* Info Items List */}
              <div className="space-y-5 text-sm text-zinc-700 dark:text-zinc-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center border border-rose-200 dark:border-rose-900/40 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-zinc-950 dark:text-white">Endereço</span>
                    <span className="text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed block mt-0.5 font-medium">
                      {RESTAURANT_INFO.address}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                      Ponto de referência com estacionamento próximo
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-900/40 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-zinc-950 dark:text-white">Horário de Funcionamento</span>
                    <span className="text-zinc-700 dark:text-zinc-300 text-xs block mt-0.5 font-semibold">
                      Terça a Domingo: 18:00 às 23:30
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                      Segunda-feira: Fechado para manutenção e descanso da equipe
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-900/40 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-zinc-950 dark:text-white">Contatos Oficiais</span>
                    <div className="text-xs space-y-1 mt-0.5">
                      <a 
                        href={`tel:${RESTAURANT_INFO.whatsappPhone}`}
                        className="block text-rose-600 dark:text-rose-400 hover:underline font-bold"
                      >
                        WhatsApp Principal: {RESTAURANT_INFO.whatsappDisplay}
                      </a>
                      <a 
                        href={`tel:${RESTAURANT_INFO.secondaryPhone}`}
                        className="block text-zinc-700 dark:text-zinc-300 hover:underline font-medium"
                      >
                        Telefone Fixo / WhatsApp: {RESTAURANT_INFO.secondaryDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-3">
              <a
                id="location-routes-btn"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 transition-all text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Traçar Rota no GPS</span>
              </a>

              <button
                id="location-share-btn"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors"
                title="Compartilhar localização"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartilhar'}</span>
              </button>
            </div>
          </div>

          {/* Right: Embedded Interactive Map Container */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-3 sm:p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
            <div className="relative w-full h-[360px] sm:h-full min-h-[360px] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950">
              <iframe
                title="Mapa de Localização Pizza Z - Senador Canedo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15286.07920194451!2d-49.0964173!3d-16.7028913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935f01344400a40f%3A0x633e9d8e57ee73b8!2sJardim%20de%20Todos%20os%20Santos%2C%20Sen.%20Canedo%20-%20GO!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[105%]"
              />

              {/* Map Floating pill */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  Pizza Z - Senador Canedo
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
