import { useState, useContext, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import { AiOutlineCalendar } from 'react-icons/ai'
import { format, subYears, getYear } from 'date-fns'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/solid";

import { DateRangeCtx } from 'pages/analytics/products'
// import 'react-datepicker/dist/react-datepicker.css'

export const Custom = () => {
  const { startCurrent, endCurrent, startPrevious, endPrevious } = useContext(DateRangeCtx)

  const [startDate, setStartDate] = useState(new Date(2021, 0, 4))
  const [endDate, setEndDate] = useState(new Date(2021, 0, 7))
  const [prevDate, setPrevDate] = useState([subYears(startDate, 1), subYears(endDate, 1)])
  const [compareTo, setCompareTo] = useState(initialState[0])

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setPrevDate([subYears(start, 1), subYears(end, 1)])

  };

  let prevYear = getYear(prevDate[1])
  let prevYearList = [{ id: 0, name: "Select a year", disabled: true }]
  for (let i = prevYear; i > 2015; i--) {
    prevYearList.push({ id: i, name: i, disabled: false })
  }

  // max-range is 10 years
  let previousDate = []
  if (compareTo.id === prevYear) {
    previousDate = [prevDate[0], prevDate[1]]
  } else if (compareTo.id === (prevYear - 1)) {
    previousDate = [subYears(prevDate[0], 1), subYears(prevDate[1], 1)]
  } else if (compareTo.id === (prevYear - 2)) {
    previousDate = [subYears(prevDate[0], 2), subYears(prevDate[1], 2)]
  } else if (compareTo.id === (prevYear - 3)) {
    previousDate = [subYears(prevDate[0], 3), subYears(prevDate[1], 3)]
  } else if (compareTo.id === (prevYear - 4)) {
    previousDate = [subYears(prevDate[0], 4), subYears(prevDate[1], 4)]
    // I added some repetitive (dirty) conditions, so you no-need to worry for the next couple of years... duh!
  } else if (compareTo.id === (prevYear - 5)) {
    previousDate = [subYears(prevDate[0], 5), subYears(prevDate[1], 5)]
  } else if (compareTo.id === (prevYear - 6)) {
    previousDate = [subYears(prevDate[0], 6), subYears(prevDate[1], 6)]
  } else if (compareTo.id === (prevYear - 7)) {
    previousDate = [subYears(prevDate[0], 7), subYears(prevDate[1], 7)]
  } else if (compareTo.id === (prevYear - 8)) {
    previousDate = [subYears(prevDate[0], 8), subYears(prevDate[1], 8)]
  } else if (compareTo.id === (prevYear - 9)) {
    previousDate = [subYears(prevDate[0], 9), subYears(prevDate[1], 9)]
  } else {
    []
  }



  console.log(JSON.stringify(compareTo, null, 2))

  const onSubmit = (e) => {
    e.preventDefault()

    startCurrent[1](startDate)
    endCurrent[1](endDate)
    startPrevious[1](previousDate?.[0])
    endPrevious[1](previousDate?.[1])
  }


  return (
    <form onSubmit={onSubmit} className="text-center">
      <section className="flex items-center justify-center">
        <div className="flex items-center justify-start p-4 border bg-N100">
          <AiOutlineCalendar className="w-5 h-5" />
          <p className="px-6 text-black">{format(startDate, "MM/dd/yyyy")}</p>
        </div>
        <span className="px-4">to</span>
        <div className="flex items-center justify-start p-4 border bg-N100">
          <AiOutlineCalendar className="w-5 h-5" />
          <p
            className="px-6 text-black"
          >
            {endDate ? format(endDate, "MM/dd/yyyy") : " End Date "}
          </p>
        </div>
      </section>
      <div className="mt-5">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          maxDate={new Date()}
          inline
        />
      </div>
      <div className="px-4 pb-6 mt-4 -mx-6 bg-N100">

        <h5 className="py-4 w250 text-N800">compare to</h5>
        <div className="flex items-start justify-between mt-2">
          <p className="pt-6 pl-8 text-black W400 whitespace-nowrap">Same range in</p>

          <Listbox as="div" className="w-1/2 mx-8" value={compareTo} onChange={setCompareTo}>
            {({ open }) => (
              <>
                <Listbox.Button className="bg-N200 mt-1.5 h-16 w-full">
                  <div className="flex items-center justify-between px-4">
                    <p className={`${open ? "text-P700" : "text-N450"} normal-case w400 hover:text-P700`}>{compareTo.name}</p>
                    <ChevronDownIcon className={`w-8 h-8 ${open ? "transform rotate-180 text-P700" : ""}`}
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
                  <Listbox.Options static className="w-full mt-1.5 text-left shadow-md bg-N100">
                    {prevYearList.map(y => (
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
        {/* Apply & Reset button */}
        <div className="flex items-center justify-center pt-8 space-x-4">
          <button type="button" className="px-16 py-4 uppercase border bg-N50 border-N300">
            <h4 className="text-N450 w250">reset</h4>
          </button>
          <button type="submit" disabled={compareTo.id === 0} className="px-20 py-4 uppercase disabled:opacity-50 disabled:cursor-not-allowed text-N0">apply</button>
        </div>
      </div>

    </form>
  )
}

const initialState = [
  { id: 0, name: 'Select a year', disabled: true },
]