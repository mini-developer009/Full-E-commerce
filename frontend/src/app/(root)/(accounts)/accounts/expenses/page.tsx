'use client'

import React, { useState } from 'react'
import {
  Card
} from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Eye, Pencil, Trash2, Printer } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import { useTranslations } from 'next-intl'

interface ExpenseItem {
  id: number
  serial: number
  date: string
  receiptFor: string
  category: string
  account: string
  checkNo: string
  description: string
  transactionType: string
  bank: string
  amount: number
}

const expenseData: ExpenseItem[] = [
  {
    id: 18,
    serial: 1,
    date: '19 Jun 2025',
    receiptFor: 'Admin',
    category: 'Salary',
    account: 'CASH',
    checkNo: '',
    description: 'স্টাফ পেমেন্ট',
    transactionType: '---',
    bank: '',
    amount: 5000
  },
  {
    id: 17,
    serial: 2,
    date: '17 Jun 2025',
    receiptFor: '',
    category: 'Delivery Charge',
    account: 'CASH',
    checkNo: '',
    description: 'খরচ',
    transactionType: '---',
    bank: '',
    amount: 100
  }
]

const tableFields = [
  { key: 'serial', label: 'সিরিয়াল' },
  { key: 'date', label: 'তারিখ' },
  { key: 'receiptFor', label: 'রিসিপ্ট ফর' },
  { key: 'id', label: 'আইডি' },
  { key: 'category', label: 'খাত' },
  { key: 'account', label: 'একাউন্ট' },
  { key: 'checkNo', label: 'চেক নং' },
  { key: 'description', label: 'বর্ণনা' },
  { key: 'transactionType', label: 'ট্রান্সজিকশন ধরন' },
  { key: 'bank', label: 'ব্যাংক' },
  { key: 'amount', label: 'টাকা', align: 'right' },
  { key: 'print', label: 'প্রিন্ট', align: 'right' },
  { key: 'actions', label: 'একশন', align: 'right' }
]

const ExpenseTable: React.FC<{ data: ExpenseItem[] }> = ({ data }) => {
  return (
    <div className="overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {tableFields.map(field => (
              <TableHead key={field.key} className={`px-4 py-2 ${field.align === 'right' ? 'text-right' : 'text-left'}`}>
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
                  if (field.key === 'actions') {
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

                  if (field.key === 'print') {
                    return (
                      <TableCell key="print" className="text-right px-4 py-2">
                        <Button variant="ghost" size="icon"><Printer size={18} /></Button>
                      </TableCell>
                    )
                  }

                  const value = row[field.key as keyof ExpenseItem]
                  return (
                    <TableCell key={field.key} className={`px-4 py-2 ${field.align === 'right' ? 'text-right' : ''}`}>
                      {typeof value === 'number' ? value.toLocaleString() : value}
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

export default function ExpenseListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const totalPages = Math.ceil(expenseData.length / rowsPerPage)
  const currentData = expenseData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const tg = useTranslations('global')

  return (
    <div className="w-full p-4 space-y-6">
      <Card className="w-full p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold">খরচের তালিকা</h3>
        </div>

        <div className="flex items-center gap-4">
          <Input type="text" placeholder={tg('search-by', { name: 'খাত বা চেক নং' })} />
          <Select onValueChange={(value) => {
            setRowsPerPage(parseInt(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={tg('select-rows')} />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40].map(value => (
                <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <PrintWrapper printTitle="Expense Report" preview={false}>
            <div className="p-6 bg-white">
              <PrintableHeader
                title="Expense Report"
                subtitle="Statement"
                date={new Date().toLocaleDateString()}
                Store={{
                  name: "Suborno Ltd",
                  logoUrl: "https://www.suborno.dev/favicon.ico",
                  address: "123 Business Street, Dhaka",
                  phone: "01234-567890",
                  email: "info@suborno.dev",
                }}
                accentColor="red-600"
              />
              <ExpenseTable data={currentData} />
            </div>
          </PrintWrapper>
        </div>

        <ExpenseTable data={currentData} />

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => {
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
