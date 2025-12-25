// components/CounterDisplay.tsx
import { useAppStore } from "~/stores/appStore";

export function CounterDisplay() {
  // 只订阅 count
  const count = useAppStore((state) => state.count);

  console.log("CounterDisplay 渲染了");

  return <div className='text-xl'>当前计数: {count}</div>;
}
