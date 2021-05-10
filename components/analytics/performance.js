import { useState, Fragment } from 'react'
import { RadioGroup, Menu, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDollarSign, FiDownloadCloud, FiArrowDownRight, FiArrowUpRight, FiArrowRight } from 'react-icons/fi'

import { AddCategoryModal } from './modal'

export const PerformanceBorder = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-between my-4" >
      <h4 className="w600">Performance</h4>
      <div className="w-full mx-5 border border-N0 border-opacity-30"></div>

      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button className={`bg-transparent focus:outline-none ${open ? "text-P400" : "text-N0"}`}>
              <BsThreeDotsVertical className="w-6 h-6" />
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-700"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className={`
                  ${!open ? "motion-safe:animate-bounce transition duration-200 ease-in-out" : ""}
                  absolute z-20 rounded shadow-xl bg-N0 right-2 top-10 focus:outline-none
                `}
              >
                {/* When it's clicked, then it will open the AddCategoryModal Component */}
                <Menu.Item
                  as="button"
                  onClick={() => setIsOpen(true)}
                  className="flex items-center justify-between w-full px-4 py-2 space-x-4 transition duration-300 ease-in-out hover:bg-N300 bg-N0 whitespace-nowrap focus:outline-none"
                >
                  <PlusCircleIcon className="w-6 h-6" />
                  <h4 className="w250 text-N900">Add Category</h4>
                </Menu.Item>

                <Menu.Item as="button" className="flex items-center justify-between w-full px-4 py-2 space-x-4 transition duration-300 ease-in-out hover:bg-N300 bg-N0 whitespace-nowrap focus:outline-none">
                  <FiDollarSign className="w-6 h-6" />
                  <h4 className="w250 text-N900">Edit Currency</h4>
                </Menu.Item>
                <Menu.Item as="button" className="flex items-center justify-between w-full px-4 py-2 space-x-4 transition duration-300 ease-in-out bg-N0 whitespace-nowrap hover:bg-N300 focus:outline-none">
                  <FiDownloadCloud className="w-6 h-6" />
                  <h4 className="w250 text-N900">Export</h4>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

      <AddCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

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
              relative px-5 cursor-pointer`
            }
          >
            {({ active, checked }) => (
              <>
                <h5 className={`mt-5 text-opacity-50 w250 ${checked ? "text-N800" : "text-N0"}`}>{c.category}</h5>
                <div className="mt-3">
                  <h3 className={`w700 ${checked ? "text-N800" : "text-N0"}`}>${c.amount}</h3>
                  <div className="flex items-center space-x-1">
                    {/* temporary logic */}
                    {c.percentage === '-'
                      ?
                      <>
                        <FiArrowRight className={`w-5 h-5 ${checked ? "text-N800" : "text-N0"}`} />
                        <h5 className={`w250 ${checked ? "text-N800" : "text-N0"}`}>{c.percentage}</h5>
                      </>
                      :
                      c.category === 'orders'
                        ?
                        <>
                          <FiArrowDownRight className="w-5 h-5 text-R600" />
                          <h5 className="w250 text-R600">{c.percentage}%</h5>
                        </>
                        :
                        <>
                          <FiArrowUpRight className="w-5 h-5 text-G400" />
                          <h5 className="w250 text-G400">{c.percentage}%</h5>
                        </>
                    }
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