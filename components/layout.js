import { SideBar } from 'components/sidebar'
import { useEffect, useState } from 'react';
import { isTokenExist } from 'utils/Auth';

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
      {isLoggedin? (<SideBar />) : (<></>)}
      <main className="md:ml-[252px]">
        {children}
      </main>
    </>
  );
}