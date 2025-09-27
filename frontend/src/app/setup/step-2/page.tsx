'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

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

export default function SetupStep2() {
    const router = useRouter()
    const [Store, setStore] = useState({
        name: '',
        address: '',
        phone: '',
        taxId: '',
        businessType: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const existingStore = localStorage.getItem('store-name')
        if (!existingStore) {
            router.replace('/setup/step-1') // Must complete step 1 first
        }
    }, [router])

    function validate() {
        if (!Store.name.trim()) {
            toast.error('Store name is required.')
            return false
        }
        if (!Store.phone.trim()) {
            toast.error('Phone number is required.')
            return false
        }
        if (!Store.businessType) {
            toast.error('Please select a business type.')
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
            localStorage.setItem('Store-info', JSON.stringify(Store))
            toast.success('Store info saved!')
            router.push('/setup/step-3') // Go to next step
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
                    currentStep={2}
                    steps={['Create Store', 'Store Info', 'POS Settings', 'Add Staff']}
                />

                <h1 className="text-2xl font-semibold mb-6 text-center text-foreground">
                    Store Information
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <Label htmlFor="name">
                            Store Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={Store.name}
                            onChange={(e) => setStore({ ...Store, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={Store.address}
                            onChange={(e) => setStore({ ...Store, address: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label htmlFor="phone">
                            Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="phone"
                            value={Store.phone}
                            onChange={(e) => setStore({ ...Store, phone: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                        <Input
                            id="taxId"
                            value={Store.taxId}
                            onChange={(e) => setStore({ ...Store, taxId: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label>
                            Business Type <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            value={Store.businessType}
                            onValueChange={(val) => setStore({ ...Store, businessType: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                                <SelectItem value="service">Service</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full py-3">
                        {isSubmitting ? 'Saving...' : 'Continue to Settings'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
