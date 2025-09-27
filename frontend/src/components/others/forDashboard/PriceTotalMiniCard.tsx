import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props {
    className?: string
    title: string
    value: number
    date: string
    iconUrl?: string
    isSymbleActive?: boolean
}

const PriceTotalMiniCard: React.FC<Props> = ({
    className,
    title,
    value,
    date,
    iconUrl = '/icons/total-sales.svg',
    isSymbleActive = true
}) => {
    const t = useTranslations('global')

    return (
        <Card className={`p-6 flex flex-col w-full h-full ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center">
                        <img src={iconUrl} className="w-full" alt="" />
                    </div>
                    <h2 className="font-semibold">{title}</h2>
                </div>
                <Badge variant="outline">+16%</Badge>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold mt-4">
                    {isSymbleActive ? '$' : ''}
                    {value.toLocaleString()}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {t('updated')}: {date}
                </p>
            </div>
        </Card>
    )
}

export default PriceTotalMiniCard
