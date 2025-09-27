"use client"

import { Area, AreaChart, CartesianGrid } from "recharts"

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
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"
const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function ProfitChartCard({
    title,
    amount,
}: {
    title?: string
    className?: string
    amount?: string
    chartData?: typeof chartData
}) {
    const t = useTranslations('HomePage')
    return (
        <Card className="relative p-0 overflow-hidden">
            <CardHeader className="absolute top-0 left-0 w-full h-full z-10 flex items-start gap-2 bg-background/60 p-10">
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-4xl font-bold text-foreground">
                   $ {amount}
                </CardDescription>
                <div>
                    <Badge>20%</Badge> <span>{t('from-previous-week')}</span>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <ChartContainer className="p-0" config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        className="p-0"
                    >
                        <CartesianGrid vertical={false} />
                        {/* <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        /> */}
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
           
        </Card>
    )
}
