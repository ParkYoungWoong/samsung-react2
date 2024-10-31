import { useEffect } from 'react'
import { useFetchMovies } from '@/hooks/movie.infinite'
import Loader from '@/components/Loader'

export default function App() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    searchText,
    refetch
  } = useFetchMovies()

  useEffect(() => {
    const io = new IntersectionObserver(() => {})
    // io.observe()
  }, [])

  function searchMovies() {
    refetch()
  }

  return (
    <>
      <div>
        <input
          value={searchText.get()}
          onChange={e => searchText.set(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchMovies()}
        />
        <button onClick={searchMovies}>검색</button>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.pages.map(page => {
              return page.Search.map(movie => {
                return <div key={movie.imdbID}>{movie.Title}</div>
              })
            })}
            {isFetchingNextPage ? (
              <Loader />
            ) : (
              <>
                {hasNextPage && (
                  <button onClick={() => fetchNextPage()}>더보기</button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
