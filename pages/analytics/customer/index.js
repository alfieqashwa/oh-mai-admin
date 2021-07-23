import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Header } from 'components/header'
import {
  DateRangeSelect,
  TableOrders,
  Pagination,
  ChartView,
  OrderPerformanceCard
} from 'components/analytics/customer'

import { checkLogin } from 'utils/Auth'
import useFetch from 'hooks/useFetch'
import { GET_ANALYTIC_CUSTOMER_TABLE } from 'graphql/customer'
import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'

export default function Customer() {
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])

  useEffect(() => {
    checkLogin()
  }, [])

  const { loading, error, data } = useFetch(GET_ANALYTIC_CUSTOMER_TABLE)

  if (loading) return <LoadingStatus />
  if (error) return <ErrorStatus message={error} />

  const { getAnalyticCustomerTable } = data

  return (
    <div className="pb-4">
      <Header title="Analytics - Customer" />
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
        {/* customer_list-border */}
        <div className="flex items-center justify-between mt-10 mb-4">
          <h4 className="capitalize w600 whitespace-nowrap">customer list</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        {/* table */}
        <TableOrders data={getAnalyticCustomerTable} />
        {/* pagination */}
        <Pagination />
        {/* customer_performance-border */}
        <div className="flex items-center justify-between mt-4 mb-7">
          <h4 className="capitalize w600 whitespace-nowrap">
            customer performance
          </h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        {/* performance-cards */}
        <OrderPerformanceCard />
        {/* chart */}
        <ChartView />
      </div>
    </div>
  )
}

const dates = [
  { name: 'Current Year (Jan 1 - Dec 31, 2021)' },
  { name: 'Previous Year (Jan 1 - Dec 31, 2020)' }
]
