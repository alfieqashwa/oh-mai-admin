import { Fragment, useState, useContext } from 'react'
import { Popover, RadioGroup, Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, LibraryIcon } from "@heroicons/react/solid";
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';

import { format } from 'date-fns'

import { DateRangeCtx } from 'pages/analytics/products'
import { Custom } from './custom';

import "react-datepicker/dist/react-datepicker.css";

export function DateRangeComparison() {
  const { startCurrent, endCurrent, startPrevious, endPrevious } = useContext(DateRangeCtx)

  const [plan, setPlan] = useState("presets")

  return (
    <Popover as="div" className="w-1/2">
      {({ open }) => (
        <>
          <p className="w400">Date Range</p>
          <Popover.Button className="flex items-center justify-between px-4 py-2 mt-2 space-x-8 bg-N200 bg-opacity-20">
            <div>
              <h4 className={`w250 hover:text-G400 transition duration-300 ease-in-out ${open && "text-P700"}`}>current period ({format(startCurrent[0], "MMM d")} - {format(endCurrent[0], "MMM d, yyyy")})</h4>
              <p className="normal-case w400">vs. Previous Period {format(startPrevious[0], "MMM d")} - {format(endPrevious[0], "MMM d, yyyy")}</p>
            </div>
            <ChevronDownIcon className={`w-8 h-8 text-N0 ${open && "transform rotate-180 text-P700"}`} />
          </Popover.Button>
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-20 w-screen max-w-sm mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-lg">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative py-4 bg-N100">
                  <h4 className="text-center uppercase w250 text-N800">select a date range</h4>
                  <RadioGroup as="div" value={plan} onChange={setPlan} className="flex flex-row items-center justify-center mt-4 mb-6">
                    <RadioGroup.Option
                      value="presets"
                    >
                      {({ active, checked }) => (
                        <button
                          type="button"
                          className={`px-16 py-3 border rounded-none rounded-l  ${checked ? "bg-P700" : "bg-N100"}`}
                        >
                          <h4 className={`w250 font-secondary ${checked ? "text-N100" : "text-P700"}`}>presets</h4>
                        </button>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="custom"
                    >
                      {({ active, checked }) => (
                        <button
                          type="button"
                          className={`px-16 py-3 border rounded-none rounded-r  ${checked ? "bg-P700" : "bg-N100"}`}
                        >
                          <h4 className={`w250 font-secondary ${checked ? "text-N100" : "text-P700"}`}>custom</h4>
                        </button>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                  <div className="px-6 pt-5 mt-1 bg-N200">
                    {
                      plan === "presets"
                      && <Presets />
                    }
                    {plan === "custom"
                      && <Custom />
                    }
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

const Presets = () => {
  const [selected, setSelected] = useState(presetRange[0])
  return (
    <>
      <p className="text-N900 w400">Range</p>
      <div className="w-full">
        <Listbox value={selected} onChange={setSelected}>
          {({ open, active }) => (
            <div className="relative mt-1">
              <Listbox.Button
                className="relative w-full px-5 py-4 text-left transition duration-300 ease-in-out shadow-md cursor-pointer hover:text-P700 bg-N0 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-N0 focus-visible:ring-offset-P700 focus-visible:ring-offset-2 focus-visible:border-P700 sm:text-sm"
              >
                <span className="block truncate">{selected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className={`w-8 h-8 ${open ? "transform rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options static className="absolute w-full py-1 mt-1 overflow-auto text-xl rounded-md shadow-lg bg-N0 max-h-60 ring-1 ring-N900 ring-opacity-5 focus:outline-none sm:text-sm">
                  {presetRange.map(p => (
                    <Listbox.Option
                      key={p.id}
                      value={p}
                      className={({ active }) =>
                        `${active ? 'text-N0 bg-P700' : 'text-N900'}
                          uppercase cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${selected ? 'font-semibold' : 'font-medium'
                              } block truncate`}
                          >
                            {p.name}
                          </span>
                          {selected ? (
                            <span
                              className={`${active ? 'text-N0' : 'text-P700'
                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
        <div className="flex items-center justify-start mt-24 space-x-8">
          {
            selected.id === 1
            && <YearComparison />
          }
          {selected.id === 2
            && <MonthComparison />}
        </div>

        {/* Apply & Reset button */}
        <div className="flex items-center justify-center pb-4 mt-24 space-x-5">
          <button type="button" className="px-20 py-4 uppercase bg-N50">
            <h4 className="text-N450 w250">reset</h4>
          </button>
          <button type="button" className="px-20 py-4 uppercase text-N0">apply</button>
        </div>
      </div>
    </>
  )
}

const YearComparison = () => {

  // =========================================================
  // Datepicker setup
  // NOTE: BUGS using the react-datepicker lib, the end date won't display
  // =========================================================

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(null);
  // const onChange = dates => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);

  const [currentDate, setCurrentDate] = useState(yearRangeOptions[0].value)
  const onChange = e => {
    setCurrentDate([e.target.value])
    console.log('on-change: ', currentDate)
  }

  return (
    <>
      {/* Start Current Date Range */}
      <div className="w-full">
        <p className="text-black w400">Current</p>

        {/* // Bugs */}
        {/* NOTE: comment in to see the bugs */}
        {/* <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          showYearPicker
        /> */}


        {/* trying to create using the plain select-input
          expecting the e.target.value will result the array when handleChange.
          but it won't... could be this code is wrong?
        */}
        <select
          value={currentDate}
          onChange={onChange}
          multiple // <- should add this, delete to see the console log warning 
        >
          {/* see this dummy data (yearRangeOptions) in the very bottom of the line */}
          {yearRangeOptions.map((o, i) => (
            <option key={i} value={o.value}>{o.label}</option>
          ))}

        </select>

        {/* Start Temporary */}
        <div className="mt-16">
          <p className="mb-2 text-N700">current range-date</p>
          <pre className="text-P900">{JSON.stringify(currentDate, null, 2)}</pre>
        </div>
        {/* Ends Temporary */}
      </div>
    </>
  )
}

const MonthComparison = () => {

  return (
    <>
      {/* Start Current Date Range */}
      <div className="w-1/2">
        <p className="text-black w400">Current</p>
        {/* <DatePicker
          selected={startCurrentDate}
          onChange={date => setStartCurrentDate(date)}
          selectsStart
          startDate={startCurrentDate}
          endDate={endCurrentDate}
          dateFormat="MM/yyyy"
          maxDate={endCurrentDate}
          showMonthYearPicker
        />
        <p className="text-black w400">to</p>
        <DatePicker
          selected={endCurrentDate}
          onChange={date => setEndCurrentDate(date)}
          selectsEnd
          startDate={startCurrentDate}
          endDate={endCurrentDate}
          dateFormat="MM/yyyy"
          maxDate={new Date()}
          showMonthYearPicker
        />
        <div className="mt-16">
          <p className="mb-2 text-N700">current range-date</p>
          <pre className="text-P900">{JSON.stringify(startCurrentDate, null, 2)}</pre>
          <pre className="text-P900">{JSON.stringify(endCurrentDate, null, 2)}</pre>
        </div> */}
      </div>
      {/* Ends Current Date Range */}

      {/* Start Previous Date Range */}
      <div className="w-1/2">
        {/* <p className="text-black w400">Compare to</p>
        <DatePicker
          selected={startPreviousDate}
          onChange={date => setStartPreviousDate(date)}
          selectsStart
          startDate={startPreviousDate}
          endDate={endPreviousDate}
          dateFormat="MM/yyyy"
          maxDate={endPreviousDate}
          showMonthYearPicker
        />
        <p className="text-black w400">to</p>
        <DatePicker
          selected={endPreviousDate}
          onChange={date => setEndPreviousDate(date)}
          selectsEnd
          startDate={startPreviousDate}
          endDate={endPreviousDate}
          dateFormat="MM/yyyy"
          maxDate={startCurrentDate}
          showMonthYearPicker
        />
        <div className="mt-16">
          <p className="mb-2 text-N700">previous range-date</p>
          <pre className="text-P900">{JSON.stringify(startPreviousDate, null, 2)}</pre>
          <pre className="text-P900">{JSON.stringify(endPreviousDate, null, 2)}</pre>
        </div> */}
      </div>
      {/* Ends Previous Date Range */}
    </>
  )
}


const presetRange = [
  { id: 1, name: "year vs. year" },
  { id: 2, name: "month vs. month" },
]

const yearRangeOptions = [
  { label: '2020', value: [Date.parse(2020, 0, 1), Date.parse(2021, 0, 1)] },
  { label: '2019', value: [Date.parse(2019, 0, 1), Date.parse(2020, 0, 1)] },
  { label: '2018', value: [Date.parse(2018, 0, 1), Date.parse(2019, 0, 1)] },
  { label: '2017', value: [Date.parse(2017, 0, 1), Date.parse(2018, 0, 1)] },
]



// TODO
// NOTE:
// 1. maxDate of the endCurrentDate should be now (new Date()).
// 2. maxDate of the startCurrentDate should be the endCurrentDate.
// 3. maxDate of the endPreviousDate should be the startCurrentDate.
// 4. maxDate of the startPreviousDate should be the endPreviousDate.