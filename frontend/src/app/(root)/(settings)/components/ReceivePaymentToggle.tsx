'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function ReceivePaymentToggle() {
    const [enabled, setEnabled] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('receive-payment') === 'true'
        }
        return false
    })

    useEffect(() => {
        localStorage.setItem('receive-payment', String(enabled))
    }, [enabled])

    const togglePaymentReceive = () => {
        setEnabled(prev => {
            const newValue = !prev
            toast.success(
                newValue
                    ? 'ইনভয়েস থেকে পেমেন্ট রিসিভ চালু হয়েছে ✅'
                    : 'ইনভয়েস থেকে পেমেন্ট রিসিভ বন্ধ হয়েছে ❌'
            )
            return newValue
        })
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">জমা সেটিংস</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between border-b pb-3">
                        <div>
                            <Label className="text-base font-medium">
                                ইনভয়েস থেকে পেমেন্ট রিসিভ
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                Enable to automatically receive payments from invoices.
                            </p>
                        </div>
                        <Switch checked={enabled} onCheckedChange={togglePaymentReceive} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
