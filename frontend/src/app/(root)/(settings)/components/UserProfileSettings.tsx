'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { CameraIcon } from 'lucide-react'

export default function UserProfileSettings() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john@example.com')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)

  const [avatar, setAvatar] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setAvatar(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!name || !email) {
      toast.error('Name and email are required.')
      return
    }

    setSaving(true)
    setTimeout(() => {
      toast.success('Profile updated successfully.')
      setSaving(false)
    }, 1200)
  }

  return (
    <div className="w-full max-w-full mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Update your basic information and preferences.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center md:col-span-2 mb-4">
            <div className="relative group">
              <Avatar className="w-28 h-28">
                <AvatarImage src={avatar || '/default-avatar.png'} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                <CameraIcon className="text-white w-6 h-6" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Click on image to update profile photo
            </p>
          </div>

          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="+8801..."
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              className="mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell us something about you..."
              className="w-full mt-2 rounded-md border px-3 py-2 text-sm border-input bg-background"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="password">Change Password (optional)</Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank if you don’t want to change your password.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
