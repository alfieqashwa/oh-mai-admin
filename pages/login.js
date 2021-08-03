import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { login } from 'services/api/user'
import { isTokenExist } from 'utils/Auth'
import LayoutNoSidebar from 'layouts/layout_no_sidebar'
import Button from 'components/widgets/dialog/Button'
export default function Login() {
  // useUser({ redirectTo: "/", redirectIfFound: true });
  // eslint-disable-next-line no-unused-vars
  const [wrongField, setWrongField] = useState(false)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  // const router = useRouter();

  async function loginMutation(email, password) {
    // console.log('email', email)
    // console.log('password', password)

    try {
      setLoading(true)
      const result = await login(email, password)
      // console.log('login response', result)
      Cookies.set('token', result.login.token)

      if (result.login.token) {
        Router.reload(window.location.pathname)
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.log('login failed', error)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target

    setData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  function onLoginClicked() {
    loginMutation(data.email, data.password)
  }

  useEffect(() => {
    if (isTokenExist()) {
      setLoading(true)
      Router.push('/analytics/summary')
    } else {
      // Router.reload(window.location.pathname)
    }
  }, [])

  useEffect(() => {
    // console.log('isi data', data)
  }, [data])

  return (
    <div
      className="flex p-grid p-align-center p-justify-center justify-center"
      style={{ height: 'calc(100vh - 100px)' }}
    >
      {loading
        ? (
        <div className="text-N200">Please wait...</div>
          )
        : (
        <div className="w-1/3 self-center flex-col">
          <div className="text-N200 py-4 text-4xl font-semibold text-center">Admin Login</div>
          <div className="glass mb-10 p-10">
            <div className="p-field mb-4">
              <input
                className="w-full mt-2 rounded-md text-N200 bg-opacity-20 bg-N200 placeholder-N300 border-N200 border-opacity-20"
                type="text"
                id="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </div>
            <div className="p-field mb-8">
              <input
                className="w-full mt-2 rounded-md text-N200 bg-opacity-20 bg-N200 placeholder-N300 border-N200 border-opacity-20"
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <Button
              onClick={onLoginClicked}
              className="text-md text-N0 bg-secondary hover:bg-secondary-light w-full">Login</Button>
            {wrongField && <p className="p-invalid">Wrong email/password.</p>}
          </div>
        </div>
          )}
    </div>
  )
}

Login.Layout = LayoutNoSidebar
