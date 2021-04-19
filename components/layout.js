import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'

import { GlassDefault } from 'components/glassDefault'
import { BiHomeAlt } from 'react-icons/bi'
import { SiGoogleanalytics } from 'react-icons/si'
import { FiBox, FiTruck, FiSettings } from 'react-icons/fi'
import React from 'react'

export default function Layout({ title, children }) {
  return (
    <div className="flex">
      <SideBar />
      {/* Discard Save Button on Top Menu */}
      <main className="p-6">
        {/* <GlassDefault className="top-0 md:left-[256px] left-0 right-0 h-20 rounded-none">
          <div className="flex items-center justify-between p-4">
            <p className="w400">Unsaved product</p>
            <div className="mr-4 space-x-4">
              <button className="px-4 py-2 uppercase text-N800 bg-N100">discard</button>
              <button className="px-6 py-2 uppercase bg-G400 text-N0">save</button>
            </div>
          </div>
        </GlassDefault> */}
        {children}
      </main>
    </div >
  );
}

// Sidebar
const SideBar = () => {
  const router = useRouter()

  return (
    <GlassDefault className="relative w-64 h-screen rounded-none">
      {/* Logo */}
      <h5 className="mt-8 text-center bg-Y400">Logo</h5>
      {/* Main Menu */}
      <div className="mt-20 space-y-5 text-N0">
        <ActiveLink href="/">
          <div className={`flex items-center justify-start w-full pl-14 cursor-pointer space-x-7 ${router.pathname === "/" ? "text-P100" : ""}`}>
            <BiHomeAlt className="w-6 h-6" />
            <p className={`w400 ${router.pathname === "/" ? "text-P100" : ""}`}>Home</p>
          </div>
        </ActiveLink>
        <ActiveLink href="/">
          <div className="flex items-center justify-start cursor-pointer pl-14 space-x-7">
            <SiGoogleanalytics className="w-6 h-6" />
            <p className="w400">Analytics</p>
          </div>
        </ActiveLink>
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                as="div"
                className={`focus:outline-none flex items-center justify-start pl-14 cursor-pointer space-x-7 ${open ? "text-P100" : ""}`}
              >
                <FiBox className="w-6 h-6" />
                <p className={`w400 ${open ? "text-P100" : ""}`}>Products</p>
              </Menu.Button>

              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items as="div" static className="mr-4 -mt-2 focus:outline-none">
                  <Menu.Item>
                    <ActiveLink href="/products/add-product">
                      <a
                        className={
                          `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === "/products/add-product" ? "bg-P900" : ""}`
                        }>
                        Add Product
                      </a>
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink href="/products/inventory">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === "/products/inventory" ? "bg-P900" : ""}`
                      }>
                        Inventory
                      </a>
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink href="/products/promo-codes">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === "/products/promo-codes" ? "bg-P900" : ""}`
                      }>
                        Promo Codes
                      </a>
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink href="/products/attributes">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === "/products/attributes" ? "bg-P900" : ""}`
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
        <div className="flex items-center justify-start pl-14 space-x-7">
          <FiTruck className="w-6 h-6" />
          <p className="w400">Orders</p>
        </div>

        {/* Settings */}
        <div className="absolute flex items-center justify-start pl-14 space-x-7 bottom-8">
          <FiSettings className="w-6 h-6" />
          <p className="w400">Settings</p>
        </div>
      </div>
    </GlassDefault >
  )
}

const ActiveLink = ({ href, children }) => {
  const router = useRouter()
  let className = children.props.className || ''

  if (router.pathname === 'href') {
    className = `${className} selected`
  }
  return (
    <Link href={href}>{React.cloneElement(children, { className })}</Link>
  )
}