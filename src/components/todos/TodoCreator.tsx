import { useState } from 'react'
import { useCreateTodo } from '@/hooks/todo'

export default function TodoCreator() {
  const { mutate: createTodo } = useCreateTodo() // useMutation
  const [title, setTitle] = useState('')

  return (
    <div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && createTodo(title)}
      />
      <button onClick={() => createTodo(title)}>추가</button>
    </div>
  )
}
