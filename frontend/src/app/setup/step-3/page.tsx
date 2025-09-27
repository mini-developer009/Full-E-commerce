'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'

interface StepTrackerProps {
  currentStep: number
  steps: string[]
}

function StepTracker({ currentStep, steps }: StepTrackerProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex justify-between">
        {steps.map((step, idx) => {
          const stepNumber = idx + 1
          const isCurrent = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <li key={step} className="flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                    ${
                      isCompleted
                        ? 'border-primary bg-primary text-primary-foreground'
                        : isCurrent
                        ? 'border-primary bg-background text-primary'
                        : 'border-muted text-muted-foreground'
                    }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5 text-primary-foreground"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCurrent
                      ? 'text-foreground'
                      : isCompleted
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default function SetupStep3() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [settings, setSettings] = useState({
    currency: 'BDT',
    timezone: 'Asia/Dhaka',
    language: 'en',
    barcode: true,
    receipt: true,
    shift: false,
  })

  useEffect(() => {
    const store = localStorage.getItem('store-name')
    const Store = localStorage.getItem('Store-info')
    if (!store || !Store) {
      router.replace('/setup/step-1')
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((res) => setTimeout(res, 500))
      localStorage.setItem('pos-settings', JSON.stringify(settings))
      toast.success('Settings saved successfully!')
      router.push('/setup/step-4')
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md bg-card rounded-xl shadow-md p-8">
        <StepTracker
          currentStep={3}
          steps={['Create Store', 'Store Info', 'POS Settings', 'Add Staff']}
        />

        <h1 className="text-2xl font-semibold mb-6 text-center text-foreground">
          POS Default Settings
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="text-foreground">Currency</Label>
            <Select
              value={settings.currency}
              onValueChange={(val) => setSettings({ ...settings, currency: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BDT">BDT (৳)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="INR">INR (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground">Timezone</Label>
            <Select
              value={settings.timezone}
              onValueChange={(val) => setSettings({ ...settings, timezone: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Dhaka">Asia/Dhaka</SelectItem>
                <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                <SelectItem value="America/New_York">America/New_York</SelectItem>
                <SelectItem value="Europe/London">Europe/London</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground">Language</Label>
            <Select
              value={settings.language}
              onValueChange={(val) => setSettings({ ...settings, language: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="bn">বাংলা</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="block text-sm font-medium text-foreground">POS Features</Label>

            <div className="flex items-center justify-between">
              <span>Barcode Scanning</span>
              <Switch
                checked={settings.barcode}
                onCheckedChange={(val) => setSettings({ ...settings, barcode: val })}
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Receipt Printing</span>
              <Switch
                checked={settings.receipt}
                onCheckedChange={(val) => setSettings({ ...settings, receipt: val })}
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Shift Management</span>
              <Switch
                checked={settings.shift}
                onCheckedChange={(val) => setSettings({ ...settings, shift: val })}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full py-3">
            {isSubmitting ? 'Saving...' : 'Continue to Add Staff'}
          </Button>
        </form>
      </div>
    </div>
  )
}
