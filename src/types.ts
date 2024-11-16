export type Board = string[][]
export type Coordinate = [number, number]
export type TileGroup = {
  id: string
  tiles: Coordinate[]
  score: number
}
export type IconProps = React.SVGProps<SVGSVGElement>
