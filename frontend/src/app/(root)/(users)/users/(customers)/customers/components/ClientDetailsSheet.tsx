'use client'

import React, { useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ClientType } from "@/types/ClientType"

interface ClientDetailsProps {
    client: ClientType
    trigger: React.ReactNode
}

const ClientDetailsSheet: React.FC<ClientDetailsProps> = ({ client, trigger }) => {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent className="max-w-xl lg:min-w-[600px] w-full p-6 flex flex-col space-y-4 h-full">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold flex items-center gap-4">
                        {/* Profile Image */}
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary shadow-lg flex-shrink-0">
                            {client.fileUrl ? (
                                <img
                                    src={client.fileUrl}
                                    alt={`${client.name} Profile`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xl font-semibold">
                                    {client.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        Client Details
                    </SheetTitle>
                    <SheetDescription>Personal, contact, and business details</SheetDescription>
                </SheetHeader>

                {/* Scrollable area */}
                <ScrollArea className="flex-grow pr-4">
                    <div className="space-y-6">
                        <Section title="Personal Information">
                            <Grid>
                                {/* <Info label="ID No" value={client.id} /> */}
                                <Info label="Client Name" value={client.name} />
                                <Info label="Father's Name" value={client.fatherName} />
                                <Info label="Mother's Name" value={client.motherName} />
                                <Info label="Date of Birth" value={client.dateOfBirth ?? "N/A"} />
                                <Info label="Reference" value={client.Ref ?? "N/A"} />
                            </Grid>
                        </Section>

                        <Separator />

                        <Section title="Store Details">
                            <Grid>
                                <Info label="Shop Name" value={client.shopName} />
                                <Info label="Due Limit" value={client.DueLimit ?? "N/A"} />
                            </Grid>
                        </Section>

                        <Separator />

                        <Section title="Contact Information">
                            <Grid>
                                <Info label="E-mail" value={client.email} />
                                <Info label="Phone" value={client.phone} />
                                <Info label="Address" value={client.address} />
                                <Info label="Upazilla" value={client.upazilla ?? "N/A"} />
                                <Info label="Zip Code" value={client.zipCode ?? "N/A"} />
                                <Info label="Road / Street" value={client.road ?? "N/A"} />
                            </Grid>
                        </Section>
                    </div>
                </ScrollArea>

                {/* Close Button */}
                <div className="pt-4">
                    <Button className="w-full" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ClientDetailsSheet

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h3 className="text-lg font-semibold text-muted-foreground">{title}</h3>
        <div className="mt-2">{children}</div>
    </div>
)

const Grid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
)

const Info = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="space-y-1">
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
        <div className="text-base font-semibold text-foreground">{value ?? "N/A"}</div>
    </div>
)
