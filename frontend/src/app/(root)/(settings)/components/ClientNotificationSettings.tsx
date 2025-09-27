'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

type NotificationKey = 'sms' | 'email'

type NotificationConfig = {
  sms: {
    enabled: boolean
    senderId: string
    apiToken: string
  }
  email: {
    enabled: boolean
    fromEmail: string
    smtpHost: string
  }
}

const defaultSettings: NotificationConfig = {
  sms: {
    enabled: true,
    senderId: '',
    apiToken: '',
  },
  email: {
    enabled: true,
    fromEmail: '',
    smtpHost: '',
  },
}

export default function ClientNotificationSettings() {
  const [settings, setSettings] = useState<NotificationConfig>(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem('client-notification-settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('client-notification-settings', JSON.stringify(settings))
  }, [settings])

  const handleToggle = (key: NotificationKey) => {
    const updated = {
      ...settings,
      [key]: {
        ...settings[key],
        enabled: !settings[key].enabled,
      },
    }
    setSettings(updated)
    toast.success(`${notificationLabel[key]} ${updated[key].enabled ? 'চালু হয়েছে ✅' : 'বন্ধ হয়েছে ❌'}`)
  }

  const handleChange = (
    key: NotificationKey,
    field: string,
    value: string
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }))
  }

  const notificationLabel: Record<NotificationKey, string> = {
    sms: 'এসএমএস',
    email: 'ইমেইল',
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">নোটিফিকেশন সেটিংস</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SMS Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">এসএমএস</Label>
              <Switch
                checked={settings.sms.enabled}
                onCheckedChange={() => handleToggle('sms')}
              />
            </div>
            {settings.sms.enabled && (
              <div className="grid gap-3 mt-3">
                <Input
                  placeholder="Sender ID"
                  value={settings.sms.senderId}
                  onChange={(e) => handleChange('sms', 'senderId', e.target.value)}
                />
                <Input
                  placeholder="API Token"
                  value={settings.sms.apiToken}
                  onChange={(e) => handleChange('sms', 'apiToken', e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Email Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">ইমেইল</Label>
              <Switch
                checked={settings.email.enabled}
                onCheckedChange={() => handleToggle('email')}
              />
            </div>
            {settings.email.enabled && (
              <div className="grid gap-3 mt-3">
                <Input
                  placeholder="From Email"
                  value={settings.email.fromEmail}
                  onChange={(e) => handleChange('email', 'fromEmail', e.target.value)}
                />
                <Input
                  placeholder="SMTP Host"
                  value={settings.email.smtpHost}
                  onChange={(e) => handleChange('email', 'smtpHost', e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
