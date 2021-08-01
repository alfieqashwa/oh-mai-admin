import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { Header } from 'components/header'
import {
  DateRangeSelect,
  OrderPerformanceCard,
  ChartView,
  TableOrders
} from 'components/analytics/orders'
import { checkLogin } from 'utils/Auth'
import useFetch from 'hooks/useFetch'

import {
  GET_ORDER_PERFORMANCE,
  GET_ORDER_LIST_SUMMARY_TABLE
} from 'graphql/order'
import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'

export default function Orders() {
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])

  useEffect(() => {
    console.log('Check login')
    checkLogin()
  }, [])

  const {
    loading: loadingOrderPerformance,
    error: errorOrderPerformance,
    data: dataOrderPerformance
  } = useFetch(GET_ORDER_PERFORMANCE)

  const {
    loading: loadingOrderListSummaryTable,
    error: errorOrderListSummaryTable,
    data: dataOrderListSummaryTable
  } = useFetch(GET_ORDER_LIST_SUMMARY_TABLE)

  if (loadingOrderPerformance || loadingOrderListSummaryTable) {
    return <LoadingStatus />
  }

  if (errorOrderPerformance || errorOrderListSummaryTable) {
    return (
      <ErrorStatus
        message={errorOrderPerformance || errorOrderListSummaryTable}
      />
    )
  }

  const { getOrderPerformance } = dataOrderPerformance
  const { getOrderListSumaryTable } = dataOrderListSummaryTable

  return (
    <div className="pb-4">
      <Header title="Analytics - Orders" />
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
        {/* Performance-border */}
        <div className="flex items-center justify-between mt-10 mb-4">
          <h4 className="w600">Performance</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        {/* Performance */}
        <OrderPerformanceCard data={getOrderPerformance} />
        {/* Chart */}
        <ChartView />
        {/* Table */}
        <TableOrders data={getOrderListSumaryTable} />
      </div>
    </div>
  )
}

const dates = [
  { name: 'Current Year (Jan 1 - Dec 31, 2021)' },
  { name: 'Previous Year (Jan 1 - Dec 31, 2020)' }
]
