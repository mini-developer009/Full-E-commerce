"use client";
import React from "react";
import Image from "next/image"; // Using next/image for optimization
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// Helper: Check if a value is numeric (number or numeric string)
const isNumeric = (value: any) => {
    if (typeof value === "number") return true;
    if (typeof value === "string" && value.trim() !== "") {
        return !isNaN(Number(value));
    }
    return false;
};

// Helper: Check if a value looks like an image URL (basic check)
const isImageUrl = (value: any) => {
    if (typeof value !== "string") return false;
    return /\.(jpeg|jpg|gif|png|svg|webp|bmp)$/i.test(value.trim());
};

// Format header keys nicely
const formatHeader = (key: string) =>
    key
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

interface DynamicTableProps {
    data: Record<string, any>[];
    showActions?: boolean;
    onView?: (row: any) => void;
    onEdit?: (row: any) => void;
    onDelete?: (id: string | number) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
    data,
    showActions = false,
    onView,
    onEdit,
    onDelete,
}) => {
    if (!data || data.length === 0) return <p>No data available.</p>;

    const headers = Object.keys(data[0]);

    return (
        <div className="overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((header) => (
                            <TableHead
                                key={header}
                                className={isNumeric(data[0][header]) ? "text-right" : undefined}
                            >
                                {formatHeader(header)}
                            </TableHead>
                        ))}
                        {showActions && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((row, idx) => (
                        <TableRow key={row.id ?? idx}>
                            {headers.map((key) => {
                                const value = row[key];

                                // Render image if detected
                                if (isImageUrl(value)) {
                                    return (
                                        <TableCell key={key} className="text-center">
                                            <Image
                                                src={value}
                                                alt={key}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                                unoptimized // remove if you want next/image optimization
                                            />
                                        </TableCell>
                                    );
                                }

                                // Numeric formatting
                                if (isNumeric(value)) {
                                    const num = Number(value);
                                    return (
                                        <TableCell key={key} className="text-right">
                                            {isNaN(num) ? "-" : num}
                                        </TableCell>
                                    );
                                }

                                // Default fallback
                                return <TableCell key={key}>{value ?? "-"}</TableCell>;
                            })}

                            {showActions && (
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {onView && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => onView(row)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        )}
                                        {onEdit && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-green-600 hover:text-green-800"
                                                onClick={() => onEdit(row)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => onDelete(row.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DynamicTable;
