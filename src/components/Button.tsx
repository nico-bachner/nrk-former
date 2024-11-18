import { IconProps } from '@/types/svg'

type ButtonProps = {
  label: string
  icon: React.FC<IconProps>
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex size-12 items-center justify-center rounded-full bg-violet-700"
  >
    <Icon className="stroke-violet-100" aria-label={label} />
  </button>
)
