import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { Header } from 'components/header'
import {
  DateRangeSelect,
  KolLeaderboard,
  TableOrders,
  KolPerformanceCard,
  ChartView
} from 'components/analytics/kol'
import { checkLogin } from 'utils/Auth'

export default function Kol() {
  const [selectedCurrent, setSelectedCurrent] = useState(dates[0])
  const [selectedPrevious, setSelectedPrevious] = useState(dates[1])

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className="pb-4">
      <Header title="Analytics - KOL" />
      <div className="my-8 ml-6 mr-12">
        {/* header */}
        <h2 className="w800">KOL Analytics</h2>
        {/* second row */}

        {/* Leaderboard */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <h4 className="w600">Leaderboard</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>

        {/* Leaderboard's Cards */}
        <KolLeaderboard />

        {/* Table-Orders */}
        <TableOrders />

        {/* Performance-border */}
        <div className="flex items-center justify-between mt-10 mb-4">
          <h4 className="w600 whitespace-nowrap">KOL Performance</h4>
          <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
          <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
        </div>
        <DateRangeSelect
          selectedCurrent={selectedCurrent}
          setSelectedCurrent={setSelectedCurrent}
          selectedPrevious={selectedPrevious}
          setSelectedPrevious={setSelectedPrevious}
        />
        <div className="mt-7">
          <KolPerformanceCard />
          <ChartView />
        </div>
      </div>
    </div>
  )
}

// const leaderBoardCards = [
//   {
//     url: '/analytics/kol/top-sales-from-kol',
//     category: 'top sales from KOL',
//     product: 'charlene yue',
//     totalOrdersValue: '135',
//     netSalesValue: '10,000.00'
//   },
//   {
//     url: '/analytics/kol/most-orders-from-kol',
//     category: 'most orders from KOL',
//     product: 'ruden',
//     totalOrdersValue: '249',
//     netSalesValue: '7,398.15'
//   },
//   {
//     url: '/analytics/kol/most-items-sold-from-kol',
//     category: 'most items sold from KOL',
//     product: 'charlene yue',
//     totalOrdersValue: '149',
//     netSalesValue: '10,000.00'
//   }
// ]

// const tableBody = [
//   {
//     id: 1,
//     sn: '1',
//     kol: 'charlene yue',
//     itemsSold: 100,
//     netSales: 1000.0,
//     orders: 10,
//     totalCommissions: 120,
//     status: true,
//   },
//   {
//     id: 2,
//     sn: '2',
//     kol: 'lice wang',
//     itemsSold: 24,
//     netSales: 400.0,
//     orders: 10,
//     totalCommissions: 40,
//     status: false,
//   },
//   {
//     id: 3,
//     sn: '3',
//     kol: 'sky game',
//     itemsSold: 2,
//     netSales: 200.0,
//     orders: 1,
//     totalCommissions: 30,
//     status: false,
//   },
//   {
//     id: 4,
//     sn: '4',
//     kol: 'molly',
//     itemsSold: 1,
//     netSales: 10.0,
//     orders: 1,
//     totalCommissions: 0.05,
//     status: false,
//   },
// ]

const dates = [
  { name: 'Current Year (Jan 1 - Dec 31, 2021)' },
  { name: 'Previous Year (Jan 1 - Dec 31, 2020)' }
]
