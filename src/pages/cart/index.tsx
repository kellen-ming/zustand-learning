import { DemoWrapper } from "~/components/demo-wrapper";
import { Cart as CartComponent } from "./_components/cart";
import { ImmerCart as ImmerCartComponent } from "./_components/immer-cart";
export function Cart() {
  return (
    <DemoWrapper title={`Demo 3: 购物车(理解Action、immer、Async Actions)`} className='space-y-4'>
      <CartComponent />

      <h2 className='text-2xl font-bold'>ImmerCart</h2>
      <ImmerCartComponent />
    </DemoWrapper>
  );
}
