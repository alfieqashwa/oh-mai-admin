import React from 'react'
import { format } from 'date-fns'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from 'recharts'

import { CustomTooltip } from './custom-tooltip'
import { TriangleBar } from './triangle-bar'

export function ChartBar({ data, dateRange }) {
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
          // By Day
          <XAxis
            tickMargin={15}
            dataKey="order_datetime"
            axisLine={false}
            tickLine={false}
            reversed={true}
            tick={{ fontSize: 12 }}
            stroke="#FFFFFF"
            angle={10}
            tickFormatter={(str) => {
              const date = new Date(str)
              return format(date, 'd-MM-yy')
            }}
          />
        ) : (
          // By Month
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
