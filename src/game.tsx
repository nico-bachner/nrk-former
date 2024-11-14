'use client'

import { useState } from 'react'

import { popTileGroup } from '@/lib/popTileGroup'
import { cn } from '@/utils/cn'

const getTileColor = (tile: string) => {
  switch (tile) {
    case 'p':
      return 'bg-pink-500 rounded-full'
    case 'o':
      return 'bg-orange-500'
    case 'b':
      return 'bg-blue-500'
    case 'g':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

export const Game: React.FC = () => {
  const [board, setBoard] = useState([
    ['p', 'o', 'o', 'p', 'o', 'p', 'g', 'o', 'g'],
    ['p', 'b', 'o', 'o', 'p', 'p', 'b', 'o', 'p'],
    ['p', 'b', 'p', 'g', 'b', 'g', 'p', 'o', 'p'],
    ['g', 'o', 'p', 'o', 'o', 'p', 'b', 'p', 'o'],
    ['o', 'o', 'b', 'b', 'o', 'g', 'p', 'o', 'g'],
    ['b', 'p', 'p', 'o', 'b', 'g', 'o', 'p', 'o'],
    ['b', 'o', 'p', 'p', 'p', 'b', 'p', 'b', 'g'],
  ])

  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-row gap-2">
      {board.map((column, i) => (
        <div key={i} className="flex flex-col-reverse gap-2">
          {column.map((tile, j) => (
            <button
              key={j}
              onClick={() => {
                const time1 = Date.now()
                const newBoard = popTileGroup(board, [i, j])
                console.log(Date.now() - time1)
                console.log(newBoard)
                setBoard(newBoard)
              }}
            >
              <div className={cn('size-12', getTileColor(tile))} />
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={() => {
          setCount(count + 1)
        }}
        className="size-12 bg-white"
      >
        {count}
      </button>
    </div>
  )
}
