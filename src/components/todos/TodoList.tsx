import { useFetchTodos } from '@/hooks/todo'
import TodoItem from '@/components/todos/TodoItem'

export default function TodoList() {
  const { data: todos } = useFetchTodos() // useQuery

  return (
    <>
      {todos?.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </>
  )
}
