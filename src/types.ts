export type Board = string[][]
export type Coordinate = [number, number]
export type Hint = {
  tileGroup: Coordinate[]
  score: number
}
export type IconProps = React.SVGProps<SVGSVGElement>
