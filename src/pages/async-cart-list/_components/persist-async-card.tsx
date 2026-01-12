import React, { useEffect } from "react";
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
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h2>用户信息 (持久化 + 缓存示例)</h2>
        <button onClick={() => fetchProfile()} disabled={isLoading} style={btnStyle}>
          {isLoading ? "加载中..." : "手动刷新数据"}
        </button>
      </header>

      <section style={cardStyle}>
        {profile ? (
          <div style={contentStyle}>
            <img src={profile.avatar} alt='avatar' style={avatarStyle} />
            <div>
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
              <small style={{ color: "#999" }}>上次同步时间: {new Date(lastUpdated).toLocaleTimeString()}</small>
            </div>
          </div>
        ) : (
          <p style={{ color: "#999" }}>暂无缓存数据，正在尝试请求...</p>
        )}
      </section>

      <div style={footerStyle}>
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
        <button onClick={clearStorage} style={dangerBtnStyle}>
          清空持久化数据
        </button>
      </div>
    </div>
  );
}

// --- 极简 CSS-in-JS 样式 ---
const containerStyle: React.CSSProperties = {
  padding: "20px",
  maxWidth: "500px",
  margin: "auto",
  fontFamily: "sans-serif",
};
const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};
const cardStyle: React.CSSProperties = {
  border: "1px solid #eee",
  padding: "20px",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
};
const contentStyle: React.CSSProperties = { display: "flex", gap: "20px", alignItems: "center" };
const avatarStyle: React.CSSProperties = { width: "60px", height: "60px", borderRadius: "50%", background: "#f0f0f0" };
const btnStyle = { padding: "8px 16px", borderRadius: "6px", cursor: "pointer", border: "1px solid #ddd" };
const dangerBtnStyle = { ...btnStyle, color: "#ff4d4f", borderColor: "#ff4d4f", marginTop: "10px" };
const footerStyle: React.CSSProperties = { marginTop: "30px", fontSize: "13px", color: "#666", lineHeight: "1.6" };
