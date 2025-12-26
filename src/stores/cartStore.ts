// stores/cartStore.ts
import { create } from "zustand";

// --- 1. Store 定义  ---
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: { id: number; name: string; price: number }) => void;
  removeItem: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  // ✨✨✨ Actions
  addItem: (product) =>
    set((state) => {
      // 逻辑：检查是否存在，存在则数量+1，不存在则 push 新的
      const existingItem = state.items.find((i) => i.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)),
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity: 1 }],
        };
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
