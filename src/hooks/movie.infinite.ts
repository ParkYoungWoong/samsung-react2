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
  return useInfiniteQuery<ResponseValue>({
    queryKey: ['movies'],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=abcd&page=${pageParam}`
      )
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const maxPage = Math.ceil(Number.parseInt(pages[0].totalResults, 10) / 10) // 2
      if (maxPage > pages.length) {
        return pages.length + 1
      }
      return null
    }
  })
}

// export const useCustomHook = () => {
//   return useInfiniteQuery({
//     queryKey: [],
//     queryFn: async () => {},
//     initialPageParam: 1,
//     getNextPageParam: () => 2
//   })
// }
