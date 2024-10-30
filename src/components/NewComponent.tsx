import { useFetchMovies } from '@/hooks/movie'

export default function NewComponent() {
  const { data } = useFetchMovies(1)
  return <>{JSON.stringify(data)}</>
}
