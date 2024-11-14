import { Board, Coordinate } from '@/types'

import { getTileGroups } from './getTileGroups'

export const popTileGroup = (board: Board, tileCoordinate: Coordinate) => {
  const tileGroups = getTileGroups(board)

  const newBoard = board

  let poppedTileGroupIndex: number | null = null

  tileGroups.forEach((tileGroup, i) => {
    tileGroup.forEach((groupTileCoordinate) => {
      if (
        groupTileCoordinate[0] == tileCoordinate[0] &&
        groupTileCoordinate[1] == tileCoordinate[1]
      ) {
        poppedTileGroupIndex = i
      }
    })
  })

  tileGroups[poppedTileGroupIndex!].forEach(([i, j]) => {
    newBoard[i] = [...newBoard[i].slice(0, j), ...newBoard[i].slice(j + 1)]
  })

  return newBoard
}
