import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface UserState {
  profile: UserProfile | null;
  lastUpdated: number;
  isLoading: boolean;
  fetchProfile: (forceRefresh?: boolean) => Promise<void>;
  clearStorage: () => void;
}

const api = {
  getUserInfo: async (): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "kellen",
          email: "kellen@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        });
      }, 1500);
    });
  },
};

export const useUserStore = create<UserState>()(
  persist(
    immer((set, get) => ({
      profile: null,
      lastUpdated: 0,
      isLoading: false,

      // ✨✨✨ Persist + Async Action
      async fetchProfile(forceRefresh = false) {
        const { lastUpdated, profile } = get();
        // 缓存策略：5分钟内不重复请求
        // 💡 只有在 【非强制刷新】 的情况下，才执行缓存时间判断
        if (!forceRefresh) {
          const isFresh = Date.now() - lastUpdated < 1000 * 60 * 5;
          if (profile && isFresh) {
            console.log("📦 命中缓存，跳过请求");
            return;
          }
        }
        // 如果是强制刷新，或者是缓存失效，或者是第一次进入，则往下执行
        console.log(forceRefresh ? "🔥 用户手动强制更新..." : "⏳ 缓存失效，自动更新...");  

        set({ isLoading: true });
        try {
          const data = await api.getUserInfo();
          set((state) => {
            state.profile = data;
            state.lastUpdated = Date.now();
            state.isLoading = false;
          });
        } catch (err) {
          console.error(err);
          set({ isLoading: false });
        }
      },

      clearStorage() {
        set({ profile: null, lastUpdated: 0 });
        localStorage.removeItem("user-storage");
      },
    })),

    {
      name: "user-profile-storage",
      partialize: (state) => ({
        profile: state.profile,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
