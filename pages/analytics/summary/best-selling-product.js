import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi'

import { Header } from 'components/header'
import { GlassHeader } from 'components/glassHeader'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export default function BestSellingProduct() {
  return (
    <div className="pr-12 pl-7">

      {/* Header? */}
      <Header title="Analytics - Summary - Best Selling Product" />
      <GlassHeader title="best selling product">
        <div className="flex space-x-4">
          <button className="px-5 py-2 uppercase bg-transparent border w250-m text-N0">export</button>
        </div>
      </GlassHeader>

      {/* Title */}
      <div className="flex items-center mt-20">
        <Link href="/analytics/summary">
          <a>
            <AiOutlineArrowLeft className="w-6 h-6 transition duration-1000 ease-in-out text-N0 hover:text-P400 hover:animate-bounce" />
          </a>
        </Link>
        <h3 className="ml-4 capitalize w700">best selling product</h3>
      </div>

      {/* Leaderboard Border */}
      <div className="flex items-center mt-5 space-x-5">
        <h4 className="capitalize w600">leaderboard</h4>
        <div className="w-full border border-N0 border-opacity-30"></div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <header className="flex items-center justify-between px-6 py-4 rounded-t bg-N200">
          <h2 className="w250 text-N900">sort by</h2>
          <div className="px-4">
            <select name="date-range" className="px-8 bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-N700 focus:outline-none">
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
          <div className="relative flex-1 w-full px-4">
            <FiSearch className="absolute w-6 h-6 top-3 left-8 text-N700" />
            <input
              type="text"
              name="search"
              placeholder="Search for a title or SKU"
              className="w-full px-12 py-3 bg-transparent border rounded border-N900"
            />
          </div>
          <div>
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button className={`bg-transparent focus:outline-none ${open ? "text-P400" : ""}`}>
                    <BsThreeDotsVertical className="w-6 h-6" />
                  </Menu.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-700"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className={`
                  ${!open ? "motion-safe:animate-bounce transition duration-700 ease-in-out" : ""}
                  absolute z-20 rounded shadow-xl bg-N0 right-2 top-10 focus:outline-none
                  `}
                    >
                      <Menu.Item
                        as="button"
                        // onClick={() => setIsOpen(true)}
                        className="flex items-center justify-between w-full px-4 py-2 space-x-16 transition duration-300 ease-in-out hover:bg-N200 bg-N0 whitespace-nowrap focus:outline-none"
                      >
                        <FiDownloadCloud className="w-6 h-6" />
                        <h4 className="w250 text-N900">export</h4>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </header>

        {/* Table Header */}
        <table className="md:min-w-full text-N0">
          <thead className="bg-N200 bg-opacity-30">
            <tr>
              <th scope="col" className="px-2 py-4 text-center capitalize w400 whitespace-nowrap">s/n</th>
              <th scope="col" className="w-1/6 py-4 pl-4 text-left capitalize w400 whitespace-nowrap">product title</th>
              <th scope="col" className="w-1/6 py-4 text-right capitalize w400 whitespace-nowrap">SKU</th>
              <th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">Items Sold</th>
              <th scope="col" className="w-1/6 py-4 text-right capitalize w400 whitespace-nowrap">net sales</th>
              <th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">orders</th>
              <th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">category</th>
              <th scope="col" className="p-4 text-center capitalize w400 whitespace-nowrap">status</th>
            </tr>
          </thead>

          {/* Table Content */}
          <tbody className="bg-N700 text-N0">
            {tableBody.map(t => (
              <tr key={t.id}>
                <td className="py-4 text-center bg-N600 w400 whitespace-nowrap">{t.sn}</td>
                <td className="w-1/6 py-4 pl-4 text-left underline w400">{t.productTitle}</td>
                <td className="w-1/6 py-4 text-right w400 whitespace-nowrap">{t.sku}</td>
                <td className="py-4 text-right w400 whitespace-nowrap">{t.itemsSold}</td>
                <td className="w-1/6 py-4 text-right w400 whitespace-nowrap">${t.netSales.toFixed(2)}</td>
                <td className="py-4 text-right underline w400 whitespace-nowrap">{t.orders}</td>
                <td className="w-8 py-4 pl-8 text-right w400">{t.category}</td>
                <td className="px-4 py-4 text-center w400 whitespace-nowrap">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  )
}

const Pagination = () => {
  const options = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
  ];

  return (
    <div className="block pt-20 pb-8 md:items-center md:justify-end md:flex">
      <nav className="flex items-center justify-center space-x-6 text-N0">
        <ChevronDoubleLeftIcon className="w-5 h-5" />
        <ChevronLeftIcon className="w-5 h-5" />
        <button className="px-2.5 text-sm border font-medium bg-P700 hover:bg-P700 transition duration-200 ease-in-out">1</button>
        <button className="px-2.5 text-sm border font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out">2</button>
        <button className="px-2.5 text-sm border font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out">3</button>
        <a className="px-2.5 py-1 text-sm border font-medium rounded bg-N800 hover:bg-P700">...</a>
        <button className="px-2 text-sm font-medium border bg-N800 hover:bg-P700">99</button>
        <ChevronRightIcon className="w-5 h-5" />
        <ChevronDoubleRightIcon className="w-5 h-5" />
      </nav>

      <div className="pr-10 mt-2 text-center lg:mt-0 lg:text-none lg:mx-6">
        <p className="w350 text-N450 whitespace-nowrap">Showing<span className="px-1.5 font-medium text-N0">1</span>to<span className="px-1.5 font-medium text-N0">4</span>of<span className="px-1.5 font-medium text-N0">60</span>products</p>
      </div>

      <div className="items-center hidden lg:flex whitespace-nowrap">
        <p className="px-2 w350 text-N200">Show</p>
        <select
          type="number"
          name="show"
          defaultValue={4}
          className="w-16 px-2 py-1 mx-2 rounded-md bg-N100">

          {options.map((o, i) => (
            <option key={i} value={o.value}>{o.label}</option>
          ))
          }

        </select>
        <p className="px-2 w350 text-N200">at a time</p>
      </div>
    </div >
  )
}

// Best Selling Product List Dummy Data
const tableBody = [
  { id: 1, sn: '1', productTitle: 'Zelta: Breath of the Wild', sku: '128SKXUM-CI', itemsSold: 100, netSales: 1000.00, orders: 10, category: 'Games', status: 'Active' },
  { id: 2, sn: '2', productTitle: 'Persona 5', sku: 'PERS9290S-XL', itemsSold: 24, netSales: 400.00, orders: 10, category: 'Games', status: 'Active' },
  { id: 3, sn: '3', productTitle: 'Play Station 5 Cyberpunk: 2077 Skin Wrap Edition', sku: 'PS829-SIMNXO', itemsSold: 2, netSales: 200.00, orders: 1, category: 'Games Accessories', status: 'Active' },
  { id: 4, sn: '4', productTitle: 'Back4Blood', sku: 'B4B12312490L', itemsSold: 2, netSales: 0.00, orders: 1, category: 'Games', status: 'Inactive' },
]