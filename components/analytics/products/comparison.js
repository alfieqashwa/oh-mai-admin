import React, { useState, useContext, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { getDaysInMonth, getYear } from 'date-fns'

import { DateRangeCtx } from 'pages/analytics/products'

const YearComparison = () => {
  const { startCurrent, endCurrent, startPrevious, endPrevious } = useContext(DateRangeCtx)
  const [compareTo, setCompareTo] = useState()
  const [withOption, setWithOption] = useState()

  let currentDate = []
  switch (true) {
    case compareTo?.id === 2021:
      currentDate = [new Date(2021, 0, 1), new Date()]
      break
    case compareTo?.id === 2020:
      currentDate = [new Date(2020, 0, 1), new Date(2020, 11, 31)]
      break
    case compareTo?.id === 2019:
      currentDate = [new Date(2019, 0, 1), new Date(2019, 11, 31)]
      break
    case compareTo?.id === 2018:
      currentDate = [new Date(2018, 0, 1), new Date(2018, 11, 31)]
      break
    case compareTo?.id === 2017:
      currentDate = [new Date(2017, 0, 1), new Date(2017, 11, 31)]
      break
    default:
      currentDate = []
  }

  let previousDate = []
  switch (true) {
    case withOption?.id === 2020:
      previousDate = [new Date(2020, 0, 1), new Date(2020, 11, 31)]
      break
    case withOption?.id === 2019:
      previousDate = [new Date(2019, 0, 1), new Date(2019, 11, 31)]
      break
    case withOption?.id === 2018:
      previousDate = [new Date(2018, 0, 1), new Date(2018, 11, 31)]
      break
    case withOption?.id === 2017:
      previousDate = [new Date(2017, 0, 1), new Date(2017, 11, 31)]
      break
    default:
      previousDate = []
  }

  function onReset() {
    startCurrent[1]()
    endCurrent[1]()
    startPrevious[1]()
    endPrevious[1]()
    setCompareTo()
    setWithOption()
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
                    <p className={`text-left normal-case w400 ${open ? 'text-P700' : 'text-N450'}`}>
                      {compareTo ? compareTo?.name : 'Select a year'}
                    </p>
                    <ChevronDownIcon
                      className={`w-8 h-8 ${open ? 'transform rotate-180 text-P700' : ''}`}
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
                  <Listbox.Options static className="w-full mt-1 text-left shadow-md bg-N100 mr-7">
                    {yearCompareOptions.map(y => (
                      <Listbox.Option
                        key={y.id}
                        value={y}
                        disabled={y.disabled}
                      >
                        <p className={`${y.disabled ? 'opacity-50' : ''} py-2 pl-5 transition duration-200 ease-in-out text-N800 hover:bg-P700 hover:text-N0`}>
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
                    <p className={`text-left normal-case w400 ${open ? 'text-P700' : 'text-N450'}`}>
                      {withOption ? withOption?.name : 'Select a year'}
                    </p>
                    <ChevronDownIcon
                      className={`w-8 h-8 ${open ? 'transform rotate-180 text-P700' : ''}`}
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
                  <Listbox.Options static className="w-full mt-1 text-left shadow-md bg-N100 mr-7">
                    {yearWithOptions.map(y => (
                      <Listbox.Option
                        key={y.id}
                        value={y}
                        disabled={y.disabled}
                      >
                        <p className={`${y.disabled ? 'opacity-50' : ''} py-2 pl-5 transition duration-200 ease-in-out text-N800 hover:bg-P700 hover:text-N0`}>
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
        <button type="button" onClick={onReset} className="px-20 py-4 uppercase bg-N50">
          <h4 className="text-N450 w250">reset</h4>
        </button>
        <button type="submit" disabled={!compareTo || !withOption} className="px-20 py-4 uppercase disabled:opacity-50 disabled:cursor-not-allowed text-N0">apply</button>
      </div>
    </form>
  )
}

const MonthComparison = () => {
  const { startCurrent, endCurrent, startPrevious, endPrevious } = useContext(DateRangeCtx)
  const [compareTo, setCompareTo] = useState()
  const [withOption, setWithOption] = useState()

  const todaysYear = getYear(new Date()) // so in the next year, this would be relevant as well.
  const februaryDays = getDaysInMonth(new Date(todaysYear, 1)) // leap year (28 or 29 days in February)

  // COMMENT IN BELOW to test how many days on Feb in the leap year (eg. 2020, 2024, 2028, etc):
  // const februaryDays = getDaysInMonth(new Date(2024, 1)) // testing leap year. it works

  const january = [new Date(todaysYear, 0, 1), new Date(todaysYear, 0, 31)]
  const february = [new Date(todaysYear, 1, 1), new Date(todaysYear, 1, februaryDays)]
  // const february = [new Date(todaysYear, 1, 1), new Date(2024, 1, februaryDays)]
  const march = [new Date(todaysYear, 2, 1), new Date(todaysYear, 2, 31)]
  const april = [new Date(todaysYear, 3, 1), new Date(todaysYear, 3, 30)]
  const may = [new Date(todaysYear, 4, 1), new Date(todaysYear, 4, 31)]
  const june = [new Date(todaysYear, 5, 1), new Date(todaysYear, 5, 30)]
  const july = [new Date(todaysYear, 6, 1), new Date(todaysYear, 6, 31)]
  const august = [new Date(todaysYear, 7, 1), new Date(todaysYear, 7, 31)]
  const september = [new Date(todaysYear, 8, 1), new Date(todaysYear, 8, 30)]
  const october = [new Date(todaysYear, 9, 1), new Date(todaysYear, 9, 31)]
  const november = [new Date(todaysYear, 10, 1), new Date(todaysYear, 10, 30)]
  const december = [new Date(todaysYear, 11, 1), new Date(todaysYear, 11, 31)]

  let currentDate = []
  switch (true) {
    case compareTo?.id === 1:
      currentDate = january
      break
    case compareTo?.id === 2:
      currentDate = february
      break
    case compareTo?.id === 3:
      currentDate = march
      break
    case compareTo?.id === 4:
      currentDate = april
      break
    case compareTo?.id === 5:
      currentDate = may
      break
    case compareTo?.id === 6:
      currentDate = june
      break
    case compareTo?.id === 7:
      currentDate = july
      break
    case compareTo?.id === 8:
      currentDate = august
      break
    case compareTo?.id === 9:
      currentDate = september
      break
    case compareTo?.id === 10:
      currentDate = october
      break
    case compareTo?.id === 11:
      currentDate = november
      break
    case compareTo?.id === 12:
      currentDate = december
      break
    default:
      currentDate = []
  }

  let previousDate = []
  switch (true) {
    case withOption?.id === 1:
      previousDate = january
      break
    case withOption?.id === 2:
      previousDate = february
      break
    case withOption?.id === 3:
      previousDate = march
      break
    case withOption?.id === 4:
      previousDate = april
      break
    case withOption?.id === 5:
      previousDate = may
      break
    case withOption?.id === 6:
      previousDate = june
      break
    case withOption?.id === 7:
      previousDate = july
      break
    case withOption?.id === 8:
      previousDate = august
      break
    case withOption?.id === 9:
      previousDate = september
      break
    case withOption?.id === 10:
      previousDate = october
      break
    case withOption?.id === 11:
      previousDate = november
      break
    case withOption?.id === 12:
      previousDate = december
      break
    default:
      previousDate = []
  }

  function onReset() {
    startCurrent[1]()
    endCurrent[1]()
    startPrevious[1]()
    endPrevious[1]()
    setCompareTo()
    setWithOption()
  }

  const onSubmit = e => {
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
                      {compareTo ? compareTo?.name : 'Select a month'}
                    </p>
                    <ChevronDownIcon
                      className={`w-8 h-8 ${open ? 'transform rotate-180 text-P700' : ''}`}
                      aria-hidden="true"
                    />
                  </div>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  show={open}
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options static className="w-full mt-1 text-left shadow-md bg-N100 mr-7">
                    {monthCompareOptions.map(m => (
                      <Listbox.Option
                        key={m.id}
                        value={m}
                        disabled={m.disabled}
                      >
                        <p className="py-2 pl-5 transition duration-200 ease-in-out text-N800 hover:bg-P700 hover:text-N0">
                          {m.name}
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
                    <p className="text-left normal-case text-N450 w400">{withOption ? withOption?.name : 'Select a month'}</p>
                    <ChevronDownIcon
                      className={`w-8 h-8 ${open ? 'transform rotate-180 text-P700' : ''}`}
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
                  <Listbox.Options static className="w-full mt-1 text-left shadow-md bg-N100 mr-7">
                    {monthWithOptions.map(m => (
                      <Listbox.Option
                        key={m.id}
                        value={m}
                        disabled={m.disabled}
                      >
                        <p className="py-2 pl-5 transition duration-200 ease-in-out text-N800 hover:bg-P700 hover:text-N0">
                          {m.name}
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
        <button type="button" onClick={onReset} className="px-20 py-4 uppercase bg-N50">
          <h4 className="text-N450 w250">reset</h4>
        </button>
        <button type="submit" disabled={!compareTo || !withOption} className="px-20 py-4 uppercase disabled:cursor-not-allowed disabled:opacity-50 text-N0">apply</button>
      </div>
    </form>
  )
}

export { YearComparison, MonthComparison }

const yearCompareOptions = [
  { id: 2021, name: '2021', disabled: false },
  { id: 2020, name: '2020', disabled: false },
  { id: 2019, name: '2019', disabled: true },
  { id: 2018, name: '2018', disabled: true },
  { id: 2017, name: '2017', disabled: true }
]

const yearWithOptions = [
  { id: 2020, name: '2020', disabled: false },
  { id: 2019, name: '2019', disabled: false },
  { id: 2018, name: '2018', disabled: true },
  { id: 2017, name: '2017', disabled: true }
]

const monthCompareOptions = [
  { id: 1, name: 'January', disabled: false },
  { id: 2, name: 'February', disabled: false },
  { id: 3, name: 'March', disabled: false },
  { id: 4, name: 'April', disabled: false },
  { id: 5, name: 'May', disabled: false },
  { id: 6, name: 'June', disabled: false },
  { id: 7, name: 'July', disabled: false },
  { id: 8, name: 'August', disabled: false },
  { id: 9, name: 'September', disabled: false },
  { id: 10, name: 'October', disabled: false },
  { id: 11, name: 'November', disabled: false },
  { id: 12, name: 'December', disabled: false }
]

const monthWithOptions = [
  { id: 1, name: 'January', disabled: false },
  { id: 2, name: 'February', disabled: false },
  { id: 3, name: 'March', disabled: false },
  { id: 4, name: 'April', disabled: false },
  { id: 5, name: 'May', disabled: false },
  { id: 6, name: 'June', disabled: false },
  { id: 7, name: 'July', disabled: false },
  { id: 8, name: 'August', disabled: false },
  { id: 9, name: 'September', disabled: false },
  { id: 10, name: 'October', disabled: false },
  { id: 11, name: 'November', disabled: false },
  { id: 12, name: 'December', disabled: false }
]
