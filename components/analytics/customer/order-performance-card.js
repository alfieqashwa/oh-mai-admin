/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { GET_ORDER_CUSTOMER_YEARLY } from 'graphql/customer'
// import useFetch from 'hooks/useFetch'
import { loadPerformanceAnalyticCustomer } from 'services/api/analytics_customer'
import { ArrowDirections } from 'components/widgets/PerformanceArrow'
import { moneyFormat } from 'utils/money-format'

export const OrderPerformanceCard = (props) => {
  const [selected, setSelected] = useState()
  const [performances, setPerformances] = useState([])
  const [dataArr, setDataArr] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const arr = []
  const taskQueues = [] // to make loadData() running serial, to prevent data race

  const loadData = async () => {
    console.log('>OrderPerformanceCard/[props.selectedCustomer]/loadData/props=' + JSON.stringify(props))

    if (props.selectedCustomer) {
      console.log('>OrderPerformanceCard/[props.selectedCustomer]/props/A')
      const customerId = props.selectedCustomer.customer_id
      const timeMode = props.timeMode ? props.timeMode : '24h'
      setIsLoading(true)
      const result = await loadPerformanceAnalyticCustomer({ startDate: props.startDate, endDate: props.endDate, customerId: customerId, timeMode: timeMode })
      setIsLoading(false)
      console.log('OrderPerformanceCard', result.data)
      console.log('OrderPerformanceCard/props.selectedCustomer', props.selectedCustomer)
      setPerformances(result.data)

      if (taskQueues.length > 0) {
        taskQueues.shift()
        loadData()
      }
      // setTimeout(() => {
      //   setPerformances([])
      // }, 3000)
    } else {
      console.log('>OrderPerformanceCard/[props.selectedCustomer]/props/B')
      console.log('>OrderPerformanceCard/[props.selectedCustomer]/props/B/tasq=' + JSON.stringify(taskQueues))
      if (taskQueues.length > 0) {
        taskQueues.shift()
      }
      setPerformances([])
    }
  }

  useEffect(async () => {
    console.log('OrderPerformanceCard/init/props.customerId', props)
  }, [])

  useEffect(async () => {
    if (isLoading) {
      taskQueues.push('-')
    } else {
      await loadData()
    }
  }, [props.selectedCustomer])

  useEffect(async () => {
    if (isLoading) {
      taskQueues.push('-')
    } else {
      await loadData()
    }
  }, [props.startDate])

  useEffect(async () => {
    if (isLoading) {
      taskQueues.push('-')
    } else {
      await loadData()
    }
  }, [props.endDate])

  return (
    <RadioGroup className="grid grid-cols-3" value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Performance</RadioGroup.Label>
      {/* <div className="text-N200">performances.length = {performances.length}</div> */}
      {performances.map((c, i) => {
        return (
          <RadioGroup.Option
            key={i}
            value={c}
            className={({ active, checked }) =>
              `${active
                ? 'ring-1 ring-offset-P900'
                : ''
              }
              ${checked
                ? 'bg-N0 bg-opacity-80 border-t-4 border-P700'
                : 'bg-[#E0E0F24D] bg-opacity-30 border-[1px] border-opacity-60 border-[#A0A0AD99]'
              }
              relative px-5 cursor-pointer`
            }
          >
            {({ active, checked }) => (
              <>
                <h5 className={`mt-5 text-opacity-50 w250 ${checked ? 'text-N800' : 'text-N0'}`}>{c.title}</h5>
                <div className="mt-3">
                  <h3 className={`w700 ${checked ? 'text-N800' : 'text-N0'}`}>
                    {c.type === 'currency'
                      ? <>{moneyFormat.format(c.performance.toFixed(2))}</>
                      : <>{c.performance.toFixed(2)}</>
                    }
                  </h3>
                  <div className="flex items-center space-x-1">
                    {/* temporary logic */}
                    <ArrowDirections item={c} checked={checked} />
                  </div>
                </div>
                <div className="my-4">
                  <p className={`text-opacity-50 w400 ${checked ? 'text-N800' : 'text-N0'}`}>Previous Year</p>
                  <p className={`w400 ${checked ? 'text-N800' : 'text-N0'}`}>
                    {c.type === 'currency' ? moneyFormat.format(c.performance_last_year.toFixed(2)) : c.performance_last_year.toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </RadioGroup.Option>
        )
      })}
    </RadioGroup>)
}

// const performanceCards = [
//   { category: 'orderssss', amount: 100, percentage: 50, previousYear: 50 },
//   { category: 'net sales', amount: 50, percentage: 50, previousYear: 25 },
//   { category: 'items sold', amount: 50, percentage: 50, previousYear: 25 },
//   { category: 'successful orders', amount: 50, percentage: 50, previousYear: 25 },
//   { category: 'kol orders', amount: 50, percentage: 50, previousYear: 25 },
//   { category: 'non-kol orders', amount: 50, percentage: 50, previousYear: 25 }
// ]
