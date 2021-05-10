import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiSearch } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDownloadCloud } from 'react-icons/fi'

// Table on Summary Main Page
export function TableSummary() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="my-10">
      <header className="flex items-center justify-between px-6 py-4 rounded-t bg-N200">
        <h2 className="w250 text-N900">Table</h2>
        <div className="relative flex-1 w-full pl-12 pr-4">
          <FiSearch className="absolute w-6 h-6 top-3 left-16 text-N700" />
          <input
            type="text"
            name="search"
            placeholder="Search for a date"
            className="w-full px-12 py-3 bg-transparent border rounded border-N900"
          />
        </div>
        <div>
          <select name="date-range" className="bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-N700 focus:outline-none">
            <option>By day</option>
            <option>By month</option>
          </select>
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

      <table className="md:min-w-full text-N0">
        <thead className="bg-N200 bg-opacity-30">
          <tr>
            <th scope="col" className="py-4 pl-6 text-left capitalize w400 whitespace-nowrap">date</th>
            <th scope="col" className="py-4 pl-10 text-right capitalize w400 whitespace-nowrap">orders</th>
            <th scope="col" className="py-4 pl-6 text-right capitalize w400 whitespace-nowrap">gross sales</th>
            <th scope="col" className="py-4 pl-6 text-right capitalize w400 whitespace-nowrap">taxes</th>
            <th scope="col" className="py-4 pl-6 text-right capitalize w400 whitespace-nowrap">returns</th>
            <th scope="col" className="py-4 pl-6 text-right capitalize w400 whitespace-nowrap">shipping</th>
            <th scope="col" className="py-4 pr-6 text-right capitalize w400 whitespace-nowrap">total sales</th>
          </tr>
        </thead>
        <tbody className="bg-N700 text-N0">
          {tableBody.map(t => (
            <tr key={t.id}>
              <td className="py-4 text-center bg-N600 w400 whitespace-nowrap">{t.date}</td>
              <td className="py-4 text-right w400 whitespace-nowrap">{t.orders}</td>
              <td className="py-4 text-right w400 whitespace-nowrap">${t.grossSales.toFixed(2)}</td>
              <td className="py-4 text-right w400 whitespace-nowrap">${t.taxes.toFixed(2)}</td>
              <td className="py-4 text-right w400 whitespace-nowrap">${t.returns.toFixed(2)}</td>
              <td className="py-4 text-right w400 whitespace-nowrap">${t.shipping.toFixed(2)}</td>
              <td className="py-4 pr-6 text-right w400 whitespace-nowrap">${t.totalSales.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td className="py-4 text-center capitalize bg-N500 w400 whitespace-nowrap">month total</td>
            <td className="py-4 text-right w400 whitespace-nowrap">{totalOrders}</td>
            <td className="py-4 text-right w400 whitespace-nowrap">${totalGrossSales.toFixed(2)}</td>
            <td className="py-4 text-right w400 whitespace-nowrap">${totalTaxes.toFixed(2)}</td>
            <td className="py-4 text-right w400 whitespace-nowrap">${totalReturns.toFixed(2)}</td>
            <td className="py-4 text-right w400 whitespace-nowrap">${totalShipping.toFixed(2)}</td>
            <td className="py-4 pr-6 text-right w400 whitespace-nowrap">${grandTotalSales.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// dummy data
// TODO: need formula to calculate
const tableBody = [
  { id: 1, date: '01/01/2021', orders: 3, grossSales: 50.00, taxes: 0.00, returns: 0.00, shipping: 0.00, totalSales: 50.00 },
  { id: 2, date: '02/01/2021', orders: 3, grossSales: 50.00, taxes: 0.00, returns: 0.00, shipping: 0.00, totalSales: 50.00 },
  { id: 3, date: '03/01/2021', orders: 3, grossSales: 50.00, taxes: 0.00, returns: 0.00, shipping: 0.00, totalSales: 50.00 },
  { id: 4, date: '04/01/2021', orders: 3, grossSales: 50.00, taxes: 0.00, returns: 0.00, shipping: 0.00, totalSales: 50.00 },
  { id: 5, date: '05/01/2021', orders: 3, grossSales: 50.00, taxes: 0.00, returns: 0.00, shipping: 0.00, totalSales: 50.00 },
  { id: 6, date: '06/01/2021', orders: 3, grossSales: 50.00, taxes: 0.00, returns: 0.00, shipping: 0.00, totalSales: 50.00 },
]

const initialValue = 0
const orders = tableBody.map(t => t.orders)
const grossSales = tableBody.map(t => t.grossSales)
const taxes = tableBody.map(t => t.taxes)
const returns = tableBody.map(t => t.returns)
const shipping = tableBody.map(t => t.shipping)
const totalSales = tableBody.map(t => t.totalSales)

const reducer = (acc, i) => {
  return acc + i
}

const totalOrders = orders.reduce(reducer, initialValue)
const totalGrossSales = grossSales.reduce(reducer, initialValue)
const totalTaxes = taxes.reduce(reducer, initialValue)
const totalReturns = returns.reduce(reducer, initialValue)
const totalShipping = shipping.reduce(reducer, initialValue)
const grandTotalSales = totalSales.reduce(reducer, initialValue)