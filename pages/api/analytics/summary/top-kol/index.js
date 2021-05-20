import { topKol } from 'dummy-data'
export default function handler(_req, res) {
  res.status(200).json(topKol)
}