import { DemoWrapper } from "~/components/demo-wrapper";
import { AsyncCartList as AsyncCartListComponent } from "./_components/async-cart-list";
import { PresetCartList as PresetCartListComponent } from "./_components/preset-cart-list";
export function AsyncCartList() {
  return (
    <DemoWrapper title={`Demo4: 购物车（Async Actions和persist）`} className='space-y-4'>
      <AsyncCartListComponent />

      <h2 className='text-2xl font-bold'>PresetCartList</h2>
      <PresetCartListComponent />
    </DemoWrapper>
  );
}
