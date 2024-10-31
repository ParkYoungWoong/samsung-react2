import { useState } from 'react'

export default function App() {
  const [searchText, setSearchText] = useState('')
  return (
    <>
      <div>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button>검색</button>
      </div>
    </>
  )
}
