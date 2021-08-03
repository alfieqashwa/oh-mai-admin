import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Disclosure, Transition } from '@headlessui/react'

import { ActiveLink } from 'components/activeLink'
import { GlassDefault } from 'components/glassDefault'
import { SiGoogleanalytics } from 'react-icons/si'
import { FiBox, FiTruck, FiSettings, FiLogOut, FiPower } from 'react-icons/fi'

export const SideBar = () => {
  const router = useRouter()

  return (
    <GlassDefault className="hidden md:block fixed top-0 left-0 min-h-screen rounded-none w-[252px]">
      {/* Logo */}
      <div className="mt-4 ml-14">
        <img
          className="w-24"
          src="/logo.png"
          alt="OhMai-logo"
        />
      </div>

      {/* Home */}
      <div className="mt-16 space-y-5 text-N0">
        {/* Analytics */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
              >
                <Link href="/analytics/summary">
                  <a
                    className={`focus:outline-none flex items-center justify-start pl-16 cursor-pointer space-x-6 ${open ? 'text-P100' : ''}`}
                  >
                    <SiGoogleanalytics className="w-6 h-6" />
                    <p className={`w400 ${open ? 'text-P100' : ''}`}>Analytics</p>
                  </a>
                </Link>
              </Disclosure.Button>

              <Transition
                show={open}
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel as="div" static className="mr-5 -mt-2 focus:outline-none">
                  <div>
                    <ActiveLink href="/analytics/summary">
                      <a
                        className={
                          `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/analytics/summary' ? 'bg-P900' : ''}`
                        }>
                        Summary
                      </a>
                    </ActiveLink>
                  </div>
                  <div>
                    <ActiveLink href="/analytics/orders">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/analytics/orders' ? 'bg-P900' : ''}`
                      }>
                        Orders
                      </a>
                    </ActiveLink>
                  </div>
                  <div>
                    <ActiveLink href="/analytics/products">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/analytics/products' ? 'bg-P900' : ''}`
                      }>
                        Products
                      </a>
                    </ActiveLink>
                  </div>
                  <div>
                    <ActiveLink href="/analytics/kol">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/analytics/kol' ? 'bg-P900' : ''}`
                      }>
                        KOL
                      </a>
                    </ActiveLink>
                  </div>
                  <div>
                    <ActiveLink href="/analytics/customer">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/analytics/customer' ? 'bg-P900' : ''}`
                      }>
                        Customer
                      </a>
                    </ActiveLink>
                  </div>
                  {/* <div>
                    <ActiveLink href="/analytics/promo">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/analytics/promo' ? 'bg-P900' : ''}`
                      }>
                        Promo
                      </a>
                    </ActiveLink>
                  </div> */}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        {/* Products */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
              >
                <Link href="/products/add-product">
                  <a
                    className={`focus:outline-none flex items-center justify-start pl-16 cursor-pointer space-x-6 ${open ? 'text-P100' : ''}`}
                  >
                    <FiBox className="w-6 h-6" />
                    <p className={`w400 ${open ? 'text-P100' : ''}`}>Products</p>
                  </a>
                </Link>
              </Disclosure.Button>

              <Transition
                show={open}
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel as="div" static className="mr-5 -mt-2 focus:outline-none">
                  <div>
                    <ActiveLink href="/products/add-product">
                      <a
                        className={
                          `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/products/add-product' ? 'bg-P900' : ''}`
                        }>
                        Add Product
                      </a>
                    </ActiveLink>
                  </div>
                  <div>
                    <ActiveLink href="/products/inventory">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/products/inventory' ? 'bg-P900' : ''}`
                      }>
                        Inventory
                      </a>
                    </ActiveLink>
                  </div>
                  {/* <div>
                    <ActiveLink href="/products/promo-code">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/products/promo-code' ? 'bg-P900' : ''}`
                      }>
                        Promo Codes
                      </a>
                    </ActiveLink>
                  </div> */}
                  {/* <div>
                    <ActiveLink href="/products/attributes">
                      <a className={
                        `block w-full py-2 pl-28 transition duration-200 ease-in-out rounded-r-md w350 ${router.pathname === '/products/attributes' ? 'bg-P900' : ''}`
                      }>
                        Attributes
                      </a>
                    </ActiveLink>
                  </div> */}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        {/* Orders */}
        <ActiveLink href="/orders">
          <div className={`flex items-center justify-start cursor-pointer pl-16 space-x-6 ${router.pathname === '/orders' ? 'text-P100' : ''}`}>
            <FiTruck className="w-6 h-6" />
            <p className={`w400 ${router.pathname === '/orders' ? 'text-P100' : ''}`}>Orders</p>
          </div>
        </ActiveLink>

        {/* Settings */}
        <div className="flex items-center justify-start pl-16 space-x-6 pt-8">
          <FiPower className="w-6 h-6" />
          <p className="w400">Logout</p>
        </div>
      </div>
    </GlassDefault>
  )
}
