import React from 'react'

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'
// dummy pagination
export const PaginationProducts = () => {
  return (
    <div className="block mt-7 md:items-center md:justify-end md:flex">
      <nav className="flex items-center justify-center space-x-6 text-N0">
        <ChevronDoubleLeftIcon className="w-5 h-5 cursor-pointer" />
        <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
        <button className="px-2.5 text-sm border font-medium bg-N800 hover:bg-P700 transition duration-300 ease-in-out">1</button>
        <button className="px-2.5 text-sm border font-medium bg-N800 hover:bg-P700 transition duration-300 ease-in-out">2</button>
        <button className="px-2.5 text-sm border font-medium bg-N800 hover:bg-P700 transition duration-300 ease-in-out">3</button>
        <a className="px-2.5 py-1 text-sm border font-medium rounded bg-N800 hover:bg-P700 transition duration-300 ease-in-out">...</a>
        <button className="px-2 text-sm font-medium transition duration-300 ease-in-out border bg-N800 hover:bg-P700">99</button>
        <ChevronRightIcon className="w-5 h-5 cursor-pointer" />
        <ChevronDoubleRightIcon className="w-5 h-5 cursor-pointer" />
      </nav>
      <div className="pr-10 mt-2 text-center lg:mt-0 lg:text-none lg:mx-6">
        <p className="w350 text-N450 whitespace-nowrap">Showing<span className="px-1.5 font-medium text-N0">1</span>to<span className="px-1.5 font-medium text-N0">4</span>of<span className="px-1.5 font-medium text-N0">60</span>products</p>
      </div>
      <div className="items-center hidden lg:flex whitespace-nowrap">
        <p className="px-2 w350 text-N200">Show</p>
        <select
          type="number"
          name="show"
          defaultValue={4}
          className="w-16 px-2 py-1 mx-2 rounded-md cursor-pointer bg-N100">
          {options.map((o, i) => (
            <option key={i} value={o.value}>{o.label}</option>
          ))
          }
        </select>
        <p className="px-2 w350 text-N200">at a time</p>
      </div>
    </div >
  )
}

const options = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 }
]
