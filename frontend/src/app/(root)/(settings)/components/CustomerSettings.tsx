'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type CustomerSettingKey =
  | 'id'
  | 'name'
  | 'Store'
  | 'address'
  | 'phone1'
  | 'phone2'
  | 'previous-due'
  | 'max-due-limit'
  | 'email'
  | 'dob'
  | 'upazila'
  | 'post-code'
  | 'group'
  | 'photo'
  | 'status'

const defaultSettings: Record<CustomerSettingKey, boolean> = {
  id: true,
  name: true,
  Store: true,
  address: true,
  phone1: true,
  phone2: false,
  'previous-due': true,
  'max-due-limit': false,
  email: false,
  dob: false,
  upazila: false,
  'post-code': false,
  group: true,
  photo: true,
  status: true,
}

export default function CustomerSettings() {
  const [settings, setSettings] = useState<Record<CustomerSettingKey, boolean>>(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem('customer-settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('customer-settings', JSON.stringify(settings))
  }, [settings])

  const handleToggle = (key: CustomerSettingKey) => {
    const updated = { ...settings, [key]: !settings[key] }
    setSettings(updated)
    toast.success(`"${settingLabel[key]}" ${updated[key] ? 'চালু হয়েছে ✅' : 'বন্ধ হয়েছে ❌'}`)
  }

  const settingLabel: Record<CustomerSettingKey, string> = {
    id: 'আইডি',
    name: 'কাস্টমার নাম',
    Store: 'কোম্পানি নাম',
    address: 'ঠিকানা',
    phone1: 'ফোন নাম্বার',
    phone2: 'ফোন নাম্বার 2',
    'previous-due': 'পূর্বের বাকী',
    'max-due-limit': 'সর্বচ্চ বাকির লিমিট',
    email: 'ইমেইল',
    dob: 'জন্ম তারিখ',
    upazila: 'উপজেলা',
    'post-code': 'পোস্ট কোড',
    group: 'কাস্টমার গ্রুপ',
    photo: 'ছবি',
    status: 'অবস্থা',
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">কাস্টমার সেটিংস</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settingLabel).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between border-b pb-3 last:border-none last:pb-0"
            >
              <Label className="text-base font-medium">{label}</Label>
              <Switch
                checked={settings[key as CustomerSettingKey]}
                onCheckedChange={() => handleToggle(key as CustomerSettingKey)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
