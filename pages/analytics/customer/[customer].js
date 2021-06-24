import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { FiFilter, FiSearch } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { Header } from 'components/header'
import { ErrorStatus } from 'components/error-status'
import { LoadingStatus } from 'components/loading-status'
import { GlassHeader } from 'components/glassHeader'
import { TitleWithBackButton } from 'components/titleWithBackButton'
import { Pagination } from 'components/analytics/customer'
import { FilterSidebar } from 'components/analytics/customer/filter-sidebar'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Customer() {
  const [selected, setSelected] = useState(options[0])
  const [isOpen, setIsOpen] = useState(false)
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.customer && `/api/analytics/customer/${query.customer}`,
    fetcher
  )

  if (error) return <ErrorStatus message={error.message} />
  if (!data) return <LoadingStatus />

  return (
    <div className="pb-12 pr-12 pl-7">
      <Header title={`Customer - ${data.customer}`} />
      <GlassHeader title={data.customer}>
        <div className="flex items-center space-x-8">
          <p className="text-N0">$45,683.65</p>
          <button className="px-5 py-2 uppercase bg-transparent border w250-m text-N0">export</button>
        </div>
      </GlassHeader>
      <div className="flex items-center justify-between">
        <TitleWithBackButton path="/analytics/customer" title={`${data.customer} Overview`} />
        <h5 className="px-3 py-2 mt-20 uppercase rounded cursor-pointer w250-m bg-P700 text-N0 font-secondary">view customer</h5>
      </div>
      {/* border */}
      <div className="flex items-center justify-between mt-6 mb-5">
        <h4 className="capitalize w600 whitespace-nowrap">general</h4>
        <div className="w-full ml-5 border border-N0 border-opacity-30"></div>
      </div>

      <div className="grid grid-cols-3">
        {leaderBoardCards.map((card, i) => (
          <div key={i} className="relative px-5 bg-[#E0E0F24D] h-52 bg-opacity-30 border-[1px] border-opacity-60 border-[#A0A0AD99]">
            <h5 className="mt-5 text-opacity-50 w250 text-N0">{card.category}</h5>
            <h4 className="mt-3 capitalize w600 text-N0">{card.title}</h4>
            <div className="flex justify-start mt-3 space-x-3">
              <div className="w-40">
                <p className="text-opacity-50 capitalize w400 text-N0">{card.key1}</p>
                <p className="w400 text-N0">{card.value1}</p>
              </div>
              <div className="w-40">
                <p className="text-opacity-50 capitalize w400 text-N0">{card.key2}</p>
                <p className="w400 text-N0">${card.value2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* order-history */}
      <div className="flex items-center justify-between mt-12 mb-5">
        <h4 className="capitalize w600 whitespace-nowrap">order history</h4>
        <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
        <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
      </div>

      <div className="mt-8">
        <header className="flex items-center justify-between px-6 py-4 rounded-t bg-N200">
          <h2 className="w250 text-N900">sort by</h2>
          <div className="px-4">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Button as="div"
                    className="relative flex items-center justify-between w-full space-x-8"
                  >
                    <p className={`capitalize ${open ? "text-P700" : "text-N900"} `}>{selected.name}</p>
                    <ChevronDownIcon
                      className={`w-6 h-6 ${open ? "text-P700 transform rotate-180" : ""}`}
                      aria-hidden="true" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    show={open}
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Listbox.Options static className="absolute mt-5 rounded-md shadow-lg divide-y-1 divide-N250 focus:outline-none">
                      {options.map((o, i) => (
                        <Listbox.Option key={i} value={o} as={Fragment}>
                          {({ active, selected }) => (
                            <p
                              className={`px-8 py-2 text-right capitalize font-secondary font-thin ${active ? "bg-P700 rounded text-N0" : "text-N800 bg-N200 "
                                }`}
                            >
                              {o.name}
                            </p>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
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
          <button onClick={() => setIsOpen(true)} className="p-3 bg-transparent focus:outline-none ">
            <FiFilter className={`w-6 h-6 ${isOpen ? "text-P900" : ""}`} />
          </button>
        </header>

        {/* Table Header */}
        <table className="md:min-w-full text-N0">
          <thead className="bg-N200 bg-opacity-30">
            <tr>
              <th scope="col" className="px-2 py-4 text-center capitalize w400">s/n</th>
              <th scope="col" className="p-4 text-left capitalize w400 whitespace-nowrap">date & time</th>
              <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">order ID</th>
              <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">status</th>
              <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">items sold</th>
              <th scope="col" className="p-4 text-center capitalize w400 whitespace-nowrap">net sales</th>
            </tr>
          </thead>

          {/* Table Content */}
          <tbody className="bg-N700 text-N0">
            {tableBody.map(t => (
              <tr key={t.id} className="">
                <td className="px-2 py-8 text-center bg-N600 w400">{t.sn}</td>
                <td className="px-4 py-8 text-left capitalize w400">{t.dateAndTime}</td>
                <td className="px-4 py-8 text-right underline w400 whitespace-nowrap">{t.orderID}</td>
                <td className={`px-4 py-8 text-right capitalize w400 ${t?.status === 'completed' ? "text-G400" : "text-R600"}`}>
                  {t.status}
                </td>
                <td className="px-4 py-8 text-right w400 whitespace-nowrap">{t.itemsSold}</td>
                <td className="px-4 py-8 text-center w400">${t.netSales.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
      <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

const options = [
  { name: 'ascending' },
  { name: 'descending' },
  { name: 'earliest' },
  { name: 'latest' },
]

const leaderBoardCards = [
  { category: "favourite kol", title: "charlene yue", key1: 'total orders', value1: 5, key2: 'net sales', value2: 6500.65 },
  { category: "largest order by sales", title: "0RD000A", key1: 'items sold', value1: 45, key2: 'net sales', value2: 15933.65 },
  { category: "average order value", title: "$681.45", key1: 'successful orders', value1: 67, key2: 'net sales', value2: 45683.65 },
]

export const tableBody = [
  { id: 1, sn: '1', dateAndTime: '01/05/2021 15:33:45', orderID: 'ORD0000A', status: 'completed', itemsSold: 90, netSales: 150 },
  { id: 2, sn: '2', dateAndTime: '01/06/2021 14:33:12', orderID: 'ORD0563B', status: 'completed', itemsSold: 67, netSales: 150 },
  { id: 3, sn: '3', dateAndTime: '02/06/2021 19:44:12', orderID: 'ORD0898D', status: 'completed', itemsSold: 35, netSales: 150 },
  { id: 4, sn: '4', dateAndTime: '07/09/2021 05:23:02', orderID: 'ORD1558F', status: 'refunded', itemsSold: 15, netSales: 150 },
  { id: 5, sn: '5', dateAndTime: '08/12/2021 02:00:45', orderID: 'ORD7833E', status: 'completed', itemsSold: 15, netSales: 150 },
]
