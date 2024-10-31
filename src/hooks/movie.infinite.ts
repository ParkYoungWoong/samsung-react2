import { useInfiniteQuery } from '@tanstack/react-query'

interface Movie {
  imdbID: string
  Title: string
  Year: string
}

export const useFetchMovies = () => {
  return useInfiniteQuery<Movie[]>({
    // queryKey: ['movies'],
    // queryFn: async ({ pageParam = 1 }) => {
    //   const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=avengers`)
    //   const { Search } = await res.json()
    //   return Search
    // }
  })
}
