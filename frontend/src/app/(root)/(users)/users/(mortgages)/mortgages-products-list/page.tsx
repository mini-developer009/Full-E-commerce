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

interface MortgagesListItem {
  id: number
  productDetails: string
  barcodeNumber: string
  stockWarning: number
  asset: string
  image: string
  openingStock: number
  createdAt: string
}

const MortgagesListData: MortgagesListItem[] = [
  {
    id: 1,
    productDetails: 'Cement Bag 50kg',
    barcodeNumber: '1234567890123',
    stockWarning: 10,
    asset: 'Warehouse A',
    image: '/profile.jpg',
    openingStock: 100,
    createdAt: '2025-06-01',
  },
  {
    id: 2,
    productDetails: 'Red Bricks',
    barcodeNumber: '9876543210987',
    stockWarning: 50,
    asset: 'Yard B',
    image: '/profile.jpg',
    openingStock: 1000,
    createdAt: '2025-06-02',
  },
]

// ✅ Dynamic table fields
const tableFields: {
  key: keyof MortgagesListItem | 'actions'
  label: string
  align?: 'left' | 'right'
  isImage?: boolean
}[] = [
    { key: 'id', label: 'ID No' },
    { key: 'image', label: 'Image', isImage: true },
    { key: 'productDetails', label: 'Product Details' },
    { key: 'barcodeNumber', label: 'Barcode Number' },
    { key: 'stockWarning', label: 'Stock Warning' },
    { key: 'asset', label: 'Asset' },
    { key: 'openingStock', label: 'Opening Stock' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'Action', align: 'right' },
  ]

// ✅ Dynamic MortgagesTable component
const MortgagesTable: React.FC<{ data: MortgagesListItem[] }> = ({ data }) => {
  return (
    <>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableFields.map((field) => (
                <TableHead
                  key={field.key}
                  className={`px-4 py-2 ${field.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {field.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {tableFields.map((field) => {
                  if (field.key === 'actions') {
                    return (
                      <TableCell key="actions" className="text-right px-4 py-2">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                            <Eye size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-800">
                            <Pencil size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    )
                  }

                  const value = row[field.key as keyof MortgagesListItem]
                  return (
                    <TableCell key={field.key} className="px-4 py-2">
                      {field.isImage ? (
                        <img src={value as string} alt="Product" className="w-10 h-10 object-cover rounded-full" />
                      ) : (
                        value
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

const navLinks = [
  {
    href: '/customers/mortgages/add',
    icon: <Plus className="w-6 h-6 text-primary" />,
    title: 'add-new',
  },
  {
    href: '/customers/mortgages/groups',
    icon: <Users className="w-6 h-6 text-primary" />,
    title: 'mortgage-groups',
  },
  {
    href: '/customers/mortgages/statement',
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: 'mortgage-statement',
  },
]

const rowsPerPageOptions = [10, 20, 30, 40, 50]

const MortgagesListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const totalPages = Math.ceil(MortgagesListData.length / rowsPerPage)
  const currentData = MortgagesListData.slice(
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
          <h3 className="text-lg font-semibold">{t('mortgages-products-list')}</h3>
          <Button variant="ghost" className="w-fit self-end sm:self-auto">
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className='flex items-center gap-4'>
          <Input type="text" placeholder={tg('search-by', { name: t('mortgages') })} />
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
                <MortgagesTable data={currentData} />
              </div>
            </div>
          </PrintWrapper>
        </div>

        {/* ✅ Reusable dynamic table */}
        <MortgagesTable data={currentData} />

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

export default MortgagesListPage
