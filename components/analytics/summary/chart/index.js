import React, { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { AiOutlineBarChart, AiOutlineLineChart } from 'react-icons/ai'

import { ChartArea } from './chart-area'
import { ChartBar } from './chart-bar'
import { Select } from './select'
import { rangeDate } from './range-date'

import { GET_ORDER_SUMMARY_CHART } from 'graphql/order'
import useFetch from 'hooks/useFetch'
import { moneyFormat } from 'utils/money-format'
import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'

export function Chart({ selected }) {
  const [dateRange, setDateRange] = useState(rangeDate[1])
  const [plan, setPlan] = useState('area')
  const {
    loading,
    error,
    data: dataOrderSummaryChart
  } = useFetch(GET_ORDER_SUMMARY_CHART)

  if (loading) {
    return <LoadingStatus />
  }
  if (error) {
    return <ErrorStatus message={error.message} />
  }

  const { getOrderSumaryChart: data } = dataOrderSummaryChart

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 mb-12 bg-N200">
        <h3 className="text-black w250">Chart</h3>
        <div className="flex items-center justify-start pl-12 space-x-3">
          <input
            type="checkbox"
            name="current"
            className="w-6 h-6 rounded bg-P700 focus:outline-none focus:ring checked:text-P700 focus:ring-P700"
          />
          <div>
            <p className="text-black w350">
              Current Year (Jan 1 - Dec 31, 2021)
            </p>
            <h5 className="text-black w250-m">
              {selected?.type === 'currency'
                ? moneyFormat.format(selected?.performance)
                : selected?.performance}
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-start space-x-3">
          <input
            type="checkbox"
            name="current"
            className="w-6 h-6 rounded bg-G400 focus:outline-none focus:ring checked:text-G400 focus:ring-G400"
          />
          <div>
            <p className="text-black w350">
              Previous Year (Jan 1 - Dec 31, 2021)
            </p>
            <h5 className="text-black w250-m">
              {selected?.type === 'currency'
                ? moneyFormat.format(selected?.performance_last_year)
                : selected?.performance_last_year}
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-1">
          <Select dateRange={dateRange} setDateRange={setDateRange} />
          <RadioGroup value={plan} onChange={setPlan}>
            <div className="flex items-center justify-between space-x-4">
              <RadioGroup.Option value="bar">
                {({ checked, active }) => (
                  <button
                    type="button"
                    className={`px-2 transition shadow-lg duration-200 ease-in-out bg-transparent focus:outline-none hover:bg-N250 
                      ${
                        checked
                          ? 'shadow-inner border-l border-t border-N250'
                          : ''
                      }`}
                  >
                    <AiOutlineBarChart className="w-6 h-6 font-primary text-P700" />
                  </button>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="area">
                {({ checked, active }) => (
                  <button
                    type="button"
                    className={`px-2 transition shadow-lg duration-200 ease-in-out bg-transparent focus:outline-none hover:bg-N250 
                      ${
                        checked
                          ? 'shadow-inner border-l border-t border-N250'
                          : ''
                      }`}
                  >
                    <AiOutlineLineChart className="w-6 h-6 text-P700" />
                  </button>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* <ChartBar/> */}
      {plan === 'bar' && (
        <section className="px-4">
          <ChartBar data={data} dateRange={dateRange} />
        </section>
      )}
      {/* <ChartArea /> */}
      {plan === 'area' && (
        <section className="px-4">
          <ChartArea data={data} dateRange={dateRange} />
        </section>
      )}
    </>
  )
}
