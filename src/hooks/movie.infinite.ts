import { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

interface ResponseValue {
  Search: Movie[]
  totalResults: string
  Response: string
}
interface Movie {
  imdbID: string
  Title: string
  Year: string
}

export const useFetchMovies = () => {
  const [searchText, setSearchText] = useState('')
  const query = useInfiniteQuery<ResponseValue>({
    queryKey: ['movies'],
    queryFn: async ({ pageParam }) => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}&page=${pageParam}`
      )
      return res.json() // page!
    },
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      const maxPage = Math.ceil(Number.parseInt(pages[0].totalResults, 10) / 10) // 2
      if (maxPage > pages.length) {
        return pages.length + 1
      }
      return null
    },
    enabled: false
  })
  return {
    ...query,
    searchText: {
      get: () => searchText,
      set: setSearchText
    }
  }
}

// export const useCustomHook = () => {
//   return useInfiniteQuery({
//     queryKey: [],
//     queryFn: async () => {},
//     initialPageParam: 1,
//     getNextPageParam: () => 2
//   })
// }
