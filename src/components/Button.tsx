import { IconProps } from '@/types'

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
  <div className="flex flex-col items-center gap-2">
    <p className="font-bold uppercase text-purple-300">{label}</p>

    <button
      onClick={onClick}
      className="flex size-12 items-center justify-center rounded-full bg-purple-700"
    >
      <Icon className="text-purple-100" />
    </button>
  </div>
)
