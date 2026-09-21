import { Pizza, Phone, MapPin, Clock, MessageCircle, Heart, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="main-footer"
      className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-850">
          
          {/* Brand & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
                <Pizza className="w-6 h-6 transform -rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white font-display">
                  Pizza<span className="text-rose-500">Z</span>
                </span>
                <span className="text-xs text-zinc-400">
                  Senador Canedo - GO
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-sm">
              Pizzaria renomada com atendimento acolhedor, pizzas artesanais de fermentação natural, brinquedoteca completa para crianças e entrega rápida.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-white font-bold">{RESTAURANT_INFO.rating}</span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-200">{RESTAURANT_INFO.reviewCount} Avaliações no Google Maps</span>
            </div>
          </div>

          {/* Quick Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-200">
              <li>
                <a href="#inicio" className="hover:text-rose-400 transition-colors">Início</a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-rose-400 transition-colors">Cardápio & Preços</a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-rose-400 transition-colors">Diferenciais & Tradição</a>
              </li>
              <li>
                <a href="#espaco" className="hover:text-rose-400 transition-colors">Brinquedoteca & Mesas Externas</a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-rose-400 transition-colors">Avaliações Reais de Clientes</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-rose-400 transition-colors">Perguntas Frequentes</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-rose-400 transition-colors">Localização & Mapa</a>
              </li>
            </ul>
          </div>

          {/* Hours & Service (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Horários
            </h4>
            <div className="text-xs text-zinc-200 space-y-2">
              <div>
                <span className="text-white font-semibold block">Terça a Domingo</span>
                <span>18:00 às 23:30</span>
              </div>
              <div>
                <span className="text-zinc-300 font-medium block">Segunda-feira</span>
                <span className="text-zinc-300">Fechado</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-900/50 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Salão & Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Contact Direct (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Pedidos & Contato
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Tel: {RESTAURANT_INFO.secondaryDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <a 
                  href={generateDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  WhatsApp: {RESTAURANT_INFO.whatsappDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={generateDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Mensagem no WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300 font-medium">
          <div>
            © {currentYear} {RESTAURANT_INFO.name}. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-zinc-300">
            <span>Feito com carinho para as famílias de Senador Canedo</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-0.5" />
          </div>
        </div>

      </div>
    </footer>
  );
}
