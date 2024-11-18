import { Board, Hint } from '@/types'

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
  cache: { [key: string]: Hint } = {},
  depth = 3,
): Hint => {
  if (Object.keys(cache).includes(JSON.stringify(board))) {
    return cache[JSON.stringify(board)]
  }

  const tileGroups = getTileGroups(board)

  if (depth == 0 || tileGroups.length == 1) {
    const bestNextMove = tileGroups.sort((a, b) => b.score - a.score)[0]

    const hint = {
      moves: [bestNextMove],
      score: bestNextMove.score,
    }

    cache[JSON.stringify(board)] = hint

    return hint
  }

  const hint: Hint = tileGroups
    .map(({ tiles, score }) => {
      const i = tiles[0][0]
      const j = tiles[0][1]

      const tileGroup = tileGroups.find(({ tiles }) =>
        tiles.some(([i2, j2]) => i2 == i && j2 == j),
      )!

      const newBoard = getNewBoard(board, tileGroup.tiles)

      const hint = getHint(newBoard, cache, depth - 1)

      return {
        moves: [tileGroup, ...hint.moves],
        score: addScores(score * depth, decrementScore(hint.score)),
      }
    })
    .sort((a, b) => b.score - a.score)[0]

  cache[JSON.stringify(board)] = hint

  if (depth >= 2) {
    console.log('hint', hint)
  }

  return hint
}
