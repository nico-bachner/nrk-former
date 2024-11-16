import { Board, TileGroup } from '@/types'

/**
 * Executes a player turn
 *
 * @param board The current board
 * @param tileGroup The tile group being popped
 * @returns The new board after the player's turn
 */
export const getNewBoard = (board: Board, tileGroup: TileGroup): Board => {
  const newBoard = structuredClone(board)

  tileGroup.tiles.forEach(([i, j]) => {
    newBoard[i][j] = ''
  })

  newBoard.map((column) =>
    column.sort((a, b) => (a == '' ? 1 : b == '' ? -1 : 0)),
  )

  return newBoard
}
