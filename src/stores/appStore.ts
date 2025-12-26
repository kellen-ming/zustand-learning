// stores/appStore.ts
import { create } from "zustand";

interface AppState {
  // 计数器状态
  count: number;
  increment: () => void;

  // 用户状态
  username: string;
  setUsername: (name: string) => void;

  // 用户信息
  user: {
    profile: {
      name: string;
      age: number;
    };
  };

  setUserAge: (age: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  user: {
    profile: {
      name: "userName",
      age: 18,
    },
  },
  increment: () => set((state) => ({ count: state.count + 1 })),

  username: "Guest",
  setUsername: (name) => set({ username: name }),

  setUserAge: (age) => set((state) => ({ user: { ...state.user, profile: { ...state.user.profile, age } } })),
}));
