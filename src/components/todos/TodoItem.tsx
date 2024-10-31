import { useState } from 'react'
import { useUpdateTodo } from '@/hooks/todo'
import type { Todo } from '@/hooks/todo'

export default function TodoItem({ todo }: { todo: Todo }) {
  const { mutateAsync, isPending } = useUpdateTodo()
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)

  async function updateTodo(title: string) {
    await mutateAsync({
      ...todo,
      title
    })
    setIsEditMode(false)
  }

  return (
    <div key={todo.id}>
      {isEditMode ? (
        <>
          <input
            disabled={isPending}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button onClick={() => updateTodo(title)}>
            {isPending ? '저장 중..' : '저장'}
          </button>
        </>
      ) : (
        <>
          <div>{todo.title}</div>
          <button onClick={() => setIsEditMode(true)}>수정</button>
        </>
      )}
    </div>
  )
}
