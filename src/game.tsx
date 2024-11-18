'use client'

import { useState, useTransition } from 'react'

import { BOARDS } from '@/boards'
import { Board } from '@/components/Board'
import { Button } from '@/components/Button'
import { Counter } from '@/components/Counter'
import { useUserRecord } from '@/hooks/useUserRecord'
import { HintIcon } from '@/icons/Hint'
import { UndoIcon } from '@/icons/Undo'
import { getBotTurns } from '@/lib/getBotTurns'
import { getHint } from '@/lib/getHint'
import { getNewBoard } from '@/lib/getNewBoard'
import { getTileGroups } from '@/lib/getTileGroups'
import { TileGroup } from '@/types/game'

import { RestartIcon } from './icons/Restart'

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
              {isBotScorePending ? '...' : (botTurns ?? 'Show')}
            </button>
          </Counter>
        </div>

        <div className="flex gap-4">
          <Button
            label="Hint"
            icon={HintIcon}
            onClick={() => {
              setHint(getHint(board).moves[0])
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

          <Button
            label="Restart"
            icon={RestartIcon}
            onClick={() => {
              setBoardHistory(boardHistory.slice(boardHistory.length - 1))
              setStepCount(0)
              setHint(undefined)
            }}
          />
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
            setBoardHistory([
              getNewBoard(board, tileGroup.tiles),
              ...boardHistory,
            ])
            setStepCount(stepCount + 1)
            setHint(undefined)
          }
        }}
      />
    </div>
  )
}
