import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiChevronDown, FiDownloadCloud, FiSearch } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'

export function TableOrders() {
  return (
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
                <Menu.Button className={`bg-transparent focus:outline-none ${open ? 'text-P400' : ''}`}>
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
                  ${!open ? 'motion-safe:animate-bounce transition duration-700 ease-in-out' : ''}
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
            <th scope="col" className="py-4 pl-4 text-right capitalize w400 whitespace-nowrap">order ID</th>
            <th scope="col" className="py-4 pl-4 text-center capitalize w400 whitespace-nowrap">customer</th>
            <th scope="col" className="py-4 pl-12 text-right capitalize w400 whitespace-nowrap">billing</th>
            <th scope="col" className="px-16 py-4 text-right capitalize w400 whitespace-nowrap">net sales</th>
            <th scope="col" className="py-4 pr-8 text-center capitalize w400 whitespace-nowrap">actions</th>
          </tr>
        </thead>

        {/* Table Content */}
        <tbody className="bg-N700 text-N0">
          {tableBody.map(t => (
            <tr key={t.id}>
              <td className="py-4 text-center bg-N600 w400 whitespace-nowrap">{t.sn}</td>
              <td className="py-4 pl-4 text-left w400">{t.dateTime}</td>
              <td className="py-4 text-right underline cursor-pointer w400 whitespace-nowrap">{t.orderID}</td>
              <td className="py-4 pl-4 text-center underline cursor-pointer w400 whitespace-nowrap">{t.customer}</td>
              <td className="py-4 pl-16 space-y-1 text-right">
                <p className="w350">{t.billing[0]}</p>
                <p className="tracking-widest w350 text-N0 text-opacity-70">{t.billing[1]}</p>
              </td>
              <td className="px-16 py-4 text-right underline w400 whitespace-nowrap">${t.netSales.toFixed(2)}</td>
              <td className="pl-4 text-center x-4 w400 whitespace-nowrap">
                <FiChevronDown className="w-6 h-6 border rounded cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const tableBody = [
  { id: 1, sn: '1', dateTime: '15/05/2021 14:30:23', orderID: 'ORD0000A', customer: 'Fan Leng Leng', billing: ['First Name Last Name, Billing Address, Billing Address, Billing Address, Billing Address, Billing Address, Billing Addr...', 'via Credit Card (ECPay)'], netSales: 120.00 },
  { id: 2, sn: '2', dateTime: '15/05/2021 15:30:23', orderID: 'ORD0563B', customer: 'Fan Leng Leng', billing: ['First Name Last Name, Billing Address, Billing Address, Billing Address, Billing Address, Billing Address, Billing Addr...', 'via Credit Card (ECPay)'], netSales: 40.00 },
  { id: 3, sn: '3', dateTime: '15/05/2021 20:31:58', orderID: 'ORD0898D', customer: 'Fan Leng Leng', billing: ['First Name Last Name, Billing Address, Billing Address, Billing Address, Billing Address, Billing Address, Billing Addr...', 'via Credit Card (ECPay)'], netSales: 30.00 },
  { id: 4, sn: '4', dateTime: '15/05/2021 20:33:58', orderID: 'ORD1558F', customer: 'Fan Leng Leng', billing: ['First Name Last Name, Billing Address, Billing Address, Billing Address, Billing Address, Billing Address, Billing Addr...', 'via Credit Card (ECPay)'], netSales: 0.05 },
  { id: 5, sn: '5', dateTime: '15/05/2021 20:39:58', orderID: 'ORD7833E', customer: 'Fan Leng Leng', billing: ['First Name Last Name, Billing Address, Billing Address, Billing Address, Billing Address, Billing Address, Billing Addr...', 'via Credit Card (ECPay)'], netSales: 0.05 }
]
