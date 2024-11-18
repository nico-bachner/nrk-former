import { Board, Hint } from '@/types'

import { getHint } from './getHint'
import { getNewBoard } from './getNewBoard'

/**
 * Calculates the number of turns the bot will take to solve the game
 *
 * @param board The board state - can be either the initial board configuration or the current board state, depending on use case
 * @returns The number of turns the bot takes
 */
export const getBotTurns = (
  board: Board,
  moves: Hint[] = [],
  turns = 0,
): number => {
  if (board.flat().every((tile) => tile == '')) {
    return turns
  }

  const tileGroup = getHint(board)

  const newBoard = getNewBoard(board, tileGroup.moves[0].tiles)

  return getBotTurns(newBoard, [...moves, tileGroup], turns + 1)
}
