import React, { useState, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi'

import { Header } from 'components/header'
import { GlassHeader } from 'components/glassHeader'
import { TitleWithBackButton } from 'components/titleWithBackButton'
import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'
import {
  LeaderBoardBorder,
  PaginationSummary
} from 'components/analytics/summary'
import { moneyFormat } from 'utils/money-format'

import { checkLogin } from 'utils/Auth'
// import { getClient } from 'lib/graphqlclient'
import useFetch from 'hooks/useFetch'
import { GET_LIST_TOP_SALES_PRODUCT } from 'graphql/order'

export default function BestSellingProduct() {
  // const [listTopSalesProduct, setListTopSalesProduct] = useState()
  const [status, _setStatus] = useState('inactive')

  useEffect(() => {
    console.log('Check login')
    checkLogin()
  }, [])

  // const client = getClient()

  // async function loadData() {
  //   try {
  //     const result = await client.request(GET_LIST_TOP_SALES_PRODUCT)
  //     setListTopSalesProduct(result.getListTopSalesProduct)

  //     console.log(JSON.stringify(result.getListTopSalesProduct, null, 2))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   loadData()
  // }, [])

  // useEffect(() => {
  //   if (listTopSalesProduct) {
  //     console.log(`listTopSalesProduct_SKU: ${listTopSalesProduct?.[0].sku}`)
  //   }
  // }, [listTopSalesProduct])

  const { loading, error, data } = useFetch(GET_LIST_TOP_SALES_PRODUCT)

  if (loading) return <LoadingStatus />
  if (error) return <ErrorStatus message={error} />

  return (
    <div className="pr-12 pl-7">
      {/* Header? */}
      <Header title="Summary - Best Selling Product" />
      <GlassHeader title="best selling product">
        <div className="flex space-x-4">
          <button className="px-5 py-2 uppercase bg-transparent border w250-m text-N0">
            export
          </button>
        </div>
      </GlassHeader>

      {/* Title */}
      <TitleWithBackButton
        path="/analytics/summary"
        title="best selling product"
      />

      {/* Leaderboard Border */}
      <LeaderBoardBorder />

      {/* Table */}
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
                className="px-2 py-4 text-center capitalize w400 whitespace-nowrap"
              >
                s/n
              </th>
              <th
                scope="col"
                className="w-1/6 py-4 pl-4 text-left capitalize w400 whitespace-nowrap"
              >
                product title
              </th>
              <th
                scope="col"
                className="w-1/6 py-4 text-right capitalize w400 whitespace-nowrap"
              >
                SKU
              </th>
              <th
                scope="col"
                className="py-4 text-right capitalize w400 whitespace-nowrap"
              >
                Items Sold
              </th>
              <th
                scope="col"
                className="w-1/6 py-4 text-right capitalize w400 whitespace-nowrap"
              >
                net sales
              </th>
              <th
                scope="col"
                className="py-4 text-right capitalize w400 whitespace-nowrap"
              >
                orders
              </th>
              <th
                scope="col"
                className="py-4 text-right capitalize w400 whitespace-nowrap"
              >
                category
              </th>
              <th
                scope="col"
                className="p-4 text-center capitalize w400 whitespace-nowrap"
              >
                status
              </th>
            </tr>
          </thead>

          {/* Table Content */}
          <tbody className="bg-N700 text-N0">
            {data?.getListTopSalesProduct?.map((t, i) => (
              <tr key={i}>
                <td className="py-4 text-center bg-N600 w400 whitespace-nowrap">
                  {t.sn}
                </td>
                <td className="w-1/6 py-4 pl-4 text-left underline w400">
                  {t.product_title}
                </td>
                <td className="w-1/6 py-4 text-right w400 whitespace-nowrap">
                  {t.sku}
                </td>
                <td className="py-4 text-right w400 whitespace-nowrap">
                  {t.item_sold}
                </td>
                <td className="w-1/6 py-4 text-right w400 whitespace-nowrap">
                  {moneyFormat.format(t.net_sales)}
                </td>
                <td className="py-4 text-right underline w400 whitespace-nowrap">
                  {t.order}
                </td>
                <td className="w-8 py-4 pl-8 text-right w400">{t.category}</td>
                <td
                  className={`
                  ${status === 'active' ? 'text-G400' : 'text-R600'}
                  x-4 py-4 text-center w400 whitespace-nowrap capitalize
                  `}
                >
                  {status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <PaginationSummary />
    </div>
  )
}

// Best Selling Product List Dummy Data
const tableBody = [
  {
    id: 1,
    sn: '1',
    productTitle: 'Zelta: Breath of the Wild',
    sku: '128SKXUM-CI',
    itemsSold: 100,
    netSales: 1000.0,
    orders: 10,
    category: 'Games',
    status: 'Active'
  },
  {
    id: 2,
    sn: '2',
    productTitle: 'Persona 5',
    sku: 'PERS9290S-XL',
    itemsSold: 24,
    netSales: 400.0,
    orders: 10,
    category: 'Games',
    status: 'Active'
  },
  {
    id: 3,
    sn: '3',
    productTitle: 'Play Station 5 Cyberpunk: 2077 Skin Wrap Edition',
    sku: 'PS829-SIMNXO',
    itemsSold: 2,
    netSales: 200.0,
    orders: 1,
    category: 'Games Accessories',
    status: 'Active'
  },
  {
    id: 4,
    sn: '4',
    productTitle: 'Back4Blood',
    sku: 'B4B12312490L',
    itemsSold: 2,
    netSales: 0.0,
    orders: 1,
    category: 'Games',
    status: 'Inactive'
  }
]
