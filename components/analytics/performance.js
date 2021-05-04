import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiArrowDownRight, FiArrowUpRight, FiArrowRight } from 'react-icons/fi'

export const PerformanceBorder = () => (
  <div className="flex items-center justify-between my-4" >
    <h4 className="w600">Performance</h4>
    <div className="w-full mx-5 border border-N0 border-opacity-30"></div>
    <BsThreeDotsVertical className="w-6 h-6 mr-2 text-N0" />
  </div>
)

export const PerformanceCard = () => {
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
                ? "ring-1 ring-offset-P900"
                : ""
              }
              ${checked
                ? "bg-N0 bg-opacity-80 border-t-4 border-P700"
                : "bg-[#E0E0F24D] bg-opacity-30 border-[1px] border-opacity-60 border-[#A0A0AD99]"
              }
              relative px-5 `
            }
          >
            {({ active, checked }) => (
              <>
                <h5 className={`mt-5 text-opacity-50 w250 ${checked ? "text-N800" : "text-N0"}`}>{c.category}</h5>
                <div className="mt-3">
                  <h3 className={`w700 ${checked ? "text-N800" : "text-N0"}`}>${c.amount}</h3>
                  <div className="flex items-center space-x-1">
                    <FiArrowUpRight className="w-5 h-5 text-G400" />
                    <h5 className="w250 text-G400">{c.percentage}%</h5>
                  </div>
                </div>
                <div className="my-4">
                  <p className={`text-opacity-50 w400 ${checked ? "text-N800" : "text-N0"}`}>Previous Year</p>
                  <p className={`w400 ${checked ? "text-N800" : "text-N0"}`}>${c.previousYear}</p>
                </div>
              </>
            )}
          </RadioGroup.Option>
        )
      })}
    </RadioGroup>)
}

const performanceCards = [
  { category: "gross sales", amount: "500.00", percentage: "50", previousYear: "250.00" },
  { category: "net sales", amount: "500.00", percentage: "50", previousYear: "250.00" },
  { category: "orders", amount: "100", percentage: "50", previousYear: "200" },
  { category: "average order value", amount: "5.00", percentage: "400", previousYear: "250.00" },
  { category: "refunds", amount: "0.00", percentage: "-", previousYear: "50.00" },
  { category: "gross profit", amount: "500.00", percentage: "50", previousYear: "150.00" },
]