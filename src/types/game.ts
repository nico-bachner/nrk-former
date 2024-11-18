export type Board = string[][]

export type Coordinate = [number, number]

export type TileGroup = {
  id: string
  tiles: Coordinate[]
  score: number
}

export type Hint = {
  moves: TileGroup[]
  score: number
}

export type GameState = {
  boardHistory: Board[]
  stepCount: number
  hint: TileGroup | undefined
}
