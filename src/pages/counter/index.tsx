// pages/counter
import { DemoWrapper } from "~/components/demo-wrapper";
import { useCounterStore } from "~/stores/counterStore";

export function Counter() {
  // 3. 在组件中使用 (就像 useState 一样)
  const count = useCounterStore((state) => state.count);
  //                               ↑
  //                         这是一个 selector 函数
  //                         只订阅你需要的数据!
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <DemoWrapper title='Demo 1: 最简单的计数器'>
      <h2 className='text-2xl font-bold'>Count: {count}</h2>
      <button onClick={increment} className='bg-blue-500 text-white px-4 py-2 rounded mr-2'>
        +1
      </button>
      <button onClick={decrement} className='bg-red-500 text-white px-4 py-2 rounded'>
        -1
      </button>
    </DemoWrapper>
  );
}
