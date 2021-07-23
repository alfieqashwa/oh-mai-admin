import { useState, useEffect } from 'react'
import { getClient } from 'lib/graphqlclient'

export default function useFetch(query) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const client = getClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await client.request(query)

        setData(res)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [query])

  return { loading, error, data }
}
