'use client'

import { useState, useTransition } from 'react'

import { BOARDS } from '@/boards'
import { Board } from '@/components/Board'
import { Controls } from '@/components/Controls'
import { Counter } from '@/components/Counter'
import { useUserRecord } from '@/hooks/useUserRecord'
import { getBotTurns } from '@/lib/getBotTurns'
import { getNewBoard } from '@/lib/getNewBoard'
import { getTileGroups } from '@/lib/getTileGroups'
import { GameState } from '@/types/game'

const BOARD = BOARDS[0].tiles

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    boardHistory: [BOARD],
    stepCount: 0,
    hint: undefined,
  })

  const [botTurns, setBotTurns] = useState<number | undefined>(undefined)

  const { userRecord, setUserRecord } = useUserRecord()

  if (gameState.boardHistory[0].flat().every((tile) => tile == '')) {
    if (!userRecord || gameState.stepCount < userRecord) {
      setUserRecord(gameState.stepCount)
      localStorage.setItem('record', gameState.stepCount.toString())
    }
  }

  return (
    <div className="sm:px-4 sm:py-8">
      <div className="mx-auto flex max-w-screen-sm flex-col sm:flex-row sm:gap-2">
        <div className="flex h-min justify-between gap-4 bg-violet-900 p-3 sm:flex-col sm:rounded-lg">
          <div className="flex gap-4 sm:flex-col">
            <Counter label="Turns">{gameState.stepCount}</Counter>
            <Counter label="Record">{userRecord}</Counter>
          </div>

          <Counter label="Bot">
            <button
              onClick={() => {
                setBotTurns(getBotTurns(BOARD))
              }}
            >
              {botTurns ?? 'Show'}
            </button>
          </Counter>
        </div>

        <Board
          board={gameState.boardHistory[0]}
          hint={gameState.hint}
          onTileClick={([i, j]) => {
            const tileGroups = getTileGroups(gameState.boardHistory[0])

            const tileGroup = tileGroups.find(({ tiles }) =>
              tiles.some(([i2, j2]) => i2 == i && j2 == j),
            )

            if (tileGroup) {
              setGameState({
                boardHistory: [
                  getNewBoard(gameState.boardHistory[0], tileGroup.tiles),
                  ...gameState.boardHistory,
                ],
                stepCount: gameState.stepCount + 1,
                hint: undefined,
              })
            }
          }}
          className="flex-1 p-2"
        />

        <div className="sticky bottom-0 mx-auto w-min">
          <Controls
            gameState={gameState}
            onGameStateChange={(gameState) => {
              setGameState(gameState)
            }}
          />
        </div>
      </div>
    </div>
  )
}
