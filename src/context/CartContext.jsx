import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MENU_ITEMS } from '../data/menuItems';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const STORAGE_KEY = 'maison-savour-cart';

const readStoredCart = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && MENU_ITEMS.some((dish) => dish.id === item.id))
      .map((item) => ({
        id: item.id,
        quantity: Math.min(20, Math.max(1, Number(item.quantity) || 1)),
      }));
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const { showToast } = useToast();
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be unavailable in private browsing; cart still works in memory.
    }
  }, [items]);

  const addItem = useCallback(
    (id, quantity = 1) => {
      const dish = MENU_ITEMS.find((item) => item.id === id);
      if (!dish) return;
      setItems((current) => {
        const existing = current.find((item) => item.id === id);
        if (existing) {
          return current.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(20, item.quantity + quantity) }
              : item,
          );
        }
        return [...current, { id, quantity }];
      });
      showToast(`${dish.name} added to your bag.`, 'success');
    },
    [showToast],
  );

  const removeItem = useCallback(
    (id) => {
      const dish = MENU_ITEMS.find((item) => item.id === id);
      setItems((current) => current.filter((item) => item.id !== id));
      if (dish) showToast(`${dish.name} removed from your bag.`, 'info');
    },
    [showToast],
  );

  const updateQuantity = useCallback((id, quantity) => {
    setItems((current) => {
      if (quantity <= 0) return current.filter((item) => item.id !== id);
      return current.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(20, quantity) } : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const dish = MENU_ITEMS.find((menuItem) => menuItem.id === item.id);
          if (!dish) return null;
          return { ...dish, quantity: item.quantity };
        })
        .filter(Boolean),
    [items],
  );

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      detailedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [detailedItems],
  );

  const value = useMemo(
    () => ({
      items: detailedItems,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [detailedItems, count, subtotal, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}
