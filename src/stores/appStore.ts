// stores/appStore.ts
import { create } from 'zustand'

interface AppState {
  // 计数器状态
  count: number
  increment: () => void
  
  // 用户状态
  username: string
  setUsername: (name: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  
  username: 'Guest',
  setUsername: (name) => set({ username: name }),
}))