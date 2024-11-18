import Link from 'next/link'

import { BOARDS } from '@/boards'

const Page = () => (
  <div className="mx-auto flex max-w-xs flex-col gap-2 px-4 py-8">
    {BOARDS.map(({ date }) => (
      <Link
        key={date}
        href={`/${date}`}
        className="rounded-lg bg-violet-700 px-4 py-2 text-center text-violet-100"
      >
        {new Date(date).toDateString()}
      </Link>
    ))}
  </div>
)

export default Page
