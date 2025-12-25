import { DemoWrapper } from "~/components/demo-wrapper";
import { Counter } from "./_components/couter";
import { CounterDisplay } from "./_components/counter-display";
import { UserDisplay } from "./_components/user-display";
import { Controls } from "./_components/controls";
import { TodoList } from "./_components/todo-list";
import Cart from "./_components/cart";

export function CounterDemo() {
  return (
    <div className='flex flex-col gap-10'>
      <DemoWrapper title='Demo 1: 最简单的计数器'>
        <Counter />
      </DemoWrapper>
      <hr />
      <DemoWrapper title={`Demo 2: 多状态管理(理解Selector和useShallow)`} className='space-y-4'>
        <CounterDisplay />
        <UserDisplay />
        <Controls />
      </DemoWrapper>
      <hr />
      <DemoWrapper title={`Demo 3: 使用Zustand管理待办事项（Actions）`} className='space-y-4'>
        <TodoList />
      </DemoWrapper>
      <hr />
      <DemoWrapper title={`Demo 4: 使用Zustand管理购物车`} className='space-y-4'>
        <Cart />
      </DemoWrapper>
    </div>
  );
}
