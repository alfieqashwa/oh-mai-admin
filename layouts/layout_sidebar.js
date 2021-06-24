import { SideBar } from 'components/sidebar'
import { useEffect, useState } from 'react';
import { isTokenExist } from 'utils/Auth';

export default function LayoutSidebar({ title, children }) {
  const [isLoggedin, setIsLoggedin] = useState(false)

  useEffect(() => {
    const tokenExist = isTokenExist()

    if (tokenExist) {
      setIsLoggedin(true)
    }
  }, [isLoggedin])

  return (
    <>
      <SideBar />
      <main className="md:ml-[252px]">
        {children}
      </main>
    </>
  );
}