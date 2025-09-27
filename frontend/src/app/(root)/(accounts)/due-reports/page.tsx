'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const allGroups = ['সাধারণ', 'মর্গেজ', 'VIP']

const dueCustomerData = [
    {
        id: 1,
        name: 'irin',
        address: 'Rajpar',
        group: 'সাধারণ',
        prevDue: 0,
        sales: 257.5,
        totalBill: 250,
        return: 0,
        paid: 140,
        refund: 0,
        currentDue: 117.5,
    },
    {
        id: 2,
        name: 'Souriv',
        address: 'Uposohor, Rajshahi',
        group: 'সাধারণ',
        prevDue: 0,
        sales: 0,
        totalBill: 0,
        return: 0,
        paid: 0,
        refund: 0,
        currentDue: 0,
    },
    {
        id: 3,
        name: 'Minhaj',
        address: 'Binodpur',
        group: 'VIP',
        prevDue: 2000,
        sales: 0,
        totalBill: 2000,
        return: 0,
        paid: 50,
        refund: 0,
        currentDue: 1950,
    },
    {
        id: 4,
        name: 'Nayem',
        address: 'Boshundhora',
        group: 'সাধারণ',
        prevDue: 300,
        sales: 0,
        totalBill: 300,
        return: 0,
        paid: 5000,
        refund: 0,
        currentDue: -4700,
    },
    {
        id: 5,
        name: 'Sihab mohajon',
        address: '',
        group: 'মর্গেজ',
        prevDue: 10000,
        sales: 0,
        totalBill: 10000,
        return: 0,
        paid: 0,
        refund: 0,
        currentDue: 10000,
    },
    {
        id: 6,
        name: 'Rohim ( Mortgage )',
        address: 'sador',
        group: 'মর্গেজ',
        prevDue: 4000,
        sales: 0,
        totalBill: 4000,
        return: 0,
        paid: 0,
        refund: 0,
        currentDue: 4000,
    },
    {
        id: 7,
        name: 'Sefat',
        address: '',
        group: 'সাধারণ',
        prevDue: 0,
        sales: 42500,
        totalBill: 42500,
        return: 0,
        paid: 0,
        refund: 0,
        currentDue: 42500,
    },
]

export default function DueReportsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGroup, setSelectedGroup] = useState("all")

    const filteredData = dueCustomerData.filter(item => {
        const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesGroup = selectedGroup === "all" || item.group === selectedGroup
        return matchesName && matchesGroup
    })


    const total = filteredData.reduce(
        (acc, item) => ({
            prevDue: acc.prevDue + item.prevDue,
            sales: acc.sales + item.sales,
            totalBill: acc.totalBill + item.totalBill,
            return: acc.return + item.return,
            paid: acc.paid + item.paid,
            refund: acc.refund + item.refund,
            currentDue: acc.currentDue + item.currentDue,
        }),
        {
            prevDue: 0,
            sales: 0,
            totalBill: 0,
            return: 0,
            paid: 0,
            refund: 0,
            currentDue: 0,
        }
    )

    return (
        <div className="w-full  px-4 py-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold">বাকি রিপোর্ট</h1>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Input
                        placeholder="কাস্টমার দিয়ে খুঁজুন"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-[220px]"
                    />
                    <Select onValueChange={setSelectedGroup} value={selectedGroup}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="গ্রুপ নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">সব গ্রুপ</SelectItem>
                            {allGroups.map(group => (
                                <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full sm:w-auto">Create New Group</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Customer Group</DialogTitle>
                                <DialogDescription>
                                    Enter the name for the new customer group.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="groupName" className="text-right">
                                        Group Name
                                    </Label>
                                    <Input
                                        id="groupName"
                                        defaultValue=""
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Add Group</Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

            <Card className="p-4 overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SL</TableHead>
                            <TableHead>কাস্টমার তথ্য</TableHead>
                            <TableHead>পূর্বের বাকী</TableHead>
                            <TableHead>বিক্রয়</TableHead>
                            <TableHead>মোট বিল</TableHead>
                            <TableHead>বিক্রয় ফেরত</TableHead>
                            <TableHead>আদায়</TableHead>
                            <TableHead>ফেরত</TableHead>
                            <TableHead>বাকি</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-6">
                                    কোনো ডাটা নেই
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">Name : {item.name}</p>
                                            <p className="text-muted-foreground text-sm">Address : {item.address || "---"}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>৳ {item.prevDue.toFixed(2)}</TableCell>
                                    <TableCell>৳ {item.sales.toFixed(2)}</TableCell>
                                    <TableCell>৳ {item.totalBill.toFixed(2)}</TableCell>
                                    <TableCell>৳ {item.return.toFixed(2)}</TableCell>
                                    <TableCell>৳ {item.paid.toFixed(2)}</TableCell>
                                    <TableCell>৳ {item.refund.toFixed(2)}</TableCell>
                                    <TableCell className={cn("font-medium", item.currentDue > 0 && "text-red-600")}>
                                        ৳ {item.currentDue.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {filteredData.length > 0 && (
                            <TableRow className="font-bold border-t">
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell>৳ {total.prevDue.toFixed(2)}</TableCell>
                                <TableCell>৳ {total.sales.toFixed(2)}</TableCell>
                                <TableCell>৳ {total.totalBill.toFixed(2)}</TableCell>
                                <TableCell>৳ {total.return.toFixed(2)}</TableCell>
                                <TableCell>৳ {total.paid.toFixed(2)}</TableCell>
                                <TableCell>৳ {total.refund.toFixed(2)}</TableCell>
                                <TableCell>৳ {total.currentDue.toFixed(2)}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
