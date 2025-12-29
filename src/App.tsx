import { Cart } from "./pages/cart";
import { Counter } from "./pages/counter";
import { TodoList } from "./pages/todo-list/_components/todo-list";
import { CounterDemo } from "./pages/counter-demo";
import { AsyncCartList } from "./pages/async-cart-list";

function App() {
  return (
    <main className='app-shell'>
      <div className='flex flex-col gap-10'>
        <Counter />
        <hr />
        <CounterDemo />
        <hr />
        <Cart />
        <hr />
        <AsyncCartList />
        <hr />
        <TodoList />
      </div>
    </main>
  );
}

export default App;
