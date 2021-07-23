import React, { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiSearch, FiDownloadCloud } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import moment from 'moment'

import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'
import { moneyFormat } from 'utils/money-format'
import useFetch from 'hooks/useFetch'
import { GET_ORDER_SUMMARY_TABLE } from 'graphql/order'

export function TableSummary() {
  // eslint-disable-next-line no-unused-vars
  const [_isOpen, _setIsOpen] = useState(false)
  const {
    loading,
    error,
    data: dataOrderSummaryTable
  } = useFetch(GET_ORDER_SUMMARY_TABLE)

  if (loading) {
    return <LoadingStatus />
  }
  if (error) {
    return <ErrorStatus message={error.message} />
  }
  const { getOrderSumaryTable: data } = dataOrderSummaryTable

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
          <select
            name="date-range"
            className="bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-N700 focus:outline-none"
          >
            <option>By day</option>
            <option>By month</option>
          </select>
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

      <table className="md:min-w-full text-N0">
        <thead className="bg-N200 bg-opacity-30">
          <tr>
            <th
              scope="col"
              className="py-4 pl-6 text-left capitalize w400 whitespace-nowrap"
            >
              date
            </th>
            <th
              scope="col"
              className="py-4 pl-10 text-right capitalize w400 whitespace-nowrap"
            >
              orders
            </th>
            <th
              scope="col"
              className="py-4 pl-6 text-right capitalize w400 whitespace-nowrap"
            >
              gross sales
            </th>
            <th
              scope="col"
              className="py-4 pl-6 text-right capitalize w400 whitespace-nowrap"
            >
              taxes
            </th>
            <th
              scope="col"
              className="py-4 pl-6 text-right capitalize w400 whitespace-nowrap"
            >
              returns
            </th>
            <th
              scope="col"
              className="py-4 pl-6 text-right capitalize w400 whitespace-nowrap"
            >
              shipping
            </th>
            <th
              scope="col"
              className="py-4 pr-6 text-right capitalize w400 whitespace-nowrap"
            >
              total sales
            </th>
          </tr>
        </thead>
        <tbody className="bg-N700 text-N0">
          {data?.map((t, i) => {
            return (
              <tr key={i}>
                <td className="py-4 text-center bg-N600 w400 whitespace-nowrap">
                  {/* TODO */}
                  {moment(t.order_datetime).format('DD/MM/YYYY HH:mm:ss')}
                </td>
                <td className="py-4 text-right w400 whitespace-nowrap">
                  {t.total_order}
                </td>
                <td className="py-4 text-right w400 whitespace-nowrap">
                  {moneyFormat.format(t.net_sales)}
                </td>
                <td className="py-4 text-right w400 whitespace-nowrap">
                  ${t.order_item_tax.toFixed(2)}
                </td>
                <td className="py-4 text-right w400 whitespace-nowrap">${0}</td>
                <td className="py-4 text-right w400 whitespace-nowrap">
                  ${t.shipping_cost.toFixed(2)}
                </td>
                <td className="py-4 pr-6 text-right w400 whitespace-nowrap">
                  {moneyFormat.format(t.net_sales)}
                </td>
              </tr>
            )
          })}
          <TotalMonth data={data} />
        </tbody>
      </table>
    </div>
  )
}

function TotalMonth({ data }) {
  const initVal = 0
  function reducer(acc, i) {
    return acc + i
  }

  const orders = data?.map((t) => t.total_order)
  const grossSales = data?.map((t) => t.net_sales)
  const taxes = data?.map((t) => t.order_item_tax)
  // const returns = data?.map((t) => t.returns)
  const shipping = data?.map((t) => t.shipping_cost)
  const totalSales = data?.map((t) => t.net_sales)

  const totalOrder = orders?.reduce(reducer, initVal)
  const totalGrossSales = grossSales?.reduce(reducer, initVal)
  const totalTaxes = taxes?.reduce(reducer, initVal)
  // const totalReturns = returns.reduce(reducer, initVal)
  const totalShipping = shipping?.reduce(reducer, initVal)
  const grandTotalSales = totalSales?.reduce(reducer, initVal)

  return (
    <tr>
      <td className="py-4 text-center capitalize bg-N500 w400 whitespace-nowrap">
        month total
      </td>
      <td className="py-4 text-right w400 whitespace-nowrap">{totalOrder}</td>
      <td className="py-4 text-right w400 whitespace-nowrap">
        {moneyFormat.format(totalGrossSales)}
      </td>
      <td className="py-4 text-right w400 whitespace-nowrap">
        ${totalTaxes?.toFixed(2)}
      </td>
      <td className="py-4 text-right w400 whitespace-nowrap">
        {/* ${totalReturns.toFixed(2)} */}${0}
      </td>
      <td className="py-4 text-right w400 whitespace-nowrap">
        ${totalShipping?.toFixed(2)}
      </td>
      <td className="py-4 pr-6 text-right w400 whitespace-nowrap">
        {moneyFormat.format(grandTotalSales)}
      </td>
    </tr>
  )
}

// dummy data
// TODO: need formula to calculate

// const tableBody = [
//   {
//     id: 1,
//     date: '01/01/2021',
//     orders: 3,
//     grossSales: 50.0,
//     taxes: 0.0,
//     returns: 0.0,
//     shipping: 0.0,
//     totalSales: 50.0,
//   },
//   {
//     id: 2,
//     date: '02/01/2021',
//     orders: 3,
//     grossSales: 50.0,
//     taxes: 0.0,
//     returns: 0.0,
//     shipping: 0.0,
//     totalSales: 50.0,
//   },
//   {
//     id: 3,
//     date: '03/01/2021',
//     orders: 3,
//     grossSales: 50.0,
//     taxes: 0.0,
//     returns: 0.0,
//     shipping: 0.0,
//     totalSales: 50.0,
//   },
//   {
//     id: 4,
//     date: '04/01/2021',
//     orders: 3,
//     grossSales: 50.0,
//     taxes: 0.0,
//     returns: 0.0,
//     shipping: 0.0,
//     totalSales: 50.0,
//   },
//   {
//     id: 5,
//     date: '05/01/2021',
//     orders: 3,
//     grossSales: 50.0,
//     taxes: 0.0,
//     returns: 0.0,
//     shipping: 0.0,
//     totalSales: 50.0,
//   },
//   {
//     id: 6,
//     date: '06/01/2021',
//     orders: 3,
//     grossSales: 50.0,
//     taxes: 0.0,
//     returns: 0.0,
//     shipping: 0.0,
//     totalSales: 50.0,
//   },
// ]
