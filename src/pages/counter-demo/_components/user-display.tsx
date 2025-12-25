// components/UserDisplay.tsx
import { useAppStore } from "~/stores/appStore";

export function UserDisplay() {
  // 只订阅 username
  const username = useAppStore((state) => state.username);

  console.log("UserDisplay 渲染了");

  return <div className='text-xl'>用户名: {username}</div>;
}
