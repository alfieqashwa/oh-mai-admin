import { useState, Fragment } from 'react'
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi'

import { GlassHeader } from 'components/glassHeader';
import { Header } from 'components/header';
import { TitleWithBackButton } from 'components/titleWithBackButton';
import { LeaderBoardBorder, PaginationSummary } from 'components/analytics/summary';

export default function TopCustomer() {
  return (
    <div className="pr-12 pl-7">
      {/* Header? */}
      <Header title="Summary - Top Customer" />
      <GlassHeader title="top customer">
        <div className="flex space-x-4">
          <button className="px-5 py-2 uppercase bg-transparent border w250-m text-N0">export</button>
        </div>
      </GlassHeader>

      {/* Title */}
      <TitleWithBackButton path="/analytics/summary" title="top customer" />

      {/* Leaderboard Border */}
      <LeaderBoardBorder />

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
              placeholder="Search for a customer name"
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
              <th scope="col" className="py-4 pl-4 text-left capitalize w400 whitespace-nowrap">customer</th>
              <th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">orders made</th>
              <th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">average order value</th>
              <th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">items bought</th>
              <th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">gross sales</th>
              <th scope="col" className="px-6 py-4 text-right capitalize w400 whitespace-nowrap">net sales</th>
            </tr>
          </thead>

          {/* Table Content */}
          <tbody className="bg-N700 text-N0">
            {topCustomer.map(t => (
              <tr key={t.id}>
                <td className="py-4 text-center bg-N600 w400 whitespace-nowrap">{t.sn}</td>
                <td className="py-4 pl-4 text-left underline w400">
                  <Link href={`/analytics/summary/top-customer/${t.customer.toLowerCase().replace(/\s/g, '-')}`}>
                    <a>{t.customer}</a>
                  </Link>
                </td>
                <td className="py-4 text-right w400 whitespace-nowrap">{t.ordersMade}</td>
                <td className="py-4 text-right w400 whitespace-nowrap">${t.averageOrderValue.toFixed(2)}</td>
                <td className="py-4 text-right w400 whitespace-nowrap">{t.itemsBought}</td>
                <td className="py-4 text-right w400 whitespace-nowrap">${t.grossSales.toFixed(2)}</td>
                <th className="px-6 py-4 text-right capitalize w400 whitespace-nowrap">${t.netSales.toFixed(2)}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <PaginationSummary />

    </div>
  )
}

// Top Customer List Dummy Data
export const topCustomer = [
  { id: 1, sn: '1', customer: 'Fan Leng Leng', ordersMade: 100, averageOrderValue: 24.64, itemsBought: 90, grossSales: 150.00, netSales: 120.00 },
  { id: 2, sn: '2', customer: 'Mei You Yong', ordersMade: 24, averageOrderValue: 5.90, itemsBought: 67, grossSales: 150.00, netSales: 40.00 },
  { id: 3, sn: '3', customer: 'You Zong Xian', ordersMade: 2, averageOrderValue: 3.67, itemsBought: 35, grossSales: 150.00, netSales: 30.00 },
  { id: 4, sn: '4', customer: 'Wei He', ordersMade: 1, averageOrderValue: 15.30, itemsBought: 15, grossSales: 150.00, netSales: 0.05 },
]