import React, { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

import { moneyFormat } from 'utils/money-format'

export const ProductPerformanceCard = ({ data, setData }) => {
  const [selected, setSelected] = useState(data?.[2])

  const ArrowDirections = ({ item, checked }) => {
    if (item.precentage_change > 0) {
      return (<ArrowUpRight item={item} checked={checked} />)
    } else if (item.precentage_change < 0) {
      return (<ArrowDownRight item={item} checked={checked} />)
    } else {
      return (<ArrowRight item={item} checked={checked} />)
    }
  }

  const ArrowRight = ({ item, checked }) => {
    return (
      <>
        <FiArrowRight className={`w-5 h-5 ${checked ? 'text-N800' : 'text-N0'}`} />
        <h5 className={`w250 ${checked ? 'text-N800' : 'text-N0'}`}>{item.precentage_change}</h5>
      </>
    )
  }

  const ArrowDownRight = ({ item }) => {
    return (
      <>
        <FiArrowDownRight className="w-5 h-5 text-R600" />
        <h5 className="w250 text-R600">
          {item.precentage_change}%
        </h5>
      </>
    )
  }

  const ArrowUpRight = ({ item }) => {
    return (
      <>
        <FiArrowUpRight className="w-5 h-5 text-G400" />
        <h5 className="w250 text-G400">
          {item.precentage_change}%
        </h5>
      </>
    )
  }

  return (
    <RadioGroup
      className="grid grid-cols-3"
      value={selected}
      onChange={setSelected}
    >
      <RadioGroup.Label className="sr-only">Performance</RadioGroup.Label>
      {data?.map((c, i) => {
        return (
          <RadioGroup.Option
            key={i}
            value={c}
            className={({ active, checked }) =>
              `${active ? 'ring-1 ring-offset-P900' : ''}
              ${checked
                ? 'bg-N0 bg-opacity-80 border-t-4 border-P700'
                : 'bg-[#E0E0F24D] bg-opacity-30 border-[1px] border-opacity-60 border-[#A0A0AD99]'
              }
              relative px-5 cursor-pointer`
            }
          >
            {({ active, checked }) => (
              <>
                <h5
                  className={`mt-5 text-opacity-50 w250 ${checked ? 'text-N800' : 'text-N0'
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
                    className={`text-opacity-50 w400 ${checked ? 'text-N800' : 'text-N0'
                      }`}
                  >
                    Previous Year
                  </p>
                  <p className={`w400 ${checked ? 'text-N800' : 'text-N0'}`}>
                    ${c.performance_last_year.toFixed(2)}
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
//   { category: 'orders', amount: 10, percentage: 50, previousYear: 0.0 },
//   { category: 'net sales', amount: 1000.0, percentage: 50, previousYear: 0.0 },
//   { category: 'items sold', amount: 100.0, percentage: 50, previousYear: 50.0 },
// ]
