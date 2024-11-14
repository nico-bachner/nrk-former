'use client'

import { useEffect, useState } from 'react'

import { Tile } from '@/Tile'
import { BOARDS } from '@/boards'
import { HintIcon } from '@/icons/Hint'
import { RestartIcon } from '@/icons/Restart'
import { SquareIcon } from '@/icons/Square'
import { getHint } from '@/lib/getHint'
import { getTileGroups } from '@/lib/getTileGroups'
import { Hint } from '@/types'

const BOARD = BOARDS[1]

export const Game: React.FC = () => {
  const [board, setBoard] = useState(BOARD)
  const [stepCount, setStepCount] = useState(0)
  const [record, setRecord] = useState<number | undefined>(undefined)
  const [hint, setHint] = useState<Hint | undefined>(undefined)

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold uppercase text-purple-300">Turns</p>

            <div className="flex h-12 w-16 items-center justify-center rounded bg-purple-900">
              <p className="text-xl font-bold text-purple-200">{stepCount}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="font-bold uppercase text-purple-300">Record</p>

            <div className="flex h-12 w-16 items-center justify-center rounded bg-purple-900">
              <p className="text-xl font-bold text-purple-200">{record}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold uppercase text-purple-300">Hint</p>

            <button
              onClick={() => {
                const movesLeft = board
                  .flat()
                  .filter((tile) => tile != '').length
                const hint = getHint(board, Math.min(1, movesLeft - 1))
                setHint(hint)
              }}
              className="flex size-12 items-center justify-center rounded-full bg-purple-700"
            >
              <HintIcon className="text-purple-100" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="font-bold uppercase text-purple-300">Restart</p>

            <button
              onClick={() => {
                setBoard(BOARD)
                setStepCount(0)
                setHint(undefined)
              }}
              className="flex size-12 items-center justify-center rounded-full bg-purple-700"
            >
              <RestartIcon className="text-purple-100" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-col grid-cols-7 grid-rows-9">
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

                  getTileGroups(board)
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
                  setHint(undefined)
                }}
                style={{ gridRow: 9 - j, gridColumn: i + 1 }}
                className="relative"
              >
                <Tile tile={tile} />
                {hint &&
                  hint.tileGroup.some(([i2, j2]) => i2 == i && j2 == j) && (
                    <SquareIcon className="absolute inset-0 h-full w-full text-white" />
                  )}
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}
