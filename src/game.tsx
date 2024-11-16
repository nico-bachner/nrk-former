'use client'

import { useState, useTransition } from 'react'

import { BOARDS } from '@/boards'
import { Board } from '@/components/Board'
import { Counter } from '@/components/Counter'
import { useUserRecord } from '@/hooks/useUserRecord'
import { HintIcon } from '@/icons/Hint'
import { RestartIcon } from '@/icons/Restart'
import { getBotTurns } from '@/lib/getBotTurns'
import { getHint } from '@/lib/getHint'
import { getNewBoard } from '@/lib/getNewBoard'
import { getTileGroups } from '@/lib/getTileGroups'
import { TileGroup } from '@/types'

const BOARD = BOARDS[0].tiles

export const Game: React.FC = () => {
  const [board, setBoard] = useState(BOARD)
  const [stepCount, setStepCount] = useState(0)
  const [botTurns, setBotTurns] = useState<number | undefined>(undefined)
  const [hint, setHint] = useState<TileGroup | undefined>(undefined)
  const { userRecord, setUserRecord } = useUserRecord()
  const [isBotScorePending, startCalculatingBotScore] = useTransition()

  if (board.flat().every((tile) => tile == '')) {
    if (!userRecord || stepCount < userRecord) {
      setUserRecord(stepCount)
      localStorage.setItem('record', stepCount.toString())
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <Counter label="Turns">{stepCount}</Counter>
          <Counter label="Record">{userRecord}</Counter>
          <Counter label="Bot">
            <button
              onClick={() => {
                startCalculatingBotScore(() => {
                  setBotTurns(getBotTurns(BOARD))
                })
              }}
            >
              {isBotScorePending ? '...' : botTurns}
            </button>
          </Counter>
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
          const tileGroups = getTileGroups(board)

          const tileGroup = tileGroups.find(({ tiles }) =>
            tiles.some(([i2, j2]) => i2 == i && j2 == j),
          )

          if (tileGroup) {
            setBoard(getNewBoard(board, tileGroup))
            setStepCount(stepCount + 1)
            setHint(undefined)
          }
        }}
      />
    </div>
  )
}
