import { Header } from 'components/header'
import { useEffect } from 'react'
import { checkLogin } from 'utils/Auth'

export default function Promo() {

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <>
      <Header title="Analytics - Promo" />
      <div className="grid h-screen place-items-center">
        <h1>Analytics Promo</h1>
      </div>
    </>
  )
}