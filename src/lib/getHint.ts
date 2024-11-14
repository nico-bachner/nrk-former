import { getTileGroups } from './getTileGroups'

export const getHint = (board: string[][]) => {
  const tileGroups = getTileGroups(board)

  return tileGroups.sort((a, b) => b.length - a.length)[0]
}
