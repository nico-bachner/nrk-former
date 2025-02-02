'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import { BOARDS } from '@/boards'
import { Board } from '@/components/Board'
import { Controls } from '@/components/Controls'
import { Stats } from '@/components/Stats'
import { getNewBoard } from '@/lib/getNewBoard'
import { getTileGroups } from '@/lib/getTileGroups'
import { GameState } from '@/types/game'

const Page = () => {
  const params = useParams()

  const boardOfTheDay =
    BOARDS.find(
      ({ date }) =>
        date ==
        ((params.date as string | undefined) ??
          new Date(Date.now()).toISOString().split('T')[0]),
    ) ?? BOARDS[0]

  const [gameState, setGameState] = useState<GameState>({
    boardHistory: [boardOfTheDay.tiles],
    stepCount: 0,
    hint: undefined,
  })

  return (
    <div className="sm:px-4 sm:py-8">
      <div className="mx-auto flex max-w-screen-sm flex-col sm:flex-row sm:gap-2">
        <Stats gameState={gameState} />

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

export default Page
