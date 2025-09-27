'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type StoreOptionKey =
    | 'overstockSelling'
    | 'manualBarcode'
    | 'multiPricing'
    | 'sellOnlyNewPrice'
    | 'stockAlert'

type StoreOptionConfig = Record<StoreOptionKey, boolean>

const defaultSettings: StoreOptionConfig = {
    overstockSelling: false,
    manualBarcode: false,
    multiPricing: false,
    sellOnlyNewPrice: false,
    stockAlert: false,
}

const optionLabels: Record<StoreOptionKey, string> = {
    overstockSelling: 'ওভার স্টক সেলিং',
    manualBarcode: 'ম্যানুয়্যাল বারকোড',
    multiPricing: 'মাল্টি প্রাইসিং',
    sellOnlyNewPrice: 'শুধু নতুন দামে বিক্রয়',
    stockAlert: 'দেখুন স্টক সতর্কতা বার্তা',
}

export default function StoreOptionSettings() {
    const [settings, setSettings] = useState<StoreOptionConfig>(defaultSettings)

    useEffect(() => {
        const saved = localStorage.getItem('store-option-settings')
        if (saved) {
            setSettings(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('store-option-settings', JSON.stringify(settings))
    }, [settings])

    const toggleOption = (key: StoreOptionKey) => {
        const updated = {
            ...settings,
            [key]: !settings[key],
        }
        setSettings(updated)
        toast.success(`${optionLabels[key]} ${updated[key] ? 'চালু হয়েছে ✅' : 'বন্ধ হয়েছে ❌'}`)
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">স্টোর সেটিংস অপশন</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    {Object.keys(optionLabels).map((key) => {
                        const typedKey = key as StoreOptionKey
                        return (
                            <div
                                key={key}
                                className="flex items-center justify-between border-b pb-3 last:border-none"
                            >
                                <Label className="text-base">{optionLabels[typedKey]}</Label>
                                <Switch
                                    checked={settings[typedKey]}
                                    onCheckedChange={() => toggleOption(typedKey)}
                                />
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    )
}
