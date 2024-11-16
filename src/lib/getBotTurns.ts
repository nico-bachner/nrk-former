import { getHint } from './getHint'
import { getNewBoard } from './getNewBoard'

export const getBotTurns = (board: string[][], turns = 0): number => {
  if (board.flat().every((tile) => tile == '')) {
    return turns
  }

  const tileGroup = getHint(board)

  const newBoard = getNewBoard(board, tileGroup)

  return getBotTurns(newBoard, turns + 1)
}
