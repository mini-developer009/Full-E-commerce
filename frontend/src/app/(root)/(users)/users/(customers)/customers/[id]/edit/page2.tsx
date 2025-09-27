'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState, ChangeEvent, FormEvent } from 'react';

export interface ClientType {
    id: string;
    clientId?: string;
    name: string;
    fullName?: string;
    fatherName: string;
    motherName: string;
    dob: string;
    reference?: string;
    StoreName: string;
    previousDue: number;
    maxDueLimit?: number;
    email: string;
    phoneNumber: string;
    phoneOptional?: string;
    address: string;
    upzilla?: string;
    zipCode?: string;
    street?: string;
    other?: string;
    fileUrl?: string;
    isActive: boolean;
}

interface ClientEditPageProps {
    client: ClientType;
    onSubmit: (updatedClient: ClientType) => void;
}

export default function ClientEditPage({ client, onSubmit }: ClientEditPageProps) {
    // Initialize form state from client prop
    const [formData, setFormData] = useState<ClientType>({ ...client });
    const [file, setFile] = useState<File | null>(null);

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;

        if (target instanceof HTMLInputElement) {
            const { id, type, value, checked } = target;
            setFormData((prev) => ({
                ...prev,
                [id]: type === 'checkbox' ? checked : value,
            }));
        } else if (target instanceof HTMLSelectElement) {
            const { id, value } = target;
            setFormData((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };


    // Special handler for Switch (boolean)
    const handleActiveChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            isActive: checked,
        }));
    };

    // File input handler
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    // On form submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Here you can process file upload if any, or just pass data back
        // For demo, just call onSubmit with updated data
        onSubmit(formData);
    };

    return (
        <main className="p-4 min-h-screen">
            <Card className="w-full max-w-full mx-auto rounded-2xl">
                <CardHeader className="border-b bg-card rounded-t-2xl px-6 py-4">
                    <CardTitle className="text-xl font-bold text-primary">
                        Edit Client Details
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-10 px-6 py-8 bg-background rounded-b-2xl">
                    <form className="space-y-10 w-full" onSubmit={handleSubmit}>

                        {/* Personal Info Section */}
                        <section>
                            <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                                Personal Info
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field
                                    label="Client Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Full Name"
                                    id="fullName"
                                    value={formData.fullName || ''}
                                    onChange={handleChange}
                                    required={false}
                                />
                                <Field
                                    label="Father's Name"
                                    id="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Mother's Name"
                                    id="motherName"
                                    value={formData.motherName}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Date of Birth"
                                    id="dob"
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Reference"
                                    id="reference"
                                    value={formData.reference || ''}
                                    onChange={handleChange}
                                    required={false}
                                />
                            </div>
                        </section>

                        {/* Store Section */}
                        <section>
                            <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                                Store Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field
                                    label="Store Name"
                                    id="StoreName"
                                    value={formData.StoreName}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Previous Due"
                                    id="previousDue"
                                    type="number"
                                    value={formData.previousDue}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Max Due Limit"
                                    id="maxDueLimit"
                                    type="number"
                                    value={formData.maxDueLimit || ''}
                                    onChange={handleChange}
                                    required={false}
                                />
                            </div>
                        </section>

                        {/* Contact Info Section */}
                        <section>
                            <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                                Contact Info
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field
                                    label="E-mail"
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Phone Number"
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Phone (Optional)"
                                    id="phoneOptional"
                                    value={formData.phoneOptional || ''}
                                    onChange={handleChange}
                                    required={false}
                                />
                                <Field
                                    label="Address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Upzilla"
                                    id="upzilla"
                                    value={formData.upzilla || ''}
                                    onChange={handleChange}
                                    required={false}
                                />
                                <Field
                                    label="Zip Code"
                                    id="zipCode"
                                    value={formData.zipCode || ''}
                                    onChange={handleChange}
                                    required={false}
                                />
                                <div className="md:col-span-3">
                                    <Field
                                        label="Street / Road"
                                        id="street"
                                        value={formData.street || ''}
                                        onChange={handleChange}
                                        required={false}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Other Options */}
                        <section>
                            <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                                Other Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Example Select - customize as needed */}
                                <div>
                                    <Label htmlFor="select">Select</Label>
                                    <Select
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, other: value }))}
                                        value={formData.other || ''}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="option-1">Option 1</SelectItem>
                                            <SelectItem value="option-2">Option 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="file">Upload File</Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-6">
                                <Switch checked={formData.isActive} onCheckedChange={handleActiveChange} />
                                <Label>Active</Label>
                            </div>
                        </section>

                        {/* Submit Button */}
                        <div className="pt-6 border-t flex justify-end">
                            <Button type="submit" size="lg" className="px-10 w-full">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

// Reusable Field component for controlled inputs
function Field({
    label,
    id,
    type = 'text',
    value,
    placeholder = '',
    required = true,
    onChange,
    disabled = false
}: {
    label: string;
    id: string;
    type?: string;
    value: string | number;
    placeholder?: string;
    required?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    disabled?: boolean;
}) {
    return (
        <div>
            <Label htmlFor={id} className="mb-1 block">
                {label}
                {required ? (
                    <span className="text-red-500"> *</span>
                ) : (
                    <span className="text-muted-foreground text-sm"> (optional)</span>
                )}
            </Label>
            <Input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                className="w-full"
                required={required}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}
