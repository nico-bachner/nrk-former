import { Game } from '@/game'

const Page = () => (
  <main className="flex flex-col gap-8 px-6 py-8">
    <h1 className="text-center text-3xl font-extrabold text-white">
      NRK Former
    </h1>

    <div className="mx-auto w-min">
      <Game />
    </div>
  </main>
)

export default Page
