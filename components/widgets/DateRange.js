import DatePicker from 'react-datepicker'
import React, { Fragment, useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
// import { DatePicker, DatePickerInput } from 'rc-datepicker'
import 'rc-datepicker/lib/style.css'

export function DateRange({ onChange }) {
  const [mode, setMode] = useState('24h')
  const [dayStart, setDayStart] = useState()
  const [dayEnd, setDayEnd] = useState()
  const [weekStart, setWeekStart] = useState()
  const [weekEnd, setWeekEnd] = useState()
  const [monthStart, setMonthStart] = useState()
  const [monthEnd, setMonthEnd] = useState()
  const [yearStart, setYearStart] = useState()
  const [yearEnd, setYearEnd] = useState()
  // const [timeRange, setTimeRange] = useState()

  // useEffect(() => {
  //   console.log('selected mode', mode)
  //   console.log('check date', monthStart)
  //   // TODO - query based on Time Period
  // }, [mode])

  useEffect(() => {
    const timeFilter = {
      mode: mode,
      dayStart: dayStart,
      dayEnd: dayEnd,
      weekStart: weekStart,
      weekEnd: weekEnd,
      monthStart: monthStart,
      monthEnd: monthEnd,
      yearStart: yearStart,
      yearEnd: yearEnd
    }

    onChange(timeFilter)
  }, [mode, dayStart, dayEnd, weekStart, weekEnd, monthStart, monthEnd, yearStart, yearEnd])

  const DaysRangePicker = () => {
    return (
      <div className="flex flex-1 space-x-4">
        <div className="flex flex-1 flex-col">
          <div className="text-N0">From</div>
          <DatePicker
            className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N300"
            selected={dayStart}
            onChange={setDayStart}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-N0">To</div>
          <DatePicker
            className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N300"
            selected={dayEnd}
            onChange={setDayEnd}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
    )
  }

  const WeeksRangePicker = () => {
    return (
      <div className="flex flex-1 space-x-4">
        <div className="flex flex-1 flex-col">
          <div className="text-N0">From</div>
          <DatePicker
            className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N300"
            selected={weekStart}
            onChange={setWeekStart}
            dateFormat="dd/MM/yyyy"
            showWeekNumbers
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-N0">To</div>
          <DatePicker
            className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N300"
            selected={weekEnd}
            onChange={setWeekEnd}
            dateFormat="dd/MM/yyyy"
            showWeekNumbers
          />
        </div>
      </div>
    )
  }

  const MonthsRangePicker = () => {
    return (
      <div className="flex flex-1 space-x-4">
        <div className="flex flex-1 flex-col">
          <div className="text-N0">From</div>
          <DatePicker
            className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N300"
            selected={monthStart}
            onChange={setMonthStart}
            dateFormat="MMM yyyy"
            showMonthYearPicker
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-N0">To</div>
          <DatePicker
            className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N300"
            selected={monthEnd}
            onChange={setMonthEnd}
            dateFormat="MMM yyyy"
            showMonthYearPicker
          />
        </div>
      </div>
    )
  }

  const YearRangePicker = () => {
    return (
      <div className="flex flex-1 space-x-4">
        <div className="flex flex-1 flex-col">
          <div className="text-N0">From</div>
          <DatePicker
            className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N300"
            selected={yearStart}
            onChange={setYearStart}
            dateFormat="dd MMM yyyy"
            showYearPicker
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-N0">To</div>
          <DatePicker
            className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N300"
            selected={yearEnd}
            onChange={setYearEnd}
            dateFormat="dd MMM yyyy"
            showYearPicker
          />
        </div>
      </div>
    )
  }

  const ShowInput = ({ mode }) => {
    switch (mode) {
      case 'days':
        return <DaysRangePicker />
      case 'weeks':
        return <WeeksRangePicker />
      case 'months':
        return <MonthsRangePicker />
      case 'years':
        return <YearRangePicker />
      default:
        return <></>
    }
  }

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-1/4">
        <div className="flex text-xl text-N100 mt-6 mb-2">Select period of time</div>
        <select className="appearance-none rounded-md text-N0 bg-opacity-20 bg-N200 my-2"
          onChange={e => setMode(e.target.value)}
          value={mode}>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="days">Select by days</option>
          <option value="weeks">Select by weeks</option>
          <option value="months">Select by months</option>
          <option value="years">Select by years</option>
        </select>
      </div>
      <div className="flex w-1/2 mb-2 mt-9 ml-8">
        <ShowInput mode={mode} />
      </div>
    </div>
  )
}
