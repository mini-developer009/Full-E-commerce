'use client'

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

const months = [
  { label: "জানুয়ারি", value: "01" },
  { label: "ফেব্রুয়ারি", value: "02" },
  { label: "মার্চ", value: "03" },
  { label: "এপ্রিল", value: "04" },
  { label: "মে", value: "05" },
  { label: "জুন", value: "06" },
  { label: "জুলাই", value: "07" },
  { label: "আগস্ট", value: "08" },
  { label: "সেপ্টেম্বর", value: "09" },
  { label: "অক্টোবর", value: "10" },
  { label: "নভেম্বর", value: "11" },
  { label: "ডিসেম্বর", value: "12" },
]

const years = ["2023", "2024", "2025", "2026"]

const summaryData = [
  { title: "মোট বিক্রয়", amount: 42757.5 },
  { title: "মোট ক্রয় মুল্য", amount: 40100 },
  { title: "মোট জমা", amount: 5190 },
  { title: "মোট বাকি", amount: 53867.5 },
  { title: "মোট ইনকাম", amount: 5190 },
  { title: "মোট খরচ", amount: 5100 },
  { title: "মোট ব্যালেন্স", amount: 90 },
  { title: "গ্রস প্রফিট", amount: 2657.5 },
  { title: "নেট প্রফিট", amount: -2442.5 },
]

export default function MonthlySummaryPage() {
  const [selectedMonth, setSelectedMonth] = useState("07")
  const [selectedYear, setSelectedYear] = useState("2025")

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">মাসিক সারাংশ</h1>
        <div className="flex gap-3">
          <Select onValueChange={(value) => setSelectedMonth(value)} defaultValue={selectedMonth}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="মাস নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedYear(value)} defaultValue={selectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="বছর নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaryData.map((item, idx) => (
          <Card key={idx} className="p-4 border shadow-sm hover:shadow-md transition rounded-lg">
            <div className="text-sm text-muted-foreground">{item.title}</div>
            <div className={`text-xl font-semibold ${item.amount < 0 ? "text-red-600" : "text-foreground"}`}>
              ৳ {item.amount.toLocaleString()}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}