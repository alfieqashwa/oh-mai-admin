import { useState, Fragment } from 'react'
import Link from 'next/link';
import { Listbox, Menu, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { BsThreeDotsVertical } from 'react-icons/bs'
import { SiGoogleanalytics } from 'react-icons/si'

import { Header } from 'components/header'
import { PerformanceBorder, PerformanceCard } from 'components/analytics/performance';
import { ChartView } from 'components/analytics/chart'
import { TableSummary } from 'components/analytics/table';

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
        <div className="flex items-center justify-between w-full mt-5 space-x-6">
          <div className="w-full">
            <p className="w400">Current Date Range</p>
            <Listbox value={selectedCurrent} onChange={setSelectedCurrent}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default bg-N200 bg-opacity-20 text-N0 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-P900 focus:ring-offset-P900 focus-visible:ring-offset-2 focus:border-P900 sm:text-sm">
                      <span className="block truncate">{selectedCurrent.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon
                          className="w-6 h-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        static
                        className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg text-N0 bg-N600 max-h-60 ring-1 ring-P900 ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        {dates.map((date, i) => (
                          <Listbox.Option
                            key={i}
                            className={({ active }) =>
                              `${active
                                ? "bg-P900"
                                : ""
                              }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                            }
                            value={date}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`${selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                >
                                  {date.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`${active ? "text-N0" : ""
                                      }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                  >
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="w-full">
            <p className="w400">Compare with Date Range</p>
            <Listbox value={selectedPrevious} onChange={setSelectedPrevious}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default bg-N200 bg-opacity-20 text-N0 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-P900 focus:ring-offset-P900 focus-visible:ring-offset-2 focus:border-P900 sm:text-sm">
                      <span className="block truncate">{selectedPrevious.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon
                          className="w-6 h-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        static
                        className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg text-N0 bg-N600 max-h-60 ring-1 ring-P900 ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        {dates.map((date, i) => (
                          <Listbox.Option
                            key={i}
                            className={({ active }) =>
                              `${active
                                ? "bg-P700"
                                : ""
                              }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                            }
                            value={date}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`${selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                >
                                  {date.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`${active ? "text-N0" : ""
                                      }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                  >
                                    <CheckIcon
                                      className="w-5 h-5 text-N0"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="flex items-center justify-between my-4">
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
                            <Menu.Item as="button" className="flex items-center justify-between w-full px-4 py-2 rounded focus:outline-none bg-N0">
                              <SiGoogleanalytics className="w-6 h-6" />
                              <h4 className="pl-8 w250 text-N900">view leaderboard</h4>
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

