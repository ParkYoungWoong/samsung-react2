import { useState } from 'react'
import { useFetchTodos, useCreateTodo } from '@/hooks/todo'

export default function App() {
  const { data: todos } = useFetchTodos() // useQuery
  const { mutate, mutateAsync } = useCreateTodo() // useMutation
  const [title, setTitle] = useState('')

  async function createTodo(title: string) {
    // const none = await mutate(title)
    const todo = await mutateAsync(title)
    console.log('변이 함수 호출이 끝났어!', todo)
  }

  return (
    <>
      <div>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && createTodo(title)}
        />
        <button onClick={() => createTodo(title)}>추가</button>
      </div>
      {todos?.map(todo => {
        return (
          <div key={todo.id}>
            <div>{todo.title}</div>
          </div>
        )
      })}
    </>
  )
}
