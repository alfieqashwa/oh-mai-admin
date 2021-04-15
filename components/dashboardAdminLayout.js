import Head from "next/head"
import Link from 'next/link'

import { GlassDefault } from 'components/glassDefault'
import { BiHomeAlt } from 'react-icons/bi'
import { SiGoogleanalytics } from 'react-icons/si'
import { FiBox, FiTruck, FiSettings } from 'react-icons/fi'

export default function DashboardLayout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="w-screen min-h-screen bg-center bg-cover bg-N800"
        style={{ backgroundImage: "url(/mainbg.png)" }}
      > */}
      {/* <div> */}
      <SideBar />
      {/* Discard Save Button on Top Menu */}
      <GlassDefault className="fixed z-20 top-0 md:left-[256px] left-0 right-0 h-20 rounded-none">
        <div className="flex items-center justify-between p-4">
          <p className="w400">Unsaved product</p>
          <div className="mr-4 space-x-4">
            <button className="px-4 py-2 uppercase text-N800 bg-N100">discard</button>
            <button className="px-6 py-2 uppercase bg-G400 text-N0">save</button>
          </div>
        </div>
      </GlassDefault>
      <main className="mt-20 ml-0 md:ml-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

// Fixed Sidebar
const SideBar = () =>
  <GlassDefault className="fixed top-0 bottom-0 left-0 hidden w-64 rounded-none md:block">
    {/* Logo */}
    <h5 className="mt-8 text-center bg-Y400">Logo</h5>
    {/* Main Menu */}
    <div className="mt-20 space-y-5 text-N0">
      <Link href="/">
        <div className="flex items-center justify-start w-full pl-10 space-x-7"><BiHomeAlt className="w-6 h-6" /><p className="w400">Home</p></div>
      </Link>
      <div className="flex items-center justify-start pl-10 space-x-7"><SiGoogleanalytics className="w-6 h-6" /><p className="w400">Analytics</p></div>
      <div className="flex items-center justify-start pl-10 space-x-7 text-P100">
        <FiBox className="w-6 h-6" />
        <p className="w400 text-P100">Products</p>
      </div>
      <div className="mr-4 space-y-2 text-left">
        <Link href="/addproduct">
          <a>
            <p className="w-full py-2 pl-24 transition duration-200 ease-in-out rounded-r-md hover:bg-P900 w350">Add Product</p>
          </a>
        </Link>
        <p className="w-full py-2 pl-24 transition duration-200 ease-in-out rounded-r-md hover:bg-P900 w350">Inventory</p>
        <p className="w-full py-2 pl-24 transition duration-200 ease-in-out rounded-r-md hover:bg-P900 w350">Promo Codes</p>
      </div>
      <div className="flex items-center justify-start pl-10 space-x-7"><FiTruck className="w-6 h-6" /><p className="w400">Orders</p></div>
      {/* Settings */}
      <div className="fixed flex items-center justify-start pl-10 space-x-7 bottom-8">
        <FiSettings className="w-6 h-6" />
        <p className="w400">Settings</p>
      </div>
    </div>
  </GlassDefault>