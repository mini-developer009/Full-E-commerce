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

interface JomaListItem {
  id: number
  serial: number
  date: string
  receipt: string
  invoice: string
  customer: string
  type: string
  description: string
  amount: number
  moneyReceipt: string
}

const MoneylenderListData: JomaListItem[] = [
  {
    id: 1, serial: 1, date: '02 Jul 2025', receipt: '20', invoice: 'Account Initial',
    customer: 'একাউন্ট', type: '', description: '', amount: 0, moneyReceipt: ''
  },
  {
    id: 2, serial: 2, date: '02 Jul 2025', receipt: '21', invoice: '2',
    customer: 'Name: Sefat\nNumber: ---', type: 'ইনভয়েস', description: '', amount: 0, moneyReceipt: ''
  },
  {
    id: 3, serial: 3, date: '27 Jun 2025', receipt: '19', invoice: '1',
    customer: 'Name: irin\nNumber: 01999999989', type: 'আদায়', description: 'বাকি টাকা পরে দিবো', amount: 100, moneyReceipt: ''
  },
  {
    id: 4, serial: 4, date: '13 Jun 2025', receipt: '12', invoice: 'Account Initial',
    customer: 'একাউন্ট', type: '', description: '', amount: 10000, moneyReceipt: ''
  },
  {
    id: 5, serial: 5, date: '13 Jun 2025', receipt: '14', invoice: '',
    customer: 'Name: Nayem\nNumber: 2353453534', type: '', description: '', amount: 5000, moneyReceipt: ''
  },
  {
    id: 6, serial: 6, date: '12 Jun 2025', receipt: '13', invoice: 'Account Initial',
    customer: 'একাউন্ট', type: '', description: '', amount: 0, moneyReceipt: ''
  },
  {
    id: 7, serial: 7, date: '11 Jun 2025', receipt: '1', invoice: 'Account Initial',
    customer: 'একাউন্ট', type: '', description: '', amount: 0, moneyReceipt: ''
  },
  {
    id: 8, serial: 8, date: '11 Jun 2025', receipt: '2', invoice: 'Account Initial',
    customer: 'একাউন্ট', type: '', description: '', amount: 20000, moneyReceipt: ''
  },
  {
    id: 9, serial: 9, date: '11 Jun 2025', receipt: '11', invoice: '',
    customer: 'Name: Minhaj\nNumber: 0328487364', type: 'আদায়', description: '', amount: 50, moneyReceipt: ''
  },
  {
    id: 10, serial: 10, date: '25 May 2025', receipt: '4', invoice: '1',
    customer: 'Name: irin\nNumber: 01999999989', type: 'ইনভয়েস', description: '', amount: 40, moneyReceipt: ''
  }
]



// ✅ Dynamic table fields
const tableFields: {
  key: keyof JomaListItem | "actions"
  label: string
  align?: "left" | "right"
  isImage?: boolean
}[] = [
  { key: "serial", label: "সিরিয়াল" },
  { key: "date", label: "তারিখ" },
  { key: "receipt", label: "রিসিপ্ট নং" },
  { key: "invoice", label: "ইনভয়েস নং" },
  { key: "customer", label: "কাস্টমার" },
  { key: "type", label: "ধরন" },
  { key: "description", label: "বর্ণনা" },
  { key: "amount", label: "টাকা", align: "right" },
  { key: "moneyReceipt", label: "মানি রিসিপ্ট" },
  { key: "actions", label: "একশন", align: "right" }
]

// ✅ Dynamic MoneylenderTable component
const MoneylenderTable: React.FC<{ data: JomaListItem[] }> = ({ data }) => {
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

                  const value = row[field.key as keyof JomaListItem]

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

const navLinks = [
  {
    href: '/customers/Moneylender/add',
    icon: <Plus className="w-6 h-6 text-primary" />,
    title: 'add-new',
  },
  {
    href: '/customers/Moneylender/groups',
    icon: <Users className="w-6 h-6 text-primary" />,
    title: 'mortgage-groups',
  },
  {
    href: '/customers/Moneylender/statement',
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: 'mortgage-statement',
  },
]

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
      {/* Navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="w-full p-6 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:border-primary flex flex-col items-center text-center rounded-2xl">
              <div className="mb-3">{link.icon}</div>
              <div className="font-semibold text-base">{t(link.title)}</div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main table card */}
      <Card className="w-full p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold">জমা লিস্ট</h3>
          <Button variant="ghost" className="w-fit self-end sm:self-auto">
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className='flex items-center gap-4 w-full'>
          <Input type="text" placeholder={tg('search-by', { name: "রিসিপ্ট নং" })} />
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
