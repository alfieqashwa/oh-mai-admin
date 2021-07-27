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
  const arr = []

  // const {
  //   loading: loadgOrderCust,
  //   error: errOrderCust,
  //   data: performanceOrderCust
  // } = useFetch(GET_ORDER_CUSTOMER_YEARLY)

  // useEffect(() => {
  //   console.log('OrderPerformanceCard/performanceOrderCust', 'init')

  //   if (performanceOrderCust) {
  //     console.log('OrderPerformanceCard/performanceOrderCust', performanceOrderCust)
  //     arr.push(performanceCards)
  //     const tmpArr = dataArr.concat(arr)
  //     setDataArr(tmpArr)
  //   }
  // }, [])

  useEffect(async () => {
    console.log('OrderPerformanceCard/init/props.customerId', props)
    // const customerId = props.selectedCustomer?.customer_id
    // const result = await loadPerformanceAnalyticCustomer({ startDate: null, endDate: null, customerId: customerId })
    // console.log('OrderPerformanceCard', result.data)
    // setPerformances(result.data)
  }, [])

  useEffect(async () => {
    console.log('>OrderPerformanceCard/[props.selectedCustomer]/props.customerId', props?.selectedCustomer?.customer_id)
    if (props.selectedCustomer) {
      const customerId = props.selectedCustomer.customer_id

      const result = await loadPerformanceAnalyticCustomer({ startDate: null, endDate: null, customerId: customerId })
      console.log('OrderPerformanceCard', result.data)
      setPerformances(result.data)
    }
  }, [props.selectedCustomer])

  return (
    <RadioGroup className="grid grid-cols-3" value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Performance</RadioGroup.Label>
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
