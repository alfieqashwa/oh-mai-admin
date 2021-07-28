import React from 'react'
import { format } from 'date-fns'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

import { CustomTooltip } from './custom-tooltip'

export function ChartArea({ data, dateRange }) {
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
          // By Day
          <XAxis
            dataKey="order_datetime"
            tickMargin={15}
            axisLine={false}
            tickLine={false}
            tickCount={12}
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
