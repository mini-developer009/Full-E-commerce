// src/app/(root)/(users)/users/(moneylender)/moneylender/moneylenders-client-list/[id]/page.tsx
import { notFound } from 'next/navigation'
import { MoneylenderListData } from '@/data/moneylenders'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    params: Promise<{ id: string }> // Next.js 15 fetcher typing
}

const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-dashed">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-semibold text-right text-gray-900 dark:text-white">{value}</span>
    </div>
)

export default async function ClientDetailSheet({ params }: Props) {
    // Await the params promise
    const { id } = await params
    const clientId = parseInt(id)

    const client = MoneylenderListData.find((c) => c.id === clientId)
    if (!client) return notFound()

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-background p-8 rounded-2xl shadow-md print:shadow-none print:border print:border-gray-200 print:p-6 print:rounded-none">
            {/* Back link */}
            <div className="mb-6 print:hidden">
                <Link
                    href="/users/moneylender/moneylenders-client-list"
                    className="text-primary font-medium flex items-center gap-2 hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Client List
                </Link>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Client Profile</h1>
                    <p className="text-muted-foreground">Client ID: #{client.id}</p>
                </div>
                <Image
                    src="https://www.suborno.dev/favicon.ico"
                    width={120}
                    height={40}
                    alt="Store Logo"
                    className="object-contain"
                />
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-6 border-b pb-6 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border">
                    <Image
                        src={client.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${client.name}`}
                        width={96}
                        height={96}
                        alt={client.name}
                    />
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{client.name}</h2>
                    <p className="text-muted-foreground">{client.email || 'No email provided'}</p>
                    <p className="text-muted-foreground">{client.phone || 'No phone'}</p>
                </div>
            </div>

            {/* Info Sheet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">Personal Details</h3>
                    <DetailRow label="Full Name" value={client.name} />
                    <DetailRow label="Phone" value={client.phone || 'N/A'} />
                    <DetailRow label="Email" value={client.email || 'N/A'} />
                    <DetailRow label="Address" value={client.address || 'N/A'} />
                    <DetailRow label="Date of Birth" value={client.dob || 'Not Provided'} />
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold border-b pb-1 mb-2">Loan Information</h3>
                    <DetailRow label="Loan Amount" value={`৳ ${client.amount}`} />
                    <DetailRow label="Interest Rate" value={`${client.interestRate || 10}%`} />
                    <DetailRow label="Loan Term" value={client.loanTerm || '12 months'} />
                    <DetailRow label="Due Date" value={client.dueDate || 'Not Set'} />
                    <DetailRow label="Status" value={client.status || 'Pending'} />
                </div>
            </div>

            {/* Notes or Footer */}
            <div className="mt-10 text-sm text-muted-foreground">
                <p>This is an auto-generated client sheet for record purposes. For any updates, contact the administrator.</p>
            </div>
        </div>
    )
}
