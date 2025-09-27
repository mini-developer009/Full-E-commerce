"use client";

import { useState, useMemo } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Funnel, FileText } from "lucide-react";
import PrintWrapper from "@/components/PrintWrapper";
import PrintableHeader from "@/components/PrintableHeader";

interface TransferRow {
    id: number;
    date: string;
    sender_or_receiver: string;
    type: string;
    account: string;
    description?: string;
    credit: number;
    debit: number;
    balance: number;
}

const transferData: TransferRow[] = [
    // Example data, replace or fetch from API
    { id: 1, date: "24 Jun 2025", sender_or_receiver: "Alice", type: "Transfer", account: "AIBL", description: "Payment for invoice #123", credit: 1000, debit: 0, balance: 5000 },
    { id: 2, date: "25 Jun 2025", sender_or_receiver: "Bob", type: "Withdrawal", account: "DBBL", description: "Office expense", credit: 0, debit: 300, balance: 4700 },
    // add more...
];

const rowsPerPageOptions = [5, 10, 20, 30];

const TransfersListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
        return transferData.filter((item) =>
            item.sender_or_receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const totals = useMemo(() => {
        const credit = filteredData.reduce((sum, item) => sum + item.credit, 0);
        const debit = filteredData.reduce((sum, item) => sum + item.debit, 0);
        const balance = filteredData.length > 0 ? filteredData[filteredData.length - 1].balance : 0;
        return { credit, debit, balance };
    }, [filteredData]);

    return (
        <div className="w-full p-4 space-y-6">
            <Card className="w-full p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-semibold">All Transfers List</h3>
                    <Button variant="ghost"><Funnel className="w-4 h-4 mr-2" />Filter</Button>
                </div>

                <div className="flex items-center gap-4 w-full">
                    <Input
                        type="text"
                        placeholder="Search by sender, account, type, or description"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Select
                        onValueChange={(value) => {
                            setRowsPerPage(parseInt(value));
                            setCurrentPage(1);
                        }}
                        value={rowsPerPage.toString()}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Rows per page" />
                        </SelectTrigger>
                        <SelectContent>
                            {rowsPerPageOptions.map((value) => (
                                <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <PrintWrapper printTitle="Transfers List" preview={false}>
                        <div className="p-6 bg-white">
                            <PrintableHeader
                                title="Transfers List"
                                subtitle="Transaction Report"
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
                            <table className="w-full mt-6 text-sm">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Date</th>
                                        <th>Sender/Receiver</th>
                                        <th>Type</th>
                                        <th>Account</th>
                                        <th>Description</th>
                                        <th className="text-right">Credit</th>
                                        <th className="text-right">Debit</th>
                                        <th className="text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((item, idx) => (
                                        <tr key={item.id} className="border-t">
                                            <td className="px-3 py-2">{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                                            <td className="px-3 py-2">{item.date}</td>
                                            <td className="px-3 py-2">{item.sender_or_receiver}</td>
                                            <td className="px-3 py-2">{item.type}</td>
                                            <td className="px-3 py-2">{item.account}</td>
                                            <td className="px-3 py-2">{item.description || "--"}</td>
                                            <td className="px-3 py-2 text-right">{item.credit.toLocaleString()}</td>
                                            <td className="px-3 py-2 text-right">{item.debit.toLocaleString()}</td>
                                            <td className="px-3 py-2 text-right">{item.balance.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr className="font-bold border-t">
                                        <td colSpan={6} className="text-right px-3 py-2">Total</td>
                                        <td className="text-right px-3 py-2">{totals.credit.toLocaleString()}</td>
                                        <td className="text-right px-3 py-2">{totals.debit.toLocaleString()}</td>
                                        <td className="text-right px-3 py-2">{totals.balance.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </PrintWrapper>
                </div>

                <div className="overflow-auto mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SL</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Sender/Receiver</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Account</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Credit</TableHead>
                                <TableHead className="text-right">Debit</TableHead>
                                <TableHead className="text-right">Balance</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center py-6">No data found.</TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {currentData.map((item, idx) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{(currentPage - 1) * rowsPerPage + idx + 1}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.sender_or_receiver}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.account}</TableCell>
                                            <TableCell>{item.description || "--"}</TableCell>
                                            <TableCell className="text-right">{item.credit.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">{item.debit.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">{item.balance.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Button size="icon" variant="ghost" title="View">
                                                    <FileText className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="font-semibold">
                                        <TableCell colSpan={6} className="text-right">Total</TableCell>
                                        <TableCell className="text-right">{totals.credit.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">{totals.debit.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">{totals.balance.toLocaleString()}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                                }}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={i + 1 === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(i + 1);
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
                                    e.preventDefault();
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Card>
        </div>
    );
};

export default TransfersListPage;
