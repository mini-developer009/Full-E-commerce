"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Plus, Users, FileText, Funnel } from "lucide-react";
import PrintWrapper from "@/components/PrintWrapper";
import PrintableHeader from "@/components/PrintableHeader";

interface AccountBalanceItem {
  id: number;
  title: string;
  number: string;
  balance: number;
}

const AccountBalanceData: AccountBalanceItem[] = [
  { id: 1, title: "Aibl", number: "4535435435435435", balance: 90.0 },
  { id: 2, title: "DBBL", number: "35354545453", balance: 20000.0 },
  { id: 3, title: "CASH", number: "", balance: 9900.0 },
  { id: 4, title: "Bkash", number: "0", balance: 0.0 },
];

const navLinks = [
  {
    href: "/account/add",
    icon: <Plus className="w-6 h-6 text-primary" />,
    title: "Add New",
  },
  {
    href: "/account/groups",
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Account Groups",
  },
  {
    href: "/account/statement",
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "Account Statement",
  },
];

const rowsPerPageOptions = [5, 10, 20, 30];

const AccountBalanceListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return AccountBalanceData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalBalance = filteredData.reduce((sum, item) => sum + item.balance, 0);

  return (
    <div className="w-full p-4 space-y-6">
      {/* Navigation Cards */}
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

      {/* Main Table */}
      <Card className="w-full p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-semibold">Account Balance List</h3>
          <Button variant="ghost">
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-4 w-full">
          <Input
            type="text"
            placeholder="Search by account title"
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
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <PrintWrapper printTitle="Account Balance Report" preview={false}>
            <div className="p-6 bg-white">
              <PrintableHeader
                title="Account Balance Report"
                subtitle="Generated"
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
                    <th>ID No</th>
                    <th>Title</th>
                    <th>Account</th>
                    <th className="text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-3 py-2">{item.id}</td>
                      <td className="px-3 py-2">{item.title}</td>
                      <td className="px-3 py-2">{item.number}</td>
                      <td className="px-3 py-2 text-right">
                        {item.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t font-bold">
                    <td colSpan={3} className="text-right px-3 py-2">Total</td>
                    <td className="text-right px-3 py-2">
                      {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </PrintWrapper>
        </div>

        {/* Table */}
        <div className="overflow-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">No data found.</TableCell>
                </TableRow>
              ) : (
                <>
                  {currentData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell className="text-right">
                        {item.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-semibold">
                    <TableCell colSpan={3} className="text-right">Total</TableCell>
                    <TableCell className="text-right">
                      {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
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

export default AccountBalanceListPage;
