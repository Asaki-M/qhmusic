interface SongProps {
  name: string
  author: string
  url: string
  groups: string[]
}

export const getRandom = (n: number, m: number) => {
  return Math.floor(Math.random() * (m - n + 1) + n)
}

export const getRandomList = (list: SongProps) => {

}
