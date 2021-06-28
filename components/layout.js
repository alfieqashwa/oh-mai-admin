import React, { useEffect, useState } from 'react'
import { SideBar } from 'components/sidebar'
import { isTokenExist } from 'utils/Auth'

export default function Layout({ title, children }) {
  const [isLoggedin, setIsLoggedin] = useState(false)

  useEffect(() => {
    const tokenExist = isTokenExist()

    if (tokenExist) {
      setIsLoggedin(true)
    }
  }, [isLoggedin])

  return (
    <>
      {isLoggedin ? (<SideBar />) : (<></>)}
      <main className="md:ml-[252px]">
        {children}
      </main>
    </>
  )
}
