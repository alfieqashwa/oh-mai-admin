import { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { Header } from 'components/header'
import {
  ChartView,
  DateRangeSelect,
  LeaderboardCardType,
  PerformanceBorder,
  PerformanceCard,
  TableSummary,
} from 'components/analytics/summary'

import { checkLogin } from 'utils/Auth'
import { getClient } from 'lib/graphqlclient'
import { GET_SUMMARY_PERFORMANCE } from 'graphql/order'

const GET_LEADERBOARD_PRODUCT = `{
  getLeaderBoardProduct {
    title
    total_order
    total_net_sales
  }
}`

const GET_LEADERBOARD_KOL = `{
  getLeaderBoardKol {
    title
    total_order
    total_net_sales
  }
}`

const GET_LEADER_BOARD_CUSTOMER = `{
  getLeaderBoardCustomer {
    title
    total_order
    total_net_sales
  }
}`

export default function Summary() {
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])

  const [leaderboardProduct, setLeaderboardProduct] = useState()
  const [leaderboardKol, setLeaderboardKol] = useState()
  const [leaderboardCustomer, setLeaderboardCustomer] = useState()

  const [getSummaryPerformance, setGetSummaryPerformance] = useState()

  useEffect(() => {
    console.log('Check login')
    checkLogin()
  }, [])

  const client = getClient()

  async function loadData() {
    try {
      const resultProduct = await client.request(GET_LEADERBOARD_PRODUCT)
      const resultKol = await client.request(GET_LEADERBOARD_KOL)
      const resultCustomer = await client.request(GET_LEADER_BOARD_CUSTOMER)

      const resultGetSummaryPerformance = await client.request(
        GET_SUMMARY_PERFORMANCE
      )

      setLeaderboardProduct(resultProduct.getLeaderBoardProduct)
      setLeaderboardKol(resultKol.getLeaderBoardKol)
      setLeaderboardCustomer(resultCustomer.getLeaderBoardCustomer)

      setGetSummaryPerformance(resultGetSummaryPerformance.getSumaryPerformance)

      // console.log(JSON.stringify(resultProduct, null, 2))
      // console.log(JSON.stringify(resultKol, null, 2))
      // console.log(JSON.stringify(resultCustomer, null, 2))
      // console.log(JSON.stringify(resultGetSummaryPerformance, null, 2))
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (leaderboardProduct) {
      console.log(`leaderboardProduct_title: ${leaderboardProduct?.title}`)
    }
    if (leaderboardKol) {
      console.log(`leaderboardKol_title: ${leaderboardKol?.title}`)
    }
    if (leaderboardCustomer) {
      console.log(`leaderboardCustomer_title: ${leaderboardCustomer?.title}`)
    }

    if (getSummaryPerformance) {
      console.log(
        `getSummaryPerformance_first_title: ${getSummaryPerformance[0]?.title}`
      )
    }
  }, [
    leaderboardProduct,
    leaderboardKol,
    leaderboardCustomer,
    getSummaryPerformance,
  ])

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
            title={leaderboardProduct?.title}
            totalOrder={leaderboardProduct?.total_order}
            totalNetSales={leaderboardProduct?.total_net_sales}
            leaderboardQuery={leaderboardProduct}
          />
          {/* Ends LeaderBoard Best Selling Product */}

          {/* Starts LeaderBoard Top KOL */}
          <LeaderboardCardType
            path="/analytics/summary/top-kol"
            cardName="top kol"
            title={leaderboardKol?.title}
            totalOrder={leaderboardKol?.total_order}
            totalNetSales={leaderboardKol?.total_net_sales}
            leaderboardQuery={leaderboardKol}
          />
          {/* Ends LeaderBoard Top KOL */}

          {/* Starts LeaderBoard Top Customer */}
          <LeaderboardCardType
            path="/analytics/summary/top-customer"
            cardName="top customer"
            title={leaderboardCustomer?.title}
            totalOrder={leaderboardCustomer?.total_order}
            totalNetSales={leaderboardCustomer?.total_net_sales}
            leaderboardQuery={leaderboardCustomer}
          />
          {/* Ends LeaderBoard Top Customer */}
        </div>

        {/* Performance */}
        <PerformanceBorder />

        {/* Performance's Cards */}
        <PerformanceCard
          data={getSummaryPerformance}
          setData={setGetSummaryPerformance}
        />

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
  { name: 'Previous Year (Jan 1 - Dec 31, 2020)' },
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
