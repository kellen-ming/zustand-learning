// pages/counter-demo/_components/controls.tsx
import { useShallow } from "zustand/shallow";
import { useAppStore } from "~/stores/appStore";

export function Controls() {
  const { username, age, setUserAge, increment, setUsername } = useAppStore(
    // ✨✨✨ 使用 useShallow 来优化性能
    useShallow((state) => ({
      username: state.username,
      // ✨✨✨ 直接取到基本类型
      age: state.user.profile.age,
      setUserAge: state.setUserAge,
      increment: state.increment,
      setUsername: state.setUsername,
    }))
  );

  return (
    <div className='space-x-2'>
      <button onClick={increment} className='bg-blue-500 text-white px-4 py-2 rounded'>
        增加计数
      </button>
      <button
        onClick={() => setUsername(username === "Guest" ? "Alice" : "Guest")}
        className='bg-green-500 text-white px-4 py-2 rounded'>
        改名为 {username === "Guest" ? "Alice" : "Guest"}
      </button>
      {/* 设置年龄为20 */}
      <button onClick={() => setUserAge(20)}>
        设置年龄为20 - {age}
      </button>
    </div>
  );
}
