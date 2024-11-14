import { Board, Coordinate } from '@/types'

export const popTileGroup = (
  board: Board,
  tileGroups: Coordinate[][],
  tileCoordinate: Coordinate,
) => {
  // must be [...board] to create a shallow copy, otherwise useState doesn't detect the change
  const newBoard = [...board]

  tileGroups
    .find((tileGroup) =>
      tileGroup.some(
        ([i, j]) => i == tileCoordinate[0] && j == tileCoordinate[1],
      ),
    )!
    .forEach(([i, j]) => {
      newBoard[i] = [
        ...newBoard[i].slice(0, j),
        ...newBoard[i].slice(j + 1),
        '',
      ]
    })

  return newBoard
}
