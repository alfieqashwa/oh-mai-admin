import { Fragment, useState, useContext } from 'react'
import { Popover, RadioGroup, Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, LibraryIcon } from "@heroicons/react/solid";
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { format } from 'date-fns'

import { Presets } from './presets';
import { Custom } from './custom';
import { DateRangeCtx } from 'pages/analytics/products'

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
                <div className="relative pt-4 bg-N100">
                  <h4 className="text-center uppercase font-secondary w250 text-N800">select a date range</h4>
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






// TODO
// NOTE:
// 1. maxDate of the endCurrentDate should be now (new Date()).
// 2. maxDate of the startCurrentDate should be the endCurrentDate.
// 3. maxDate of the endPreviousDate should be the startCurrentDate.
// 4. maxDate of the startPreviousDate should be the endPreviousDate.