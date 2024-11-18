import { IconProps } from '@/types/svg'
import { cn } from '@/utils/cn'

export const UndoIcon: React.FC<IconProps> = ({
  stroke = 'currentColor',
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={stroke}
    strokeWidth={1.5}
    className={cn('size-6', className)}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
)
