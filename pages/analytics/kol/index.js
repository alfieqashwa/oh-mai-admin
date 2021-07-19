import React, { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi'
import { moneyFormat } from 'utils/money-format'

import { Header } from 'components/header'
import {
  SwitchOnOff,
  PaginationKol,
  DateRangeSelect,
  KolLeaderboard,
  KolPerformanceCard,
  ChartView,
} from 'components/analytics/kol'
import { checkLogin } from 'utils/Auth'

import { GET_ANALYTIC_KOL_TABLE } from 'graphql/kol'
import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'

export default function Kol() {
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])
  const [status, setStatus] = useState(false)

  useEffect(() => {
    checkLogin()
  }, [])

  const { data: dataGetAnalyticKolTable, error: errorGetAnalyticKolTable } =
    useSWR(GET_ANALYTIC_KOL_TABLE)

  if (errorGetAnalyticKolTable)
    return <ErrorStatus message={errorGetAnalyticKolTable.message} />
  if (!dataGetAnalyticKolTable) return <LoadingStatus />

  const { getAnalyticKolTable } = dataGetAnalyticKolTable

  return (
    <div className="pb-4">
      <Header title="Analytics - KOL" />
      <div className="my-8 ml-6 mr-12">
        {/* header */}
        <h2 className="w800">KOL Analytics</h2>
        {/* second row */}

        {/* Leaderboard */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <h4 className="w600">Leaderboard</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>

        {/* Leaderboard's Cards */}
        <KolLeaderboard />

        <div className="mt-8">
          <header className="flex items-center justify-between px-6 py-4 rounded-t bg-N200">
            <h2 className="w250 text-N900">sort by</h2>
            <div className="px-4">
              <select
                name="date-range"
                className="px-10 bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-N700 focus:outline-none"
              >
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
                    <Menu.Button
                      className={`bg-transparent focus:outline-none ${
                        open ? 'text-P400' : ''
                      }`}
                    >
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
                  ${
                    !open
                      ? 'motion-safe:animate-bounce transition duration-700 ease-in-out'
                      : ''
                  }
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
                <th
                  scope="col"
                  className="p-4 text-center capitalize w400 whitespace-nowrap"
                >
                  s/n
                </th>
                <th
                  scope="col"
                  className="p-4 text-left capitalize w400 whitespace-nowrap"
                >
                  KOL
                </th>
                <th
                  scope="col"
                  className="p-4 text-right capitalize w400 whitespace-nowrap"
                >
                  Items Sold
                </th>
                <th
                  scope="col"
                  className="p-4 text-right capitalize w400 whitespace-nowrap"
                >
                  net sales
                </th>
                <th
                  scope="col"
                  className="p-4 text-right capitalize w400 whitespace-nowrap"
                >
                  orders
                </th>
                <th
                  scope="col"
                  className="p-4 text-right capitalize w400 whitespace-nowrap"
                >
                  total commissions
                </th>
                <th
                  scope="col"
                  className="p-4 text-center capitalize w400 whitespace-nowrap"
                >
                  toggle chart
                </th>
              </tr>
            </thead>

            {/* Table Content */}
            <tbody className="bg-N700 text-N0">
              {getAnalyticKolTable.map((t) => (
                <tr key={t.kol_id} className="">
                  <td className="p-4 text-center bg-N600 w400 whitespace-nowrap">
                    {t.sn}
                  </td>
                  <td className="p-4 text-left underline capitalize w400 whitespace-nowrap">
                    {t.kol_name}
                  </td>
                  <td className="p-4 text-right w400 whitespace-nowrap">
                    {t.item_sold}
                  </td>
                  <td className="p-4 text-right w400 whitespace-nowrap">
                    ${moneyFormat.format(t.net_sales)}
                  </td>
                  <td className="p-4 text-right underline w400">{t.orders}</td>
                  <td className="p-4 text-right w400">
                    {t.total_commission ? t.total_commission.toFixed(2) : ''}
                  </td>
                  <td className="py-4 text-center x-4 w400 whitespace-nowrap">
                    <SwitchOnOff isEnabled={status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationKol />
        </div>
        {/* Performance-border */}
        <div className="flex items-center justify-between mt-10 mb-4">
          <h4 className="w600 whitespace-nowrap">KOL Performance</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        <DateRangeSelect
          selectedCurrent={selectedCurrent}
          setSelectedCurrent={setSelectedCurrent}
          selectedPrevious={selectedPrevious}
          setSelectedPrevious={setSelectedPrevious}
        />
        <div className="mt-7">
          <KolPerformanceCard />
          <ChartView />
        </div>
      </div>
    </div>
  )
}

const leaderBoardCards = [
  {
    url: '/analytics/kol/top-sales-from-kol',
    category: 'top sales from KOL',
    product: 'charlene yue',
    totalOrdersValue: '135',
    netSalesValue: '10,000.00',
  },
  {
    url: '/analytics/kol/most-orders-from-kol',
    category: 'most orders from KOL',
    product: 'ruden',
    totalOrdersValue: '249',
    netSalesValue: '7,398.15',
  },
  {
    url: '/analytics/kol/most-items-sold-from-kol',
    category: 'most items sold from KOL',
    product: 'charlene yue',
    totalOrdersValue: '149',
    netSalesValue: '10,000.00',
  },
]

// const tableBody = [
//   {
//     id: 1,
//     sn: '1',
//     kol: 'charlene yue',
//     itemsSold: 100,
//     netSales: 1000.0,
//     orders: 10,
//     totalCommissions: 120,
//     status: true,
//   },
//   {
//     id: 2,
//     sn: '2',
//     kol: 'lice wang',
//     itemsSold: 24,
//     netSales: 400.0,
//     orders: 10,
//     totalCommissions: 40,
//     status: false,
//   },
//   {
//     id: 3,
//     sn: '3',
//     kol: 'sky game',
//     itemsSold: 2,
//     netSales: 200.0,
//     orders: 1,
//     totalCommissions: 30,
//     status: false,
//   },
//   {
//     id: 4,
//     sn: '4',
//     kol: 'molly',
//     itemsSold: 1,
//     netSales: 10.0,
//     orders: 1,
//     totalCommissions: 0.05,
//     status: false,
//   },
// ]

const dates = [
  { name: 'Current Year (Jan 1 - Dec 31, 2021)' },
  { name: 'Previous Year (Jan 1 - Dec 31, 2020)' },
]
