import { topKol } from 'dummy-data'

export default function handler({ query: { kol } }, res) {
  const f = topKol.filter((k) => k.kol.toLowerCase().replace(/\s/g, "-") === kol)

  if (f.length > 0) {
    res.status(200).json(f[0])
  } else {
    res.status(404).json({ message: `User with kol: ${kol} not found.` })
  }
}