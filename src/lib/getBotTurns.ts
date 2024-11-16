import { getHint } from './getHint'

export const getBotTurns = (board: string[][], turns = 0): number => {
  if (board.flat().every((tile) => tile == '')) {
    return turns
  }

  const newBoard = structuredClone(board)

  const tileGroup = getHint(board)

  tileGroup.tiles.forEach(([i, j]) => {
    newBoard[i][j] = ''
  })

  newBoard.map((column) =>
    column.sort((a, b) => (a == '' ? 1 : b == '' ? -1 : 0)),
  )

  return getBotTurns(newBoard, turns + 1)
}
