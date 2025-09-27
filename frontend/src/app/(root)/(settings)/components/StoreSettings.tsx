'use client'

import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Store as StoreIcon, Trash2, CheckCircle } from 'lucide-react'

type Store = {
  id: string
  name: string
}

export default function StoreSettings() {
  const [stores, setStores] = useState<Store[]>([])
  const [currentStore, setCurrentStore] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [newStoreName, setNewStoreName] = useState('')
  const [adding, setAdding] = useState(false)

  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null)
  const [confirmationText, setConfirmationText] = useState('')

  useEffect(() => {
    const savedStores = JSON.parse(localStorage.getItem('stores') || '[]')
    const savedCurrent = localStorage.getItem('store-name')
    setStores(savedStores)
    setCurrentStore(savedCurrent)
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('stores', JSON.stringify(stores))
  }, [stores])

  useEffect(() => {
    if (currentStore) {
      localStorage.setItem('store-name', currentStore)
    }
  }, [currentStore])

  function validateStoreName(name: string) {
    if (!name.trim()) {
      toast.error('স্টোরের নাম প্রয়োজন।')
      return false
    }
    if (!/^[a-z0-9-]+$/.test(name)) {
      toast.error('স্টোরের নাম শুধুমাত্র ছোট হাতের অক্ষর, সংখ্যা এবং হাইফেন হতে পারে।')
      return false
    }
    if (stores.some((s) => s.name === name)) {
      toast.error('এই নামের একটি স্টোর ইতিমধ্যে আছে।')
      return false
    }
    return true
  }

  function handleAddStore() {
    if (!validateStoreName(newStoreName)) return
    setAdding(true)
    const newStore: Store = {
      id: Date.now().toString(),
      name: newStoreName,
    }
    setStores([...stores, newStore])
    setCurrentStore(newStore.name)
    setNewStoreName('')
    toast.success(`"${newStore.name}" স্টোর যোগ করা হয়েছে এবং নির্বাচন করা হয়েছে।`)
    setAdding(false)
  }

  function confirmDeleteStore() {
    if (storeToDelete && confirmationText === 'DELETE') {
      const filtered = stores.filter((s) => s.id !== storeToDelete.id)
      setStores(filtered)
      if (currentStore === storeToDelete.name) {
        setCurrentStore(filtered.length > 0 ? filtered[0].name : null)
      }
      toast.success(`স্টোর "${storeToDelete.name}" মুছে ফেলা হয়েছে।`)
      setStoreToDelete(null)
      setConfirmationText('')
    } else {
      toast.error('অনুগ্রহ করে "DELETE" লিখে নিশ্চিত করুন।')
    }
  }

  function handleSwitchStore(name: string) {
    setCurrentStore(name)
    toast.success(`"${name}" স্টোরে সুইচ করা হয়েছে।`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        স্টোর লোড হচ্ছে...
      </div>
    )
  }

  return (
    <div className="w-full mb-10">
      <Card className="relative border-muted shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">স্টোর ব্যবস্থাপনা</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            স্টোর যোগ করুন, পরিবর্তন করুন অথবা মুছুন।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Store */}
          <section className="space-y-2">
            <h2 className="text-base font-medium">নতুন স্টোর যোগ করুন</h2>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <Input
                placeholder="main-store"
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value.toLowerCase())}
                className="lowercase"
              />
              <Button
                onClick={handleAddStore}
                disabled={adding || !newStoreName.trim()}
              >
                {adding ? 'যোগ করা হচ্ছে...' : 'স্টোর যোগ করুন'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              স্টোরের নাম শুধুমাত্র ছোট হাতের অক্ষর, সংখ্যা, এবং হাইফেন হতে পারে।
            </p>
          </section>

          {/* Store List */}
          <section className="pt-4 border-t border-muted space-y-3">
            <h3 className="font-semibold text-base">আপনার স্টোরসমূহ</h3>
            {stores.length === 0 && (
              <p className="text-muted-foreground">কোন স্টোর পাওয়া যায়নি। প্রথমে একটি যোগ করুন।</p>
            )}
            <ul className="space-y-2">
              {stores.map((store) => (
                <li
                  key={store.id}
                  className={`flex items-center justify-between rounded-md p-3 border text-sm ${store.name === currentStore
                    ? 'border-primary bg-primary/10 font-semibold'
                    : 'border-muted'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <StoreIcon className="w-5 h-5 text-primary" />
                    <span className="capitalize">{store.name}</span>
                    {store.name === currentStore && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    {store.name !== currentStore && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSwitchStore(store.name)}
                      >
                        সুইচ করুন
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setStoreToDelete(store)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
        {/* Decorative Store Icon */}
        <StoreIcon
          className="absolute top-4 right-4 text-primary/10 w-40 h-40 pointer-events-none z-0"
          strokeWidth={1}
        />
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!storeToDelete} onOpenChange={(open) => !open && setStoreToDelete(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>স্টোর "{storeToDelete?.name}" মুছবেন?</DialogTitle>
            <DialogDescription>
              মুছে ফেললে এই স্টোরটি স্থায়ীভাবে চলে যাবে। আপনি নিশ্চিত তো?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Label htmlFor="confirm-delete" className="mb-2 block font-medium">
              নিশ্চিত করতে <span className="font-bold">DELETE</span> লিখুন:
            </Label>
            <Input
              id="confirm-delete"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="DELETE"
              className="uppercase tracking-widest"
              autoFocus
            />
          </div>
          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">বাতিল</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDeleteStore}>
              মুছুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
