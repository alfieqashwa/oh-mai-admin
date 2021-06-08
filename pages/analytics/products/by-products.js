import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Listbox, Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { FiChevronDown, FiDownloadCloud, FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { Header } from "components/header";
import { GlassDefault } from 'components/glassDefault';
import { PaginationProducts } from 'components/analytics/products';

// TODO: This will be a dynamic page
export default function ByProducts() {
  return (
    <div className="pr-12 pl-7">
      <Header title="Products - Orders" />
      <GlassDefault className="fixed right-0 z-20 top-0 left-0 md:left-[252px] h-16 rounded-none">
        <div className="flex items-center justify-between px-4 py-3 x-4">
          <div className="flex items-center">
            <AiOutlineArrowLeft className="w-6 h-6 md:hidden text-N0" />
            <p className="ml-4 normal-case w400 text-N0">Orders on <span className="underline cursor-pointer">Zelda: Breath of the Wild</span></p>
          </div>
          <div className="flex items-center space-x-10">
            <p className="text-N0 w400">NT$4,500</p>
            <button className="px-5 py-2 uppercase bg-transparent border w250-m text-N0">export</button>
          </div>
        </div>
      </GlassDefault>

      {/* Title */}
      <div className="flex items-center justify-between w-full mt-24">
        <div className="flex items-center" >
          <Link href="/analytics/products">
            <a>
              <AiOutlineArrowLeft className="w-6 h-6 transition duration-300 ease-in-out text-N0 hover:text-P400" />
            </a>
          </Link>
          <h3 className="ml-4 capitalize w700">Orders: <span className="underline cursor-pointer">Zelda: Breath of the Wild</span></h3>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <p className="w400 text-N0">Show</p>
          <ShowYearRangeSelect />
        </div>
      </div>

      <div className="mt-8">
        {/* Table */}
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
              <th scope="col" className="px-3 py-4 text-center capitalize w400 whitespace-nowrap">s/n</th>
              <th scope="col" className="py-4 pl-4 text-left capitalize w400 whitespace-nowrap">date & time</th>
              <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">order ID</th>
              <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">customer</th>
              <th scope="col" className="p-4 text-right capitalize w400 whitespace-nowrap">quantity</th>
              <th scope="col" className="py-4 pr-16 text-right capitalize w400 whitespace-nowrap">gross sales</th>
              <th scope="col" className="py-4 pr-4 text-center capitalize w400 whitespace-nowrap">actions</th>
            </tr>
          </thead>

          {/* Table Content */}
          <tbody className="bg-N700 text-N0">
            {tableBody.map(t => (
              <tr key={t.id}>
                <td className="py-4 text-center bg-N600 w400 whitespace-nowrap">{t.sn}</td>
                <td className="py-4 pl-4 text-left w400">{t.dateTime}</td>
                <td className="p-4 text-right underline cursor-pointer w400 whitespace-nowrap">{t.orderID}</td>
                <td className="p-4 text-right underline cursor-pointer w400 whitespace-nowrap">{t.customer}</td>
                <td className="p-4 text-right whitespace-nowrap">{t.quantity}</td>
                <td className="p-4 pr-16 text-right underline w400 whitespace-nowrap">${t.grossSales.toFixed(2)}</td>
                <td className="py-4 pl-8 text-center w400 whitespace-nowrap">
                  <FiChevronDown className="w-6 h-6 border rounded cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <PaginationProducts />
    </div>
  )
}

function ShowYearRangeSelect() {
  const [show, setShow] = useState(initialState[0])
  return (
    <Listbox value={show} onChange={setShow}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative flex items-center justify-between w-full h-12 px-3 py-2 space-x-10 shadow-md bg-N200 bg-opacity-20 text-N0 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-P900 focus:ring-offset-P900 focus-visible:ring-offset-2 focus:border-P900 sm:text-sm">
              <p className={`capitalize w350 transition duration-200 ease-in-out hover:text-G400 ${open ? "text-P700" : "text-N0"}`}>{show.name}</p>
              <ChevronDownIcon className={`w-6 h-6 text-N0 ${open && "transform rotate-180 text-P700"}`} />
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 w-full py-1 mt-1 overflow-auto rounded-md shadow-lg text-N0 bg-N600 max-h-60 ring-1 ring-P900 ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {initialState?.map((p, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `${active
                        ? "bg-P900"
                        : ""
                      }
                          cursor-default select-none relative py-2 pl-8 capitalize`
                    }
                    value={p}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${selected ? "font-medium" : "font-normal"
                            } block truncate`}
                        >
                          {p.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${active ? "text-N0" : ""
                              }
                                absolute inset-y-0 left-0 flex items-center pl-2`}
                          >
                            <CheckIcon
                              className="w-4 h-4"
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
  )
}

const tableBody = [
  { id: 1, sn: '1', dateTime: '15/05/2021 14:30:23', orderID: 'ORD0000A', customer: 'Fan Leng Leng', quantity: 2, grossSales: 1590 },
  { id: 2, sn: '2', dateTime: '15/05/2021 15:30:23', orderID: 'ORD0563B', customer: 'Fan Leng Leng', quantity: 3, grossSales: 1590 },
  { id: 3, sn: '3', dateTime: '15/05/2021 20:31:58', orderID: 'ORD0898D', customer: 'Fan Leng Leng', quantity: 1, grossSales: 1590 },
  { id: 4, sn: '4', dateTime: '15/05/2021 20:33:58', orderID: 'ORD1558F', customer: 'Fan Leng Leng', quantity: 2, grossSales: 1590 },
  { id: 5, sn: '5', dateTime: '15/05/2021 20:39:58', orderID: 'ORD7833E', customer: 'Fan Leng Leng', quantity: 3, grossSales: 1590 },
]

const initialState = [
  { name: "Year (1 Jan 2021 - 1 Dec 2021)" },
  { name: "Year (1 Jan 2020 - 1 Dec 2020)" },
  { name: "Year (1 Jan 2019 - 1 Dec 2019)" },
]
