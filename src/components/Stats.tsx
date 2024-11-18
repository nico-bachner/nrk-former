import { useState } from 'react'

import { useUserRecord } from '@/hooks/useUserRecord'
import { getBotTurns } from '@/lib/getBotTurns'
import { GameState } from '@/types/game'

import { Counter } from './Counter'

type StatsProps = {
  gameState: GameState
}

export const Stats: React.FC<StatsProps> = ({ gameState }) => {
  const { userRecord, setUserRecord } = useUserRecord()

  if (gameState.boardHistory[0].flat().every((tile) => tile == '')) {
    if (!userRecord || gameState.stepCount < userRecord) {
      setUserRecord(gameState.stepCount)
      localStorage.setItem('record', gameState.stepCount.toString())
    }
  }

  const [botTurns, setBotTurns] = useState<number | undefined>(undefined)

  return (
    <div className="flex h-min justify-between gap-4 bg-violet-900 p-3 sm:flex-col sm:rounded-lg">
      <div className="flex gap-4 sm:flex-col">
        <Counter label="Turns">{gameState.stepCount}</Counter>
        <Counter label="Record">{userRecord}</Counter>
      </div>

      <Counter label="Bot">
        <button
          onClick={() => {
            setBotTurns(getBotTurns(gameState.boardHistory[0]))
          }}
        >
          {botTurns ?? 'Show'}
        </button>
      </Counter>
    </div>
  )
}
