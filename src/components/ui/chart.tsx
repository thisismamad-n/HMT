"use client"

import * as React from "react"
import { Legend, Tooltip } from "recharts"

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue>({
  config: {},
})

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({
  config,
  children,
  ...props
}: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div {...props}>{children}</div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  hideLabel?: boolean
  labelFormatter?: (value: string) => string
  indicator?: "line" | "dot"
}

export function ChartTooltipContent({
  active,
  payload,
  hideLabel = false,
  labelFormatter = (value) => value,
  indicator = "line",
}: ChartTooltipContentProps) {
  const { config } = React.useContext(ChartContext)

  if (!active || !payload) {
    return null
  }

  const data = payload[0]

  if (!data) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                background: data.color ?? data.fill,
              }}
            />
            <div className="text-[10px] uppercase text-muted-foreground">
              {config[data.name]?.label ?? data.name}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <div className="font-bold">
          {data.value.toLocaleString()}
          {config[data.name]?.label === "Revenue" && " تومان"}
        </div>
      </div>
    </div>
  )
}

export const ChartTooltip = Tooltip
export const ChartLegend = Legend

export function ChartLegendContent() {
  const { config } = React.useContext(ChartContext)

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {Object.entries(config)
        .filter(([key]) => key !== "visitors")
        .map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: value.color }}
            />
            <span>{value.label}</span>
          </div>
        ))}
    </div>
  )
} 