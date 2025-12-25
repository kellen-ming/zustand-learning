// stores/counterStore.ts
import { create } from 'zustand'

// 1. 定义 Store 的类型
interface CounterState {
  count: number          // 状态数据
  increment: () => void  // 修改状态的方法
  decrement: () => void
}

// 2. 创建 Store
export const useCounterStore = create<CounterState>((set) => ({
  // 初始状态
  count: 0,
  
  // 修改状态的方法
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))