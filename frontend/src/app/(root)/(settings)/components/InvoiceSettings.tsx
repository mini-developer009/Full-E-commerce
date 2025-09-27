'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

type InvoiceSetting = {
    id: string
    label: string
    labelBn: string
    enabled: boolean
}

export default function InvoiceSettings() {
    const [settings, setSettings] = useState<InvoiceSetting[]>([
        { id: 'overStockSelling', label: 'Over Stock Selling', labelBn: 'ওভার স্টক সেলিং', enabled: true },
        { id: 'separateInvoiceItem', label: 'Separate Invoice Items', labelBn: 'ইনভয়েস সেপারেট আইটেম', enabled: true },
        { id: 'discount', label: 'Discount', labelBn: 'ডিস্কাউন্ট', enabled: true },
        { id: 'discountTypeFlat', label: 'Flat Discount Type', labelBn: 'ডিস্কাউন্ট ধরন ফ্লাট', enabled: false },
        { id: 'transportCost', label: 'Transport Cost', labelBn: 'ট্রান্সপোর্টের খরচ', enabled: false },
        { id: 'laborCost', label: 'Labor Cost', labelBn: 'শ্রমিকের খরচ', enabled: false },
        { id: 'paidAmount', label: 'Paid Amount', labelBn: 'জমা টাকা', enabled: true },
        { id: 'dueAmount', label: 'Due Amount', labelBn: 'বাকি টাকা', enabled: true },
        { id: 'maxDueLimit', label: 'Max Due Limit', labelBn: 'সর্বোচ্চ বাকি', enabled: true },
        { id: 'vat', label: 'VAT', labelBn: 'ভ্যাট', enabled: false },
        { id: 'vatTypeFlat', label: 'Flat VAT Type', labelBn: 'ভ্যাটের ধরন ফ্লাট', enabled: false },
        { id: 'sms', label: 'SMS', labelBn: 'এসএমএস', enabled: false },
        { id: 'email', label: 'Email', labelBn: 'ইমেইল', enabled: false },
        { id: 'description', label: 'Description Field', labelBn: 'বর্ণনা', enabled: true },
    ])

    const toggleSetting = (id: string) => {
        setSettings(prev =>
            prev.map(setting =>
                setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
            )
        )

        const target = settings.find(s => s.id === id)
        if (target) {
            toast.success(
                `${target.labelBn} ${!target.enabled ? 'চালু হয়েছে ✅' : 'বন্ধ হয়েছে ❌'}`
            )
        }
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Manage Invoice Features</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    {settings.map((setting) => (
                        <div
                            key={setting.id}
                            className="flex items-center justify-between border-b pb-3 last:border-none"
                        >
                            <div>
                                <Label className="text-base font-medium">{setting.labelBn}</Label>
                                <p className="text-xs text-muted-foreground">{setting.label}</p>
                            </div>
                            <Switch
                                checked={setting.enabled}
                                onCheckedChange={() => toggleSetting(setting.id)}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
