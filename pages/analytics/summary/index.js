import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Header } from 'components/header'
import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'
import {
  ChartView,
  DateRangeSelect,
  LeaderboardCardType,
  PerformanceBorder,
  PerformanceCard,
  TableSummary
} from 'components/analytics/summary'
import { checkLogin } from 'utils/Auth'
import useFetch from 'hooks/useFetch'
// import { getClient } from 'lib/graphqlclient'
import {
  GET_LEADERBOARD_PRODUCT,
  GET_LEADERBOARD_KOL,
  GET_LEADERBOARD_CUSTOMER,
  GET_SUMMARY_PERFORMANCE
} from 'graphql/order'

export default function Summary() {
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])

  // const [leaderboardProduct, setLeaderboardProduct] = useState()
  // const [leaderboardKol, setLeaderboardKol] = useState()
  // const [leaderboardCustomer, setLeaderboardCustomer] = useState()

  // const [getSummaryPerformance, setGetSummaryPerformance] = useState()
  // const [getOrderSummaryChart, setGetOrderSummaryChart] = useState()
  // const [getOrderSummaryTable, setGetOrderSummaryTable] = useState()

  useEffect(() => {
    console.log('Check login')
    checkLogin()
  }, [])

  // const client = getClient()

  // async function loadData() {
  //   try {
  //     // const resultProduct = await client.request(GET_LEADERBOARD_PRODUCT)
  //     const resultKol = await client.request(GET_LEADERBOARD_KOL)
  //     const resultCustomer = await client.request(GET_LEADERBOARD_CUSTOMER)

  //     const resultGetSummaryPerformance = await client.request(
  //       GET_SUMMARY_PERFORMANCE
  //     )
  //     const resultGetOrderSummaryChart = await client.request(
  //       GET_ORDER_SUMMARY_CHART
  //     )
  //     const resultGetOrderSummaryTable = await client.request(
  //       GET_ORDER_SUMMARY_TABLE
  //     )

  //     // setLeaderboardProduct(resultProduct.getLeaderBoardProduct)
  //     setLeaderboardKol(resultKol.getLeaderBoardKol)
  //     setLeaderboardCustomer(resultCustomer.getLeaderBoardCustomer)

  //     setGetSummaryPerformance(resultGetSummaryPerformance.getSumaryPerformance)
  //     setGetOrderSummaryChart(resultGetOrderSummaryChart.getOrderSumaryChart)
  //     setGetOrderSummaryTable(resultGetOrderSummaryTable.getOrderSumaryTable)

  //     // console.log(JSON.stringify(resultProduct, null, 2))
  //     // console.log(JSON.stringify(resultKol, null, 2))
  //     // console.log(JSON.stringify(resultCustomer, null, 2))
  //     // console.log(JSON.stringify(resultGetSummaryPerformance, null, 2))
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // useEffect(() => {
  //   loadData()
  // }, [])

  // useEffect(() => {
  //   // if (leaderboardProduct) {
  //   //   console.log(`leaderboardProduct_title: ${leaderboardProduct?.title}`)
  //   // }
  //   if (leaderboardKol) {
  //     console.log(`leaderboardKol_title: ${leaderboardKol?.title}`)
  //   }
  //   if (leaderboardCustomer) {
  //     console.log(`leaderboardCustomer_title: ${leaderboardCustomer?.title}`)
  //   }
  //   if (getSummaryPerformance) {
  //     console.log(
  //       `getSummaryPerformance_first_title: ${getSummaryPerformance[0]?.title}`
  //     )
  //   }
  //   if (getOrderSummaryChart) {
  //     console.log(
  //       `getOrderSummaryChart_datetime: ${getOrderSummaryChart[0]?.order_datetime}`
  //     )
  //   }
  //   if (getOrderSummaryTable) {
  //     console.log(
  //       `getOrderSummaryTable_net_sales: ${getOrderSummaryTable[0]?.net_sales}`
  //     )
  //   }
  // }, [
  //   // leaderboardProduct,
  //   leaderboardKol,
  //   leaderboardCustomer,
  //   getSummaryPerformance,
  //   getOrderSummaryChart,
  //   getOrderSummaryTable
  // ])

  const {
    loading: loadingLeaderboardProduct,
    error: errorLeaderboardProduct,
    data: dataLeaderboardProduct
  } = useFetch(GET_LEADERBOARD_PRODUCT)
  const {
    loading: loadingLeaderboardKol,
    error: errorLeaderboardKol,
    data: dataLeaderboardKol
  } = useFetch(GET_LEADERBOARD_KOL)
  const {
    loading: loadingLeaderboardCustomer,
    error: errorLeaderboardCustomer,
    data: dataLeaderboardCustomer
  } = useFetch(GET_LEADERBOARD_CUSTOMER)

  const {
    loading: loadingSummaryPerformance,
    error: errorSummaryPerformance,
    data: dataSummaryPerformance
  } = useFetch(GET_SUMMARY_PERFORMANCE)

  if (
    loadingLeaderboardProduct ||
    loadingLeaderboardKol ||
    loadingLeaderboardCustomer ||
    loadingSummaryPerformance
  ) {
    return <LoadingStatus />
  }
  if (
    errorLeaderboardProduct ||
    errorLeaderboardKol ||
    errorLeaderboardCustomer ||
    errorSummaryPerformance
  ) {
    return (
      <ErrorStatus
        message={
          errorLeaderboardProduct.message ||
          errorLeaderboardKol.message ||
          errorLeaderboardCustomer.message ||
          errorSummaryPerformance.message
        }
      />
    )
  }

  const { getLeaderBoardProduct } = dataLeaderboardProduct
  const { getLeaderBoardKol } = dataLeaderboardKol
  const { getLeaderBoardCustomer } = dataLeaderboardCustomer
  const { getSumaryPerformance } = dataSummaryPerformance
  console.log(getSumaryPerformance)

  return (
    <div className="pb-4">
      <Header title="Analytics - Summary" />
      <div className="my-8 ml-6 mr-12">
        {/* header */}
        <h2 className="w800">Analytics - Summary</h2>

        {/* second row */}
        <DateRangeSelect
          selectedCurrent={selectedCurrent}
          setSelectedCurrent={setSelectedCurrent}
          selectedPrevious={selectedPrevious}
          setSelectedPrevious={setSelectedPrevious}
        />

        {/* Leaderboard */}
        <div className="flex items-center justify-between mt-10 mb-4">
          <h4 className="w600">Leaderboard</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>

        {/* Leaderboard's Cards */}
        <div className="grid grid-cols-3">
          {/* Starts LeaderBoard Best Selling Product */}
          <LeaderboardCardType
            path="/analytics/summary/best-selling-product"
            cardName="best selling product"
            title={getLeaderBoardProduct?.title}
            totalOrder={getLeaderBoardProduct?.total_order}
            totalNetSales={getLeaderBoardProduct?.total_net_sales}
            leaderboardQuery={getLeaderBoardProduct}
          />
          {/* Ends LeaderBoard Best Selling Product */}

          {/* Starts LeaderBoard Top KOL */}
          <LeaderboardCardType
            path="/analytics/summary/top-kol"
            cardName="top kol"
            title={getLeaderBoardKol?.title}
            totalOrder={getLeaderBoardKol?.total_order}
            totalNetSales={getLeaderBoardKol?.total_net_sales}
            leaderboardQuery={getLeaderBoardKol}
          />
          {/* Ends LeaderBoard Top KOL */}

          {/* Starts LeaderBoard Top Customer */}
          <LeaderboardCardType
            path="/analytics/summary/top-customer"
            cardName="top customer"
            title={getLeaderBoardCustomer?.title}
            totalOrder={getLeaderBoardCustomer?.total_order}
            totalNetSales={getLeaderBoardCustomer?.total_net_sales}
            leaderboardQuery={getLeaderBoardCustomer}
          />
          {/* Ends LeaderBoard Top Customer */}
        </div>

        {/* Performance */}
        <PerformanceBorder />

        {/* Performance's Cards */}
        <PerformanceCard data={getSumaryPerformance} />

        {/* Chart View */}
        <ChartView />

        {/* Table View */}
        <TableSummary />
      </div>
    </div>
  )
}

const dates = [
  { name: 'Current Year (Jan 1 - Dec 31, 2021)' },
  { name: 'Previous Year (Jan 1 - Dec 31, 2020)' }
]

// const leaderBoardCards = [
//   {
//     url: '/analytics/summary/best-selling-product',
//     category: 'best selling product',
//     product: 'Zelda: Breath of the Wild',
//     totalOrdersValue: '291',
//     netSalesValue: '18,000.00',
//   },
//   {
//     url: '/analytics/summary/top-kol',
//     category: 'top kol',
//     product: 'Lice Wang',
//     totalOrdersValue: '135',
//     netSalesValue: '10,000.00',
//   },
//   {
//     url: '/analytics/summary/top-customer',
//     category: 'top customer',
//     product: 'Fan Leng Leng',
//     totalOrdersValue: '5',
//     netSalesValue: '1,800.00',
//   },
// ]
