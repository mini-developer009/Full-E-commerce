'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { Loader2, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Order = {
    id: string
    date: string
    totalAmount: number
    status: 'pending' | 'completed' | 'cancelled'
    items: {
        name: string
        quantity: number
        price: number
    }[]
}

type Props = {
    clientId: string
    trigger: React.ReactNode
}

export default function ClientOrdersDialog({ clientId, trigger }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        if (!open) return
        setLoading(true)

        // Simulated fetch
        setTimeout(() => {
            try {
                const fakeOrders: Order[] = [
                    {
                        id: 'ORD001',
                        date: '2025-06-01',
                        totalAmount: 450,
                        status: 'completed',
                        items: [
                            { name: 'Product A', quantity: 2, price: 100 },
                            { name: 'Product B', quantity: 1, price: 250 },
                        ],
                    },
                    {
                        id: 'ORD002',
                        date: '2025-06-05',
                        totalAmount: 300,
                        status: 'pending',
                        items: [
                            { name: 'Product C', quantity: 3, price: 100 },
                        ],
                    },
                ]
                setOrders(fakeOrders)
            } catch (err) {
                toast.error('Failed to fetch orders')
            } finally {
                setLoading(false)
            }
        }, 1000)
    }, [open, clientId])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            ক্লায়েন্ট অর্ডার বিস্তারিত
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        ক্লায়েন্টের অর্ডারের তালিকা ও বিস্তারিত দেখুন।
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex justify-center items-center py-10 text-muted-foreground">
                        <Loader2 className="animate-spin mr-2" /> লোড হচ্ছে...
                    </div>
                ) : (
                    <ScrollArea className="max-h-[60vh] pr-2">
                        <div className="space-y-6">
                            {orders.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center">
                                    কোনো অর্ডার পাওয়া যায়নি।
                                </p>
                            ) : (
                                orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border rounded-lg p-4 space-y-2 bg-muted/30"
                                    >
                                        <div className="flex justify-between items-center font-medium">
                                            <span>অর্ডার আইডি: {order.id}</span>
                                            <span className="text-sm text-muted-foreground">
                                                তারিখ: {order.date}
                                            </span>
                                        </div>
                                        <div className="text-sm">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex justify-between text-muted-foreground">
                                                    <span>
                                                        {item.name} × {item.quantity}
                                                    </span>
                                                    <span>৳{item.quantity * item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-2 font-semibold">
                                            <span>মোট</span>
                                            <span>৳{order.totalAmount}</span>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                className={`text-xs capitalize ${order.status === 'completed'
                                                        ? 'bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700'
                                                        : order.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 hover:text-yellow-700'
                                                            : 'bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700'
                                                    }`
                                                }
                                            >
                                                স্ট্যাটাস: {order.status}
                                            </Badge>

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                )}

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">বন্ধ করুন</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
