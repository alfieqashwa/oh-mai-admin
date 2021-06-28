import React, { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

export const OrderPerformanceCard = () => {
  const [selected, setSelected] = useState(performanceCards[0])
  return (
    <RadioGroup className="grid grid-cols-3" value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Performance</RadioGroup.Label>
      {performanceCards.map((c, i) => {
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
                <h5 className={`mt-5 text-opacity-50 w250 ${checked ? 'text-N800' : 'text-N0'}`}>{c.category}</h5>
                <div className="mt-3">
                  <h3 className={`w700 ${checked ? 'text-N800' : 'text-N0'}`}>
                    {c.category === 'net sales'
                      ? <>$NT{c.amount.toFixed(2)}</>
                      : <>${c.amount.toFixed(2)}</>
                    }
                  </h3>
                  <div className="flex items-center space-x-1">
                    {/* temporary logic */}
                    {c.percentage === '-'
                      ? <>
                        <FiArrowRight className={`w-5 h-5 ${checked ? 'text-N800' : 'text-N0'}`} />
                        <h5 className={`w250 ${checked ? 'text-N800' : 'text-N0'}`}>{c.percentage}</h5>
                      </>
                      : c.category === 'orders'
                        ? <>
                          <FiArrowDownRight className="w-5 h-5 text-R600" />
                          <h5 className="w250 text-R600">{c.percentage}%</h5>
                        </>
                        : <>
                          <FiArrowUpRight className="w-5 h-5 text-G400" />
                          <h5 className="w250 text-G400">{c.percentage}%</h5>
                        </>
                    }
                  </div>
                </div>
                <div className="my-4">
                  <p className={`text-opacity-50 w400 ${checked ? 'text-N800' : 'text-N0'}`}>Previous Year</p>
                  <p className={`w400 ${checked ? 'text-N800' : 'text-N0'}`}>${c.previousYear.toFixed(2)}</p>
                </div>
              </>
            )}
          </RadioGroup.Option>
        )
      })}
    </RadioGroup>)
}

const performanceCards = [
  { category: 'orders', amount: 100, percentage: 50, previousYear: 50 },
  { category: 'net sales', amount: 50, percentage: 50, previousYear: 25 },
  { category: 'items sold', amount: 50, percentage: 50, previousYear: 25 },
  { category: 'successful orders', amount: 50, percentage: 50, previousYear: 25 },
  { category: 'kol orders', amount: 50, percentage: 50, previousYear: 25 },
  { category: 'non-kol orders', amount: 50, percentage: 50, previousYear: 25 }
]
