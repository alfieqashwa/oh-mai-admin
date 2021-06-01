import { useState, useContext, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import { AiOutlineCalendar } from 'react-icons/ai'
import { format, subYears } from 'date-fns'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/solid";

import { DateRangeCtx } from 'pages/analytics/products'

export const Custom = () => {
  const { startCurrent, endCurrent, startPrevious, endPrevious } = useContext(DateRangeCtx)

  const [startDate, setStartDate] = useState(startCurrent[0])
  const [endDate, setEndDate] = useState(endCurrent[0])
  const [compareTo, setCompareTo] = useState(yearOptions[0])

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

  };

  let previousDate = []
  if (compareTo.id === 2020) {
    previousDate = [subYears(startDate, 1), subYears(endDate, 1)]
  } else if (compareTo.id === 2019) {
    previousDate = [subYears(startDate, 2), subYears(endDate, 2)]
  } else if (compareTo.id === 2018) {
    previousDate = [subYears(startDate, 3), subYears(endDate, 3)]
  } else if (compareTo.id === 2017) {
    previousDate = [subYears(startDate, 4), subYears(endDate, 4)]
  } else {
    []
  }

  const onSubmit = (e) => {
    e.preventDefault()

    startCurrent[1](startDate)
    endCurrent[1](endDate)
    startPrevious[1](previousDate?.[0])
    endPrevious[1](previousDate?.[1])
  }

  console.log(JSON.stringify(startPrevious, null, 2))
  console.log(JSON.stringify(endPrevious, null, 2))

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
          inline
        />
      </div>
      <div className="px-4 pb-6 mt-4 -mx-6 bg-N0">

        <h5 className="py-4 w250 text-N800">compare to</h5>
        <div className="flex items-start justify-between mt-2">
          <p className="pt-6 pl-8 text-black W400 whitespace-nowrap">Same range in</p>

          <Listbox as="div" className="relative w-1/2 py-4 mx-8 bg-N200" value={compareTo} onChange={setCompareTo}>
            {({ open }) => (
              <>
                <Listbox.Button className="flex items-center justify-between w-full px-5 bg-transparent shadow-none hover:text-P700 focus:outline-none">
                  <p className={`${open ? "text-P700" : "text-black"} w400 hover:text-P700`}>{compareTo.name}</p>
                  <ChevronDownIcon className={`w-6 h-6 ${open ? "transform rotate-180" : ""}`} />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  show={open}
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options static className="absolute w-full mt-4 text-left bg-N100">
                    {yearOptions.map(y => (
                      <Listbox.Option
                        key={y.id}
                        value={y}
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
        <div className="flex items-center justify-center pt-20 space-x-4">
          <button type="button" className="px-16 py-4 uppercase border bg-N50 border-N300">
            <h4 className="text-N450 w250">reset</h4>
          </button>
          <button type="submit" className="px-20 py-4 uppercase text-N0">apply</button>
        </div>
      </div>
    </form>
  )
}

const yearOptions = [
  { id: 2020, name: '2020' },
  { id: 2019, name: '2019' },
  { id: 2018, name: '2018' },
  { id: 2017, name: '2017' },
]