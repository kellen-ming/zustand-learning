import { useEffect } from "react";
import { useCartAsyncStore } from "~/stores/cartAsyncStore";

export function AsyncCartList() {
  // 订阅状态
  const { items, loading, error, fetchCartData } = useCartAsyncStore();

  // 组件挂载时自动加载数据
  useEffect(() => {
    fetchCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1. 加载中状态
  if (loading) {
    return <div className='p-10 text-center text-blue-500 animate-pulse'>🚀 正在从云端同步购物车数据...</div>;
  }

  // 2. 错误反馈状态
  if (error) {
    return (
      <div className='p-10 text-center'>
        <p className='text-red-500 mb-4'>❌ 出错了: {error}</p>
        <button onClick={() => fetchCartData()} className='px-4 py-2 bg-blue-500 text-white rounded'>
          重试
        </button>
      </div>
    );
  }

  // 3. 正常列表渲染
  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4 flex justify-between items-center'>
        我的购物车
        <button onClick={() => fetchCartData()} className='px-4 py-2 bg-blue-500 text-white rounded'>
          刷新
        </button>
      </h2>
      {items.length === 0 ? (
        <p>购物车空空如也</p>
      ) : (
        <ul className='space-y-2'>
          {items.map((item) => (
            <li key={item.id} className='p-3 border rounded flex justify-between'>
              <span>{item.name}</span>
              <span className='font-mono text-gray-600'>x{item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
