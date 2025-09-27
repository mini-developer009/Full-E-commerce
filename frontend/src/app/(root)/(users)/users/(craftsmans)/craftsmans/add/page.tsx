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
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';

export default function CraftsmanCreatePage() {
    const t = useTranslations('global');
    const tn = useTranslations('nav');
    const [active, setActive] = useState(true);

    return (
        <main className="p-4 min-h-screen">
            <Card className="w-full max-w-full mx-auto rounded-2xl">
                <CardHeader className="border-b bg-card rounded-t-2xl px-6 py-4">
                    <CardTitle className="text-xl font-bold text-primary">
                        {t('create-new', { title: tn('craftsmans') })}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-10 px-6 py-8 bg-background rounded-b-2xl">
                    <form className="space-y-10 w-full">
                        {/* Personal Info Section */}
                        <section>
                            <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                                {t('personal-info')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field label={t('full-name')} id="name" />
                                <Field label={t("father-name")} id="father" />
                                <Field label={t("mother-name")} id="mother" />
                                <Field label={t("dob")} id="dob" type="date" />
                                <Field label={t("reference")} id="reference" required={false} />
                            </div>
                        </section>

                        {/* Store Section */}
                        <section>
                            <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                                {t('Store-details')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field label={t("Store-name")} id="Store" />
                                <Field label={t("previous-due")} id="previousDue" />
                                <Field label={t("max-due-limit")} id="dueLimit" />
                            </div>
                        </section>

                        {/* Contact Info Section */}
                        <section>
                            <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                                {t("contact-info")}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field label={t("email")} id="email" type="email" />
                                <Field label={t("phone-number")} id="phone" />
                                <Field label={t("phone-optional")} id="phone2" required={false} />
                                <Field label={t("address")} id="address" />
                                <Field label={t("upzilla")} id="upzilla" />
                                <Field label={t("zip-code")} id="zip" />
                            </div>
                        </section>

                        {/* Group & Status */}
                        <section>
                            <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                                {t("additional-info")}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <SelectField
                                    label={t("customer-group")}
                                    id="group"
                                    options={[
                                        { label: 'General', value: 'general' },
                                        { label: 'Gold', value: 'gold' },
                                        { label: 'Silver', value: 'silver' }
                                    ]}
                                />

                                <div className="flex items-center space-x-3 mt-6 md:mt-0">
                                    <Switch
                                        id="status"
                                        checked={active}
                                        onCheckedChange={setActive}
                                    />
                                    <Label htmlFor="status">
                                        {active ? t("active") : t("inactive")}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="image" className="mb-1 block">{t("photo")}</Label>
                                    <Input id="image" type="file" />
                                </div>
                            </div>
                        </section>

                        {/* Submit */}
                        <div className="pt-6 border-t flex justify-end">
                            <Button type="submit" size="lg" className="px-10 w-full md:w-auto">
                                {t('save', { title: tn('craftsmans') })}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

// Reusable Field component
function Field({
    label,
    id,
    type = 'text',
    placeholder = '',
    required = true
}: {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
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
                placeholder={placeholder}
                className="w-full"
                required={required}
            />
        </div>
    );
}

// Reusable SelectField
function SelectField({
    label,
    id,
    options = []
}: {
    label: string;
    id: string;
    options: { label: string; value: string }[];
}) {
    return (
        <div>
            <Label htmlFor={id} className="mb-1 block">{label}</Label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
