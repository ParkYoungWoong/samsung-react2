import { useState } from 'react'
import MovieList from '@/components/MovieList'

export default function App() {
  const [isShow, setIsShow] = useState(true)
  return (
    <>
      <button
        onClick={() => {
          setIsShow(!isShow)
        }}>
        토글
      </button>
      {isShow && <MovieList id={1} />}
    </>
  )
}
