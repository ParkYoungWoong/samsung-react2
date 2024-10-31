import { useState } from 'react'
import { useFetchMovies } from '@/hooks/movie.infinite'

export default function App() {
  const { data, fetchNextPage } = useFetchMovies()
  const [searchText, setSearchText] = useState('')

  function searchMovies() {
    // ...
  }

  return (
    <>
      <div>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchMovies()}
        />
        <button onClick={searchMovies}>검색</button>
        {data?.pages.map(page => {
          return page.Search.map(movie => {
            return <div key={movie.imdbID}>{movie.Title}</div>
          })
        })}
        <button onClick={() => fetchNextPage()}>더보기</button>
      </div>
    </>
  )
}
