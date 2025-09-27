'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type PurchaseSettingKey =
    | 'separate-items'
    | 'payment-date'
    | 'warehouse'
    | 'discount'
    | 'transport-cost'
    | 'vat'
    | 'receive-quantity'

const defaultSettings: Record<PurchaseSettingKey, boolean> = {
    'separate-items': true,
    'payment-date': true,
    'warehouse': true,
    'discount': false,
    'transport-cost': false,
    'vat': false,
    'receive-quantity': true,
}

export default function PurchaseSettings() {
    const [settings, setSettings] = useState<Record<PurchaseSettingKey, boolean>>(defaultSettings)

    useEffect(() => {
        const stored = localStorage.getItem('purchase-settings')
        if (stored) {
            setSettings(JSON.parse(stored))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('purchase-settings', JSON.stringify(settings))
    }, [settings])

    const handleToggle = (key: PurchaseSettingKey) => {
        const updated = { ...settings, [key]: !settings[key] }
        setSettings(updated)
        toast.success(`"${settingLabel[key]}" ${updated[key] ? 'চালু হয়েছে ✅' : 'বন্ধ হয়েছে ❌'}`)
    }

    const settingLabel: Record<PurchaseSettingKey, string> = {
        'separate-items': 'ক্রয় সেপারেট আইটেম',
        'payment-date': 'প্রদান এর তারিখ',
        'warehouse': 'গুদাম',
        'discount': 'ডিস্কাউন্ট',
        'transport-cost': 'ট্রান্সপোর্টের খরচ',
        'vat': 'ভ্যাট',
        'receive-quantity': 'পরিমাণ গ্রহণ',
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">ক্রয় সেটিংস</CardTitle>
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
                                checked={settings[key as PurchaseSettingKey]}
                                onCheckedChange={() => handleToggle(key as PurchaseSettingKey)}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
