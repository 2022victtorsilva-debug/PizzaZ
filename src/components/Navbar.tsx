import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Pizza, 
  Phone, 
  ShoppingBag, 
  Sun, 
  Moon, 
  Menu as MenuIcon, 
  X, 
  Clock, 
  MapPin, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ darkMode, setDarkMode, cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Cardápio', href: '#cardapio' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Espaço & Família', href: '#espaco' },
    { name: 'Avaliações', href: '#avaliacoes' },
    { name: 'Perguntas Frequentes', href: '#faq' },
    { name: 'Localização', href: '#localizacao' },
  ];

  return (
    <>
      {/* Main sticky navigation */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md ${
          scrolled
            ? 'bg-white/95 dark:bg-zinc-950/95 shadow-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3'
            : 'bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/50 dark:border-zinc-800/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a 
            href="#inicio" 
            id="nav-logo-link"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25 group-hover:scale-105 transition-transform duration-200">
              <Pizza className="w-6 h-6 transform -rotate-12 group-hover:rotate-0 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
                Pizza<span className="text-rose-500">Z</span>
              </span>
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                Senador Canedo - GO
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Alternar modo escuro"
              className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
            </button>

            {/* Cart Button */}
            <button
              id="open-cart-btn"
              onClick={onOpenCart}
              aria-label="Abrir pedido"
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">Pedido</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white min-w-[20px] text-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              id="nav-cta-whatsapp-btn"
              href={generateDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-white fill-white/10" />
              <span>Pedir no WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu de navegação"
              className="lg:hidden p-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/98 dark:bg-zinc-950/98 px-4 pt-3 pb-6 shadow-xl"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
                  <a
                    href={generateDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/25 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Pedir no WhatsApp ({RESTAURANT_INFO.whatsappDisplay})</span>
                  </a>
                  <a
                    href={`tel:${RESTAURANT_INFO.whatsappPhone}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-medium text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-rose-500" />
                    <span>Ligar: {RESTAURANT_INFO.whatsappDisplay}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
