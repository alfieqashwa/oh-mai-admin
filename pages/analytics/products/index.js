import React, { useState, createContext, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi';

import { Header } from 'components/header';
import { DateRangeComparison, ShowProductSelect, ChartView, PaginationProducts, SwitchOnOff, ProductPerformanceCard } from 'components/analytics/products'
import { checkLogin } from 'utils/Auth';

export const DateRangeCtx = createContext(null)

export default function Products() {
  const [startCurrentDate, setStartCurrentDate] = useState(new Date("2021/01/01"))
  const [endCurrentDate, setEndCurrentDate] = useState(new Date())
  const [startPreviousDate, setStartPreviousDate] = useState(new Date("2020/01/01"))
  const [endPreviousDate, setEndPreviousDate] = useState(new Date("2020/12/31"))

  const storeDateRange = {
    startCurrent: [startCurrentDate, setStartCurrentDate],
    endCurrent: [endCurrentDate, setEndCurrentDate],
    startPrevious: [startPreviousDate, setStartPreviousDate],
    endPrevious: [endPreviousDate, setEndPreviousDate]
  }

  useEffect(() => {
    console.log('Check login')
    checkLogin()
  }, [])

  return (
    <div className="pb-4">
      <Header title="Analytics - Products" />
      <div className="my-8 ml-6 mr-12">
        {/* header */}
        <h2 className="w800">Analytics</h2>
        <div className="flex items-start justify-between w-full mt-5 space-x-0">
          <DateRangeCtx.Provider value={storeDateRange}>
            <DateRangeComparison />
          </DateRangeCtx.Provider>
          <ShowProductSelect />
        </div>
        {/* Leaderboard */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <h4 className="w600">Leaderboard</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        {/* Table */}
        <div className="mt-8">
          <header className="flex items-center justify-between px-6 py-4 rounded-t bg-N200">
            <h2 className="w250 text-N900">sort by</h2>
            <div className="px-4">
              <select name="date-range" className="px-10 bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-N700 focus:outline-none">
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
                <th scope="col" className="p-4 text-center capitalize w400 whitespace-nowrap">s/n</th>
                <th scope="col" className="p-4 text-left capitalize w400 whitespace-nowrap">product title</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">SKU</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">Items Sold</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">net sales</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">orders</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">category</th>
                <th scope="col" className="p-4 text-center capitalize w400 whitespace-nowrap">toggle chart</th>
              </tr>
            </thead>

            {/* Table Content */}
            <tbody className="bg-N700 text-N0">
              {tableBody.map(t => (
                <tr key={t.id} className="">
                  <td className="p-4 text-center bg-N600 w400 whitespace-nowrap">{t.sn}</td>
                  <td className="p-4 text-left underline w400">{t.productTitle}</td>
                  <td className="p-4 text-right w400 whitespace-nowrap">{t.sku}</td>
                  <td className="p-4 text-right w400 whitespace-nowrap">{t.itemsSold}</td>
                  <td className="p-4 text-right w400 whitespace-nowrap">${t.netSales.toFixed(2)}</td>
                  <td className="p-4 text-right underline w400">{t.orders}</td>
                  <td className="p-4 text-right w400">{t.category}</td>
                  <td
                    className="py-4 text-center x-4 w400 whitespace-nowrap">
                    <SwitchOnOff isEnabled={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <PaginationProducts />
        {/* Performance-border */}
        <div className="flex items-center justify-between mt-10 mb-4">
          <h4 className="w600">Performance</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        {/* Performance */}
        <ProductPerformanceCard />
        {/* Chart View */}
        <ChartView />
      </div>
    </div>
  )
}

// Best Selling Product List Dummy Data
const tableBody = [
  { id: 1, sn: '1', productTitle: 'Zelta: Breath of the Wild', sku: '128SKXUM-CI', itemsSold: 100, netSales: 1000.00, orders: 10, category: 'Games', status: true },
  { id: 2, sn: '2', productTitle: 'Persona 5', sku: 'PERS9290S-XL', itemsSold: 24, netSales: 400.00, orders: 10, category: 'Games', status: false },
  { id: 3, sn: '3', productTitle: 'Play Station 5 Cyberpunk: 2077 Skin Wrap Edition', sku: 'PS829-SIMNXO', itemsSold: 2, netSales: 200.00, orders: 1, category: 'Games Accessories', status: false },
  { id: 4, sn: '4', productTitle: 'Back4Blood', sku: 'B4B12312490L', itemsSold: 2, netSales: 0.00, orders: 1, category: 'Games', status: true },
]