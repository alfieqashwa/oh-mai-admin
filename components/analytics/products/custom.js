import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { AiOutlineCalendar } from 'react-icons/ai'
import { format, subYears } from 'date-fns'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/solid";
import { CheckIcon } from '@heroicons/react/outline';

export const Custom = () => {
  const [startDate, setStartDate] = useState(new Date(2021, 0, 5))
  const [endDate, setEndDate] = useState(new Date(2021, 0, 7))
  const [compareTo, setCompareTo] = useState(yearOptions[0])

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

  };
  console.log(`start: ${startDate}, end: ${endDate}`)

  const fiveYearsBefore = subYears(startDate, 5)
  console.log('five years before: ', fiveYearsBefore)


  return (
    <div className="text-center">
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

          <Listbox as="div" className="w-1/2 py-4 mx-8 bg-N200" value={compareTo} onChange={setCompareTo}>
            {({ open }) => (
              <>
                <Listbox.Button className="flex items-center justify-between w-full px-5 bg-transparent shadow-none hover:text-P700 focus:outline-none">
                  <p className="text-black w400 hover:text-P700">{compareTo.name}</p>
                  <ChevronDownIcon className={`w-6 h-6 ${open ? "transform rotate-180" : ""}`} />
                </Listbox.Button>
                <Transition
                  show={open}
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options static className="mt-2 text-left bg-N100">
                    {yearOptions.map(y => (
                      <Listbox.Option
                        key={y.id}
                        value={y}
                      >
                        <p className={`pl-5 text-N800 py-2 hover:bg-P700 hover:text-N0 transition duration-200 ease-in-out`}>
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
        <div className="flex items-center justify-center mt-8 space-x-4">
          <button type="button" className="px-16 py-4 uppercase bg-N50">
            <h4 className="text-N450 w250">reset</h4>
          </button>
          <button type="button" className="px-20 py-4 uppercase text-N0">apply</button>
        </div>
      </div>
    </div>
  )
}

const yearOptions = [
  { id: 2020, name: '2020' },
  { id: 2019, name: '2019' },
  { id: 2018, name: '2018' },
  { id: 2017, name: '2017' },
]