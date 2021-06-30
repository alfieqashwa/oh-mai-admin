import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function Login() {
  useEffect(() => {
    Cookies.remove('token')
  }, [])

  return (
    <div className="flex p-grid p-align-center p-justify-center justify-center">
      Test code
    </div>
  )
}
