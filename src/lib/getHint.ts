import { TileGroup } from '@/types'

import { getTileGroups } from './getTileGroups'

export const getHint = (board: string[][], depth = 3): TileGroup => {
  const tileGroups = getTileGroups(board)

  if (depth > 0 && tileGroups.length > 1) {
    return tileGroups
      .map(({ id, tiles, score }) => {
        const newBoard = structuredClone(board)

        const i = tiles[0][0]
        const j = tiles[0][1]

        const tileGroup = tileGroups.find(({ tiles }) =>
          tiles.some(([i2, j2]) => i2 == i && j2 == j),
        )

        if (!tileGroup) {
          throw new Error('Tile group not found')
        }

        tileGroup.tiles.forEach(([i, j]) => {
          newBoard[i][j] = ''
        })

        newBoard.map((column) =>
          column.sort((a, b) => (a == '' ? 1 : b == '' ? -1 : 0)),
        )

        return {
          id,
          tiles,
          score: score + getHint(newBoard, depth - 1).score,
        }
      })
      .sort((a, b) => b.score - a.score)[0]
  }

  return tileGroups.sort((a, b) => b.score - a.score)[0]
}
