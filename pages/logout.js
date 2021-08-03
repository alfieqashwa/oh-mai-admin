import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { getClient } from 'lib/graphqlclient'
import { LOGOUT } from 'graphql/login'

export default function Logout() {
  const client = getClient()

  useEffect(() => {
    Cookies.remove('token')
    client.request(LOGOUT)
  }, [])

  return (
    <div className="flex p-grid p-align-center p-justify-center justify-center">
      Logout...
    </div>
  )
}
