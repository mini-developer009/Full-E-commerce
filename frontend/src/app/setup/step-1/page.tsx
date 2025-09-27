'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import Loading from '../../loading'

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
                    ${isCompleted
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
                  className={`mt-2 text-xs font-medium ${isCurrent
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

export default function SetupStep1() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [storeName, setStoreName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const existingStore = localStorage.getItem('store-name')
    if (existingStore) {
      router.replace('/setup/step-2')
    } else {
      setLoading(false)
    }
  }, [router])

  function validate() {
    if (!storeName.trim()) {
      toast.error('Store name is required.')
      return false
    }
    if (!/^[a-z0-9-]+$/.test(storeName)) {
      toast.error('Use lowercase letters, numbers and hyphens only.')
      return false
    }
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem('store-name', storeName)
      toast.success(`Store "${storeName}" created!`)
      router.push('/setup/step-2') // move to Store info
    } catch {
      toast.error('Failed to create store.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md bg-card rounded-xl shadow-md p-8">
        <StepTracker
          currentStep={1}
          steps={['Create Store', 'Store Info', 'POS Settings', 'Add Staff']}
        />

        <h1 className="text-2xl font-semibold mb-6 text-center text-foreground">
          Create Your Store
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="storeName" className="block mb-1 font-medium text-foreground">
              Store Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="storeName"
              name="storeName"
              placeholder="my-store"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value.toLowerCase())}
              className="lowercase"
              autoFocus
              required
            />
            <p className="text-xs mt-1 text-muted-foreground">
              Lowercase letters, numbers, hyphens only.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 font-semibold"
          >
            {isSubmitting ? 'Creating Store...' : 'Continue to Store Info'}
          </Button>
        </form>
      </div>
    </div>
  )
}
