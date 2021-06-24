import { Header } from 'components/header'
import { useEffect } from 'react'
import { checkLogin } from 'utils/Auth'

export default function Attributes() {

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <>
      <Header title="Attributes" />
      <h3>Attributes</h3>
    </>
  )
}