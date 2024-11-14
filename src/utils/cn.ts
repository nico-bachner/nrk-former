export const cn = (...args: (string | null)[]) =>
  args.filter((arg) => typeof arg == 'string').join(' ')
