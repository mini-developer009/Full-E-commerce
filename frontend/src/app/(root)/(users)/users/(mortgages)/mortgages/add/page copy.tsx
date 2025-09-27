"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItem {
  id: number;
  product: string;
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

const AddNewMortgageForm = () => {
  const [items, setItems] = useState<OrderItem[]>([{ ...defaultItem }]);
  const [meta, setMeta] = useState<MetaData>({
    discount: 0,
    transportFare: 0,
    labourCost: 0,
    previousDue: 0,
    vat: 0,
    payment: 0,
  });

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

  // Add new empty item
  const addItem = () => {
    setItems([
      ...items,
      { ...defaultItem, id: items.length > 0 ? items[items.length - 1].id + 1 : 0 },
    ]);
  };

  // Remove item by id
  const removeItem = (id: number) => {
    if (items.length === 1) return; // Prevent removing last item
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
  const [orderDate, setOrderDate] = useState<string>("2025-05-27");
  const [orderTime, setOrderTime] = useState<string>("22:16");

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
    // Here you would normally validate and send data to backend
    alert("Order submitted!");
    // Clear form after submit
    setItems([{ ...defaultItem }]);
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
    <main className="p-4 min-h-screen">
      <Card className="p-6 space-y-6 max-w-full">
        <CardHeader className="border-b bg-card rounded-t-2xl py-4 px-1">
          <CardTitle className="text-xl font-bold text-primary">
            Add New Mortgage
          </CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <Label>issue Data</Label>
            <Input
              type="date"
              className="w-40"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Retur Time</Label>
            <Input
              type="time"
              className="w-40"
              value={orderTime}
              onChange={(e) => setOrderTime(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label>Search With Barcode Number</Label>
            <Input placeholder="Search with barcode number" className="flex-1 w-full" />
          </div>

        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Input
                      placeholder="Product"
                      value={item.product}
                      onChange={(e) =>
                        updateItem(index, "product", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Weight"
                      value={item.weight}
                      onChange={(e) => updateItem(index, "weight", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Stock"
                      value={item.stock}
                      onChange={(e) => updateItem(index, "stock", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Price"
                      type="number"
                      min={0}
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Qty"
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Unit"
                      value={item.unit}
                      onChange={(e) => updateItem(index, "unit", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>{item.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      title={
                        items.length === 1
                          ? "At least one item is required"
                          : "Remove item"
                      }
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button onClick={addItem} className="mt-2">
          + Add Item
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-6">
            <Select
              onValueChange={(value) => setSelectedCustomer(value)}
              value={selectedCustomer}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cust1">Customer 1</SelectItem>
                <SelectItem value="cust2">Customer 2</SelectItem>
                {/* Add more customers dynamically if needed */}
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
                onChange={(e) =>
                  setMeta({ ...meta, discount: parseFloat(e.target.value) || 0 })
                }
              />

              <Label>Transport Fare:</Label>
              <Input
                type="number"
                min={0}
                value={meta.transportFare}
                onChange={(e) =>
                  setMeta({
                    ...meta,
                    transportFare: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <Label>Labour Cost:</Label>
              <Input
                type="number"
                min={0}
                value={meta.labourCost}
                onChange={(e) =>
                  setMeta({ ...meta, labourCost: parseFloat(e.target.value) || 0 })
                }
              />

              <Label>Invoice Bill:</Label>
              <p>{invoiceBill.toFixed(2)}</p>

              <Label>Previous Due:</Label>
              <Input
                type="number"
                min={0}
                value={meta.previousDue}
                onChange={(e) =>
                  setMeta({ ...meta, previousDue: parseFloat(e.target.value) || 0 })
                }
              />

              <Label>VAT:</Label>
              <Input
                type="number"
                min={0}
                value={meta.vat}
                onChange={(e) =>
                  setMeta({ ...meta, vat: parseFloat(e.target.value) || 0 })
                }
              />

              <Label>Payment:</Label>
              <Input
                type="number"
                min={0}
                value={meta.payment}
                onChange={(e) =>
                  setMeta({ ...meta, payment: parseFloat(e.target.value) || 0 })
                }
              />

              <Label>Total Due:</Label>
              <p>{totalDue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <Button className="mt-6" onClick={handleSubmit}>
          Submit
        </Button>
      </Card>
    </main>
  );
};

export default AddNewMortgageForm;
