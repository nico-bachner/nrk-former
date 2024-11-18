import { HintIcon } from '@/icons/Hint'
import { RestartIcon } from '@/icons/Restart'
import { UndoIcon } from '@/icons/Undo'
import { getHint } from '@/lib/getHint'
import { GameState } from '@/types/game'
import { cn } from '@/utils/cn'

import { Button } from './Button'

type ControlsProps = {
  gameState: GameState
  onGameStateChange: (gameState: GameState) => void
}

export const Controls: React.FC<ControlsProps> = ({
  gameState,
  onGameStateChange,
}) => (
  <div
    className={cn(
      'm-2 rounded-full bg-violet-900 p-2',
      'flex gap-4 sm:flex-col',
    )}
  >
    <Button
      label="Restart"
      icon={RestartIcon}
      onClick={() => {
        onGameStateChange({
          boardHistory: gameState.boardHistory.slice(
            gameState.boardHistory.length - 1,
          ),
          stepCount: 0,
          hint: undefined,
        })
      }}
    />

    <Button
      label="Undo"
      icon={UndoIcon}
      onClick={() => {
        if (gameState.boardHistory.length > 1) {
          onGameStateChange({
            boardHistory: gameState.boardHistory.slice(1),
            stepCount: gameState.stepCount - 1,
            hint: undefined,
          })
        }
      }}
    />

    <Button
      label="Hint"
      icon={HintIcon}
      onClick={() => {
        onGameStateChange({
          ...gameState,
          hint: getHint(gameState.boardHistory[0]).moves[0],
        })
      }}
    />
  </div>
)
