import { customers } from 'dummy-data'

export default function handler({ query: { customer } }, res) {
  const f = customers.filter((c) => c.customer.toLowerCase().replace(/\s/g, "-") === customer)

  if (f.length > 0) {
    res.status(200).json(f[0])
  } else {
    res.status(404).json({ message: `User with customer: ${customer} not found.` })
  }
}
