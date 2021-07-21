import React, { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
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
import { format, parseISO, subDays } from 'date-fns'
import { AiOutlineBarChart, AiOutlineLineChart } from 'react-icons/ai'

import { moneyFormat } from 'utils/money-format'
import { GlassDefault } from 'components/glassDefault'

export function ChartView() {
  const [plan, setPlan] = useState('area')
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
            <h5 className="text-black w250-m">$10.00</h5>
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
            <h5 className="text-black w250-m">$0.00</h5>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-1">
          <div>
            <select
              name="date-range"
              className="bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-P700 focus:outline-none"
            >
              <option>By day</option>
              <option>By month</option>
            </select>
          </div>

          <RadioGroup value={plan} onChange={setPlan}>
            <div className="flex items-center justify-between space-x-4">
              <RadioGroup.Option value="bar">
                <button
                  type="button"
                  className="px-2 transition duration-200 ease-in-out bg-transparent shadow-inner focus:outline-none hover:bg-N250 focus:ring focus:ring-P700"
                >
                  <AiOutlineBarChart className="w-6 h-6 font-primary text-P700" />
                </button>
              </RadioGroup.Option>
              <RadioGroup.Option value="area">
                <button
                  type="button"
                  className="px-2 transition duration-200 ease-in-out bg-transparent shadow-inner focus:outline-none hover:bg-N250 focus:ring focus:ring-P700"
                >
                  <AiOutlineLineChart className="w-6 h-6 text-P700" />
                </button>
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* <ChartBar /> */}
      {plan === 'bar' && (
        <section className="px-4">
          <ChartBar />
        </section>
      )}
      {/* <ChartArea /> */}
      {plan === 'area' && (
        <section className="px-4">
          <ChartArea />
        </section>
      )}
    </>
  )
}

// Dummy Data
const data = []
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value: 1 + Math.random()
  })
}

function ChartArea() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
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

        <Area dataKey="value" stroke="#8A3EFF" fill="url(#color)" />

        <XAxis
          dataKey="date"
          tickMargin={8}
          axisLine={false}
          tickLine={false}
          tickCount={12}
          interval={30}
          // reversed={true}
          tickFormatter={(str) => {
            const date = parseISO(str)
            if (date.getDate() % 7 === 0) {
              return format(date, 'MMM')
            }
            return ''
          }}
        />

        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          // tickFormatter={(number) => `$${number.toFixed(2)}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function ChartBar() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={600}
        height={300}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0
        }}
        data={data}
      >
        <XAxis
          dataKey="date"
          tickMargin={8}
          axisLine={false}
          tickLine={false}
          interval={30}
          // reversed={true}
          tickFormatter={(str) => {
            const date = parseISO(str)
            if (date.getDate() % 7 === 0) {
              return format(date, 'MMM')
            }
            return ''
          }}
        />
        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          // tickFormatter={(number) => `$${number.toFixed(2)}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#8A3EFF" shape={<TriangleBar />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

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
  if (active) {
    return (
      <GlassDefault className="p-4 text-center rounded-md border-P700 bg-N800">
        <h5 className="text-G400">
          {format(parseISO(label), 'eeee, d MMM, yyyy')}
        </h5>
        <p className="mt-1 text-N100">
          {payload && moneyFormat.format(payload[0].value)}
        </p>
        <p className="text-xs text-Y400">dummy-data</p>
      </GlassDefault>
    )
  }
  return null
}
