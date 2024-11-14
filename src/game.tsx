'use client'

import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/utils/cn'

import { Restart } from './icons/Restart'
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
  }
}

const BOARD = [
  ['p', 'o', 'o', 'p', 'o', 'p', 'g', 'o', 'g'],
  ['p', 'b', 'o', 'o', 'p', 'p', 'b', 'o', 'p'],
  ['p', 'b', 'p', 'g', 'b', 'g', 'p', 'o', 'p'],
  ['g', 'o', 'p', 'o', 'o', 'p', 'b', 'p', 'o'],
  ['o', 'o', 'b', 'b', 'o', 'g', 'p', 'o', 'g'],
  ['b', 'p', 'p', 'o', 'b', 'g', 'o', 'p', 'o'],
  ['b', 'o', 'p', 'p', 'p', 'b', 'p', 'b', 'g'],
]

export const Game: React.FC = () => {
  const [board, setBoard] = useState(BOARD)
  const [stepCount, setStepCount] = useState(0)
  const [record, setRecord] = useState<number | undefined>(undefined)

  useEffect(() => {
    const record = localStorage.getItem('record')

    if (record) {
      setRecord(parseInt(record))
    }
  }, [])

  if (board.flat().every((tile) => tile == '')) {
    if (!record || stepCount < record) {
      setRecord(stepCount)
      localStorage.setItem('record', stepCount.toString())
    }
  }

  const tileGroups = useMemo(() => getTileGroups(board), [board])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold uppercase text-[#DBBFFA]">Turns</p>

            <div className="flex h-12 w-16 items-center justify-center rounded bg-[#641FB3]">
              <p className="text-xl font-bold text-white">{stepCount}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="font-bold uppercase text-[#DBBFFA]">Record</p>

            <div className="flex h-12 w-16 items-center justify-center rounded bg-[#641FB3]">
              <p className="text-xl font-bold text-white">{record}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="font-bold uppercase text-[#DBBFFA]">Restart</p>

          <button
            onClick={() => {
              setBoard(BOARD)
              setStepCount(0)
            }}
            className="flex size-12 items-center justify-center rounded-full bg-[#641FB3]"
          >
            <Restart className="text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-flow-col grid-cols-7 grid-rows-9 gap-2">
        {board.map((column, i) =>
          column.map((tile, j) => {
            if (tile == '') {
              return (
                <div
                  key={j}
                  style={{ gridRow: 9 - j, gridColumn: i + 1 }}
                  className="aspect-square"
                />
              )
            }

            return (
              <button
                key={j}
                onClick={() => {
                  // must be [...board] to create a shallow copy, otherwise useState doesn't detect the change
                  const newBoard = [...board]

                  tileGroups
                    .find((tileGroup) =>
                      tileGroup.some(([i2, j2]) => i2 == i && j2 == j),
                    )!
                    .reverse()
                    .forEach(([i, j]) => {
                      newBoard[i] = [
                        ...newBoard[i].slice(0, j),
                        ...newBoard[i].slice(j + 1),
                        '',
                      ]
                    })

                  setBoard(newBoard)
                  setStepCount(stepCount + 1)
                }}
                style={{ gridRow: 9 - j, gridColumn: i + 1 }}
              >
                <div className={cn('aspect-square', getTileColor(tile))} />
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}
