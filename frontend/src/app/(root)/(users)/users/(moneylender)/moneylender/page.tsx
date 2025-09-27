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
import DynamicTable from '@/components/DynamicTable'
import PrintableHeader from '@/components/PrintableHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, FileText, Funnel, Pencil, Plus, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface MoneylenderListItem {
  id: number
  serial: number
  paymentDate: string  // প্রদান এর তারিখ
  returnDate: string   // ফেরতের তারিখ
  customer: string     // কাস্টমার নাম
  mortgageId: string   // বন্ধক আইডি
  category: string     // খাত
  billAmount: number   // বিল টাকা
  paidAmount: number   // টাকা
  dueAmount: number    // বাকি টাকা
  status: string       // অবস্থা
}


const MoneylenderListData: MoneylenderListItem[] = [
  {
    id: 1,
    serial: 1,
    paymentDate: '2025-05-01',
    returnDate: '2025-10-01',
    customer: 'মোঃ আব্দুল্লাহ',
    mortgageId: 'MG-1001',
    category: 'আবাসিক',
    billAmount: 50000,
    paidAmount: 20000,
    dueAmount: 30000,
    status: 'চলমান',
  },
  {
    id: 2,
    serial: 2,
    paymentDate: '2025-04-15',
    returnDate: '2025-09-15',
    customer: 'সেলিনা হোসেন',
    mortgageId: 'MG-1002',
    category: 'বাণিজ্যিক',
    billAmount: 100000,
    paidAmount: 80000,
    dueAmount: 20000,
    status: 'বাতিল',
  },
]


// ✅ Dynamic table fields
const tableFields: {
  key: keyof MoneylenderListItem | "actions"
  label: string
  align?: "left" | "right"
  isImage?: boolean
}[] = [
    { key: "serial", label: "সিরিয়াল", align: "left" },
    { key: "paymentDate", label: "প্রদান এর তারিখ" },
    { key: "returnDate", label: "ফেরতের তারিখ" },
    { key: "customer", label: "কাস্টমার" },
    { key: "mortgageId", label: "বন্ধক আইডি" },
    { key: "category", label: "খাত" },
    { key: "billAmount", label: "বিল টাকা", align: "right" },
    { key: "paidAmount", label: "টাকা", align: "right" },
    { key: "dueAmount", label: "বাকি টাকা", align: "right" },
    { key: "status", label: "অবস্থা" },
    // If you have image, you can add it here
    // { key: "image", label: "ছবি", isImage: true },
    { key: "actions", label: "একশন", align: "right" },
  ]

// ✅ Dynamic MoneylenderTable component
const MoneylenderTable: React.FC<{ data: MoneylenderListItem[] }> = ({ data }) => {
  return (
    <div className="overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {tableFields.map((field) => (
              <TableHead
                key={field.key}
                className={`px-4 py-2 ${field.align === "right" ? "text-right" : "text-left"
                  }`}
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
                      <TableCell
                        key="actions"
                        className="text-right px-4 py-2"
                      >
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="View"
                          >
                            <Eye size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-800"
                            aria-label="Edit"
                          >
                            <Pencil size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    )
                  }

                  const value = row[field.key as keyof MoneylenderListItem]

                  return (
                    <TableCell
                      key={field.key}
                      className={`px-4 py-2 ${field.align === "right" ? "text-right" : "text-left"
                        }`}
                    >
                      {field.isImage && typeof value === "string" ? (
                        <img
                          src={value}
                          alt="Product"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      ) : typeof value === "number" ? (
                        value.toLocaleString()
                      ) : (
                        value
                      )}
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



const rowsPerPageOptions = [10, 20, 30, 40, 50]

const MoneylenderListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const totalPages = Math.ceil(MoneylenderListData.length / rowsPerPage)
  const currentData = MoneylenderListData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const t = useTranslations('nav')
  const tg = useTranslations('global')

  return (
    <div className="w-full p-4 space-y-6">

      {/* Main table card */}
      <Card className="w-full p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold">{t('moneylenders-transactions')}</h3>
          <Button variant="ghost" className="w-fit self-end sm:self-auto">
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className='flex items-center gap-4 w-full'>
          <Input type="text" placeholder={tg('search-by', { name: t('moneylender') })} />
          <Select onValueChange={(value) => {
            setRowsPerPage(parseInt(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={tg('select-rows')} />
            </SelectTrigger>
            <SelectContent>
              {rowsPerPageOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <PrintWrapper printTitle="Customers Statement" preview={false}>
            <div className="p-6 bg-white">
              <div className='pt-4'>
                <PrintableHeader
                  title="Customers Statement"
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
                <MoneylenderTable data={currentData} />
              </div>
            </div>
          </PrintWrapper>
        </div>

        {/* ✅ Reusable dynamic table */}
        <MoneylenderTable data={currentData} />

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

export default MoneylenderListPage
