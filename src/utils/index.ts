export function getBlockNum(id: string): number {
  return parseInt(id.slice(0, 10))
}