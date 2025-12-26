import { DemoWrapper } from "~/components/demo-wrapper";
import { TodoList as TodoListComponent } from "./_components/todo-list";
export function TodoList() {
  return (
    <DemoWrapper title={`其他Demo: todoList`} className='space-y-4'>
      <TodoListComponent />
    </DemoWrapper>
  );
}
