import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

export function useFetchTodos() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          }
        }
      )
      return res.json()
    }
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (title: string) => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          },
          body: JSON.stringify({
            title
          })
        }
      )
      return res.json() as Promise<Todo>
    },
    onMutate: title => {
      const newTodo = { id: Math.random().toString(), title }
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        queryClient.setQueryData(['todos'], [newTodo, ...todos])
      }
    },
    onSuccess: async todo => {
      // console.log(
      //   '무효화하기 전 데이터',
      //   queryClient.getQueryData<Todo[]>(['todos'])![0]
      // )

      // 1) 추가 네트워크 통신 없이 실제 데이터로 업데이트!
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        queryClient.setQueryData(['todos'], [todo, ...todos?.slice(1)])
      }
      // 2) 추가 네트워크 통신이 필요한 실제 데이터로 업데이트!
      // await queryClient.invalidateQueries({ queryKey: ['todos'] }) // 다시 가져와!

      // console.log(
      //   '무효화한 후 데이터',
      //   queryClient.getQueryData<Todo[]>(['todos'])![0]
      // )
    },
    onError: () => {}
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          },
          body: JSON.stringify({
            title: todo.title,
            done: todo.done
          })
        }
      )
      return res.json()
    },
    onMutate: (todo: Todo) => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        queryClient.setQueryData(
          ['todos'],
          todos.map(t => (t.id === todo.id ? todo : t))
        )
      }
    },
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {}
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          }
        }
      )
      return res.json()
    },
    onMutate: (todo: Todo) => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        queryClient.setQueryData(
          ['todos'],
          todos.filter(t => t.id !== todo.id)
        )
      }
    },
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {} // finally
  })
}

// export function useCustomHook() {
//   return useMutation({
//     mutationFn: async (a: string) => {
//       // throw new Error('에러 발생!')
//       return b as number
//     },
//     onMutate: (a) => {
//       return c as boolean
//     },
//     onSuccess: (b, a, c) => {},
//     onError: (err, a, c) => {},
//     onSettled: (b, err, a, c) => {} // finally
//   })
// }
