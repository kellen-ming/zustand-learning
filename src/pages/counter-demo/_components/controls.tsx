// components/Controls.tsx
import { useShallow } from "zustand/shallow";
import { useAppStore } from "~/stores/appStore";

export function Controls() {
  const { username, increment, setUsername } = useAppStore(
    useShallow((state) => ({
      username: state.username,
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
    </div>
  );
}
