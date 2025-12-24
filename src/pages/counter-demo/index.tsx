import { useCounterStore } from "~/stores/counterStore";
import { useShallow } from "zustand/react/shallow";

export function CounterDemo() {
  const count = useCounterStore((state) => state.count);
  const lastUpdated = useCounterStore((state) => state.lastUpdated);
  const isLoading = useCounterStore((state) => state.isLoading);

  const { increment, decrement, reset, incrementAsync } = useCounterStore(
    useShallow((state) => ({
      increment: state.increment,
      decrement: state.decrement,
      reset: state.reset,
      incrementAsync: state.incrementAsync,
    }))
  );

  const handleIncrementAsync = () => incrementAsync(5);

  return (
    <div className='flex flex-col gap-3'>
      <h1>Zustand Counter Demo</h1>
      <p>
        这个例子演示了最基础的 store 创建与订阅：组件通过 <code>useCounterStore</code> 读取状态与 action。
      </p>

      <section className='counter-panel'>
        <button type='button' onClick={decrement} disabled={isLoading}>
          -
        </button>
        <span className='value'>{count}</span>
        <button type='button' onClick={increment} disabled={isLoading}>
          +
        </button>
      </section>

      <div className='flex gap-2'>
        <button className='reset' type='button' onClick={reset} disabled={isLoading}>
          重置
        </button>
        <button className='reset' type='button' onClick={handleIncrementAsync} disabled={isLoading}>
          异步 +5
        </button>
      </div>

      <p className='text-sm opacity-70'>
        {isLoading ? "请求中..." : lastUpdated ? `上次更新时间：${lastUpdated}` : "暂未更新"}
      </p>
    </div>
  );
}
