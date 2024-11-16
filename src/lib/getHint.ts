import { Board, TileGroup } from '@/types'

import { getNewBoard } from './getNewBoard'
import { getTileGroups } from './getTileGroups'

/**
 * Calculates the "best" (WIP) move for the player
 *
 * @param board The current board
 * @returns The collection of tiles to pop
 */
export const getHint = (board: Board, depth = 3): TileGroup => {
  const tileGroups = getTileGroups(board)

  if (depth == 0 || tileGroups.length == 1) {
    return tileGroups.sort((a, b) => b.score - a.score)[0]
  }

  return tileGroups
    .map(({ id, tiles, score }) => {
      const i = tiles[0][0]
      const j = tiles[0][1]

      const tileGroup = tileGroups.find(({ tiles }) =>
        tiles.some(([i2, j2]) => i2 == i && j2 == j),
      )

      if (!tileGroup) {
        throw new Error('Tile group not found')
      }

      const newBoard = getNewBoard(board, tileGroup)

      return {
        id,
        tiles,
        score: score + getHint(newBoard, depth - 1).score,
      }
    })
    .sort((a, b) => b.score - a.score)[0]
}
