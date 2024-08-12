function random(to: number): number {
  return Math.floor(Math.random() * (to + 1))
}

export function shuffleArr<T>(arr: readonly T[]): T[] {
  const copy = arr.slice()

  const leng = arr.length
  copy.forEach((item, i) => {
    const j = random(leng)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  })
  return copy
}