import { CheckIcon } from '@heroicons/react/outline'
import { AiOutlineBarChart, AiOutlineLineChart } from 'react-icons/ai'

export function ChartView() {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-N200">
        <h3 className="text-black w250">Chart</h3>
        <div className="flex items-center justify-start space-x-3">
          <div>
            <input
              type="checkbox"
              name="current"
              className="w-6 h-6 rounded bg-P700 focus:outline-none focus:ring checked:text-P700 focus:ring-P700"
            />
          </div>
          <div>
            <p className="text-black w350">Current Year (Jan 1 - Dec 31, 2021)</p>
            <h5 className="text-black w250-m">10</h5>
          </div>
        </div>
        <div className="flex items-center justify-start space-x-3">
          <div className="">
            <input
              type="checkbox"
              name="current"
              className="w-6 h-6 rounded bg-G400 focus:outline-none focus:ring checked:text-G400 focus:ring-G400"
            />
          </div>
          <div>
            <p className="text-black w350">Previous Year (Jan 1 - Dec 31, 2021)</p>
            <h5 className="text-black w250-m">0</h5>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-10">
          <div>
            <select name="date-range" className="bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-P700 focus:outline-none">
              <option>By day</option>
              <option>By month</option>
            </select>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <button
              type="button"
              className="px-2 transition duration-200 ease-in-out bg-transparent shadow-inner focus:outline-none hover:bg-N250 focus:ring focus:ring-P700"
            >
              <AiOutlineBarChart className="w-6 h-6 font-primary text-P700" />
            </button>
            <button
              type="button"
              className="px-2 transition duration-200 ease-in-out bg-transparent shadow-inner focus:outline-none hover:bg-N250 focus:ring focus:ring-P700"
            >
              <AiOutlineLineChart className="w-6 h-6 text-P700" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid w-full py-32 rounded-b bg-G400 h-1/2 place-items-center">
        <h1 className="text-N0">
          Bar / Line Chart
        </h1>
      </div>
    </>
  )
}