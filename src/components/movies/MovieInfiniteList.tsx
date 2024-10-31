import { useEffect } from 'react'
import { useFetchMovies } from '@/hooks/movie.infinite'
import Loader from '@/components/Loader'
import { useInView } from 'react-intersection-observer'

export default function MovieInfiniteList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    searchText,
    refetch
  } = useFetchMovies()
  // const observerRef = useRef<HTMLButtonElement | null>(null)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (isLoading) return
    if (inView) {
      fetchNextPage()
    }
    // const io = new IntersectionObserver(entries => {
    //   entries.forEach(entry => {
    //     if (entry.isIntersecting) {
    //       fetchNextPage()
    //     }
    //   })
    // })
    // if (observerRef.current) {
    //   io.observe(observerRef.current)
    // }
    // return () => {
    //   io.disconnect()
    // }
  }, [isLoading, isFetchingNextPage, inView])

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
                  <button
                    ref={ref}
                    onClick={() => fetchNextPage()}>
                    더보기
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
