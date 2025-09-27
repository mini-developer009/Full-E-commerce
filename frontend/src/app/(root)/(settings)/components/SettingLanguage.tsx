'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { availableLocales, localeMetadata } from '@/lib/locales';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const SettingLanguage = () => {
    const [selectedLang, setSelectedLang] = useState('bn');
    const router = useRouter();

    useEffect(() => {
        const stored = document.cookie
            .split('; ')
            .find((row) => row.startsWith('locale='))
            ?.split('=')[1];

        if (stored && availableLocales.includes(stored)) {
            setSelectedLang(stored);
        }
    }, []);

    const handleChange = (value: string) => {
        setSelectedLang(value);
        document.cookie = `locale=${value}; path=/`;
        router.refresh(); // Refresh the page to apply locale
    };

    return (
        <Card className="max-w-full mx-auto border-muted shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">ভাষা সেটিংস</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    আপনার প্রিয় ভাষা নির্বাচন করুন।
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {availableLocales.map((locale) => {
                        const isSelected = selectedLang === locale;
                        const { emoji, name, flagUrl } = localeMetadata[locale];

                        return (
                            <button
                                key={locale}
                                onClick={() => handleChange(locale)}
                                className={cn(
                                    'relative border rounded-xl px-4 py-4 text-left transition-all hover:shadow-md bg-background',
                                    isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                                )}
                                type="button"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{emoji}</span>
                                        <span className="text-base font-medium">{name}</span>
                                    </div>
                                    <img
                                        src={flagUrl}
                                        alt={`${name} flag`}
                                        width={28}
                                        height={20}
                                        className="rounded shadow"
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default SettingLanguage;
