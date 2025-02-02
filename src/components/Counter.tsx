type CounterProps = {
  label: string
  children: React.ReactNode
}

export const Counter: React.FC<CounterProps> = ({ label, children }) => (
  <div className="flex flex-col items-center gap-2">
    <p className="font-bold uppercase text-violet-200">{label}</p>

    <div className="flex h-12 w-16 items-center justify-center rounded-md bg-violet-950">
      <p className="text-xl font-bold text-violet-200">{children}</p>
    </div>
  </div>
)
