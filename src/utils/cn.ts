export const cn = (...args: (string | null | undefined)[]) =>
  args.filter((arg) => typeof arg == 'string').join(' ')
