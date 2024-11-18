import { Tile } from '@/components/Tile'
import { SquareIcon } from '@/icons/Square'
import { Coordinate, TileGroup } from '@/types/game'

type BoardProps = {
  board: string[][]
  hint?: TileGroup
  onTileClick: (coordinate: Coordinate) => void
}

export const Board: React.FC<BoardProps> = ({ board, hint, onTileClick }) => (
  <div className="flex">
    {board.map((column, i) => (
      <div key={i} className="flex flex-1 flex-col-reverse">
        {column.map((tile, j) => {
          if (tile == '') {
            return <div key={j} className="aspect-square" />
          }

          return (
            <button
              key={j}
              onClick={() => {
                onTileClick([i, j])
              }}
              style={{ gridRow: 9 - j, gridColumn: i + 1 }}
              className="relative"
            >
              <Tile tile={tile} />
              {hint && hint.tiles.some(([i2, j2]) => i2 == i && j2 == j) && (
                <SquareIcon className="absolute inset-0 h-full w-full text-white" />
              )}
            </button>
          )
        })}
      </div>
    ))}
  </div>
)
