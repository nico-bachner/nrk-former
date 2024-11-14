import { Hint } from '@/types'

import { getTileGroups } from './getTileGroups'

export const getHint = (board: string[][], depth: number): Hint => {
  const scoredTileGroups = getTileGroups(board).map((tileGroup) => ({
    tileGroup,
    score: tileGroup.length,
  }))

  console.log('depth', depth)

  if (depth > 0) {
    return scoredTileGroups
      .map(({ tileGroup, score }) => {
        const newBoard = structuredClone(board)

        scoredTileGroups
          .find(({ tileGroup: tileGroup2 }) =>
            tileGroup2.some(
              ([i2, j2]) => i2 == tileGroup[0][0] && j2 == tileGroup[0][1],
            ),
          )
          ?.tileGroup.reverse()
          .forEach(([i, j]) => {
            newBoard[i] = [
              ...newBoard[i].slice(0, j),
              ...newBoard[i].slice(j + 1),
              '',
            ]
          })

        return {
          tileGroup: tileGroup,
          score: score + getHint(newBoard, depth - 1).score,
        }
      })
      .sort((a, b) => b.score - a.score)[0]
  }

  return scoredTileGroups.sort((a, b) => b.score - a.score)[0]
}
