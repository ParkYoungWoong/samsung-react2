import MovieInfiniteList from './components/movies/MovieInfiniteList'
import { useEffect, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('count:', count)
    return () => {
      console.log('unmount')
    }
  }, [count])

  return (
    <>
      {/* <button onClick={() => setCount(c => c + 1)}>Increase</button> */}
      <MovieInfiniteList />
    </>
  )
}
