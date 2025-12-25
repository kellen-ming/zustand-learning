import { create } from "zustand"

interface UserState {
  username: string
  email: string
  isLoggedIn: boolean
  loginCount: number
  
  // Actions
  login: (username: string, email: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  username: '',
  email: '',
  isLoggedIn: false,
  loginCount: 0,
  
  // 登录: 同时更新多个状态
  login: (username, email) => set((state) => ({
    username,
    email,
    isLoggedIn: true,
    loginCount: state.loginCount + 1  // 基于旧值
  })),
  
  // 登出: 重置多个状态
  logout: () => set({
    username: '',
    email: '',
    isLoggedIn: false
    // loginCount 保留不重置
  })
}))