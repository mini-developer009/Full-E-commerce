"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserPermissionSheet } from "./UserPermission";
import UserFormSheet from "./UserFormSheet";

type User = {
    id: number;
    name: string;
    username: string;
    phone?: string;
    email?: string;
    image?: string;
    password: string;
    role?: string;
    permission?: string;
    createdAt: Date;
};

const mockUsers: User[] = [
    {
        id: 1,
        name: "suborno",
        username: "suborno",
        phone: "",
        email: "",
        image: "",
        password: "suborno123",
        role: "",
        permission: "",
        createdAt: new Date("2025-06-14"),
    },
    {
        id: 2,
        name: "airin",
        username: "airin12",
        phone: "",
        email: "",
        image: "",
        password: "airin1234",
        role: "",
        permission: "",
        createdAt: new Date("2025-06-14"),
    },
];

export default function UserList() {
    const [entriesPerPage, setEntriesPerPage] = useState(50);
    const currentPage = 1;

    const paginatedUsers = mockUsers.slice(0, entriesPerPage);

    const [users, setUsers] = useState<User[]>(mockUsers)
    const handleCreateUser = (user: User) => {
        setUsers((prev) => [...prev, user])
    }
    return (
        <Card className="p-6 overflow-x-auto w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">ইউজার লিস্ট</h2>
                <div className="flex items-center gap-4">
                    {/* Entries Dropdown */}
                    <div className="flex items-center gap-2">
                        <span>Show</span>
                        <Select
                            value={String(entriesPerPage)}
                            onValueChange={(value) => setEntriesPerPage(Number(value))}
                        >
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                        <span>entries</span>
                    </div>

                    {/* Create Button */}
                    <UserFormSheet onUserCreate={handleCreateUser} />
                </div>
            </div>


            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>আইডি</TableHead>
                        <TableHead>নাম</TableHead>
                        <TableHead>ফোন নাম্বার</TableHead>
                        <TableHead>ইমেইল</TableHead>
                        <TableHead>ছবি</TableHead>
                        <TableHead>পাসওয়ার্ড</TableHead>
                        <TableHead>ভূমিকা</TableHead>
                        <TableHead>পারমিশন</TableHead>
                        <TableHead>তৈরির সময়</TableHead>
                        <TableHead>একশন</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                                {user.name} <span className="text-muted-foreground">({user.username})</span>
                            </TableCell>
                            <TableCell>{user.phone || "-"}</TableCell>
                            <TableCell>{user.email || "-"}</TableCell>
                            <TableCell>
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                ) : (
                                    "-"
                                )}
                            </TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell>{user.role || "-"}</TableCell>
                            <TableCell>
                                <UserPermissionSheet userName={user.name} >
                                    <Button variant={'outline'}>Assign Permission</Button>
                                </UserPermissionSheet>
                            </TableCell>
                            <TableCell>
                                {format(user.createdAt, "dd MMM yyyy", { locale: bn })}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="sm" variant="default">একশন</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>একশন মেনু</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => console.log("Assign Role", user.id)}>
                                            Assign Role
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => console.log("Edit", user.id)}>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => console.log("Delete", user.id)}
                                            className="text-red-500 focus:text-red-500"
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Showing 1 to {paginatedUsers.length} of {mockUsers.length} entries
                </div>
                <div className="flex gap-1">
                    <Button size="sm" variant="ghost" disabled>Previous</Button>
                    <Button size="sm" variant="default">1</Button>
                    <Button size="sm" variant="ghost" disabled>Next</Button>
                </div>
            </div>
        </Card>
    );
}
