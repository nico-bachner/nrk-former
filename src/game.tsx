'use client'

import { cn } from './cn'

const board = [
  ['p', 'o', 'o', 'p', 'o', 'p', 'g', 'o', 'g'],
  ['p', 'b', 'o', 'o', 'p', 'p', 'b', 'o', 'p'],
  ['p', 'b', 'p', 'g', 'b', 'g', 'p', 'o', 'p'],
  ['g', 'o', 'p', 'o', 'o', 'p', 'b', 'p', 'o'],
  ['o', 'o', 'b', 'b', 'o', 'g', 'p', 'o', 'g'],
  ['b', 'p', 'p', 'o', 'b', 'g', 'o', 'p', 'o'],
  ['b', 'o', 'p', 'p', 'p', 'b', 'p', 'b', 'g'],
]

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

export const Game: React.FC = () => (
  <div className="mx-auto flex flex-col gap-4">
    <div className="flex flex-row gap-1">
      {board.map((column, i) => (
        <div key={i} className="flex flex-col-reverse gap-1">
          {column.map((tile, j) => (
            <button key={j}>
              <div className={cn('size-8', getTileColor(tile))}></div>
            </button>
          ))}
        </div>
      ))}
    </div>
  </div>
)
