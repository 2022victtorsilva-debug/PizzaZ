import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/mockData';

export interface OrderDetails {
  customerName?: string;
  orderType: 'delivery' | 'retirada' | 'mesa';
  address?: string;
  tableNumber?: string;
  paymentMethod?: string;
  observations?: string;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

export function generateWhatsAppOrderUrl(cart: CartItem[], details: OrderDetails): string {
  const phone = RESTAURANT_INFO.whatsappPhone;
  const total = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

  let message = `🍕 *NOVO PEDIDO - PIZZA Z SENADOR CANEDO*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;

  if (details.customerName) {
    message += `👤 *Cliente:* ${details.customerName}\n`;
  }

  const typeLabels = {
    delivery: '🛵 *Entrega em Domicílio (Delivery)*',
    retirada: '🛍️ *Retirada no Balcão*',
    mesa: '🍽️ *Consumo no Local (Mesa)*',
  };
  message += `📍 *Tipo:* ${typeLabels[details.orderType]}\n`;

  if (details.orderType === 'delivery' && details.address) {
    message += `🏠 *Endereço:* ${details.address}\n`;
  } else if (details.orderType === 'mesa' && details.tableNumber) {
    message += `🪑 *Mesa nº:* ${details.tableNumber}\n`;
  }

  if (details.paymentMethod) {
    message += `💳 *Forma de Pagamento:* ${details.paymentMethod}\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *ITENS DO PEDIDO:*\n\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.quantity}x ${item.item.name}*\n`;
    if (item.size) {
      message += `   • Tamanho: ${item.size}\n`;
    }
    if (item.crust && item.crust.additionalPrice > 0) {
      message += `   • ${item.crust.name} (+${formatCurrency(item.crust.additionalPrice)})\n`;
    }
    if (item.notes) {
      message += `   • Obs: _${item.notes}_\n`;
    }
    message += `   • Subtotal: *${formatCurrency(item.totalPrice)}*\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL ESTIMADO:* *${formatCurrency(total)}*\n`;
  if (details.orderType === 'delivery') {
    message += `_(Taxa de entrega calculada pelo endereço no WhatsApp)_\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Aguardando confirmação! Obrigado por escolher a Pizza Z! ✨`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/55${phone}?text=${encoded}`;
}

export function generateDirectWhatsAppUrl(customText?: string): string {
  const phone = RESTAURANT_INFO.whatsappPhone;
  const defaultText = `Olá, Pizza Z! Gostaria de consultar o cardápio e fazer um pedido em Senador Canedo.`;
  const text = customText || defaultText;
  return `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`;
}

export function generateReservationWhatsAppUrl(): string {
  const phone = RESTAURANT_INFO.whatsappPhone;
  const text = `Olá, Pizza Z! Gostaria de fazer uma reserva de mesa no Jardim de Todos Os Santos para um momento especial com a família/amigos.`;
  return `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`;
}
