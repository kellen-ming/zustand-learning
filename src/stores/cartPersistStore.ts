import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface CartPersistItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartPersistState {
  items: CartPersistItem[]
  isLoading: boolean
  addItem: (product: CartPersistItem) => void
  resetCart: () => void
}

export const useCartPersistStore = create<CartPersistState>()(
  // ✨✨✨ persist
  // 1. 第一层包裹：持久化中间件
  persist(
    // 2. 第二层包裹：Immer 中间件
    immer((set) => ({
      items: [],
      isLoading: false, // 我们不希望这个状态被持久化

      addItem: (product) => set((state) => {
        state.items.push(product)
      }),

      resetCart: () => set({ items: [] }),
    })),
    {
      // --- 持久化配置项 ---
      name: 'user-cart-storage', // localStorage 中的 key
      
      // 💡 关键配置：部分持久化 (Partialization)
      // 我们只希望持久化 items，不希望持久化 isLoading。
      // 因为用户刷新页面时，加载状态应该是初始值 false，而不是刷之前卡在 true 的状态。
      partialize: (state) => ({ items: state.items }),

      // 可以指定存储引擎，默认是 localStorage
      storage: createJSONStorage(() => localStorage),

      // 💡 进阶配置：版本控制
      // 如果以后你改了数据结构（比如 price 变成了 object），
      // 可以通过 version 配合 migrate 函数平滑升级旧数据，防止应用崩溃。
      version: 1, 
    }
  )
)