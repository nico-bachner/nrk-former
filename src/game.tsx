'use client'

import { useEffect, useState } from 'react'

import { BOARDS } from '@/boards'
import { HintIcon } from '@/icons/Hint'
import { RestartIcon } from '@/icons/Restart'
import { getHint } from '@/lib/getHint'
import { getTileGroups } from '@/lib/getTileGroups'
import { TileGroup } from '@/types'

import { Board } from './components/Board'

const BOARD = BOARDS[0].tiles

export const Game: React.FC = () => {
  const [board, setBoard] = useState(BOARD)
  const [stepCount, setStepCount] = useState(0)
  const [record, setRecord] = useState<number | undefined>(undefined)
  const [hint, setHint] = useState<TileGroup | undefined>(undefined)

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

    return (
      <div className="flex items-center justify-center">
        <p className="text-3xl font-bold text-purple-300">You win!</p>
      </div>
    )
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
                setHint(getHint(board))
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

      <Board
        board={board}
        hint={hint}
        onTileClick={([i, j]) => {
          // must be a deep copy, otherwise useState doesn't detect the change
          const newBoard = structuredClone(board)

          const tileGroups = getTileGroups(board)

          const tileGroup = tileGroups.find(({ tiles }) =>
            tiles.some(([i2, j2]) => i2 == i && j2 == j),
          )

          if (tileGroup) {
            tileGroup.tiles.forEach(([i, j]) => {
              newBoard[i][j] = ''
            })

            newBoard.map((column) =>
              column.sort((a, b) => (a == '' ? 1 : b == '' ? -1 : 0)),
            )

            setBoard(newBoard)
            setStepCount(stepCount + 1)
            setHint(undefined)
          }
        }}
      />
    </div>
  )
}
