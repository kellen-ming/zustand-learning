import { create } from "zustand";
import type { CounterStore } from "~/types";

export const useCounterStore = create<CounterStore>((set, get) => ({
  count: 0,
  isLoading: false,
  lastUpdated: undefined,

  increment: () =>
    set((state) => ({
      count: state.count + 1,
      lastUpdated: new Date().toISOString(),
    })),

  decrement: () =>
    set((state) => ({
      count: state.count - 1,
      lastUpdated: new Date().toISOString(),
    })),

  reset: () =>
    set({
      count: 0,
      lastUpdated: new Date().toISOString(),
    }),

  incrementAsync: async (amount = 1) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        count: state.count + amount,
        lastUpdated: new Date().toISOString(),
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  getCurrentCount: () => {
    const current = get().count;
    console.log("当前 count:", current);
    return current;
  },
}));
