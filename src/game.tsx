'use client'

import { useState, useTransition } from 'react'

import { BOARDS } from '@/boards'
import { Board } from '@/components/Board'
import { Button } from '@/components/Button'
import { Controls } from '@/components/Controls'
import { Counter } from '@/components/Counter'
import { useUserRecord } from '@/hooks/useUserRecord'
import { HintIcon } from '@/icons/Hint'
import { RestartIcon } from '@/icons/Restart'
import { UndoIcon } from '@/icons/Undo'
import { getBotTurns } from '@/lib/getBotTurns'
import { getHint } from '@/lib/getHint'
import { getNewBoard } from '@/lib/getNewBoard'
import { getTileGroups } from '@/lib/getTileGroups'
import { TileGroup } from '@/types/game'

const BOARD = BOARDS[0].tiles

export const Game: React.FC = () => {
  const [boardHistory, setBoardHistory] = useState([BOARD])
  const [stepCount, setStepCount] = useState(0)
  const [botTurns, setBotTurns] = useState<number | undefined>(undefined)
  const [hint, setHint] = useState<TileGroup | undefined>(undefined)
  const { userRecord, setUserRecord } = useUserRecord()
  const [isBotScorePending, startCalculatingBotScore] = useTransition()

  const board = boardHistory[0]

  if (board.flat().every((tile) => tile == '')) {
    if (!userRecord || stepCount < userRecord) {
      setUserRecord(stepCount)
      localStorage.setItem('record', stepCount.toString())
    }
  }

  return (
    <div className="sm:px-4 sm:py-8">
      <div className="mx-auto flex max-w-screen-sm flex-col sm:flex-row sm:gap-2">
        <div className="flex h-min justify-between gap-4 bg-violet-900 p-3 sm:flex-col sm:rounded-lg">
          <div className="flex gap-4 sm:flex-col">
            <Counter label="Turns">{stepCount}</Counter>
            <Counter label="Record">{userRecord}</Counter>
          </div>

          <Counter label="Bot">
            <button
              onClick={() => {
                startCalculatingBotScore(() => {
                  setBotTurns(getBotTurns(BOARD))
                })
              }}
            >
              {isBotScorePending ? '...' : (botTurns ?? 'Show')}
            </button>
          </Counter>
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
              setBoardHistory([
                getNewBoard(board, tileGroup.tiles),
                ...boardHistory,
              ])
              setStepCount(stepCount + 1)
              setHint(undefined)
            }
          }}
          className="flex-1 p-2"
        />

        <div className="sticky bottom-0">
          <Controls className="mx-auto flex w-min gap-4 sm:flex-col">
            <div className="flex gap-4 sm:flex-col">
              <Button
                label="Restart"
                icon={RestartIcon}
                onClick={() => {
                  setBoardHistory(boardHistory.slice(boardHistory.length - 1))
                  setStepCount(0)
                  setHint(undefined)
                }}
              />
              <Button
                label="Undo"
                icon={UndoIcon}
                onClick={() => {
                  if (boardHistory.length > 1) {
                    setBoardHistory(boardHistory.slice(1))
                    setStepCount(stepCount - 1)
                    setHint(undefined)
                  }
                }}
              />
            </div>

            <Button
              label="Hint"
              icon={HintIcon}
              onClick={() => {
                setHint(getHint(board).moves[0])
              }}
            />
          </Controls>
        </div>
      </div>
    </div>
  )
}
