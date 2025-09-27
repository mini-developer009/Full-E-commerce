import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'

interface AnalyticsCardProps {
    title: string
    count: number
    iconUrl: string
    date: string
    percentageChange: string
    backgroundColor: string
}

const AnalyticsMiniCard = ({
    title,
    count,
    iconUrl,
    date,
    percentageChange,
    backgroundColor
}: AnalyticsCardProps) => {
    const t = useTranslations('global')
    return (
        <Card
            className={`p-6 flex flex-col w-full h-full rounded-xl ${backgroundColor}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 p-2 flex items-center justify-center  rounded-full">
                        <img src={iconUrl} className="w-6 h-6" alt={title} />
                    </div>
                    <h2 className="font-semibold text-white">{title}</h2>
                </div>
                <Badge variant="outline" className="text-white border-white">{percentageChange}</Badge>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-3xl font-bold text-white">{count}</h3>
                <p className="text-sm text-white/80">{t('updated')}: {date}</p>
            </div>
        </Card>
    )
}

export default AnalyticsMiniCard
