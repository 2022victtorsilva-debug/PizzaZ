import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  MapPin, 
  Bike, 
  Store, 
  Utensils, 
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { RESTAURANT_INFO } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [orderType, setOrderType] = useState<'delivery' | 'retirada' | 'mesa'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pix');
  const [generalNotes, setGeneralNotes] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (orderType === 'delivery' && !address.trim()) {
      alert('Por favor, informe seu endereço em Senador Canedo para entrega.');
      return;
    }

    const url = generateWhatsAppOrderUrl(cart, {
      customerName,
      orderType,
      address,
      tableNumber,
      paymentMethod,
      observations: generalNotes,
    });

    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="cart-drawer-backdrop"
        className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white dark:bg-zinc-900 h-full flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800"
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                  Seu Pedido ({cart.length})
                </h3>
                <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  Pizza Z - Senador Canedo
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition-colors p-1"
                  title="Esvaziar carrinho"
                >
                  Limpar
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-600 dark:text-zinc-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
                  Seu pedido está vazio
                </h4>
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 max-w-xs mx-auto mb-6">
                  Explore nosso cardápio de pizzas artesanais e monte uma refeição saborosa para hoje!
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-colors"
                >
                  Ver Cardápio Agora
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-zinc-300 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-850/60 flex items-start gap-3 shadow-sm"
                    >
                      <img
                        src={item.item.image}
                        alt={item.item.name}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white truncate">
                            {item.item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-zinc-500 hover:text-rose-500 p-0.5"
                            title="Remover item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mt-0.5 space-y-0.5">
                          {item.size && <div><strong className="text-zinc-900 dark:text-zinc-100">Tam:</strong> {item.size}</div>}
                          {item.crust && item.crust.additionalPrice > 0 && (
                            <div><strong className="text-zinc-900 dark:text-zinc-100">Borda:</strong> {item.crust.name}</div>
                          )}
                          {item.notes && (
                            <div className="italic text-zinc-600 dark:text-zinc-300 font-normal">"{item.notes}"</div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                          <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-lg border border-zinc-300 dark:border-zinc-600 shadow-sm">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-zinc-950 dark:text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-zinc-950 dark:text-white">
                            {formatCurrency(item.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Type Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200 mb-2">
                    Tipo de Entrega / Atendimento
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        orderType === 'delivery'
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-bold ring-1 ring-rose-500'
                          : 'border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('retirada')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        orderType === 'retirada'
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-bold ring-1 ring-rose-500'
                          : 'border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Retirada</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('mesa')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        orderType === 'mesa'
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-bold ring-1 ring-rose-500'
                          : 'border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium'
                      }`}
                    >
                      <Utensils className="w-4 h-4" />
                      <span>Na Mesa</span>
                    </button>
                  </div>
                </div>

                {/* Form fields based on order type */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Como podemos te chamar?"
                      className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-850 text-zinc-950 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                        Endereço Completo em Senador Canedo *
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Rua, número, bairro e ponto de referência"
                        className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-850 text-zinc-950 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                      />
                    </div>
                  )}

                  {orderType === 'mesa' && (
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                        Número da Mesa
                      </label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Ex: Mesa 04"
                        className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-850 text-zinc-950 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                      Forma de Pagamento
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-850 text-zinc-950 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                    >
                      <option value="Pix (Chave rápida)">Pix (Chave rápida no WhatsApp)</option>
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                      <option value="Cartão de Débito">Cartão de Débito</option>
                      <option value="Dinheiro (Com troco)">Dinheiro (Com troco)</option>
                      <option value="Vale Refeição (Alelo / VR / Ticket)">Vale Refeição</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & WhatsApp Submit */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-950 dark:text-white">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex items-center justify-between text-xs">
                    <span>Taxa de Entrega</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Confirmada no WhatsApp</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-300 dark:border-zinc-700 text-sm font-bold text-zinc-950 dark:text-white">
                  <span>Total Estimado</span>
                  <span className="text-base text-rose-500 font-extrabold">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>

              <button
                id="cart-submit-whatsapp-btn"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-white/10" />
                <span>Enviar Pedido pelo WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-zinc-600 dark:text-zinc-400 font-medium">
                O WhatsApp abrirá com todos os detalhes do seu pedido prontos para envio.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
