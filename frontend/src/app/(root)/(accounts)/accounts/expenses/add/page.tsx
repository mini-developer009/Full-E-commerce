'use client'

import React, { useState } from 'react'
import {
  Card
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function CreateExpensePage() {
  const [formData, setFormData] = useState({
    date: '',
    account: '',
    amount: '',
    category: '',
    bank: '',
    checkNo: '',
    file: null as File | null,
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted Data:', formData)
    // API call or logic here
  }

  return (
    <div className="w-full p-4">
      <Card className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">খরচ তৈরি করুন</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">তারিখ</Label>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="account">একাউন্ট নির্বাচন করুন</Label>
            <Input name="account" value={formData.account} onChange={handleChange} placeholder="একাউন্ট নাম" />
          </div>

          <div>
            <Label htmlFor="amount">টাকার পরিমাণ</Label>
            <Input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </div>

          <div>
            <Label>খাত নির্বাচন করুন</Label>
            <Select onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="খরচের ধরন নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="advance">অগ্রিম</SelectItem>
                <SelectItem value="loan">লোন</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>ব্যাংক নির্বাচন করুন</Label>
            <Select onValueChange={(value) => handleSelectChange("bank", value)}>
              <SelectTrigger>
                <SelectValue placeholder="ব্যাংক নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brac">BRAC Bank</SelectItem>
                <SelectItem value="dutch-bangla">Dutch-Bangla</SelectItem>
                <SelectItem value="islamic">Islami Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="checkNo">চেক নাম্বার</Label>
            <Input name="checkNo" value={formData.checkNo} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="file">ফাইল আপলোড করুন</Label>
            <Input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
            {formData.file && <p className="text-sm text-muted-foreground mt-1">আপলোড হয়েছে: {formData.file.name}</p>}
          </div>

          <div>
            <Label htmlFor="description">সংক্ষিপ্ত নোট</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="খরচ সম্পর্কে সংক্ষিপ্ত বর্ণনা লিখুন" />
          </div>

          <Button type="submit" className="w-full">
            খরচ সাবমিট করুন
          </Button>
        </form>
      </Card>
    </div>
  )
}
