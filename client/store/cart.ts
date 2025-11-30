export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

let cartItems: CartItem[] = [];
let listeners: (() => void)[] = [];

export const cartStore = {
  getItems(): CartItem[] {
    return cartItems;
  },

  addItem(item: Omit<CartItem, 'quantity'>) {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }
    this.notify();
  },

  removeItem(id: number) {
    cartItems = cartItems.filter((item) => item.id !== id);
    this.notify();
  },

  updateQuantity(id: number, quantity: number) {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
        this.notify();
      }
    }
  },

  clear() {
    cartItems = [];
    this.notify();
  },

  getTotal(): number {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getItemCount(): number {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  },

  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  notify() {
    listeners.forEach((listener) => listener());
  },
};
