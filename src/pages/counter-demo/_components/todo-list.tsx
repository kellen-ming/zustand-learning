// components/TodoList.tsx
import { useTodoStore } from '~/stores/todoStore'
import { useShallow } from 'zustand/react/shallow'
import { useState } from 'react'

export function TodoList() {
  const [input, setInput] = useState('')
  
  // 订阅数据和方法
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore(
    useShallow((state) => ({
      todos: state.todos,
      addTodo: state.addTodo,
      toggleTodo: state.toggleTodo,
      removeTodo: state.removeTodo
    }))
  )
  
  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input)  // ✨✨✨ 调用 Action,传入参数
      setInput('')
    }
  }
  
  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="输入待办事项"
          className="border px-3 py-2 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          添加
        </button>
      </div>
      
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-2 border p-2 rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}  // 传入 ID
              className="w-5 h-5"
            />
            <span className={todo.completed ? 'line-through text-gray-400' : ''}>
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}  // 传入 ID
              className="ml-auto text-red-500 hover:text-red-700"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}