'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type ProductSettingKey =
    | 'initial-stock'
    | 'stock-alert'
    | 'manual-barcode'
    | 'multi-pricing'
    | 'only-new-price'

const defaultSettings: Record<ProductSettingKey, boolean> = {
    'initial-stock': true,
    'stock-alert': true,
    'manual-barcode': false,
    'multi-pricing': false,
    'only-new-price': false,
}

export default function ProductSettings() {
    const [settings, setSettings] = useState<Record<ProductSettingKey, boolean>>(defaultSettings)

    useEffect(() => {
        const stored = localStorage.getItem('product-settings')
        if (stored) {
            setSettings(JSON.parse(stored))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('product-settings', JSON.stringify(settings))
    }, [settings])

    const handleToggle = (key: ProductSettingKey) => {
        const updated = { ...settings, [key]: !settings[key] }
        setSettings(updated)
        toast.success(`"${settingLabel[key]}" ${updated[key] ? 'চালু হয়েছে ✅' : 'বন্ধ হয়েছে ❌'}`)
    }

    const settingLabel: Record<ProductSettingKey, string> = {
        'initial-stock': 'শুরুর স্টক',
        'stock-alert': 'দেখুন স্টক সতর্কতা বার্তা',
        'manual-barcode': 'ম্যানুয়্যাল বারকোড',
        'multi-pricing': 'মাল্টি প্রাইসিং',
        'only-new-price': 'শুধু নতুন দামে বিক্রয়',
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">পণ্যের সেটিংস</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(settingLabel).map(([key, label]) => (
                        <div
                            key={key}
                            className="flex items-center justify-between border-b pb-3 last:border-none last:pb-0"
                        >
                            <div>
                                <Label className="text-base font-medium">{label}</Label>
                            </div>
                            <Switch
                                checked={settings[key as ProductSettingKey]}
                                onCheckedChange={() => handleToggle(key as ProductSettingKey)}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
