import { Game } from '@/game'

const Page = () => (
  <main className="flex flex-col gap-8 px-2 py-8">
    <h1 className="text-center text-3xl font-extrabold text-white">
      NRK Former
    </h1>

    <div className="mx-auto max-w-2xl">
      <Game />
    </div>
  </main>
)

export default Page
