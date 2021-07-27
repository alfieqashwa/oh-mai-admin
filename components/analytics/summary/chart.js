import React, { useState, Fragment } from 'react'
import { Listbox, RadioGroup, Transition } from '@headlessui/react'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts'
import { format } from 'date-fns'
import { AiOutlineBarChart, AiOutlineLineChart } from 'react-icons/ai'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { moneyFormat } from 'utils/money-format'
import { GlassDefault } from 'components/glassDefault'
import { GET_ORDER_SUMMARY_CHART } from 'graphql/order'
import useFetch from 'hooks/useFetch'
import { LoadingStatus } from 'components/loading-status'
import { ErrorStatus } from 'components/error-status'

export function ChartView({ selected }) {
  const [dateRange, setDateRange] = useState(rangeDate[1])
  const [plan, setPlan] = useState('area')
  const {
    loading,
    error,
    data: dataOrderSummaryChart
  } = useFetch(GET_ORDER_SUMMARY_CHART)

  if (loading) {
    return <LoadingStatus />
  }
  if (error) {
    return <ErrorStatus message={error.message} />
  }

  const { getOrderSumaryChart: data } = dataOrderSummaryChart

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 mb-12 bg-N200">
        <h3 className="text-black w250">Chart</h3>
        <div className="flex items-center justify-start pl-12 space-x-3">
          <input
            type="checkbox"
            name="current"
            className="w-6 h-6 rounded bg-P700 focus:outline-none focus:ring checked:text-P700 focus:ring-P700"
          />
          <div>
            <p className="text-black w350">
              Current Year (Jan 1 - Dec 31, 2021)
            </p>
            <h5 className="text-black w250-m">
              {selected?.type === 'currency'
                ? moneyFormat.format(selected?.performance)
                : selected?.performance}
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-start space-x-3">
          <input
            type="checkbox"
            name="current"
            className="w-6 h-6 rounded bg-G400 focus:outline-none focus:ring checked:text-G400 focus:ring-G400"
          />
          <div>
            <p className="text-black w350">
              Previous Year (Jan 1 - Dec 31, 2021)
            </p>
            <h5 className="text-black w250-m">
              {selected?.type === 'currency'
                ? moneyFormat.format(selected?.performance_last_year)
                : selected?.performance_last_year}
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-1">
          <Select dateRange={dateRange} setDateRange={setDateRange} />
          <RadioGroup value={plan} onChange={setPlan}>
            <div className="flex items-center justify-between space-x-4">
              <RadioGroup.Option value="bar">
                {({ checked, active }) => (
                  <button
                    type="button"
                    className={`px-2 transition shadow-lg duration-200 ease-in-out bg-transparent focus:outline-none hover:bg-N250 
                      ${
                        checked
                          ? 'shadow-inner border-l border-t border-N250'
                          : ''
                      }`}
                  >
                    <AiOutlineBarChart className="w-6 h-6 font-primary text-P700" />
                  </button>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="area">
                {({ checked, active }) => (
                  <button
                    type="button"
                    className={`px-2 transition shadow-lg duration-200 ease-in-out bg-transparent focus:outline-none hover:bg-N250 
                      ${
                        checked
                          ? 'shadow-inner border-l border-t border-N250'
                          : ''
                      }`}
                  >
                    <AiOutlineLineChart className="w-6 h-6 text-P700" />
                  </button>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* <ChartBar/> */}
      {plan === 'bar' && (
        <section className="px-4">
          <ChartBar data={data} dateRange={dateRange} />
        </section>
      )}
      {/* <ChartArea /> */}
      {plan === 'area' && (
        <section className="px-4">
          <ChartArea data={data} dateRange={dateRange} />
        </section>
      )}
    </>
  )
}

function ChartArea({ data, dateRange }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10
        }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            {/* <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} /> */}
            <stop offset="0%" stopColor="#8A3EFF" stopOpacity={0.4} />
            <stop offset="40%" stopColor="#8A3EFF" stopOpacity={0.9} />
            <stop offset="90%" stopColor="#8A3EFF" stopOpacity={0.9} />
          </linearGradient>
        </defs>

        <Area dataKey="net_sales" stroke="#8A3EFF" fill="url(#color)" />

        {dateRange?.id === 1 ? (
          <XAxis
            dataKey="order_datetime"
            tickMargin={15}
            axisLine={false}
            tickLine={false}
            tickCount={12}
            reversed={true}
            tick={{ fontSize: 14 }}
            stroke="#FFFFFF"
            tickFormatter={(str) => {
              const date = new Date(str)
              return format(date, 'd MMM yyyy')
            }}
          />
        ) : (
          <XAxis
            dataKey="order_datetime"
            tickMargin={15}
            axisLine={false}
            tickLine={false}
            tickCount={12}
            reversed={true}
            interval={30}
            stroke="#FFFFFF"
            tickFormatter={(str) => {
              const date = new Date(str)
              return format(date, 'MMM')
            }}
          />
        )}

        <YAxis
          datakey="net_sales"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          stroke="#FFFFFF"
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function ChartBar({ data, dateRange }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={600}
        height={300}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 10
        }}
        data={data}
      >
        {dateRange?.id === 1 ? (
          <XAxis
            tickMargin={15}
            dataKey="order_datetime"
            axisLine={false}
            tickLine={false}
            reversed={true}
            tick={{ fontSize: 14 }}
            stroke="#FFFFFF"
            tickFormatter={(str) => {
              const date = new Date(str)
              return format(date, 'd MMM yyyy')
            }}
          />
        ) : (
          <XAxis
            tickMargin={15}
            dataKey="order_datetime"
            axisLine={false}
            tickLine={false}
            reversed={true}
            interval={30}
            stroke="#FFFFFF"
            tickFormatter={(str) => {
              const date = new Date(str)
              return format(date, 'MMM')
            }}
          />
        )}
        <YAxis
          datakey="net_sales"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          stroke="#FFFFFF"
        />

        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="net_sales" fill="#8A3EFF" shape={<TriangleBar />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

/*
 * Customized the shape of bar
 * source: https://recharts.org/en-US/guide/customize
 */

const getPath = (x, y, width, height) =>
  `M${x},${y + height}
  C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  }, ${y}
   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props

  return <path d={getPath(x, y, width, height)} stroke="#8A3EFF" fill={fill} />
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !label) {
    return <> </>
  }

  if (active) {
    const date = new Date(label)
    return (
      <GlassDefault className="p-4 text-center rounded-md border-P700 bg-N800">
        <h5 className="text-G400">{format(date, 'eeee, d MMM, yyyy')}</h5>
        <p className="mt-1 text-N100">
          {payload && moneyFormat.format(payload?.[0].value)}
        </p>
      </GlassDefault>
    )
  }

  return null
}

const rangeDate = [
  { id: 1, name: 'By Day' },
  { id: 2, name: 'By Month' }
]
function Select({ dateRange, setDateRange }) {
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
