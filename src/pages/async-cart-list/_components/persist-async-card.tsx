import { useEffect } from "react";
import { useUserStore } from "~/stores/cartPersistAsyncCartStore";

export function UserProfileView() {
  const { profile, lastUpdated, isLoading, fetchProfile, clearStorage } = useUserStore();

  // 1. 解决水合闪烁逻辑
  // const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    // setIsReady(true);
    fetchProfile(); // 页面加载时根据缓存策略决定是否发请求
  }, []);

  // if (!isReady) return <div className='p-10 text-center'>系统准备中...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto font-sans">
      <header className="flex justify-between items-center mb-4">
        <h2>用户信息 (持久化 + 缓存示例)</h2>
        <button onClick={() => fetchProfile(true)} disabled={isLoading} className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? "加载中..." : "手动刷新数据"}
        </button>
      </header>

      <section className="border border-gray-200 rounded-lg p-4 shadow-sm">
        {profile ? (
          <div className="flex items-center gap-4">
            <img src={profile.avatar} alt='avatar' className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <h3 className="text-lg font-bold">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <small className="text-sm text-gray-500">上次同步时间: {new Date(lastUpdated).toLocaleTimeString()}</small>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">暂无缓存数据，正在尝试请求...</p>
        )}
      </section>

      <div className="mt-6 text-sm text-gray-500 space-y-2">
        <p>
          💡 <b>测试说明：</b>
        </p>
        <ol>
          <li>首次进入会看到 Loading，完成后数据存入 LocalStorage。</li>
          <li>
            <b>刷新页面</b>：数据会“秒出”，且不会触发 Loading（因为 5 分钟缓存策略）。
          </li>
          <li>
            <b>清空测试</b>：点击下方按钮清空后刷新，会重新触发 Loading。
          </li>
        </ol>
        <button onClick={clearStorage} className="px-4 py-2 rounded-md border border-red-500 text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed">
          清空持久化数据
        </button>
      </div>
    </div>
  );
}