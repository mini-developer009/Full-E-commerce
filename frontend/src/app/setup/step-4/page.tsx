'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

// Reuse the same StepTracker component from Step3 for consistency
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

export default function SetupStep4() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [staff, setStaff] = useState({
    name: '',
    email: '',
    role: 'admin',
    password: '',
  })

  useEffect(() => {
    const store = localStorage.getItem('store-name')
    const Store = localStorage.getItem('Store-info')
    const settings = localStorage.getItem('pos-settings')
    if (!store || !Store || !settings) {
      router.replace('/setup/step-1')
    }
  }, [router])

  function validate() {
    if (!staff.name.trim()) {
      toast.error('Full name is required.')
      return false
    }
    if (!staff.email.trim() || !/\S+@\S+\.\S+/.test(staff.email)) {
      toast.error('Valid email is required.')
      return false
    }
    if (!staff.password.trim() || staff.password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return false
    }
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    try {
      await new Promise((res) => setTimeout(res, 500))
      localStorage.setItem('staff-user', JSON.stringify(staff))
      toast.success('Staff user created!')
      router.push('/') // or /setup/step-5 if you add product step
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
          currentStep={4}
          steps={['Create Store', 'Store Info', 'POS Settings', 'Add Staff']}
        />

        <h1 className="text-2xl font-semibold mb-6 text-center text-foreground">
          Add First Staff Member
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name" className="text-foreground">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={staff.name}
              onChange={(e) => setStaff({ ...staff, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={staff.email}
              onChange={(e) => setStaff({ ...staff, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-foreground">
              Role
            </Label>
            <Select
              value={staff.role}
              onValueChange={(val) => setStaff({ ...staff, role: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="cashier">Cashier</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="password" className="text-foreground">
              Password <span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={staff.password}
              onChange={(e) => setStaff({ ...staff, password: e.target.value })}
              required
            />
            <p className="text-xs mt-1 text-muted-foreground">Minimum 6 characters.</p>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full py-3">
            {isSubmitting ? 'Creating...' : 'Finish Setup'}
          </Button>
        </form>
      </div>
    </div>
  )
}
