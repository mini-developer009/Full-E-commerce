'use client'
import React, { useState } from 'react'
import PriceTotalMiniCard from '@/components/others/forDashboard/PriceTotalMiniCard'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Funnel } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import DynamicTable from '@/components/DynamicTable'
import ClientOrdersDialog from '../components/ClientOrdersDialog'

const ordersData = [
  {
    invoice: 'INV001',
    status: 'Paid',
    method: 'Credit Card',
    amount: 250.0,
    customer: 'John Doe',
    date: '2023-10-01',
    items: 3,
  },
  {
    invoice: 'INV002',
    status: 'Pending',
    method: 'Bank Transfer',
    amount: 340.5,
    customer: 'Jane Smith',
    date: '2023-10-02',
    items: 5,
  },
  {
    invoice: 'INV003',
    status: 'Cancelled',
    method: 'PayPal',
    amount: 120.99,
    customer: 'Mike Johnson',
    date: '2023-10-03',
    items: 1,
  },
]

const OrdersPage = () => {
  const t = useTranslations('HomePage')
  const [selectedOrder, setSelectedOrder] = useState<typeof ordersData[0] | null>(null)

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar: Order Details */}
        <Card className="w-full lg:max-w-sm p-6 shadow-lg border border-border bg-background rounded-2xl">
          {selectedOrder ? (
            <div className="space-y-5">
              <div className="flex flex-col items-center text-center space-y-2">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedOrder.customer}`}
                  alt={selectedOrder.customer}
                  className="w-20 h-20 rounded-full border shadow"
                />
                <div>
                  <h2 className="text-xl font-semibold">{selectedOrder.customer}</h2>
                  <p className="text-muted-foreground text-sm">Invoice #{selectedOrder.invoice}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Method</p>
                  <p className="font-medium">{selectedOrder.method}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Items</p>
                  <p className="font-medium">{selectedOrder.items}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Total Amount</p>
                  <p className="font-semibold text-lg">${selectedOrder.amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="pt-4">
                <ClientOrdersDialog clientId="client-123" trigger={<Button className="w-full" variant="default">
                  View Full Order
                </Button>} />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold mb-1">Order Details</h2>
              <p className="text-muted-foreground text-sm">
                Click a row to view detailed order information.
              </p>
            </div>
          )}
        </Card>

        {/* Main Area */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            <PriceTotalMiniCard
              title={t('stock-value')}
              value={1000}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/shopping-cart.png"
              isSymbleActive
            />

            <PriceTotalMiniCard
              title={t('daily-sales')}
              value={750}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/money.png"
              isSymbleActive
            />

            <PriceTotalMiniCard
              title={t('total-orders')}
              value={120}
              date="2023-10-01"
              className="w-full h-full"
              iconUrl="https://jewellery.bsoftbd.com/public/dashboard/img/icons/package.png"
              isSymbleActive={false} // no $ sign needed
            />
          </div>



          {/* Orders Table */}
          <Card className="p-4 sm:p-6 w-full overflow-x-auto">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-lg font-semibold">All Orders</h3>
              <Button variant="ghost" className="w-fit self-end sm:self-auto">
                <Funnel className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className='flex items-center gap-4'>
              <Input type="text" className='' placeholder='Search by Invoice' />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Rows" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <PrintWrapper printTitle="Customers Statement" preview={false}>
                <div className="p-6 ">
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
                      // customer={{
                      //     name: "Md. Hasan Ali",
                      //     address: "45/A, Green Road, Dhaka",
                      //     phone: "01711-123456",
                      //     email: "hasan@example.com",
                      // }}
                      accentColor="blue-600"
                    />
                    <DynamicTable
                      data={ordersData}
                      showActions={false}
                    />
                  </div>
                </div>
              </PrintWrapper>

            </div>
            <Table className="w-full min-w-[500px]">
              <TableCaption>A list of your recent orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData.map((order) => (
                  <TableRow
                    key={order.invoice}
                    onClick={() => setSelectedOrder(order)}
                    className="cursor-pointer hover:bg-muted transition"
                  >
                    <TableCell className="font-medium">{order.invoice}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.method}</TableCell>
                    <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
