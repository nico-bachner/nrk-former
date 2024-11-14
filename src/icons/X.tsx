import { cn } from '@/utils/cn'

type IconProps = React.SVGProps<SVGSVGElement>

export const XIcon: React.FC<IconProps> = ({
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
      d="M4 20 L 20 4 M 4 4 L 20 20"
    />
  </svg>
)
