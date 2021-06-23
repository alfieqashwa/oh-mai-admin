import { useState, Fragment } from 'react'
import Link from 'next/link';
import { Listbox, Menu, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { BsThreeDotsVertical } from 'react-icons/bs'
import { SiGoogleanalytics } from 'react-icons/si'

import { Header } from 'components/header'
import { ChartView, DateRangeSelect, PerformanceBorder, PerformanceCard, TableSummary } from 'components/analytics/summary';

export default function Summary() {
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])

  return (
    <div className="pb-4">
      <Header title="Analytics - Summary" />
      <div className="my-8 ml-6 mr-12">

        {/* header */}
        <h2 className="w800">Analytics</h2>

        {/* second row */}
        <DateRangeSelect
          selectedCurrent={selectedCurrent}
          setSelectedCurrent={setSelectedCurrent}
          selectedPrevious={selectedPrevious}
          setSelectedPrevious={setSelectedPrevious}
        />

        {/* Leaderboard */}
        <div className="flex items-center justify-between mt-10 mb-4">
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
              <h4 className="mt-3 w600 text-N0">{card.product}</h4>
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

        {/* Performance */}
        <PerformanceBorder />

        {/* Performance's Cards */}
        <PerformanceCard />

        {/* Chart View */}
        <ChartView />

        {/* Table View */}
        <TableSummary />
      </div>
    </div>
  )
}

const dates = [
  { name: "Current Year (Jan 1 - Dec 31, 2021)" },
  { name: "Previous Year (Jan 1 - Dec 31, 2020)" }
]

const leaderBoardCards = [
  { url: '/analytics/summary/best-selling-product', category: "best selling product", product: "Zelda: Breath of the Wild", totalOrdersValue: "291", netSalesValue: "18,000.00" },
  { url: '/analytics/summary/top-kol', category: "top kol", product: "Lice Wang", totalOrdersValue: "135", netSalesValue: "10,000.00" },
  { url: '/analytics/summary/top-customer', category: "top customer", product: "Fan Leng Leng", totalOrdersValue: "5", netSalesValue: "1,800.00" }
]

