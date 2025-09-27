'use client'

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
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

// Chart config mapping
const chartConfig = {
    value: {
        label: "Amount",
    },
    sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
    },
    receive: {
        label: "Receive",
        color: "hsl(var(--chart-2))",
    },
    expense: {
        label: "Expense",
        color: "hsl(var(--chart-3))",
    },
    due: {
        label: "Due",
        color: "hsl(var(--chart-4))",
    },
    balance: {
        label: "Balance",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function MounthyReviewChart() {
    const t = useTranslations('HomePage.mmounthy-review-chart')
    const monthName = new Date().toLocaleString('default', { month: 'long' })
    const percentageGrowth = "5.2%" // you can fetch or calculate this dynamically

    const chartData = [
        { category: t('sales'), value: 125000, fill: "var(--color-sales)" },
        { category: t('receive'), value: 100000, fill: "var(--color-receive)" },
        { category: t('expense'), value: 45000, fill: "var(--color-expense)" },
        { category: t('due'), value: 25000, fill: "var(--color-due)" },
        { category: t('balance'), value: 80000, fill: "var(--color-balance)" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('title')} - {monthName}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{ left: 0 }}
                    >
                        <YAxis
                            dataKey="category"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <XAxis dataKey="value" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="value" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {t('trend', { percentage: percentageGrowth })} <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    {t('footer-note', { month: monthName })}
                </div>
            </CardFooter>
        </Card>
    )
}

