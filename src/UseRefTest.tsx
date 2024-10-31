import { useEffect, useRef } from 'react'

export default function UseRefTest() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input
        ref={inputRef}
        type="text"
      />
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </>
  )
}
