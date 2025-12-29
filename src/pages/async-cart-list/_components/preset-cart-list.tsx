import { useShallow } from "zustand/shallow";
import { useCartPersistStore } from "~/stores/cartPersistStore";

export function PresetCartList() {
  const items = useCartPersistStore((state) => state.items);
  const isLoading = useCartPersistStore((state) => state.isLoading);

  const { addItem, resetCart } = useCartPersistStore(
    useShallow((state) => ({
      addItem: state.addItem,
      resetCart: state.resetCart,
    }))
  );
  // const [isReady, setIsReady] = useState(false)

  // 💡 水合技巧（处理服务器渲染和客户端渲染的差异）：确保组件只在客户端“水合”完成后才渲染持久化数据
  // 避免服务器渲染 0 件，客户端突然跳成 5 件导致的视觉闪烁
  // useEffect(() => {
  //   setIsReady(true)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // if (!isReady) return <div>Loading...</div>

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className='text-xl font-bold mb-4 flex justify-between items-center'>
        我的购物车
        <button
          onClick={() => addItem({ id: 1, name: "键盘", price: 100, quantity: 1 })}
          className='px-4 py-2 bg-blue-500 text-white rounded'>
          添加商品
        </button>
        <button onClick={() => resetCart()} className='px-4 py-2 bg-blue-500 text-white rounded'>
          刷新
        </button>
      </h2>
      {items.length === 0 ? <p>购物车空空如也</p> : <p>购物车商品数: {items.length}</p>}
    </div>
  );
}
