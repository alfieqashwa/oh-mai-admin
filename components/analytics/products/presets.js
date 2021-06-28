import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'

import { YearComparison, MonthComparison } from './comparison'

export const Presets = () => {
  const [selected, setSelected] = useState()
  return (
    <>
      <p className="text-N900 w400">Range</p>
      <div className="w-full">
        <Listbox value={selected} onChange={setSelected}>
          {({ open, active }) => (
            <div className="relative mt-1">
              <Listbox.Button
                className="relative w-full h-16 px-5 py-4 text-left transition duration-300 ease-in-out shadow-md cursor-pointer hover:text-P700 bg-N100 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-N0 focus-visible:ring-offset-P700 focus-visible:ring-offset-2 focus-visible:border-P700 sm:text-sm"
              >
                {selected
                  ? <span className={`block truncate ${open ? 'text-P700' : 'text-N900'}`}>{selected?.name}</span>
                  : <span className="block normal-case truncate text-N350 w400">Select a preset</span>
                }
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className={`w-8 h-8 ${open ? 'transform rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                show={open}
                leave="transition ease-in duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options static className="w-full py-1 mt-1 overflow-auto text-xl shadow-md bg-N50 max-h-60 ring-1 ring-N900 ring-opacity-5 focus:outline-none sm:text-sm">
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
                          {selected
                            ? (
                            <span
                              className={`${active ? 'text-N0' : 'text-P700'
                                }
absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                              )
                            : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}

                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
        <div className="flex items-center justify-start w-full mt-10 space-x-7">
          {
            selected?.id === 1 &&
            <YearComparison />
          }
          {selected?.id === 2 &&
            <MonthComparison />}
        </div>
        {selected?.id === undefined &&
          <div className="flex items-center justify-center pb-10 space-x-5 mt-11">
            <button type="button" disabled className="px-20 py-4 uppercase disabled:cursor-not-allowed disabled:opacity-50 bg-N50">
              <h4 className="text-N450 w250">reset</h4>
            </button>
            <button type="submit" disabled className="px-20 py-4 uppercase disabled:opacity-50 disabled:cursor-not-allowed text-N0">apply</button>
          </div>
        }
      </div>
    </>
  )
}

const presetRange = [
  // { id: 0, name: "year vs. year" },
  { id: 1, name: 'year vs. year' },
  { id: 2, name: 'month vs. month' }
]
