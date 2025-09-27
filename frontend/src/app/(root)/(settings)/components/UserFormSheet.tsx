'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  onUserCreate: (user: any) => void
}

export default function UserFormSheet({ onUserCreate }: Props) {
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!userData.name || !userData.username || !userData.password) {
      toast.error('নাম, ইউজারনেম এবং পাসওয়ার্ড আবশ্যক।')
      return
    }

    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date(),
    }

    onUserCreate(newUser)
    toast.success('নতুন ইউজার তৈরি হয়েছে ✅')
    setUserData({
      name: '',
      username: '',
      phone: '',
      email: '',
      password: '',
    })
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>+ নতুন ইউজার</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>নতুন ইউজার তৈরি</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          <Input name="name" placeholder="নাম" value={userData.name} onChange={handleChange} />
          <Input name="username" placeholder="ইউজারনেম" value={userData.username} onChange={handleChange} />
          <Input name="phone" placeholder="ফোন নাম্বার" value={userData.phone} onChange={handleChange} />
          <Input name="email" placeholder="ইমেইল" value={userData.email} onChange={handleChange} />
          <Input name="password" placeholder="পাসওয়ার্ড" value={userData.password} onChange={handleChange} />

          <Button onClick={handleSubmit} className="w-full">
            ইউজার যুক্ত করুন
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
