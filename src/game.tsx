'use client'

import { useMemo, useState } from 'react'

import { popTileGroup } from '@/lib/popTileGroup'
import { cn } from '@/utils/cn'

import { getTileGroups } from './lib/getTileGroups'

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
      return 'bg-transparent'
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

  const tileGroups = useMemo(() => getTileGroups(board), [board])

  return (
    <div className="flex flex-row gap-2">
      {board.map((column, i) => (
        <div key={i} className="flex flex-col-reverse gap-2">
          {column.map((tile, j) => (
            <button
              key={j}
              onClick={() => {
                const newBoard = popTileGroup(board, tileGroups, [i, j])
                setBoard(newBoard)
              }}
            >
              <div className={cn('size-12', getTileColor(tile))} />
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
