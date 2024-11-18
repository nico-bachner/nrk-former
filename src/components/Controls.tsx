import { cn } from '@/utils/cn'

type ControlsProps = {
  children: React.ReactNode
  className?: string
}

export const Controls: React.FC<ControlsProps> = ({ children, className }) => (
  <div className={cn('m-2 rounded-full bg-violet-900 p-2', className)}>
    {children}
  </div>
)
