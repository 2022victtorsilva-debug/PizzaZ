import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  Users, 
  Plus, 
  MessageCircle, 
  Flame, 
  Filter,
  Check
} from 'lucide-react';
import { MenuItem, PizzaCategory } from '../types';
import { MENU_ITEMS } from '../data/mockData';
import { formatCurrency, generateDirectWhatsAppUrl } from '../utils/whatsapp';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export default function MenuSection({ onSelectItem, onQuickAdd }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<PizzaCategory>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: PizzaCategory; label: string }[] = [
    { id: 'todas', label: 'Todos os Sabores' },
    { id: 'mais-pedidas', label: '⭐ Mais Pedidas' },
    { id: 'especiais', label: 'Especiais da Casa' },
    { id: 'tradicionais', label: 'Tradicionais' },
    { id: 'doces', label: 'Pizzas Doces' },
    { id: 'combos', label: 'Combos & Promoções' },
    { id: 'bebidas', label: 'Bebidas Geladas' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'todas' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="cardapio"
      className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-900/50">
              <Flame className="w-3.5 h-3.5" />
              Cardápio Exclusivo Pizza Z
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">
              Pizzas Artesanais & Destaques
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              Escolha seu sabor favorito, selecione o tamanho, personalize com sua borda predileta e envie seu pedido instantâneo pelo WhatsApp.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por sabor ou ingrediente..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
            <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Nenhuma pizza encontrada para "{searchQuery}"
            </p>
            <p className="text-sm text-zinc-500 mb-4">
              Tente pesquisar por outro sabor como Carne de Sol, Calabresa ou 4 Queijos.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todas');
              }}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
            >
              Ver Cardápio Completo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                id={`menu-card-${item.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase bg-rose-500 text-white shadow-md">
                        {item.badge}
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="px-2 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 text-white shadow-md">
                        Vegetariana
                      </span>
                    )}
                  </div>

                  {/* Serves info */}
                  {item.serves && (
                    <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-md">
                      <Users className="w-3.5 h-3.5 text-rose-400" />
                      <span>{item.serves}</span>
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700">
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-300 block -mb-1 font-semibold">A partir de</span>
                    <span className="text-base font-extrabold text-zinc-950 dark:text-white">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white font-display mb-1.5 group-hover:text-rose-500 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Ingredients chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.ingredients.slice(0, 4).map((ing) => (
                        <span
                          key={ing}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 4 && (
                        <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md text-zinc-600 dark:text-zinc-300">
                          +{item.ingredients.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                    <button
                      id={`customize-item-btn-${item.id}`}
                      onClick={() => onSelectItem(item)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900/40 transition-colors text-center"
                    >
                      Personalizar & Pedir
                    </button>

                    <button
                      id={`quick-add-btn-${item.id}`}
                      onClick={() => onQuickAdd(item)}
                      title="Adicionar ao pedido rápido"
                      className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
