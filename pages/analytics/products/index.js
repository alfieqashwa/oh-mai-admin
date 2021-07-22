import React, { useState, createContext, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Header } from 'components/header'
import {
  DateRangeComparison,
  ShowProductSelect,
  ChartView,
  PaginationProducts,
  ProductPerformanceCard
} from 'components/analytics/products'
import { checkLogin } from 'utils/Auth'
import useFetch from 'hooks/useFetch'
import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'

import { GET_LIST_TOP_SALES_PRODUCT } from 'graphql/order'
import { GET_ANALYTIC_PRODUCT_PERFORMANCE } from 'graphql/product'
import { TableOrders } from 'components/analytics/products/table-orders'

export const DateRangeCtx = createContext(null)

export default function Products() {
  const [startCurrentDate, setStartCurrentDate] = useState(
    new Date('2021/01/01')
  )
  const [endCurrentDate, setEndCurrentDate] = useState(new Date())
  const [startPreviousDate, setStartPreviousDate] = useState(
    new Date('2020/01/01')
  )
  const [endPreviousDate, setEndPreviousDate] = useState(new Date('2020/12/31'))
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(false)

  const storeDateRange = {
    startCurrent: [startCurrentDate, setStartCurrentDate],
    endCurrent: [endCurrentDate, setEndCurrentDate],
    startPrevious: [startPreviousDate, setStartPreviousDate],
    endPrevious: [endPreviousDate, setEndPreviousDate]
  }

  useEffect(() => {
    console.log('Check login')
    checkLogin()
  }, [])

  const {
    loading: loadingListTopSalesProduct,
    error: errorListTopSalesProduct,
    data: dataListTopSalesProduct
  } = useFetch(GET_LIST_TOP_SALES_PRODUCT)
  const {
    loading: loadingAnalyticProductPerformance,
    error: errorAnalyticProductPerformance,
    data: dataAnalyticProductPerformance
  } = useFetch(GET_ANALYTIC_PRODUCT_PERFORMANCE)

  if (loadingAnalyticProductPerformance || loadingListTopSalesProduct)
    return <LoadingStatus />
  if (errorAnalyticProductPerformance || errorListTopSalesProduct)
    return (
      <ErrorStatus
        message={errorAnalyticProductPerformance || errorListTopSalesProduct}
      />
    )

  const { getAnalyticProductPerformance } = dataAnalyticProductPerformance
  const { getListTopSalesProduct } = dataListTopSalesProduct

  return (
    <div className="pb-4">
      <Header title="Analytics - Products" />
      <div className="my-8 ml-6 mr-12">
        {/* header */}
        <h2 className="w800">Analytics - Product</h2>
        <div className="flex items-start justify-between w-full mt-5 space-x-0">
          <DateRangeCtx.Provider value={storeDateRange}>
            <DateRangeComparison />
          </DateRangeCtx.Provider>
          <ShowProductSelect />
        </div>
        {/* Leaderboard */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <h4 className="w600">Leaderboard</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        {/* Table */}
        <TableOrders
          data={getListTopSalesProduct}
          status={status}
          setStatus={setStatus}
        />
        {/* Pagination */}
        <PaginationProducts />
        {/* Performance-border */}
        <div className="flex items-center justify-between mt-10 mb-4">
          <h4 className="w600">Performance</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        {/* Performance */}
        <ProductPerformanceCard data={getAnalyticProductPerformance} />
        {/* Chart View */}
        <ChartView />
      </div>
    </div>
  )
}

// Best Selling Product List Dummy Data
// const tableBody = [
//   {
//     id: 1,
//     sn: '1',
//     productTitle: 'Zelta: Breath of the Wild',
//     sku: '128SKXUM-CI',
//     itemsSold: 100,
//     netSales: 1000.0,
//     orders: 10,
//     category: 'Games',
//     status: true,
//   },
//   {
//     id: 2,
//     sn: '2',
//     productTitle: 'Persona 5',
//     sku: 'PERS9290S-XL',
//     itemsSold: 24,
//     netSales: 400.0,
//     orders: 10,
//     category: 'Games',
//     status: false,
//   },
//   {
//     id: 3,
//     sn: '3',
//     productTitle: 'Play Station 5 Cyberpunk: 2077 Skin Wrap Edition',
//     sku: 'PS829-SIMNXO',
//     itemsSold: 2,
//     netSales: 200.0,
//     orders: 1,
//     category: 'Games Accessories',
//     status: false,
//   },
//   {
//     id: 4,
//     sn: '4',
//     productTitle: 'Back4Blood',
//     sku: 'B4B12312490L',
//     itemsSold: 2,
//     netSales: 0.0,
//     orders: 1,
//     category: 'Games',
//     status: true,
//   },
// ]
