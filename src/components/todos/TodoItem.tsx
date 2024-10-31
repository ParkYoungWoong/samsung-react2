import { useState } from 'react'
import { useUpdateTodo, useDeleteTodo } from '@/hooks/todo'
import type { Todo } from '@/hooks/todo'

export default function TodoItem({ todo }: { todo: Todo }) {
  const { mutate: mutateToUpdate, isPending } = useUpdateTodo()
  const { mutate: mutateToDelete } = useDeleteTodo()
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)

  async function updateTodo(title: string) {
    mutateToUpdate({
      ...todo,
      title
    })
    offEditMode()
  }
  function deleteTodo() {
    mutateToDelete(todo)
    offEditMode()
  }
  function onEditMode() {
    setIsEditMode(true)
  }
  function offEditMode() {
    setIsEditMode(false)
    setTitle(todo.title)
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
          <button onClick={offEditMode}>취소</button>
          <button onClick={() => updateTodo(title)}>저장</button>
          <button onClick={() => deleteTodo()}>삭제</button>
        </>
      ) : (
        <>
          <div>{todo.title}</div>
          <button onClick={onEditMode}>수정</button>
        </>
      )}
    </div>
  )
}
