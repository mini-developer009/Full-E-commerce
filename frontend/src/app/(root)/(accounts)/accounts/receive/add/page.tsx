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
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, Pencil, Trash2, Funnel } from 'lucide-react'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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

const jomaData: JomaListItem[] = [
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

const tableFields = [
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

const JomaTable: React.FC<{ data: JomaListItem[] }> = ({ data }) => {
  return (
    <div className="overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {tableFields.map(field => (
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
            data.map(row => (
              <TableRow key={row.id} className="hover:bg-muted/50">
                {tableFields.map(field => {
                  if (field.key === "actions") {
                    return (
                      <TableCell key="actions" className="text-right px-4 py-2">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon"><Eye size={18} /></Button>
                          <Button variant="ghost" size="icon"><Pencil size={18} /></Button>
                          <Button variant="ghost" size="icon"><Trash2 size={18} /></Button>
                        </div>
                      </TableCell>
                    )
                  }

                  const value = row[field.key as keyof JomaListItem]

                  return (
                    <TableCell
                      key={field.key}
                      className={`px-4 py-2 ${field.align === "right" ? "text-right" : ""}`}
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

const rowsPerPageOptions = [10, 20, 30]

export default function JomaListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const totalPages = Math.ceil(jomaData.length / rowsPerPage)
  const currentData = jomaData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const t = useTranslations('nav')
  const tg = useTranslations('global')

  return (
    <div className="w-full p-4 space-y-6">
      <Card className="w-full p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold">জমা লিস্ট</h3>
          <Button variant="ghost" className="w-fit self-end sm:self-auto">
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className='flex items-center gap-4 w-full'>
          <Input type="text" placeholder="কাস্টমার দিয়ে খুঁজুন" />
          <Select onValueChange={(value) => {
            setRowsPerPage(parseInt(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="রো সংখ্যা" />
            </SelectTrigger>
            <SelectContent>
              {rowsPerPageOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <PrintWrapper printTitle="Joma Report" preview={false}>
            <div className="p-6 bg-white">
              <PrintableHeader
                title="Joma Report"
                subtitle="Statement"
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
              <JomaTable data={currentData} />
            </div>
          </PrintWrapper>
        </div>

        <JomaTable data={currentData} />

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={e => {
                e.preventDefault()
                setCurrentPage(p => Math.max(p - 1, 1))
              }} />
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
              <PaginationNext href="#" onClick={(e) => {
                e.preventDefault()
                setCurrentPage(p => Math.min(p + 1, totalPages))
              }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  )
}
