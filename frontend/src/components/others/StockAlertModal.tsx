"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface StockItem {
    name: string
    currentStock: number
}

const mockLowStockItems: StockItem[] = [
    { name: "Paracetamol 500mg", currentStock: 4 },
    { name: "Vitamin C Syrup", currentStock: 2 },
    { name: "Diabetic Test Strips", currentStock: 1 },
]

export function StockAlertModal() {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const lastShown = localStorage.getItem("stock-alert-shown")
        const now = new Date()

        if (!lastShown || new Date(lastShown).getDate() !== now.getDate()) {
            setShowModal(true)
            localStorage.setItem("stock-alert-shown", now.toISOString())
        }
    }, [])

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-xl bg-card text-foreground border shadow-lg rounded-2xl p-6 animate-in fade-in duration-300">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-base font-semibold">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <span>স্টক সতর্কবার্তা</span>
                    </div>
                    <DialogDescription className="text-sm mt-2">
                        নিচের প্রোডাক্টগুলোর স্টক কমে গেছে। অনুগ্রহ করে ইনভেন্টরি ম্যানেজ করুন।
                    </DialogDescription>
                </DialogHeader>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="mt-5 space-y-3"
                >
                    {mockLowStockItems.map((item, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center bg-muted border rounded-lg px-4 py-3 transition-all"
                        >
                            <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    স্টক: <span className="font-bold text-destructive">{item.currentStock}</span> ইউনিট
                                </p>
                            </div>
                            <Button variant="outline" size="sm" disabled>
                                ম্যানেজ
                            </Button>
                        </div>
                    ))}
                </motion.div>

                <div className="mt-6 flex justify-between">
                    <Button variant="ghost" onClick={() => setShowModal(false)}>
                        বুঝেছি
                    </Button>
                    <Link href="/stock-management">
                        <Button  onClick={() => setShowModal(false)}>স্টক পেজে যান</Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}
