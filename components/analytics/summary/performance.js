import React, { useState, useEffect, Fragment } from 'react'
import { RadioGroup, Menu, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  FiDollarSign,
  FiDownloadCloud
} from 'react-icons/fi'

import { AddCategoryModal } from './modal'
import { moneyFormat } from 'utils/money-format'
import { ArrowDirections } from 'components/widgets/PerformanceArrow'

export const PerformanceBorder = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-between mt-6 mb-4">
      <h4 className="w600">Performance</h4>
      <div className="w-full mx-5 border border-N0 border-opacity-30"></div>

      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button
              className={`bg-transparent focus:outline-none ${open ? 'text-P400' : 'text-N0'
                }`}
            >
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
                  ${!open
                    ? 'motion-safe:animate-bounce transition duration-200 ease-in-out'
                    : ''
                  }
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

                <Menu.Item
                  as="button"
                  className="flex items-center justify-between w-full px-4 py-2 space-x-4 transition duration-300 ease-in-out hover:bg-N300 bg-N0 whitespace-nowrap focus:outline-none"
                >
                  <FiDollarSign className="w-6 h-6" />
                  <h4 className="w250 text-N900">Edit Currency</h4>
                </Menu.Item>
                <Menu.Item
                  as="button"
                  className="flex items-center justify-between w-full px-4 py-2 space-x-4 transition duration-300 ease-in-out bg-N0 whitespace-nowrap hover:bg-N300 focus:outline-none"
                >
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

export const PerformanceCard = ({ data, setData }) => {
  const [selected, setSelected] = useState()
  const [cards, setCards] = useState([])
  // console.log(`DATA: ${data?.[0]?.title}`)

  async function loadData() {
    try {
      const result = await data[0]
      setSelected(result)
      // console.log(`RESULT: ${JSON.stringify(result, null, 2)}`)
      // console.log(`SELECTED: ${JSON.stringify(selected, null, 2)}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (Array.isArray(data)) {
      const arr = data.concat(performanceCards)
      setCards(arr)
    }
  }, [data])

  return (
    <RadioGroup
      className="grid grid-cols-3"
      value={selected}
      onChange={setSelected}
    >
      <RadioGroup.Label className="sr-only">Performance</RadioGroup.Label>
      {cards?.map((c, i) => {
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
                  {console.log(c)} {c.title}
                </h5>
                <div className="mt-3">
                  <h3 className={`w700 ${checked ? 'text-N800' : 'text-N0'}`}>
                    {c.type === 'currency' ? moneyFormat.format(c.performance) : c.performance}
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
                    {c.type === 'currency' ? moneyFormat.format(c.performance_last_year) : c.performance_last_year }
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

const performanceCards = [
]
