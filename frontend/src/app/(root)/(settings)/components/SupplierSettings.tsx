'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type SupplierSettingKey =
  | 'Store'
  | 'phone'
  | 'email'
  | 'previous-due'
  | 'address'
  | 'division'
  | 'post-code'
  | 'country'
  | 'domain'
  | 'bank-account'
  | 'photo'
  | 'group'
  | 'status'

const defaultSettings: Record<SupplierSettingKey, boolean> = {
  Store: true,
  phone: true,
  email: false,
  'previous-due': true,
  address: true,
  division: false,
  'post-code': false,
  country: false,
  domain: false,
  'bank-account': false,
  photo: true,
  group: true,
  status: true,
}

export default function SupplierSettings() {
  const [settings, setSettings] = useState<Record<SupplierSettingKey, boolean>>(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem('supplier-settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('supplier-settings', JSON.stringify(settings))
  }, [settings])

  const handleToggle = (key: SupplierSettingKey) => {
    const updated = { ...settings, [key]: !settings[key] }
    setSettings(updated)
    toast.success(`"${settingLabel[key]}" ${updated[key] ? 'চালু হয়েছে ✅' : 'বন্ধ হয়েছে ❌'}`)
  }

  const settingLabel: Record<SupplierSettingKey, string> = {
    Store: 'কোম্পানি নাম',
    phone: 'ফোন নাম্বার (অপশনাল)',
    email: 'ইমেইল',
    'previous-due': 'পূর্বের বাকী',
    address: 'বর্তমান ঠিকানা',
    division: 'বিভাগ',
    'post-code': 'পোস্ট কোড',
    country: 'দেশ নাম',
    domain: 'ডোমেইন',
    'bank-account': 'ব্যাংক একাউন্ট',
    photo: 'ছবি',
    group: 'সাপ্লাইয়ার গ্রুপ',
    status: 'অবস্থা',
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">সাপ্লাইয়ার সেটিংস</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settingLabel).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between border-b pb-3 last:border-none last:pb-0"
            >
              <Label className="text-base font-medium">{label}</Label>
              <Switch
                checked={settings[key as SupplierSettingKey]}
                onCheckedChange={() => handleToggle(key as SupplierSettingKey)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
