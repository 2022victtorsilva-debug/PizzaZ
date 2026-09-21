import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { MenuItem, CrustOption, PizzaSizeOption } from '../types';
import { PIZZA_SIZES, CRUST_OPTIONS } from '../data/mockData';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';

interface CustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    size: string,
    crust: CrustOption,
    quantity: number,
    notes: string,
    unitPrice: number
  ) => void;
}

export default function CustomizeModal({ item, onClose, onAddToCart }: CustomizeModalProps) {
  if (!item) return null;

  const isPizza = item.category !== 'bebidas';

  const [selectedSize, setSelectedSize] = useState<PizzaSizeOption>(
    isPizza ? PIZZA_SIZES[2] : { name: 'Padrão', slices: 1, priceModifier: 1.0, description: 'Unidade' }
  );
  const [selectedCrust, setSelectedCrust] = useState<CrustOption>(CRUST_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Calculate unit price
  const basePrice = item.price * (selectedSize?.priceModifier || 1);
  const crustPrice = isPizza ? selectedCrust.additionalPrice : 0;
  const unitPrice = Math.round((basePrice + crustPrice) * 10) / 10;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(item, selectedSize.name, selectedCrust, quantity, notes, unitPrice);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const singleCartItem = {
      id: `temp-${Date.now()}`,
      item,
      size: selectedSize.name,
      crust: selectedCrust,
      quantity,
      notes,
      unitPrice,
      totalPrice,
    };
    const url = generateWhatsAppOrderUrl([singleCartItem], {
      orderType: 'delivery',
      observations: notes,
    });
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        id="customize-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative aspect-[16/8] bg-zinc-950 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/70 px-2 py-0.5 rounded border border-rose-800/40">
                {item.category.toUpperCase()}
              </span>
              <h3 className="text-xl font-bold font-display mt-1">{item.name}</h3>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Description */}
            <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed font-normal">
              {item.description}
            </p>

            {/* Size selection (for pizzas) */}
            {isPizza && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-2.5">
                  1. Escolha o Tamanho
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {PIZZA_SIZES.map((size) => {
                    const isSelected = selectedSize.name === size.name;
                    const calculated = Math.round(item.price * size.priceModifier);
                    return (
                      <button
                        key={size.name}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 ring-2 ring-rose-500/20'
                            : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-850 text-zinc-900 dark:text-zinc-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm">{size.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-rose-500" />}
                        </div>
                        <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 block mt-0.5">
                          {size.description}
                        </span>
                        <span className="text-xs font-bold mt-1.5 block text-zinc-950 dark:text-white">
                          {formatCurrency(calculated)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Crust selection (for pizzas) */}
            {isPizza && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-2.5">
                  2. Borda Recheada Opcional
                </label>
                <div className="space-y-2">
                  {CRUST_OPTIONS.map((crust) => {
                    const isSelected = selectedCrust.id === crust.id;
                    return (
                      <button
                        key={crust.id}
                        type="button"
                        onClick={() => setSelectedCrust(crust)}
                        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all text-xs sm:text-sm ${
                          isSelected
                            ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 font-bold'
                            : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium'
                        }`}
                      >
                        <span>{crust.name}</span>
                        <span className="font-bold">
                          {crust.additionalPrice === 0 ? 'Inclusa' : `+${formatCurrency(crust.additionalPrice)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-1.5">
                3. Observações / Personalizações
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: sem cebola, massa bem tostada, caprichar no orégano..."
                rows={2}
                className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm text-zinc-950 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all resize-none"
              />
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Quantidade
              </span>
              <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl border border-zinc-300 dark:border-zinc-600">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded-lg hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm w-6 text-center text-zinc-950 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 rounded-lg hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer with Actions */}
          <div className="p-5 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-auto text-left">
              <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">Total</span>
              <span className="text-xl font-extrabold text-zinc-950 dark:text-white">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:flex-1">
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-zinc-950 dark:bg-rose-500 text-white dark:text-white hover:bg-zinc-800 dark:hover:bg-rose-600 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar ao Pedido</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="py-3 px-4 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 shadow-md"
                title="Pedir direto no WhatsApp sem carrinho"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
