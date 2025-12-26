// pages/cart/_components/cart.tsx

import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "~/stores/cartStore";
// --- 2. 模拟商品数据 ---
const PRODUCTS = [
  { id: 1, name: "电脑椅", price: 1500 },
  { id: 2, name: "键盘", price: 800 },
  { id: 3, name: "显示器", price: 2500 },
];

// --- 3. UI 组件 ---
export function Cart() {
  // ✅ 最佳实践：订阅 items 数据
  // 这里 items 是数组，数组引用是不稳定的，所以如果你只订阅 items，
  // 实际上每次 items 变化组件都会渲染，这里用不用 useShallow 区别不大（除非你还订阅了其他基本类型）
  // 但为了养成好习惯，我们保持简洁。
  const items = useCartStore((state) => state.items);

  // ✅ 最佳实践：Actions 比较稳定，不需要 useShallow，直接解构即可
  // 或者为了代码整洁，把 Actions 聚合在一起
  const { addItem, removeItem } = useCartStore(
    useShallow((state) => ({
      addItem: state.addItem,
      removeItem: state.removeItem,
    }))
  );

  // 🧮 架构思维：衍生状态 (Derived State)
  // 总价不需要存都在 Store 里，也不需要专门写个 get 方法。
  // 只要 items 变了，React 组件重渲染，这里就会自动重新计算。
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
      {/* 左侧：商品列表 */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold mb-4'>商品列表</h2>
        <div className='grid gap-4'>
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className='border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white'>
              <div>
                <h3 className='font-semibold'>{product.name}</h3>
                <p className='text-gray-500'>¥{product.price}</p>
              </div>
              <button
                onClick={() => addItem(product)}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors'>
                加入购物车
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧：购物车 */}
      <div className='border p-6 rounded-xl bg-gray-50 shadow-lg h-fit'>
        <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
          🛒 购物车
          <span className='text-sm font-normal text-gray-500'>({items.length} 件商品)</span>
        </h2>

        {items.length === 0 ? (
          <p className='text-gray-400 text-center py-8'>购物车是空的，快去选购吧！</p>
        ) : (
          <ul className='space-y-4 mb-6'>
            {items.map((item) => (
              <li key={item.id} className='flex justify-between items-center bg-white p-3 rounded border'>
                <div>
                  <div className='font-medium'>{item.name}</div>
                  <div className='text-sm text-gray-500'>
                    ¥{item.price} x {item.quantity}
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <span className='font-bold'>¥{item.price * item.quantity}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className='text-red-500 hover:text-red-700 text-sm hover:underline'>
                    删除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className='border-t pt-4 flex justify-between items-center'>
          <span className='text-lg text-gray-600'>总额：</span>
          <span className='text-3xl font-bold text-blue-600'>¥{totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
