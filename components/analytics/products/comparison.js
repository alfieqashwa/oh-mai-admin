import { useState, useContext, Fragment } from "react"
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/solid"

import { DateRangeCtx } from 'pages/analytics/products'

const YearComparison = () => {
  const { startCurrent, endCurrent, startPrevious, endPrevious } = useContext(DateRangeCtx)

  const [compareTo, setCompareTo] = useState(yearCompareOptions[0])
  const [withOption, setWithOption] = useState(yearWithOptions[0])

  let currentDate = []
  if (compareTo.id === 2021) {
    currentDate = [new Date(2021, 0, 1), new Date()]
  } else if (compareTo.id === 2020) {
    currentDate = [new Date(2020, 0, 1), new Date(2020, 11, 31)]
  } else if (compareTo.id === 2019) {
    currentDate = [new Date(2019, 0, 1), new Date(2019, 11, 31)]
  } else if (compareTo.id === 2018) {
    currentDate = [new Date(2018, 0, 1), new Date(2018, 11, 31)]
  } else if (compareTo.id === 2017) {
    currentDate = [new Date(2017, 0, 1), new Date(2017, 11, 31)]
  } else {
    []
  }

  let previousDate = []
  if (withOption.id === 2020) {
    previousDate = [new Date(2020, 0, 1), new Date(2020, 11, 31)]
  } else if (withOption.id === 2019) {
    previousDate = [new Date(2019, 0, 1), new Date(2019, 11, 31)]
  } else if (withOption.id === 2018) {
    previousDate = [new Date(2018, 0, 1), new Date(2018, 11, 31)]
  } else if (withOption.id === 2017) {
    previousDate = [new Date(2017, 0, 1), new Date(2017, 11, 31)]
  } else {
    []
  }

  const onSubmit = (e) => {
    e.preventDefault()
    startCurrent[1](currentDate?.[0])
    endCurrent[1](currentDate?.[1])
    startPrevious[1](previousDate?.[0])
    endPrevious[1](previousDate?.[1])
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-start justify-between w-full space-x-7">

        {/* Compare to */}
        <div className="w-1/2">
          <p className="text-black w400">Compare</p>
          <Listbox value={compareTo} onChange={setCompareTo}>
            {({ open }) => (
              <>
                <Listbox.Button className="bg-N100 mt-1.5 h-16 w-full">
                  <div className="flex items-center justify-between px-4">
                    <p className="text-left normal-case text-N450 w400">
                      {compareTo.name}
                    </p>
                    <ChevronDownIcon
                      className={`w-8 h-8 ${open ? "transform rotate-180 text-P700" : ""}`}
                      aria-hidden="true"
                    />
                  </div>
                </Listbox.Button>
                <Transition
                  show={open}
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options static className="w-full text-left bg-N100 mr-7">
                    {yearCompareOptions.map(y => (
                      <Listbox.Option
                        key={y.id}
                        value={y}
                        disabled={y.disabled}
                      >
                        <p className="py-2 pl-5 transition duration-200 ease-in-out text-N800 hover:bg-P700 hover:text-N0">
                          {y.name}
                        </p>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
        </div>

        {/* With options */}
        <div className="w-1/2">
          <p className="text-black w400">With</p>
          <Listbox value={withOption} onChange={setWithOption}>
            {({ open }) => (
              <>
                <Listbox.Button className="bg-N100 mt-1.5 h-16 w-full">
                  <div className="flex items-center justify-between px-4">
                    <p className="text-left normal-case text-N450 w400">{withOption.name}</p>
                    <ChevronDownIcon
                      className={`w-8 h-8 ${open ? "transform rotate-180 text-P700" : ""}`}
                      aria-hidden="true"
                    />
                  </div>
                </Listbox.Button>
                <Transition
                  show={open}
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options static className="w-full text-left bg-N100 mr-7">
                    {yearWithOptions.map(y => (
                      <Listbox.Option
                        key={y.id}
                        value={y}
                        disabled={y.disabled}
                      >
                        <p className="py-2 pl-5 transition duration-200 ease-in-out text-N800 hover:bg-P700 hover:text-N0">
                          {y.name}
                        </p>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
        </div>
      </div>
      {/* Apply & Reset button */}
      <div className="flex items-center justify-center pb-10 space-x-5 mt-11">
        <button type="button" className="px-20 py-4 uppercase bg-N50">
          <h4 className="text-N450 w250">reset</h4>
        </button>
        <button type="submit" className="px-20 py-4 uppercase text-N0">apply</button>
      </div>
    </form>
  )
}

const MonthComparison = () => {
  return (
    <>
      <div className="w-1/2">
        <p className="text-black w400">Current</p>
      </div>
      <div className="w-1/2">
      </div>
    </>
  )
}

export { YearComparison, MonthComparison }

const yearCompareOptions = [
  { id: 0, name: 'Select a year', disabled: true },
  { id: 2021, name: '2021', disabled: false },
  { id: 2020, name: '2020', disabled: false },
  { id: 2019, name: '2019', disabled: false },
  { id: 2018, name: '2018', disabled: false },
  { id: 2017, name: '2017', disabled: false },
]
const yearWithOptions = [
  { id: 0, name: 'Select a year', disabled: true },
  { id: 2020, name: '2020', disabled: false },
  { id: 2019, name: '2019', disabled: false },
  { id: 2018, name: '2018', disabled: false },
  { id: 2017, name: '2017', disabled: false },
]