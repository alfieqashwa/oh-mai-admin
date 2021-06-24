import { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { SiGoogleanalytics } from 'react-icons/si'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi'

import { Header } from 'components/header'
import { SwitchOnOff, PaginationKol, DateRangeSelect, KolPerformanceCard, ChartView } from 'components/analytics/kol'
import { checkLogin } from 'utils/Auth'

export default function Kol() {
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])

  useEffect(() => {
    checkLogin()
  }, [])

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
        <div className="grid grid-cols-3">
          {leaderBoardCards.map((card, i) => (
            <div key={i} className="relative px-5 bg-[#E0E0F24D] h-52 bg-opacity-30 border-[1px] border-opacity-60 border-[#A0A0AD99]">
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button className={`absolute bg-transparent top-4 right-3 focus:outline-none ${open ? "text-P400" : "text-N0"}`}>
                      <BsThreeDotsVertical className="w-6 h-6" />
                    </Menu.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items static className="absolute shadow-xl top-16 right-4 focus:outline-none">
                        <Link href={card.url}>
                          <a>
                            <Menu.Item as="button" className="flex items-center justify-between w-full px-4 py-2 transition duration-300 ease-in-out rounded focus:outline-none bg-N0 hover:bg-N300">
                              <SiGoogleanalytics className="w-6 h-6" />
                              <h4 className="pl-8 w250 text-N900 whitespace-nowrap">view leaderboard</h4>
                            </Menu.Item>
                          </a>
                        </Link>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>

              <h5 className="mt-5 text-opacity-50 w250 text-N0">{card.category}</h5>
              <h4 className="mt-3 capitalize w600 text-N0">{card.product}</h4>
              <div className="flex justify-start mt-3 space-x-3">
                <div className="w-40">
                  <p className="text-opacity-50 w400 text-N0">Total Orders</p>
                  <p className="w400 text-N0">{card.totalOrdersValue}</p>
                </div>
                <div className="w-40">
                  <p className="text-opacity-50 w400 text-N0">Net Sales</p>
                  <p className="w400 text-N0">${card.netSalesValue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

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
                <th scope="col" className="p-4 text-left capitalize w400 whitespace-nowrap">KOL</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">Items Sold</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">net sales</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">orders</th>
                <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">total commissions</th>
                <th scope="col" className="p-4 text-center capitalize w400 whitespace-nowrap">toggle chart</th>
              </tr>
            </thead>

            {/* Table Content */}
            <tbody className="bg-N700 text-N0">
              {tableBody.map(t => (
                <tr key={t.id} className="">
                  <td className="p-4 text-center bg-N600 w400 whitespace-nowrap">{t.sn}</td>
                  <td className="p-4 text-left underline capitalize w400 whitespace-nowrap">{t.kol}</td>
                  <td className="p-4 text-right w400 whitespace-nowrap">{t.itemsSold}</td>
                  <td className="p-4 text-right w400 whitespace-nowrap">${t.netSales.toFixed(2)}</td>
                  <td className="p-4 text-right underline w400">{t.orders}</td>
                  <td className="p-4 text-right w400">{t.totalCommissions.toFixed(2)}</td>
                  <td
                    className="py-4 text-center x-4 w400 whitespace-nowrap">
                    <SwitchOnOff isEnabled={t.status} />
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
  { url: '/analytics/kol/top-sales-from-kol', category: "top sales from KOL", product: "charlene yue", totalOrdersValue: "135", netSalesValue: "10,000.00" },
  { url: '/analytics/kol/most-orders-from-kol', category: "most orders from KOL", product: "ruden", totalOrdersValue: "249", netSalesValue: "7,398.15" },
  { url: '/analytics/kol/most-items-sold-from-kol', category: "most items sold from KOL", product: "charlene yue", totalOrdersValue: "149", netSalesValue: "10,000.00" }
]

const tableBody = [
  { id: 1, sn: '1', kol: 'charlene yue', itemsSold: 100, netSales: 1000.00, orders: 10, totalCommissions: 120, status: true },
  { id: 2, sn: '2', kol: 'lice wang', itemsSold: 24, netSales: 400.00, orders: 10, totalCommissions: 40, status: false },
  { id: 3, sn: '3', kol: 'sky game', itemsSold: 2, netSales: 200.00, orders: 1, totalCommissions: 30, status: false },
  { id: 4, sn: '4', kol: 'molly', itemsSold: 1, netSales: 10.00, orders: 1, totalCommissions: 0.05, status: false },
]

const dates = [
  { name: "Current Year (Jan 1 - Dec 31, 2021)" },
  { name: "Previous Year (Jan 1 - Dec 31, 2020)" }
]
