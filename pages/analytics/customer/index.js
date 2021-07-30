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
import { DateRange } from 'components/widgets/DateRange'
import { getAnalyticCustomerTable } from 'services/api/analytics_customer'
import { timeFilterFormatter } from 'utils/Others'

export default function Customer() {
  const [dataTable, setDataTable] = useState([])
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])
  const [selectedCustomer, setSelectedCustomer] = useState()
  const [filter, setFilter] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  
  let isDataInitialized = false

  // const { loading, error, data } = useFetch(GET_ANALYTIC_CUSTOMER_TABLE)

  const initData = () => {
    
  }

  useEffect(() => {
    checkLogin()
  }, [])

  // useEffect(() => {
  //   if (data && data.getAnalyticCustomerTable && !isDataInitialized) {
  //     setDataTable(data.getAnalyticCustomerTable)
  //     isDataInitialized = true
  //   }
  // }, [data])

  useEffect(() => {
    console.log('selectedCustomer', selectedCustomer)
  }, [selectedCustomer])

  useEffect(async () => {
    console.log('filter:' + JSON.stringify(filter))
    const result = await getAnalyticCustomerTable(filter)
    console.log('result:', result)

    if (result.isSuccess) {
      setDataTable(result.data)
    }

    const timeFilter = timeFilterFormatter(filter)

    if (timeFilter) {
      setStartDate(timeFilter.startDate)
      setEndDate(timeFilter.endDate)
    }
  }, [filter])

  useEffect(() => {
  }, [dataTable])

  // if (loading) return <LoadingStatus />
  // if (error) return <ErrorStatus message={error} />

  const dateRageChange = (dateRange) => {
    console.log('dateRange', dateRange)
    setFilter(prevState => ({
      ...prevState,
      ...dateRange
    }))
    // const _dateRange = {
    //   mode: '24h',
    //   dayStart: null,
    //   dayEnd: null,
    //   weekStart: null,
    //   weekEnd: null,
    //   monthStart: null,
    //   monthEnd: null,
    //   yearStart: null,
    //   yearEnd: null
    // }
    // setDateRange(dateRange)
  }

  const keywordChange = (keyword) => {
    setFilter(prevState => ({
      ...prevState,
      keyword: keyword
    }))
  }

  const sortingChange = (sorting) => {
    setFilter(prevState => ({
      ...prevState,
      sorting: sorting
    }))
  }

  return (
    <div className="pb-4">
      <Header title="Analytics - Customer" />
      <div className="my-8 ml-6 mr-12">
        {/* header */}
        <h2 className="w800">Analytics</h2>
        {/* second row */}
        {/* <DateRangeSelect
          selectedCurrent={selectedCurrent}
          setSelectedCurrent={setSelectedCurrent}
          selectedPrevious={selectedPrevious}
          setSelectedPrevious={setSelectedPrevious}
        /> */}
        <DateRange onChange={dateRageChange}/>
        {/* customer_list-border */}
        <div className="flex items-center justify-between mt-4 mb-4">
          <h4 className="capitalize w600 whitespace-nowrap">customer list</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        {/* table */}
        <TableOrders data={dataTable} setSelectedCustomer={setSelectedCustomer} 
          keywordChange={keywordChange}
          sortingChange={sortingChange}/>
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
        <OrderPerformanceCard selectedCustomer={selectedCustomer} startDate={startDate} endDate={endDate}/>
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
