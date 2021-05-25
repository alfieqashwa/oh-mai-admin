import { Fragment, useState } from 'react'
import { Popover, RadioGroup, Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/solid";
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'

export function DateRangeComparison({
  startCurrentDate,
  setStartCurrentDate,
  endCurrentDate,
  setEndCurrentDate,
  startPreviousDate,
  setStartPreviousDate,
  endPreviousDate,
  setEndPreviousDate,
}) {
  const [plan, setPlan] = useState("presets")

  return (
    <Popover as="div" className="w-1/2">
      {({ open }) => (
        <>
          <p className="w400">Date Range</p>
          <Popover.Button className="flex items-center justify-between px-4 py-2 mt-2 space-x-8 bg-N200 bg-opacity-20">
            <div>
              <h4 className={`w250 ${open && "text-P700"}`}>current year ({format(startCurrentDate, "MMM d")} - {format(endCurrentDate, "MMM d, yyyy")})</h4>
              <p className="normal-case w400">vs. Previous Year {format(startPreviousDate, "MMM d")} - {format(endPreviousDate, "MMM d, yyyy")}</p>
            </div>
            <ChevronDownIcon className={`w-8 h-8 text-N0 transform rotate-900" ${open && "transform rotate-180 text-P700"}`} />
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
                <div className="relative pt-4 bg-N100">
                  <h4 className="text-center uppercase w250 text-N800">select a date range</h4>
                  <RadioGroup as="div" value={plan} onChange={setPlan} className="flex flex-row items-center justify-center mt-3">
                    <RadioGroup.Option
                      value="presets"
                    >
                      {({ active, checked }) => (
                        <button
                          type="button"
                          className={`px-16 py-3 border rounded-none rounded-l  ${checked ? "bg-P700" : "bg-N100"}`}
                        >
                          <h4 className={`${checked ? "text-N100" : "text-P700"}`}>presets</h4>
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
                          <h4 className={`${checked ? "text-N100" : "text-P700"}`}>custom</h4>
                        </button>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                  <div className="px-6 py-5 mt-1 bg-N200">
                    {
                      plan === "presets"
                      && <Presets
                        startCurrentDate={startCurrentDate}
                        setStartCurrentDate={setStartCurrentDate}
                        endCurrentDate={endCurrentDate}
                        setEndCurrentDate={setEndCurrentDate}
                        startPreviousDate={startPreviousDate}
                        setStartPreviousDate={setStartPreviousDate}
                        endPreviousDate={endPreviousDate}
                        setEndPreviousDate={setEndPreviousDate}
                      />
                    }
                    {plan === "custom" && <Custom />}
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

const Presets = ({
  startCurrentDate,
  setStartCurrentDate,
  endCurrentDate,
  setEndCurrentDate,
  startPreviousDate,
  setStartPreviousDate,
  endPreviousDate,
  setEndPreviousDate
}) => {
  const [selected, setSelected] = useState(presetRange[0])
  return (
    <>
      <p className="text-N900 w400">Range</p>
      <div className="w-full">
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full px-5 py-4 text-left shadow-md cursor-pointer bg-N0 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-N0 focus-visible:ring-offset-P700 focus-visible:ring-offset-2 focus-visible:border-P700 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-8 h-8 text-N400"
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
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-xl rounded-md shadow-lg bg-N0 max-h-60 ring-1 ring-N900 ring-opacity-5 focus:outline-none sm:text-sm">
                  {presetRange.map(p => (
                    <Listbox.Option
                      key={p.id}
                      className={({ active }) =>
                        `${active ? 'text-P700 bg-N200' : 'text-N900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={p}
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
                              className={`${active ? 'text-P700' : 'text-N900'
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
            && <YearComparison
              startCurrentDate={startCurrentDate}
              setStartCurrentDate={setStartCurrentDate}
              endCurrentDate={endCurrentDate}
              setEndCurrentDate={setEndCurrentDate}
              startPreviousDate={startPreviousDate}
              setStartPreviousDate={setStartPreviousDate}
              endPreviousDate={endPreviousDate}
              setEndPreviousDate={setEndPreviousDate}
            />
          }
          {selected.id === 2
            && <MonthComparison
              startCurrentDate={startCurrentDate}
              setStartCurrentDate={setStartCurrentDate}
              endCurrentDate={endCurrentDate}
              setEndCurrentDate={setEndCurrentDate}
              startPreviousDate={startPreviousDate}
              setStartPreviousDate={setStartPreviousDate}
              endPreviousDate={endPreviousDate}
              setEndPreviousDate={setEndPreviousDate}
            />}
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

const YearComparison = ({
  startCurrentDate,
  setStartCurrentDate,
  endCurrentDate,
  setEndCurrentDate,
  startPreviousDate,
  setStartPreviousDate,
  endPreviousDate,
  setEndPreviousDate
}) => {
  return (
    <>
      {/* Start Current Date Range */}
      <div className="w-1/2">
        <p className="text-black w400">Current</p>
        <DatePicker
          selected={startCurrentDate}
          onChange={date => setStartCurrentDate(date)}
          selectsStart
          startDate={startCurrentDate}
          endDate={endCurrentDate}
          // see Note about maxDate at the bottom of the line
          maxDate={endCurrentDate}
          dateFormat="yyyy MMM, d"
          showYearPicker
          yearItemNumber={9}
        />
        <p className="text-black w400">to</p>
        <DatePicker
          selected={endCurrentDate}
          onChange={date => setEndCurrentDate(date)}
          startDate={startCurrentDate}
          endDate={endCurrentDate}
          // see Note about maxDate at the bottom of the line
          maxDate={(new Date())}
          dateFormat="yyyy MMM, d"
          showYearPicker
          yearItemNumber={9}
        />

        {/* Start Temporary */}
        <div className="mt-16">
          <p className="mb-2 text-N700">current range-date</p>
          <pre className="text-P900">{JSON.stringify(startCurrentDate, null, 2)}</pre>
          <pre className="text-P900">{JSON.stringify(endCurrentDate, null, 2)}</pre>
        </div>
        {/* Ends Temporary */}
      </div>
      {/* Ends Current Date Range */}

      {/* Start Previous/Compare-to Date Range */}
      <div className="w-1/2">
        <p className="text-black w400">Compare to</p>
        <DatePicker
          selected={startPreviousDate}
          onChange={date => setStartPreviousDate(date)}
          selectsStart
          startDate={startPreviousDate}
          endDate={endPreviousDate}
          // see Note about maxDate at the bottom of the line
          maxDate={endPreviousDate}
          dateFormat="yyyy MMM, d"
          showYearPicker
          yearItemNumber={9}
        />
        <p className="text-black w400">to</p>
        <DatePicker
          selected={endPreviousDate}
          onChange={date => setEndPreviousDate(date)}
          startDate={startPreviousDate}
          endDate={endPreviousDate}
          // see Note about maxDate at the bottom of the line
          maxDate={startCurrentDate}
          dateFormat="yyyy MMM, d"
          showYearPicker
          yearItemNumber={9}
        />
        {/* Ends Previous/Compare-to Date Range */}

        {/* Start Temporary */}
        <div className="mt-16">
          <p className="mb-2 text-N700">compare range-date</p>
          <pre className="text-P900">{JSON.stringify(startPreviousDate, null, 2)}</pre>
          <pre className="text-P900">{JSON.stringify(endPreviousDate, null, 2)}</pre>
        </div>
        {/* Ends Temporary */}
      </div>
    </>
  )
}

const MonthComparison = ({
  startCurrentDate,
  setStartCurrentDate,
  endCurrentDate,
  setEndCurrentDate,
  startPreviousDate,
  setStartPreviousDate,
  endPreviousDate,
  setEndPreviousDate
}) => {

  return (
    <>
      {/* Start Current Date Range */}
      <div className="w-1/2">
        <p className="text-black w400">Current</p>
        <DatePicker
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
        </div>
      </div>
      {/* Ends Current Date Range */}

      {/* Start Previous Date Range */}
      <div className="w-1/2">
        <p className="text-black w400">Compare to</p>
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
        </div>
      </div>
      {/* Ends Previous Date Range */}
    </>
  )
}

const Custom = () => (
  <>
    <h2 className="text-center text-N900">Custom</h2>
  </>
)

const presetRange = [
  { id: 1, name: "year vs. year" },
  { id: 2, name: "month vs. month" },
]



// TODO
// NOTE:
// 1. maxDate of the endCurrentDate should be now (new Date()).
// 2. maxDate of the startCurrentDate should be the endCurrentDate.
// 3. maxDate of the endPreviousDate should be the startCurrentDate.
// 4. maxDate of the startPreviousDate should be the endPreviousDate.