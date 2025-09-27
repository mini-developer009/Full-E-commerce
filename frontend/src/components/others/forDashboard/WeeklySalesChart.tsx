"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTranslations } from "next-intl"

const chartData = [
  { week: "week-1", sales: 20 },
  { week: "week-2", sales: 175 },
  { week: "week-3", sales: 42 },
  { week: "week-4", sales: 198 },
  { week: "week-5", sales: 157 },
  { week: "week-6", sales: 214 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function WeeklySalesChart() {
  const t = useTranslations('HomePage.weekly-sales-chart')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('weekly-sales-overview')}</CardTitle>
        <CardDescription>{t('last-n-weeks-performance', { weeks: 6 })}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[19.5rem] w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => t(value)} // e.g., week-1 -> Week 1
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="sales"
              type="linear"
              stroke="var(--color-sales)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {t('trending-up', { percent: 5.2 })} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {t('showing-total-sales', { weeks: 6 })}
        </div>
      </CardFooter>
    </Card>
  )
}
