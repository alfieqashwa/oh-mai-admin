import { Header } from 'components/header'
import { useEffect } from 'react'
import { checkLogin } from 'utils/Auth'

export default function PromoCodes() {
  
  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <>
      <Header title="Products - Promo Codes" />
      <h3>Promo Codes</h3>
    </>
  )
}