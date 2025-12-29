import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CartAsyncItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartAsyncState {
  items: CartAsyncItem[];
  loading: boolean;
  error: string | null;
  // 异步 Action
  fetchCartData: () => Promise<void>;
}

// 模拟后端 API
const mockApiFetchCart = (): Promise<CartAsyncItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟 80% 成功率
      if (Math.random() > 0.2) {
        resolve([
          { id: 101, name: '键盘', price: 1299, quantity: 1 },
          { id: 102, name: '鼠标', price: 499, quantity: 2 },
        ]);
      } else {
        reject(new Error('服务器响应超时，请稍后重试'));
      }
    }, 1500); // 模拟 1.5 秒网络延迟
  });
};

export const useCartAsyncStore = create<CartAsyncState>()(
  immer((set) => ({
    items: [],
    loading: false,
    error: null,

    // ✨✨✨ Async Actions
    fetchCartData: async () => {
      // --- 步骤 1: 同步更新，开启 Loading ---
      set({ loading: true, error: null });

      try {
        // --- 步骤 2: 异步逻辑，在外面执行 ---
        const data = await mockApiFetchCart();

        // --- 步骤 3: 异步结束，回到同步 set 更新结果 ---
        set((state) => {
          state.items = data;
          state.loading = false; // 关闭 Loading
        });
      } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        // --- 步骤 4: 异常处理，同步更新错误状态 ---
        set({ error: e.message, loading: false });
      }
    },
  }))
);