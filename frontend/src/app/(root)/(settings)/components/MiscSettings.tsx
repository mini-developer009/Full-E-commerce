'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type MiscOptionKey =
    | 'printFooter'
    | 'invoiceTerms'
    | 'roundOffTotal'
    | 'showBrandOnInvoice'
    | 'enableNotifications'

type MiscSettingsConfig = Record<MiscOptionKey, boolean>

const defaultMiscSettings: MiscSettingsConfig = {
    printFooter: false,
    invoiceTerms: false,
    roundOffTotal: false,
    showBrandOnInvoice: false,
    enableNotifications: false,
}

const miscOptionLabels: Record<MiscOptionKey, string> = {
    printFooter: 'ইনভয়েসে ফুটার প্রিন্ট',
    invoiceTerms: 'শর্তাবলী দেখান',
    roundOffTotal: 'মোট রাউন্ড অফ',
    showBrandOnInvoice: 'ইনভয়েসে ব্র্যান্ড দেখান',
    enableNotifications: 'নোটিফিকেশন চালু',
}

export default function MiscSettings() {
    const [settings, setSettings] = useState<MiscSettingsConfig>(defaultMiscSettings)

    useEffect(() => {
        const saved = localStorage.getItem('misc-settings')
        if (saved) {
            setSettings(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('misc-settings', JSON.stringify(settings))
    }, [settings])

    const toggleOption = (key: MiscOptionKey) => {
        const updated = {
            ...settings,
            [key]: !settings[key],
        }
        setSettings(updated)
        toast.success(`${miscOptionLabels[key]} ${updated[key] ? 'চালু হয়েছে ✅' : 'বন্ধ হয়েছে ❌'}`)
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">অন্যান্য সেটিংস</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    {Object.keys(miscOptionLabels).map((key) => {
                        const typedKey = key as MiscOptionKey
                        return (
                            <div
                                key={key}
                                className="flex items-center justify-between border-b pb-3 last:border-none"
                            >
                                <Label className="text-base">{miscOptionLabels[typedKey]}</Label>
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
