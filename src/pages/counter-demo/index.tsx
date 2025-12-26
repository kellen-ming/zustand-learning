import { DemoWrapper } from "~/components/demo-wrapper";
import { Controls } from "./_components/controls";
import { CounterDisplay } from "./_components/counter-display";
import { UserDisplay } from "./_components/user-display";

export function CounterDemo() {
  return (
    <DemoWrapper title={`Demo 2: 多状态管理(理解Selector和useShallow)`} className='space-y-4'>
      <CounterDisplay />
      <UserDisplay />
      <Controls />
    </DemoWrapper>
  );
}
