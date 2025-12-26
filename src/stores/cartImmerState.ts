// stores/cartImmerState.ts

import { create } from "zustand";
// 1. 引入中间件
import { immer } from "zustand/middleware/immer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addImmerItem: (item: { id: number; name: string; price: number }) => void;
  removeImmerItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
}

// 2. 使用 immer 包裹配置函数
// 注意类型定义：create<CartState>()(...)
export const useCartImmerStore = create<CartState>()(
  immer((set) => ({
    items: [],

    addImmerItem: (product) =>
      set((state) => {
        // ✨ Magic Time: 这里的 state 是 "Draft"
        // 我们可以像写 Vue 或者普通 JS 一样直接修改它！

        const existingItem = state.items.find((i: CartItem) => i.id === product.id);

        if (existingItem) {
          // ✅ 直接修改属性，不需要 ...spread
          existingItem.quantity += 1;
        } else {
          // ✅ 直接 push，不需要 [...state.items, newItem]
          state.items.push({ ...product, quantity: 1 });
        }

        // 不需要 return 任何东西，Immer 会自动处理
      }),

    removeImmerItem: (id) =>
      set((state) => {
        // 使用 splice 直接删除数组元素
        const index = state.items.findIndex((i: CartItem) => i.id === id);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      }),

    // 拓展功能：更新数量 (delta 为 1 代表加，-1 代表减)
    updateQuantity: (id, delta) =>
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          item.quantity += delta;

          // 💡 架构逻辑：如果数量小于 1，直接从数组中剔除
          if (item.quantity < 1) {
            const index = state.items.findIndex((i) => i.id === id);
            state.items.splice(index, 1);
          }
        }
      }),
  }))
);
