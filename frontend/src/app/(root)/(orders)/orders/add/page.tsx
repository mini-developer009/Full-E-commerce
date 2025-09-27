"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ProductSelectSheet from "../../components/ProductSelectSheet";
import { toast } from "sonner";
import OpenScannerDialog from "@/app/scan/components/OpenScannerDialog";

interface OrderItem {
    id: number;
    product: string;
    imageUrl?: string;
    weight: string;
    description: string;
    stock: string;
    price: number;
    quantity: number;
    unit: string;
    total: number;
}

interface MetaData {
    discount: number;
    transportFare: number;
    labourCost: number;
    previousDue: number;
    vat: number;
    payment: number;
}

const defaultItem: OrderItem = {
    id: 0,
    product: "",
    weight: "",
    description: "",
    stock: "",
    price: 0,
    quantity: 0,
    unit: "",
    total: 0,
};

const NewOrderPage = () => {
    const [items, setItems] = useState<OrderItem[]>([]);
    const [meta, setMeta] = useState<MetaData>({
        discount: 0,
        transportFare: 0,
        labourCost: 0,
        previousDue: 0,
        vat: 0,
        payment: 0,
    });

    const router = useRouter()
    // Update an item field and recalc total for that row
    const updateItem = (
        index: number,
        field: keyof OrderItem,
        value: string | number
    ) => {
        const newItems = [...items];
        const item = newItems[index] as any;

        if (field === "price" || field === "quantity") {
            const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
            item[field] = numValue;
            // Recalculate total for this row
            item.total = item.price * item.quantity;
        } else {
            item[field] = value as any;
        }

        setItems(newItems);
    };

    // Remove item by id
    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    // Calculate totals for invoice
    const calculateTotal = () => {
        const total = items.reduce((sum, item) => sum + item.total, 0);
        const invoiceBill =
            total - meta.discount + meta.transportFare + meta.labourCost + meta.vat;
        const totalDue = invoiceBill + meta.previousDue - meta.payment;
        return { total, invoiceBill, totalDue };
    };

    const { total, invoiceBill, totalDue } = calculateTotal();

    // Date and time state
    const now = new Date();
    const [orderDate, setOrderDate] = useState<string>(now.toISOString().slice(0, 10)); // yyyy-mm-dd
    const [orderTime, setOrderTime] = useState<string>(
        now.toTimeString().slice(0, 5) // HH:mm
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

    // Selected customer state
    const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(
        undefined
    );

    // Send options
    const [sendSMS, setSendSMS] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);

    // Description field
    const [description, setDescription] = useState("");

    // Handle form submit
    const handleSubmit = () => {
       router.push("order_success")
        setItems([]);
        setMeta({
            discount: 0,
            transportFare: 0,
            labourCost: 0,
            previousDue: 0,
            vat: 0,
            payment: 0,
        });
        setOrderDate("2025-05-27");
        setOrderTime("22:16");
        setSelectedCustomer(undefined);
        setSendSMS(false);
        setSendEmail(false);
        setDescription("");
    };

    return (
        <>
            <main className="p-6">
                <Card className="p-6 space-y-6 max-w-full">
                    <h2 className="text-2xl font-semibold">Add New Order</h2>

                    <div className="flex flex-wrap justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col gap-2">
                                <Label className="ml-1" htmlFor="order-date">Order Date</Label>
                                <Input
                                    id="order-date"
                                    type="date"
                                    className="w-40"
                                    value={orderDate}
                                    onChange={(e) => setOrderDate(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="ml-1" htmlFor="order-time">Order Time</Label>
                                <Input
                                    id="order-time"
                                    type="time"
                                    className="w-40"
                                    value={orderTime}
                                    onChange={(e) => setOrderTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <OpenScannerDialog />
                    </div>


                    <ProductSelectSheet
                        isOpen={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        onSelectProduct={(product) => {
                            // Check if the product is already added (use a unique ID if possible)
                            const exists = items.some((item) => item.product === product.name);

                            if (exists) {
                                toast.error(`Product "${product.name}" is already added.`);
                                // Delay dialog close slightly to avoid potential state race conditions
                                setTimeout(() => setIsDialogOpen(false), 100);
                                return;
                            }

                            const newItems = [...items];

                            if (activeRowIndex !== null) {
                                const quantity = newItems[activeRowIndex].quantity || 1;
                                newItems[activeRowIndex] = {
                                    ...newItems[activeRowIndex],
                                    product: product.name,
                                    imageUrl: product.imageUrl,
                                    price: product.price,
                                    unit: product.unit,
                                    stock: product.stock.toString(),
                                    total: product.price * quantity,
                                };
                            } else {
                                newItems.push({
                                    id: newItems.length > 0 ? newItems[newItems.length - 1].id + 1 : 0,
                                    product: product.name,
                                    imageUrl: product.imageUrl,
                                    weight: "",
                                    description: "",
                                    stock: product.stock.toString(),
                                    price: product.price,
                                    quantity: 1,
                                    unit: product.unit,
                                    total: product.price,
                                });
                            }

                            setItems(newItems);
                            setIsDialogOpen(false); // Only close after successful selection
                            toast.success(`Product "${product.name}" selected`);
                        }}



                        onManageStock={(product) => {
                            toast.error(
                                `Stock for "${product.name}" is empty. Please manage inventory.`
                            );
                        }}
                    />

                    <div className="overflow-x-auto">
                        {items.length === 0 ? (
                            <div className="py-16 text-center text-muted-foreground">
                                <p className="text-lg font-semibold mb-2">No items added yet.</p>
                                <p className="max-w-xs mx-auto text-sm">
                                    Please add items using the "Add Item" button.
                                </p>
                            </div>
                        ) : (
                            <Table className="min-w-[900px] table-fixed">
                                <TableHeader>
                                    <TableRow className="bg-muted/60">
                                        <TableHead className="w-8 text-center">SL</TableHead>
                                        <TableHead className="w-60">Product</TableHead>
                                        <TableHead className="w-20 text-center">Weight</TableHead>
                                        <TableHead className="w-20 text-center">Stock</TableHead>
                                        <TableHead className="w-24 text-right">Price ($)</TableHead>
                                        <TableHead className="w-24 text-center">Quantity</TableHead>
                                        <TableHead className="w-20 text-center">Unit</TableHead>
                                        <TableHead className="w-28 text-right">Total ($)</TableHead>
                                        <TableHead className="w-24 text-center">Action</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {items.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            className="hover:bg-muted/40 transition-colors cursor-default"
                                        >
                                            <TableCell className="text-center font-medium">{index + 1}</TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {item.imageUrl && (
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.product}
                                                            className="w-10 h-10 rounded-md border border-border object-cover"
                                                            onError={(e) => (e.currentTarget.style.display = "none")}
                                                        />
                                                    )}
                                                    <Input
                                                        value={item.product}
                                                        readOnly
                                                        onFocus={() => {
                                                            setActiveRowIndex(index);
                                                            setIsDialogOpen(true);
                                                        }}
                                                        className="flex-1 font-semibold cursor-pointer"
                                                        title={item.product}
                                                    />
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-center">{item.weight || "-"}</TableCell>

                                            <TableCell
                                                className={`text-center font-medium ${Number(item.stock) > 0 ? "text-success" : "text-destructive"
                                                    }`}
                                            >
                                                {item.stock || "0"}
                                            </TableCell>

                                            <TableCell className="text-right font-semibold">
                                                {item.price.toFixed(2)}
                                            </TableCell>

                                            <TableCell className="text-center w-24">
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateItem(index, "quantity", parseInt(e.target.value) || 0)
                                                    }
                                                    className="text-center max-w-[60px]"
                                                />
                                            </TableCell>

                                            <TableCell className="text-center">{item.unit || "-"}</TableCell>

                                            <TableCell className="text-right font-semibold">
                                                {item.total.toFixed(2)}
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeItem(item.id)}
                                                    title="Remove item"
                                                    disabled={false} // Allow remove always
                                                    className="px-3"
                                                >
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                    </div>

                    <Button
                        onClick={() => {
                            setActiveRowIndex(null);
                            setIsDialogOpen(true);
                        }}
                        className="mt-2"
                    >
                        + Add Item
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-6">
                            <Select onValueChange={(value) => setSelectedCustomer(value)} value={selectedCustomer}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Customer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cust1">Customer 1</SelectItem>
                                    <SelectItem value="cust2">Customer 2</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex gap-4 items-center">
                                <Label>Send:</Label>
                                <Label className="flex items-center gap-2">
                                    <Input
                                        type="checkbox"
                                        checked={sendSMS}
                                        onChange={(e) => setSendSMS(e.target.checked)}
                                    />
                                    SMS
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Input
                                        type="checkbox"
                                        checked={sendEmail}
                                        onChange={(e) => setSendEmail(e.target.checked)}
                                    />
                                    Email
                                </Label>
                            </div>

                            <Textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <Label>Total:</Label>
                                <p>{total.toFixed(2)}</p>

                                <Label>Discount:</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={meta.discount}
                                    onChange={(e) => setMeta({ ...meta, discount: parseFloat(e.target.value) || 0 })}
                                />

                                <Label>Transport Fare:</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={meta.transportFare}
                                    onChange={(e) =>
                                        setMeta({ ...meta, transportFare: parseFloat(e.target.value) || 0 })
                                    }
                                />

                                <Label>Labour Cost:</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={meta.labourCost}
                                    onChange={(e) => setMeta({ ...meta, labourCost: parseFloat(e.target.value) || 0 })}
                                />

                                <Label>Invoice Bill:</Label>
                                <p>{invoiceBill.toFixed(2)}</p>

                                <Label>Previous Due:</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={meta.previousDue}
                                    onChange={(e) => setMeta({ ...meta, previousDue: parseFloat(e.target.value) || 0 })}
                                />

                                <Label>VAT:</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={meta.vat}
                                    onChange={(e) => setMeta({ ...meta, vat: parseFloat(e.target.value) || 0 })}
                                />

                                <Label>Payment:</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={meta.payment}
                                    onChange={(e) => setMeta({ ...meta, payment: parseFloat(e.target.value) || 0 })}
                                />

                                <Label>Total Due:</Label>
                                <p>{totalDue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <Button className="mt-6" onClick={handleSubmit}>
                        Submit Order
                    </Button>
                </Card>
            </main>
        </>
    );
};

export default NewOrderPage;
