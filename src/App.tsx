import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import MenuSection from './components/MenuSection';
import FamilyExperienceSection from './components/FamilyExperienceSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import CustomizeModal from './components/CustomizeModal';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { MenuItem, CartItem, CrustOption } from './types';
import { CRUST_OPTIONS } from './data/mockData';

export default function App() {
  // Dark mode state with persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pizzaz_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pizzaz_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pizzaz_theme', 'light');
    }
  }, [darkMode]);

  // Cart state with local persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pizzaz_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('pizzaz_cart', JSON.stringify(cart));
  }, [cart]);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Add customized item to cart
  const handleAddToCart = (
    item: MenuItem,
    size: string,
    crust: CrustOption,
    quantity: number,
    notes: string,
    unitPrice: number
  ) => {
    const newItem: CartItem = {
      id: `${item.id}-${size}-${crust.id}-${Date.now()}`,
      item,
      size,
      crust,
      quantity,
      notes,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  // Quick add default item
  const handleQuickAdd = (item: MenuItem) => {
    const defaultCrust = CRUST_OPTIONS[0];
    const defaultSize = item.category === 'bebidas' ? 'Unidade' : 'Grande (8 Fatias)';
    const unitPrice = item.price;

    const newItem: CartItem = {
      id: `${item.id}-quick-${Date.now()}`,
      item,
      size: defaultSize,
      crust: defaultCrust,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-300 ambient-glow">
      {/* Top Fixed Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <HighlightsSection />
        <MenuSection
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />
        <FamilyExperienceSection />
        <TestimonialsSection />
        <FaqSection />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals and Floating Triggers */}
      <CustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <FloatingWhatsApp />
    </div>
  );
}
