export function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
