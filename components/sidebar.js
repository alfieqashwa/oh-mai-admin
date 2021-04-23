import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'

import { ActiveLink } from 'components/activeLink'
import { GlassDefault } from 'components/glassDefault'
import { BiHomeAlt } from 'react-icons/bi'
import { SiGoogleanalytics } from 'react-icons/si'
import { FiBox, FiTruck, FiSettings } from 'react-icons/fi'

export const SideBar = () => {
  const router = useRouter()

  return (
    <GlassDefault className="hidden md:block fixed top-0 left-0 h-screen rounded-none w-[252px]">
      {/* Logo */}
      <div className="mt-4 ml-14">
        <img
          className="w-24"
          src="/logo.png"
          alt="OhMai-logo"
        />
      </div>
      {/* Main Menu */}
      <div className="mt-16 space-y-5 text-N0">
        <ActiveLink href="/">
          <div className={`flex items-center justify-start w-full pl-12 cursor-pointer space-x-6 ${router.pathname === "/" ? "text-P100" : ""}`}>
            <BiHomeAlt className="w-6 h-6" />
            <p className={`w400 ${router.pathname === "/" ? "text-P100" : ""}`}>Home</p>
          </div>
        </ActiveLink>
        <ActiveLink href="/analytics">
          <div className={`flex items-center justify-start cursor-pointer pl-12 space-x-6 ${router.pathname === "/analytics" ? "text-P100" : ""}`}>
            <SiGoogleanalytics className="w-6 h-6" />
            <p className={`w400 ${router.pathname === "/analytics" ? "text-P100" : ""}`}>Analytics</p>
          </div>
        </ActiveLink>

        {/* Products */}
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                as="div"
                className={`focus:outline-none flex items-center justify-start pl-12 cursor-pointer space-x-6 ${open ? "text-P100" : ""}`}
              >
                <FiBox className="w-6 h-6" />
                <p className={`w400 ${open ? "text-P100" : ""}`}>Products</p>
              </Menu.Button>

              <Transition
                show={open}
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items as="div" static className="mr-5 -mt-2 focus:outline-none">
                  <Menu.Item>
                    <ActiveLink href="/products/add-product">
                      <a
                        className={
                          `block w-full py-2 pl-24 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === "/products/add-product" ? "bg-P900" : ""}`
                        }>
                        Add Product
                      </a>
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink href="/products/inventory">
                      <a className={
                        `block w-full py-2 pl-24 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === "/products/inventory" ? "bg-P900" : ""}`
                      }>
                        Inventory
                      </a>
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink href="/products/promo-code">
                      <a className={
                        `block w-full py-2 pl-24 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === "/products/promo-code" ? "bg-P900" : ""}`
                      }>
                        Promo Codes
                      </a>
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink href="/products/attributes">
                      <a className={
                        `block w-full py-2 pl-24 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === "/products/attributes" ? "bg-P900" : ""}`
                      }>
                        Attributes
                      </a>
                    </ActiveLink>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>

        {/* Orders */}
        <ActiveLink href="/orders">
          <div className={`flex items-center justify-start cursor-pointer pl-12 space-x-6 ${router.pathname === "/orders" ? "text-P100" : ""}`}>
            <FiTruck className="w-6 h-6" />
            <p className={`w400 ${router.pathname === "/orders" ? "text-P100" : ""}`}>Orders</p>
          </div>
        </ActiveLink>

        {/* Settings */}
        <div className="absolute flex items-center justify-start pl-12 space-x-6 bottom-12">
          <FiSettings className="w-6 h-6" />
          <p className="w400">Settings</p>
        </div>
      </div>
    </GlassDefault >
  )
}
