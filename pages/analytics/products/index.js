import { useState, Fragment } from 'react';
import { Listbox, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { XIcon } from '@heroicons/react/outline'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight, FiDownloadCloud, FiSearch } from 'react-icons/fi';

import { Header } from 'components/header';
import { DateRangeComparison, ChartView, PaginationProducts } from 'components/analytics/products'

export default function Products() {
  const [startCurrentDate, setStartCurrentDate] = useState(new Date("2021/01/01"))
  const [endCurrentDate, setEndCurrentDate] = useState(new Date())
  const [startPreviousDate, setStartPreviousDate] = useState(new Date("2020/01/01"))
  const [endPreviousDate, setEndPreviousDate] = useState(new Date("2020/12/31"))

  return (
    <div className="pb-4">
      <Header title="Analytics - Products" />
      <div className="my-8 ml-6 mr-12">

        {/* header */}
        <h2 className="w800">Analytics</h2>

        {/* Start Select Date-Range-Compare */}
        <div className="flex items-center justify-between w-full mt-5 space-x-6">
          <DateRangeComparison
            startCurrentDate={startCurrentDate}
            setStartCurrentDate={setStartCurrentDate}
            endCurrentDate={endCurrentDate}
            setEndCurrentDate={setEndCurrentDate}
            startPreviousDate={startPreviousDate}
            setStartPreviousDate={setStartPreviousDate}
            endPreviousDate={endPreviousDate}
            setEndPreviousDate={setEndPreviousDate}
          />
          {/* <div className="w-full">
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
          </div> */}
        </div>
        {/* Ends Select Date-Range-Compare */}

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

const ProductPerformanceCard = () => {
  const [selected, setSelected] = useState(performanceCards[0])
  return (
    <RadioGroup className="grid grid-cols-3" value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Performance</RadioGroup.Label>
      {performanceCards.map((c, i) => {
        return (
          <RadioGroup.Option
            key={i}
            value={c}
            className={({ active, checked }) =>
              `${active
                ? "ring-1 ring-offset-P900"
                : ""
              }
              ${checked
                ? "bg-N0 bg-opacity-80 border-t-4 border-P700"
                : "bg-[#E0E0F24D] bg-opacity-30 border-[1px] border-opacity-60 border-[#A0A0AD99]"
              }
              relative px-5 cursor-pointer`
            }
          >
            {({ active, checked }) => (
              <>
                <h5 className={`mt-5 text-opacity-50 w250 ${checked ? "text-N800" : "text-N0"}`}>{c.category}</h5>
                <div className="mt-3">
                  <h3 className={`w700 ${checked ? "text-N800" : "text-N0"}`}>
                    {c.category === "net sales"
                      ? <>$NT{c.amount.toFixed(2)}</>
                      : <>${c.amount.toFixed(2)}</>
                    }
                  </h3>
                  <div className="flex items-center space-x-1">
                    {/* temporary logic */}
                    {c.percentage === '-'
                      ?
                      <>
                        <FiArrowRight className={`w-5 h-5 ${checked ? "text-N800" : "text-N0"}`} />
                        <h5 className={`w250 ${checked ? "text-N800" : "text-N0"}`}>{c.percentage}</h5>
                      </>
                      :
                      c.category === 'orders'
                        ?
                        <>
                          <FiArrowDownRight className="w-5 h-5 text-R600" />
                          <h5 className="w250 text-R600">{c.percentage}%</h5>
                        </>
                        :
                        <>
                          <FiArrowUpRight className="w-5 h-5 text-G400" />
                          <h5 className="w250 text-G400">{c.percentage}%</h5>
                        </>
                    }
                  </div>
                </div>
                <div className="my-4">
                  <p className={`text-opacity-50 w400 ${checked ? "text-N800" : "text-N0"}`}>Previous Year</p>
                  <p className={`w400 ${checked ? "text-N800" : "text-N0"}`}>${c.previousYear.toFixed(2)}</p>
                </div>
              </>
            )}
          </RadioGroup.Option>
        )
      })}
    </RadioGroup>)
}

export function SwitchOnOff(props) {
  const initialValue = props.isEnabled;
  const [enabled, setEnabled] = useState(initialValue);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-G400" : "bg-N400"}
        inline-flex flex-shrink-0 h-[36px] w-[82px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-N0 focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">{props.title}</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-11" : "translate-x-0"}
            pointer-events-none flex items-center justify-center h-[24px] w-[24px] rounded-full bg-N0 shadow-lg transform ring-0 transition ease-in-out duration-500`}
      >
        {enabled
          ? <CheckIcon className="w-5 h-5 text-G400" />
          : <XIcon className="w-5 h-5 text-N400" />
        }
      </span>
    </Switch>
  )
}

// Best Selling Product List Dummy Data
const tableBody = [
  { id: 1, sn: '1', productTitle: 'Zelta: Breath of the Wild', sku: '128SKXUM-CI', itemsSold: 100, netSales: 1000.00, orders: 10, category: 'Games', status: true },
  { id: 2, sn: '2', productTitle: 'Persona 5', sku: 'PERS9290S-XL', itemsSold: 24, netSales: 400.00, orders: 10, category: 'Games', status: false },
  { id: 3, sn: '3', productTitle: 'Play Station 5 Cyberpunk: 2077 Skin Wrap Edition', sku: 'PS829-SIMNXO', itemsSold: 2, netSales: 200.00, orders: 1, category: 'Games Accessories', status: false },
  { id: 4, sn: '4', productTitle: 'Back4Blood', sku: 'B4B12312490L', itemsSold: 2, netSales: 0.00, orders: 1, category: 'Games', status: true },
]

const performanceCards = [
  { category: "orders", amount: 10, percentage: 50, previousYear: 0.00 },
  { category: "net sales", amount: 1000.00, percentage: 50, previousYear: 0.00 },
  { category: "items sold", amount: 100.00, percentage: 50, previousYear: 50.00 },
]
