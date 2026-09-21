export type PizzaCategory = 'todas' | 'mais-pedidas' | 'tradicionais' | 'especiais' | 'doces' | 'bebidas' | 'combos';

export interface PizzaSizeOption {
  name: string;
  slices: number;
  priceModifier: number; // multiplier or base diff
  description: string;
}

export interface CrustOption {
  id: string;
  name: string;
  additionalPrice: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: PizzaCategory;
  price: number; // Base price for standard large or single item
  image: string;
  popular?: boolean;
  badge?: string;
  ingredients: string[];
  serves?: string;
  isVegetarian?: boolean;
}

export interface CartItem {
  id: string;
  item: MenuItem;
  size: string;
  crust?: CrustOption;
  quantity: number;
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  badge?: string;
  rating: number;
  timeAgo: string;
  context: string; // e.g. "Refeição no local | Jantar | R$ 60–80"
  text: string;
  likes?: number;
  categoryTag?: 'brinquedoteca' | 'recheio' | 'atendimento' | 'entrega';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
