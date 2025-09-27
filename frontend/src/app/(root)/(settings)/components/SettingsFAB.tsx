'use client'

import { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Plus, Edit2, Settings, ShoppingCart, Trash } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { v4 as uuidv4 } from 'uuid'
import FABGroup, { ActionItem } from '@/components/FABGroup'
import { toast } from 'sonner'

const availableIcons = {
    Plus,
    Edit2,
    Settings,
    ShoppingCart,
    Trash,
}

export default function FABSettings() {
    const [actions, setActions] = useState<ActionItem[]>([])
    const [enabled, setEnabled] = useState<boolean>(true)

    const [newAction, setNewAction] = useState<{
        icon: keyof typeof availableIcons
        label: string
        href: string
        colorClass: string
    }>({
        icon: 'Plus',
        label: '',
        href: '',
        colorClass: 'bg-[#00bd6d] text-white hover:bg-[#00bd6d]/90',
    })

    useEffect(() => {
        const saved = localStorage.getItem('fab-settings')
        const savedStatus = localStorage.getItem('fab-enabled')
        if (saved) {
            setActions(JSON.parse(saved))
        }
        if (savedStatus) {
            setEnabled(JSON.parse(savedStatus))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('fab-settings', JSON.stringify(actions))
    }, [actions])

    useEffect(() => {
        localStorage.setItem('fab-enabled', JSON.stringify(enabled))
    }, [enabled])

    const handleCreate = () => {
        const label = newAction.label.trim()
        const href = newAction.href.trim()
        if (!label || !href) {
            toast.error('অনুগ্রহ করে লেবেল এবং লিংক পূরণ করুন।')
            return
        }

        const id = uuidv4()
        const iconComponent = availableIcons[newAction.icon]
        const newFab: ActionItem = {
            id,
            icon: iconComponent,
            label,
            href,
            colorClass: newAction.colorClass.trim(),
        }
        setActions((prev) => [...prev, newFab])
        toast.success('Shortcut যোগ হয়েছে!')
        setNewAction({
            icon: 'Plus',
            label: '',
            href: '',
            colorClass: 'bg-[#00bd6d] text-white hover:bg-[#00bd6d]/90',
        })
    }

    const handleDelete = (id: string) => {
        setActions((prev) => prev.filter((a) => a.id !== id))
        toast('Shortcut মুছে ফেলা হয়েছে।')
    }

    const handleToggleEnabled = (value: boolean) => {
        setEnabled(value)
        toast.success(`FAB ${value ? 'চালু করা হয়েছে ✅' : 'বন্ধ করা হয়েছে ❌'}`)
    }

    return (
        <div className="w-full max-w-full mx-auto">
            <Card className="border-muted shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">শর্টকাট অ্যাকশন</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        দ্রুত অ্যাক্সেসের জন্য নতুন শর্টকাট যোগ করুন অথবা মুছুন।
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between border rounded-md p-3 bg-muted">
                        <Label className="text-base font-medium">FAB চালু / বন্ধ</Label>
                        <Switch checked={enabled} onCheckedChange={handleToggleEnabled} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">লেবেল</label>
                            <Input
                                placeholder="যেমনঃ কার্টে যান"
                                value={newAction.label}
                                onChange={(e) =>
                                    setNewAction({ ...newAction, label: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">লিংক (href)</label>
                            <Input
                                placeholder="/cart"
                                value={newAction.href}
                                onChange={(e) =>
                                    setNewAction({ ...newAction, href: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">আইকন</label>
                            <Select
                                value={newAction.icon}
                                onValueChange={(val) =>
                                    setNewAction({
                                        ...newAction,
                                        icon: val as keyof typeof availableIcons,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="আইকন নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(availableIcons).map((key) => (
                                        <SelectItem key={key} value={key}>
                                            {key}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                কালার ক্লাস (Tailwind)
                            </label>
                            <Input
                                placeholder="যেমনঃ bg-yellow-400 text-black"
                                value={newAction.colorClass}
                                onChange={(e) =>
                                    setNewAction({ ...newAction, colorClass: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <Button onClick={handleCreate} className="w-full sm:w-auto">
                        Add Shortcut
                    </Button>

                    {actions.length > 0 && (
                        <section className="pt-4 border-t border-muted space-y-3">
                            <h3 className="font-semibold text-base">Your Shortcuts</h3>
                            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                                {actions.map((action) => (
                                    <div
                                        key={action.id}
                                        className={`flex justify-between items-center border rounded-lg p-2 ${enabled ? 'bg-muted' : 'bg-muted/50 opacity-60 pointer-events-none'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <action.icon className="w-5 h-5" />
                                            <span>{action.label}</span>
                                            <span className="text-muted-foreground">→ {action.href}</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(action.id)}
                                        >
                                            মুছুন
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
