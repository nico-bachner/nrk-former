import { IconProps } from '@/types/svg'
import { cn } from '@/utils/cn'

export const SquareIcon: React.FC<IconProps> = ({
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
    <rect x="2" y="2" width="20" height="20" />
  </svg>
)
