'use client'

import React, { useState } from 'react'
import {
  Card, CardHeader, CardTitle
} from '@/components/ui/card'
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, Funnel, Pencil, Plus, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

// ✅ Interface
interface CraftsmanReturnItem {
  id: number
  serial: number
  returnDate: string
  customer: string
  invoiceId: string
  category: string
  totalWeight: number
  totalAmount: number
  paidAmount: number
  status: string
}

// ✅ Sample Data
const CraftsmanReturnListData: CraftsmanReturnItem[] = [
  {
    id: 1,
    serial: 1,
    returnDate: '2025-07-10',
    customer: 'জুয়েল রানা',
    invoiceId: 'KR-1001',
    category: 'চেইন',
    totalWeight: 22,
    totalAmount: 15000,
    paidAmount: 10000,
    status: 'আংশিক',
  },
  {
    id: 2,
    serial: 2,
    returnDate: '2025-07-08',
    customer: 'সোহেল পারভেজ',
    invoiceId: 'KR-1002',
    category: 'ধানছড়ি চেন',
    totalWeight: 30,
    totalAmount: 25000,
    paidAmount: 25000,
    status: 'পূর্ণ',
  },
]

// ✅ Table fields
const tableFields: {
  key: keyof CraftsmanReturnItem | "actions"
  label: string
  align?: "left" | "right"
}[] = [
  { key: "serial", label: "সিরিয়াল" },
  { key: "returnDate", label: "ফেরতের তারিখ" },
  { key: "customer", label: "কাস্টমার" },
  { key: "invoiceId", label: "ইনভয়েস নং" },
  { key: "category", label: "খাত" },
  { key: "totalWeight", label: "ওজন", align: "right" },
  { key: "totalAmount", label: "বিল", align: "right" },
  { key: "paidAmount", label: "প্রদান", align: "right" },
  { key: "status", label: "অবস্থা" },
  { key: "actions", label: "একশন", align: "right" },
]

// ✅ Reusable Table Component
const CraftsmanReturnTable: React.FC<{ data: CraftsmanReturnItem[] }> = ({ data }) => {
  return (
    <div className="overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {tableFields.map((field) => (
              <TableHead
                key={field.key}
                className={`px-4 py-2 ${field.align === "right" ? "text-right" : "text-left"}`}
              >
                {field.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableFields.length} className="text-center py-6">
                কোনো ডাটা নেই
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/50">
                {tableFields.map((field) => {
                  if (field.key === "actions") {
                    return (
                      <TableCell key="actions" className="text-right px-4 py-2">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-blue-600" aria-label="View">
                            <Eye size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-green-600" aria-label="Edit">
                            <Pencil size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600" aria-label="Delete">
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    )
                  }

                  const value = row[field.key as keyof CraftsmanReturnItem]

                  return (
                    <TableCell
                      key={field.key}
                      className={`px-4 py-2 ${field.align === "right" ? "text-right" : "text-left"}`}
                    >
                      {typeof value === "number" ? value.toLocaleString() : value}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const rowsPerPageOptions = [10, 20, 30, 50]

const CraftsmanReturnListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const totalPages = Math.ceil(CraftsmanReturnListData.length / rowsPerPage)
  const currentData = CraftsmanReturnListData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const t = useTranslations('nav')
  const tg = useTranslations('global')

  return (
    <div className="w-full p-4 space-y-6">
      <Card className="w-full p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold">কারিগর ফেরত লিস্ট</h3>
          <Button variant="ghost">
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Input type="text" placeholder="কাস্টমার দ্বারা অনুসন্ধান করুন" />
          <Select onValueChange={(value) => {
            setRowsPerPage(parseInt(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="রো সংখ্যা নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {rowsPerPageOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Print */}
          <PrintWrapper printTitle="কারিগর ফেরত লিস্ট" preview={false}>
            <div className="p-6 bg-white">
              <PrintableHeader
                title="কারিগর ফেরত লিস্ট"
                subtitle="Invoice #12345"
                date={new Date().toLocaleDateString()}
                Store={{
                  name: "Suborno Ltd",
                  logoUrl: "https://www.suborno.dev/favicon.ico",
                  address: "123 Business Street, Dhaka",
                  phone: "01234-567890",
                  email: "info@suborno.dev",
                }}
                accentColor="blue-600"
              />
              <CraftsmanReturnTable data={currentData} />
            </div>
          </PrintWrapper>
        </div>

        {/* Table section */}
        <CraftsmanReturnTable data={currentData} />

        {/* Pagination */}
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={i + 1 === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(i + 1)
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  )
}

export default CraftsmanReturnListPage