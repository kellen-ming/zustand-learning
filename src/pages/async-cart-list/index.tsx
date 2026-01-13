import { DemoWrapper } from "~/components/demo-wrapper";
import { AsyncCartList as AsyncCartListComponent } from "./_components/async-cart-list";
import { PersistCartList as PersistCartListComponent } from "./_components/persist-cart-list";
import { UserProfileView as UserProfileViewComponent } from "./_components/persist-async-card";

export function AsyncCartList() {
  return (
    <DemoWrapper title={`Demo4: 购物车（Async Actions和persist）`} className='space-y-4'>
      <AsyncCartListComponent />

      <h2 className='text-2xl font-bold'>PersistCartList:</h2>
      <PersistCartListComponent />

      <h2 className='text-2xl font-bold'>Persist + Async Action:</h2>
      <UserProfileViewComponent />
    </DemoWrapper>
  );
}
