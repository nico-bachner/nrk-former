import { Board, TileGroup } from '@/types'

/**
 * Finds all the tile groups currently on the board
 *
 * @param board The current board state
 * @returns All the tile groups on the board
 */
export const getTileGroups = (board: Board): TileGroup[] => {
  let tileGroups: TileGroup[] = []

  board
    .map((column) => column.filter((tile) => tile != ''))
    .forEach((column, i) => {
      column.forEach((tile, j) => {
        const tileGroupLeft = tileGroups.find(({ tiles }) =>
          tiles.some(
            ([i2, j2]) => i2 == i - 1 && j2 == j && tile == board[i2][j2],
          ),
        )

        const tileGroupBelow = tileGroups.find(({ tiles }) =>
          tiles.some(
            ([i2, j2]) => i2 == i && j2 == j - 1 && tile == board[i2][j2],
          ),
        )

        if (tileGroupLeft && tileGroupBelow) {
          tileGroups = tileGroups.filter(
            ({ id }) => id != tileGroupLeft.id && id != tileGroupBelow.id,
          )

          tileGroups.push({
            id: tileGroupLeft.id,
            tiles: [...tileGroupLeft.tiles, ...tileGroupBelow.tiles, [i, j]],
            score: tileGroupLeft.score + tileGroupBelow.score + 1,
          })
        } else if (tileGroupLeft) {
          tileGroups = tileGroups.filter(({ id }) => id != tileGroupLeft.id)

          tileGroups.push({
            id: tileGroupLeft.id,
            tiles: [...tileGroupLeft.tiles, [i, j]],
            score: tileGroupLeft.score + 1,
          })
        } else if (tileGroupBelow) {
          tileGroups = tileGroups.filter(({ id }) => id != tileGroupBelow.id)

          tileGroups.push({
            id: tileGroupBelow.id,
            tiles: [...tileGroupBelow.tiles, [i, j]],
            score: tileGroupBelow.score + 1,
          })
        } else {
          tileGroups.push({
            id: crypto.randomUUID(),
            tiles: [[i, j]],
            score: 1,
          })
        }
      })
    })

  return tileGroups
}
