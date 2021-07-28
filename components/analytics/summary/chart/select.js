import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

import { rangeDate } from './range-date'

export function Select({ dateRange, setDateRange }) {
  return (
    <Listbox value={dateRange} onChange={setDateRange}>
      {({ open }) => (
        <div className="relative px-4">
          <Listbox.Button className="flex items-center justify-between w-full h-10 text-left capitalize bg-transparent border-transparent rounded shadow-md w400 focus:ring-2 focus:ring-P900 focus:ring-offset-p900 focus:outline-none focus-visible:ring-offset-2 sm:text-sm">
            <span className="block pl-2 pr-4 text-base truncate text-N600">
              {dateRange.name}
            </span>
            <span className="pr-2">
              <ChevronDownIcon
                className={`w-5 h-5  ${
                  open && 'transform rotate-180 text-P700'
                }`}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-10 w-full py-2 mt-1 space-y-1 overflow-auto rounded-md shadow-lg whitespace-nowrap text-N0 max-h-60 bg-N600 ring-1 ring-P900 ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {rangeDate.map((range) => (
                <Listbox.Option
                  key={range.id}
                  value={range}
                  className={({ active }) =>
                    `${active ? 'bg-P900' : ''}
                    cursor-default select-none relative pl-2.5`
                  }
                >
                  {range.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
