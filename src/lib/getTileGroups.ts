import { Board, Coordinate } from '@/types'

export const getTileGroups = (board: Board) => {
  let tileGroups: Coordinate[][] = []

  board.forEach((column, i) => {
    column.forEach((tile, j) => {
      if (i > 0 && j > 0) {
        if (tile == board[i - 1][j] && tile == board[i][j - 1]) {
          let tileGroup1Index: number | null = null
          let tileGroup2Index: number | null = null

          tileGroups.forEach((tileGroup, k) => {
            tileGroup.forEach(([i2, j2]) => {
              if (i2 == i - 1 && j2 == j) {
                tileGroup1Index = k
              }
              if (i2 == i && j2 == j - 1) {
                tileGroup2Index = k
              }
            })
          })

          const tileGroup1 = tileGroups[tileGroup1Index!]
          const tileGroup2 = tileGroups[tileGroup2Index!]

          tileGroups = [
            ...tileGroups.slice(0, tileGroup1Index!),
            ...tileGroups.slice(tileGroup1Index! + 1),
          ]

          tileGroups = [
            ...tileGroups.slice(0, tileGroup2Index!),
            [...tileGroup1, ...tileGroup2, [i, j]],
            ...tileGroups.slice(tileGroup2Index! + 1),
          ]
        } else if (tile == board[i - 1][j]) {
          tileGroups.forEach((tileGroup) => {
            tileGroup.forEach(([i2, j2]) => {
              if (i2 == i - 1 && j2 == j) {
                tileGroup.push([i, j])
              }
            })
          })
        } else if (tile == board[i][j - 1]) {
          tileGroups.forEach((tileGroup) => {
            tileGroup.forEach(([i2, j2]) => {
              if (i2 == i && j2 == j - 1) {
                tileGroup.push([i, j])
              }
            })
          })
        } else {
          tileGroups.push([[i, j]])
        }
      } else if (i > 0) {
        if (tile == board[i - 1][j]) {
          tileGroups.forEach((tileGroup) => {
            tileGroup.forEach(([i2, j2]) => {
              if (i2 == i - 1 && j2 == j) {
                tileGroup.push([i, j])
              }
            })
          })
        } else {
          tileGroups.push([[i, j]])
        }
      } else if (j > 0) {
        if (tile == board[i][j - 1]) {
          tileGroups.forEach((tileGroup) => {
            tileGroup.forEach(([i2, j2]) => {
              if (i2 == i && j2 == j - 1) {
                tileGroup.push([i, j])
              }
            })
          })
        } else {
          tileGroups.push([[i, j]])
        }
      } else {
        tileGroups.push([[i, j]])
      }
    })
  })

  return tileGroups
}
