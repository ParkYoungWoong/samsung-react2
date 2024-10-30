import { useQueryClient } from '@tanstack/react-query'
import { useFetchMovies } from '@/hooks/movie'
import Loader from '@/components/Loader'

export default function MovieList({ id }: { id: string | number }) {
  const {
    query: { data, refetch, isLoading, isFetching, isSuccess },
    searchText
  } = useFetchMovies(id)
  const queryClient = useQueryClient()

  function getCachedData() {
    const cachedData = queryClient.getQueryData(['movies', 1])
    console.log(cachedData)
  }

  return (
    <>
      <h1>Movie List!</h1>
      <input
        value={searchText.get()}
        onChange={e => searchText.set(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && refetch()}
      />
      {isLoading && <Loader />}
      {!isLoading && isFetching && <Loader />}
      {isSuccess &&
        data?.map(movie => {
          return (
            <>
              <div key={movie.imdbID}>
                {movie.Title}({movie.Year})
              </div>
            </>
          )
        })}
      <button onClick={getCachedData}>캐시된 데이터 내놔!</button>
    </>
  )
}
