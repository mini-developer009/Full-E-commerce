"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
import { Plus, Users, FileText, Funnel } from "lucide-react";
import PrintWrapper from "@/components/PrintWrapper";
import PrintableHeader from "@/components/PrintableHeader";

interface BalanceStatementRow {
  id: number;
  date: string;
  party: string;
  type: string;
  account: string;
  bank?: string;
  description?: string;
  credit?: number;
  debit?: number;
  balance: number;
}

const BalanceStatementData: BalanceStatementRow[] = [
  { id: 1, date: "11 Jun 2025", party: "Account", type: "DEPOSIT", account: "AIBL", credit: 0, balance: 0 },
  { id: 2, date: "11 Jun 2025", party: "Account", type: "DEPOSIT", account: "DBBL", credit: 20000, balance: 20000 },
  { id: 3, date: "25 May 2025", party: "Client: irin", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 20000 },
  { id: 4, date: "25 May 2025", party: "Client: irin", type: "DEPOSIT", account: "AIBL", credit: 40, balance: 20040 },
  { id: 5, date: "11 Jun 2025", party: "Client: Souriv", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 20040 },
  { id: 6, date: "11 Jun 2025", party: "Client: Minhaj", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 20040 },
  { id: 7, date: "11 Jun 2025", party: "Client: Nayem", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 20040 },
  { id: 8, date: "11 Jun 2025", party: "Supplier: Sihab", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 20040 },
  { id: 9, date: "11 Jun 2025", party: "Supplier: Jojo", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 20040 },
  { id: 10, date: "11 Jun 2025", party: "Client: Sihab mohajon", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 20040 },
  { id: 11, date: "11 Jun 2025", party: "Client: Minhaj", type: "DEPOSIT", account: "AIBL", credit: 50, balance: 20090 },
  { id: 12, date: "13 Jun 2025", party: "Account", type: "DEPOSIT", account: "CASH", credit: 10000, balance: 30090 },
  { id: 13, date: "12 Jun 2025", party: "Account", type: "DEPOSIT", account: "BKASH", credit: 0, balance: 30090 },
  { id: 14, date: "13 Jun 2025", party: "Client: Nayem", type: "DEPOSIT", account: "CASH", credit: 5000, balance: 35090 },
  { id: 15, date: "15 Jun 2025", party: "Client: Rohim ( Mortgage )", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 35090 },
  { id: 16, date: "15 Jun 2025", party: "Client: Sefat", type: "PREVIOUS_DUE", account: "AIBL", description: "Previous due", balance: 35090 },
  { id: 17, date: "17 Jun 2025", party: "Account", type: "COST", account: "CASH", debit: 100, balance: 34990 },
  { id: 18, date: "19 Jun 2025", party: "Account", type: "COST", account: "CASH", debit: 5000, balance: 29990 },
];

const navLinks = [
  { href: "/account/add", icon: <Plus className="w-6 h-6 text-primary" />, title: "Add New" },
  { href: "/account/groups", icon: <Users className="w-6 h-6 text-primary" />, title: "Account Groups" },
  { href: "/account/balance", icon: <FileText className="w-6 h-6 text-primary" />, title: "Account Balance" },
];

const rowsPerPageOptions = [5, 10, 20, 30];

const AccountStatementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return BalanceStatementData.filter((item) =>
      item.party.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totals = useMemo(() => {
    const debit = filteredData.reduce((sum, item) => sum + (item.debit || 0), 0);
    const credit = filteredData.reduce((sum, item) => sum + (item.credit || 0), 0);
    const balance = filteredData.length > 0 ? filteredData[filteredData.length - 1].balance : 0;
    return { debit, credit, balance };
  }, [filteredData]);

  return (
    <div className="w-full p-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="w-full p-6 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:border-primary flex flex-col items-center text-center rounded-2xl">
              <div className="mb-3">{link.icon}</div>
              <div className="font-semibold text-base">{link.title}</div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="w-full p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-semibold">Account Balance Statement</h3>
          <Button variant="ghost"><Funnel className="w-4 h-4 mr-2" />Filter</Button>
        </div>

        <div className="flex items-center gap-4 w-full">
          <Input
            type="text"
            placeholder="Search by name or account"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select onValueChange={(value) => {
            setRowsPerPage(parseInt(value));
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              {rowsPerPageOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <PrintWrapper printTitle="Balance Statement" preview={false}>
            <div className="p-6 bg-white">
              <PrintableHeader
                title="Account Balance Statement"
                subtitle="Summary Report"
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
                    <th>SL</th><th>Date</th><th>Client/Supplier</th><th>Type</th><th>Account</th><th>Description</th><th className="text-right">Credit</th><th className="text-right">Debit</th><th className="text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-3 py-2">{item.id}</td>
                      <td className="px-3 py-2">{item.date}</td>
                      <td className="px-3 py-2">{item.party}</td>
                      <td className="px-3 py-2">{item.type}</td>
                      <td className="px-3 py-2">{item.account}</td>
                      <td className="px-3 py-2">{item.description || "--"}</td>
                      <td className="px-3 py-2 text-right">{(item.credit || 0).toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{(item.debit || 0).toLocaleString()}</td>
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
                <TableHead>Client/Supplier</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6">No data found.</TableCell>
                </TableRow>
              ) : (
                <>
                  {currentData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.party}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.account}</TableCell>
                      <TableCell>{item.description || "--"}</TableCell>
                      <TableCell className="text-right">{(item.credit || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right">{(item.debit || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.balance.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-semibold">
                    <TableCell colSpan={6} className="text-right">Total</TableCell>
                    <TableCell className="text-right">{totals.credit.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{totals.debit.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{totals.balance.toLocaleString()}</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.max(prev - 1, 1)); }} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href="#" isActive={i + 1 === currentPage} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.min(prev + 1, totalPages)); }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  );
};

export default AccountStatementPage;
