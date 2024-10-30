import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

interface Movie {
  imdbID: string
  Title: string
  Year: string
}

export const useFetchMovies = (id: string | number) => {
  const [searchText, setSearchText] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)
  const query = useQuery<Movie[]>({
    queryKey: ['movies', id],
    queryFn: async () => {
      // await new Promise(resolve => setTimeout(resolve, 2000))
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      return Search
    },
    enabled: shouldFetch,
    staleTime: 3000
    // select: data => data.filter(movie => Number.parseFloat(movie.Year) >= 10)
  })
  function refetch() {
    if (!shouldFetch) setShouldFetch(true)
    query.refetch()
  }
  return {
    query: {
      ...query,
      refetch
    },
    searchText: {
      get: () => searchText,
      set: setSearchText
    }
  }
}

export const useFetchMovieDetails = () => {
  // ...
}
