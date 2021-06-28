import React, { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

export function ShowProductSelect() {
  const [show, setShow] = useState(initialState[0])
  return (
    <div className="w-1/2">
      <p className=" w400">Show</p>
      <Listbox value={show} onChange={setShow}>
        {({ open }) => (
          <>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full py-2 text-left shadow-md h-11 bg-N200 bg-opacity-20 text-N0 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-P900 focus:ring-offset-P900 focus-visible:ring-offset-2 focus:border-P900 sm:text-sm">
                <p className={`pl-4 capitalize transition duration-200 ease-in-out hover:text-G400 ${open ? 'text-P700' : 'text-N0'}`}>{show.name}</p>
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
                  className="absolute w-full py-1 mt-1 overflow-auto rounded-md shadow-lg text-N0 bg-N600 max-h-60 ring-1 ring-P900 ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {initialState?.map((p, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `${active
                          ? 'bg-P900'
                          : ''
                        }
                          cursor-default select-none relative py-2 pl-8 capitalize`
                      }
                      value={p}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${selected ? 'font-medium' : 'font-normal'
                              } block truncate`}
                          >
                            {p.name}
                          </span>
                          {selected
                            ? (
                            <span
                              className={`${active ? 'text-N0' : ''
                                }
                                absolute inset-y-0 left-0 flex items-center pl-2`}
                            >
                              <CheckIcon
                                className="w-4 h-4"
                                aria-hidden="true"
                              />
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
          </>
        )}
      </Listbox>
    </div>
  )
}

const initialState = [
  { name: 'all products' },
  { name: 'all products' }
]
