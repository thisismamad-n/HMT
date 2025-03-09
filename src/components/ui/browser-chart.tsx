"use client"

import * as React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

interface BrowserChartProps {
  data: {
    browser: string
    visitors: number
    fill: string
  }[]
  config: {
    visitors: {
      label: string
    }
    [key: string]: {
      label: string
      color?: string
    }
  }
}

export function BrowserChart({ data, config }: BrowserChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="browser"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value}
          style={{
            fontFamily: "Vazirmatn",
          }}
        />
        <YAxis hide={true} />
        <Bar
          dataKey="visitors"
          fill="#0f172a"
          radius={[4, 4, 0, 0]}
          maxBarSize={45}
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 