import { customers } from 'dummy-data'

export default function handler(req, res) {
  res.status(200).json(customers)
}
