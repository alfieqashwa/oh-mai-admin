import { GraphQLClient } from 'graphql-request'
import Cookies from 'js-cookie'

/** will be obsolate and used only by login */
export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
  credentials: 'include',
  headers: {
  }
})

/** will be obsolate */
export function setHeader(val) {
  if (val) {
    client.setHeader('authorization', 'Bearer ' + val)
  }
}

export const getClient = () => {
  const strToken = Cookies.get('token')
  const gqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
    credentials: 'include',
    headers: {
    }
  })

  if (strToken) {
    gqlClient.setHeader('Authorization', 'Bearer ' + strToken)
  }

  return gqlClient
}
