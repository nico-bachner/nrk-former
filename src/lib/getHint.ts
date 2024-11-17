import { Board, TileGroup } from '@/types'

import { getNewBoard } from './getNewBoard'
import { getTileGroups } from './getTileGroups'
import { addScores, decrementScore } from './scoreManipulations'

/**
 * Calculates the "best" (WIP) move for the player
 *
 * @param board The current board
 * @returns The collection of tiles to pop
 */
export const getHint = (
  board: Board,
  cache: { [key: string]: TileGroup } = {},
  depth = 3,
): TileGroup => {
  if (Object.keys(cache).includes(JSON.stringify(board))) {
    return cache[JSON.stringify(board)]
  }

  const tileGroups = getTileGroups(board)

  if (depth == 0 || tileGroups.length == 1) {
    const bestNextMove = tileGroups.sort((a, b) => b.score - a.score)[0]

    cache[JSON.stringify(board)] = bestNextMove

    return bestNextMove
  }

  const bestNextMove = tileGroups
    .map(({ id, tiles, score }) => {
      const i = tiles[0][0]
      const j = tiles[0][1]

      const tileGroup = tileGroups.find(({ tiles }) =>
        tiles.some(([i2, j2]) => i2 == i && j2 == j),
      )!

      const newBoard = getNewBoard(board, tileGroup)

      return {
        id,
        tiles,
        score: addScores(
          score * depth,
          decrementScore(getHint(newBoard, cache, depth - 1).score),
        ),
      }
    })
    .sort((a, b) => b.score - a.score)[0]

  cache[JSON.stringify(board)] = bestNextMove

  if (depth >= 2) {
    console.log('bestNextMove', bestNextMove)
  }

  return bestNextMove
}
