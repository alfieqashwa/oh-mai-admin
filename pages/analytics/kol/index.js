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

const dates = [
  { name: 'Current Year (Jan 1 - Dec 31, 2021)' },
  { name: 'Previous Year (Jan 1 - Dec 31, 2020)' }
]
