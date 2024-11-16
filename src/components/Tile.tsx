const getTileColor = (tile: string) => {
  switch (tile) {
    case 'p':
      return 'fill-pink-500 rounded-full'
    case 'o':
      return 'fill-amber-500'
    case 'b':
      return 'fill-blue-500'
    case 'g':
      return 'fill-green-500'
  }
}

const getTileShape = (tile: string) => {
  switch (tile) {
    case 'p':
      return <circle cx="12" cy="12" r="10" />
    case 'o':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 2 L 18 2 L 22 22 L 6 22 Z"
        />
      )
    case 'b':
      return <rect x="2" y="2" width="20" height="20" />
    case 'g':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 12 L 6 2 L 22 2 L 18 12 L 22 22 L 6 22 Z"
        />
      )
  }
}

type TileProps = {
  tile: string
}

export const Tile: React.FC<TileProps> = ({ tile }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="none"
    strokeWidth={1.5}
    className={getTileColor(tile)}
    viewBox="0 0 24 24"
  >
    {getTileShape(tile)}
  </svg>
)
