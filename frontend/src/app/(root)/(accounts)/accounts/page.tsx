"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Input
} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Plus, Users, FileText, Eye, Pencil, Trash2, Funnel } from "lucide-react";
import PrintWrapper from "@/components/PrintWrapper";
import PrintableHeader from "@/components/PrintableHeader";
import { useTranslations } from "next-intl";

interface AccountItem {
  id: number;
  title: string;
  number: string;
  description: string;
  contactPerson: string;
  phone: string;
}

// ✅ Static account list
const AccountListData: AccountItem[] = [
  { id: 1, title: "Aibl", number: "4535435435435435", description: "", contactPerson: "Rajshahi", phone: "01975555689" },
  { id: 2, title: "DBBL", number: "35354545453", description: "", contactPerson: "Dhaka", phone: "0174545454" },
  { id: 3, title: "CASH", number: "", description: "", contactPerson: "", phone: "" },
  { id: 4, title: "Bkash", number: "0", description: "", contactPerson: "", phone: "" },
];

// ✅ Table columns
const columns = [
  "ID No",
  "Title",
  "Account",
  "Description",
  "Contact Person",
  "Phone Number",
  "Action"
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

const AccountListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return AccountListData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

const t = useTranslations('nav')
const tg = useTranslations('global')

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

      {/* Main Table Card */}
      <Card className="w-full p-6 space-y-4">


        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-semibold">Account List</h3>
          <Button variant="ghost" className="w-fit self-end sm:self-auto">
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
 
        <div className='flex items-center gap-4 w-full'>
          <Input type="text" placeholder="Search by account title" />
          <Select onValueChange={(value) => {
            setRowsPerPage(parseInt(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={tg('select-rows')} />
            </SelectTrigger>
            <SelectContent>
              {rowsPerPageOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <PrintWrapper printTitle="Customers Statement" preview={false}>
            <div className="p-6 bg-white">
              <div className='pt-4'>
                <PrintableHeader
                  title="Customers Statement"
                  subtitle="Invoice #12345"
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
                      {columns.map((col, index) => (
                        <th key={index} >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-3 py-2">{item.id}</td>
                        <td className="px-3 py-2">{item.title}</td>
                        <td className="px-3 py-2">{item.number}</td>
                        <td className="px-3 py-2">{item.description}</td>
                        <td className="px-3 py-2">{item.contactPerson}</td>
                        <td className="px-3 py-2">{item.phone}</td>
                        <td className="px-3 py-2 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost"><Eye size={18} /></Button>
                            <Button size="icon" variant="ghost"><Pencil size={18} /></Button>
                            <Button size="icon" variant="ghost" className="text-red-600"><Trash2 size={18} /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </PrintWrapper>
        </div>

        {/* Table UI */}
        <div className="overflow-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead key={index}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6">
                    No account data found.
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.number}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.contactPerson}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost"><Eye size={18} /></Button>
                        <Button size="icon" variant="ghost"><Pencil size={18} /></Button>
                        <Button size="icon" variant="ghost" className="text-red-600"><Trash2 size={18} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
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

export default AccountListPage;
