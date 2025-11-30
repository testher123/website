import { useState, useEffect } from 'react';
import { cartStore, CartItem } from '@/store/cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(cartStore.getItems());

  useEffect(() => {
    const unsubscribe = cartStore.subscribe(() => {
      setItems(cartStore.getItems());
    });

    return unsubscribe;
  }, []);

  return {
    items,
    addItem: cartStore.addItem.bind(cartStore),
    removeItem: cartStore.removeItem.bind(cartStore),
    updateQuantity: cartStore.updateQuantity.bind(cartStore),
    clear: cartStore.clear.bind(cartStore),
    getTotal: () => cartStore.getTotal(),
    getItemCount: () => cartStore.getItemCount(),
  };
}
