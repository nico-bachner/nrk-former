import { IconProps } from '@/types'
import { cn } from '@/utils/cn'

export const CircleIcon: React.FC<IconProps> = ({
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
    <circle cx="12" cy="12" r="10" />
  </svg>
)
