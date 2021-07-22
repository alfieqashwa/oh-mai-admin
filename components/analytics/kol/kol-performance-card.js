import React, { useState } from 'react'
import useSWR from 'swr'
import { RadioGroup } from '@headlessui/react'

import { moneyFormat } from 'utils/money-format'
import { ErrorStatus } from 'components/error-status'
import { LoadingStatus } from 'components/loading-status'

import { GET_ANALYTIC_KOL_PERFORMANCE } from 'graphql/kol'
import { ArrowDirections } from 'components/widgets/PerformanceArrow'

export const KolPerformanceCard = () => {
  const { data, error } = useSWR(GET_ANALYTIC_KOL_PERFORMANCE)
  const [selected, setSelected] = useState()

  if (error) return <ErrorStatus message={error.message} />
  if (!data) return <LoadingStatus />

  // console.log(selected)

  return (
    <RadioGroup
      className="grid grid-cols-3"
      value={selected}
      onChange={setSelected}
    >
      <RadioGroup.Label className="sr-only">Performance</RadioGroup.Label>
      {data.getAnalyticKolPerformance.map((c, i) => {
        return (
          <RadioGroup.Option
            key={i}
            value={c}
            className={({ active, checked }) =>
              `${active ? 'ring-1 ring-offset-P900' : ''}
              ${
                checked
                  ? 'bg-N0 bg-opacity-80 border-t-4 border-P700'
                  : 'bg-[#E0E0F24D] bg-opacity-30 border-[1px] border-opacity-60 border-[#A0A0AD99]'
              }
              relative px-5 cursor-pointer`
            }
          >
            {({ active, checked }) => (
              <>
                <h5
                  className={`mt-5 text-opacity-50 w250 ${
                    checked ? 'text-N800' : 'text-N0'
                  }`}
                >
                  {c.title}
                </h5>
                <div className="mt-3">
                  <h3 className={`w700 ${checked ? 'text-N800' : 'text-N0'}`}>
                    {moneyFormat.format(c.performance)}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {/* temporary logic */}
                    <ArrowDirections item={c} checked={checked} />
                  </div>
                </div>
                <div className="my-4">
                  <p
                    className={`text-opacity-50 w400 ${
                      checked ? 'text-N800' : 'text-N0'
                    }`}
                  >
                    Previous Year
                  </p>
                  <p className={`w400 ${checked ? 'text-N800' : 'text-N0'}`}>
                    {c.performance_last_year &&
                      c.performance_last_year.toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </RadioGroup.Option>
        )
      })}
    </RadioGroup>
  )
}

// const performanceCards = [
//   { category: 'commissions', amount: 500, percentage: 200, previousYear: 250 },
//   {
//     category: 'successful orders',
//     amount: 500,
//     percentage: 200,
//     previousYear: 250
//   },
//   { category: 'gross sales', amount: 1000, percentage: 200, previousYear: 500 },
//   { category: 'net sales', amount: 800, percentage: 200, previousYear: 400 }
// ]
