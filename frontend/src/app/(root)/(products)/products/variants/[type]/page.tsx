"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Trash2, Pencil, Tag } from "lucide-react";

const VariantValuesPage = () => {
    const { type } = useParams();
    const [values, setValues] = useState([
        { id: 1, name: "Small" },
        { id: 2, name: "Medium" },
        { id: 3, name: "Large" },
    ]);

    const [editValue, setEditValue] = useState<{ id: number; name: string } | null>(null);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

    const [newValue, setNewValue] = useState("");

    const handleAddValue = () => {
        if (!newValue.trim()) return;
        const newId = values.length + 1;
        setValues([...values, { id: newId, name: newValue.trim() }]);
        setNewValue("");
    };

    const handleDelete = () => {
        if (deleteTargetId !== null) {
            setValues((prev) => prev.filter((v) => v.id !== deleteTargetId));
            setDeleteTargetId(null);
        }
        setDeleteDialogOpen(false);
    };

    const handleEdit = (id: number, name: string) => {
        setValues((prev) => prev.map((v) => (v.id === id ? { ...v, name } : v)));
        setEditValue(null);
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <Card className="w-full p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Tag className="text-primary" />
                            <h2 className="text-xl font-semibold">Manage {type} Variants</h2>
                        </div>
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <Input
                                placeholder={`New ${type}...`}
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                className="max-w-xs"
                            />
                            <Button onClick={handleAddValue}>+ Add</Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {values.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="capitalize">{item.name}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button size="icon" variant="outline" onClick={() => setEditValue(item)}>
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Edit {type} Variant</SheetTitle>
                                                </SheetHeader>
                                                <div className="mt-4 space-y-4">
                                                    <Input
                                                        value={editValue?.name || ""}
                                                        onChange={(e) =>
                                                            setEditValue((prev) =>
                                                                prev ? { ...prev, name: e.target.value } : prev
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        onClick={() => editValue && handleEdit(editValue.id, editValue.name)}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </SheetContent>
                                        </Sheet>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => {
                                                setDeleteTargetId(item.id);
                                                setDeleteDialogOpen(true);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete {type} Variant?</DialogTitle>
                        <DialogDescription>
                            If you delete this variant, all associated values will be permanently removed. This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Confirm Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default VariantValuesPage;
