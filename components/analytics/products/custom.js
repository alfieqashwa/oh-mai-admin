import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { AiOutlineCalendar } from 'react-icons/ai'
import { format, subYears } from 'date-fns'

export const Custom = () => {
  const [startCurrentDate, setStartCurrentDate] = useState(new Date(2021, 0, 5))
  const [endCurrentDate, setEndCurrentDate] = useState(new Date(2021, 0, 7))
  const [startPreviousDate, setStartPreviousDate] = useState(new Date(2020, 0, 5))
  const [endPreviousDate, setEndPreviousDate] = useState(new Date(2020, 0, 7))

  const onChange = dates => {
    const [start, end] = dates;
    setStartCurrentDate(start);
    setEndCurrentDate(end);

  };
  console.log(`start: ${startCurrentDate}, end: ${endCurrentDate}`)

  const fiveYearsBefore = subYears(startCurrentDate, 5)
  console.log('five years before: ', fiveYearsBefore)


  return (
    <div className="text-center">
      <section className="flex items-center justify-center">
        <div className="flex items-center justify-start p-4 border bg-N100">
          <AiOutlineCalendar className="w-5 h-5" />
          <p className="px-6 text-black">{format(startCurrentDate, "MM/dd/yyyy")}</p>
        </div>
        <span className="px-4">to</span>
        <div className="flex items-center justify-start p-4 border bg-N100">
          <AiOutlineCalendar className="w-5 h-5" />
          <p
            className="px-6 text-black"
          >
            {endCurrentDate ? format(endCurrentDate, "MM/dd/yyyy") : " End Date "}
          </p>
        </div>
      </section>
      <div className="mt-5">
        <DatePicker
          selected={startCurrentDate}
          onChange={onChange}
          startDate={startCurrentDate}
          endDate={endCurrentDate}
          selectsRange
          inline
        />
      </div>
      <div className="px-4 pb-6 mt-4 -mx-6 bg-N0">

        <h5 className="py-4 w250 text-N800">compare to</h5>
        <div className="flex items-center justify-between mt-2">
          <p className="pl-8 text-black W400">Same range in</p>
          <select className="w-1/2 p-4 mx-8">
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
          </select>
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