// const WEIGHT = 1.1

// const log = (n: number, base = Math.E) => Math.log(n) / Math.log(base)

// export const incrementScore = (score = 0): number =>
//   WEIGHT ^ log(score + 1, WEIGHT)

// export const decrementScore = (score = 0): number =>
//   WEIGHT ^ log(score - 1, WEIGHT)

// export const addScores = (...scores: number[]): number =>
//   scores.reduce(
//     (prev, curr) => WEIGHT ^ (log(prev, WEIGHT) + log(curr, WEIGHT)),
//   )

export const incrementScore = (score = 0): number => score + 1
export const decrementScore = (score = 0): number => score - 1
export const addScores = (...scores: number[]): number =>
  scores.reduce((prev, curr) => prev + curr)
