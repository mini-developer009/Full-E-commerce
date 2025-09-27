"use client";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface ContactInfo {
    name: string;
    logoUrl?: string;
    address?: string;
    phone?: string;
    email?: string;
}

interface PrintableHeaderProps {
    title: string;
    subtitle?: string;
    date?: string;
    Store: ContactInfo;
    customer?: ContactInfo;
    accentColor?: keyof typeof accentColorsMap;
}

const accentColorsMap = {
    "blue-600": {
        bg: "bg-blue-50",
        text: "text-blue-600",
        icon: "text-blue-600",
        border: "border-blue-600",
    },
    "indigo-600": {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
        icon: "text-indigo-600",
        border: "border-indigo-600",
    },
    "red-600": {
        bg: "bg-red-50",
        text: "text-red-600",
        icon: "text-red-600",
        border: "border-red-600",
    },
    "green-600": {
        bg: "bg-green-50",
        text: "text-green-600",
        icon: "text-green-600",
        border: "border-green-600",
    },
    "gray-600": {
        bg: "bg-gray-50",
        text: "text-gray-700",
        icon: "text-gray-700",
        border: "border-gray-700",
    },
};

export default function PrintableHeader({
    title,
    subtitle,
    date,
    Store,
    customer,
    accentColor = "blue-600",
}: PrintableHeaderProps) {
    const colors = accentColorsMap[accentColor] || accentColorsMap["blue-600"];

    return (
        <div
            className={`mb-6 print:mb-3 border-b ${colors.border} pb-5 print:pb-2`}
        >
            <div className="flex flex-wrap justify-between items-center gap-4">
                {/* Store Info */}
                {/* Store Info */}
                <div className="flex items-center gap-4 min-w-0">
                    {Store.logoUrl && (
                        <div
                            className={`rounded-full w-14 h-14 flex items-center justify-center shrink-0 border ${colors.border} bg-white shadow-md overflow-hidden`}
                        >
                            <Image
                                src={'https://www.suborno.dev/favicon.ico'}
                                alt="Store Logo"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </div>
                    )}

                    {/* Left border divider */}
                    <div className={`border-l-2 ${colors.border} h-10`} />

                    <div className="min-w-0 pl-3">
                        <h1
                            className={`text-lg font-extrabold truncate ${colors.text}`}
                            title={Store.name}
                        >
                            {Store.name}
                        </h1>

                        {Store.address && (
                            <p
                                className="text-xs truncate flex items-center gap-1 mt-0.5"
                                title={Store.address}
                            >
                                <MapPin size={14} className={colors.icon} />
                                <span className="text-gray-600 truncate">{Store.address}</span>
                            </p>
                        )}

                        {Store.phone && (
                            <p
                                className="text-xs truncate flex items-center gap-1 mt-0.5"
                                title={Store.phone}
                            >
                                <Phone size={14} className={colors.icon} />
                                <span className="text-gray-600 truncate">{Store.phone}</span>
                            </p>
                        )}

                        {Store.email && (
                            <p
                                className="text-xs truncate flex items-center gap-1 mt-0.5"
                                title={Store.email}
                            >
                                <Mail size={14} className={colors.icon} />
                                <span className="text-gray-600 truncate">{Store.email}</span>
                            </p>
                        )}
                    </div>
                </div>


                {/* Document Info */}
                <div className="text-right min-w-0 max-w-xs">
                    <h2
                        className="text-xl font-bold truncate"
                        title={title}
                        style={{ color: colors.text.replace("text-", "") }}
                    >
                        {title}
                    </h2>

                    {subtitle && (
                        <p
                            className="text-sm text-gray-500 truncate mt-0.5"
                            title={subtitle}
                        >
                            {subtitle}
                        </p>
                    )}

                    {date && (
                        <p
                            className="mt-1 text-xs flex justify-end items-center gap-1 text-gray-500"
                            title={`Printed on: ${date}`}
                        >
                            <CalendarDays size={14} className={colors.icon} />
                            Printed on: {date}
                        </p>
                    )}
                </div>
            </div>

            {/* Customer Info */}
            {customer && (
                <div
                    className={`mt-5 border-t pt-3 max-w-md ${colors.border}`}
                >
                    <h3 className="font-semibold text-sm mb-1 text-gray-700">
                        Customer Information
                    </h3>

                    <p
                        className="text-sm font-medium truncate mb-1"
                        title={customer.name}
                    >
                        {customer.name}
                    </p>

                    {customer.address && (
                        <p
                            className="text-xs flex items-center gap-1 truncate mb-0.5 text-gray-600"
                            title={customer.address}
                        >
                            <MapPin size={14} className={colors.icon} /> {customer.address}
                        </p>
                    )}

                    {customer.phone && (
                        <p
                            className="text-xs flex items-center gap-1 truncate mb-0.5 text-gray-600"
                            title={customer.phone}
                        >
                            <Phone size={14} className={colors.icon} /> {customer.phone}
                        </p>
                    )}

                    {customer.email && (
                        <p
                            className="text-xs flex items-center gap-1 truncate text-gray-600"
                            title={customer.email}
                        >
                            <Mail size={14} className={colors.icon} /> {customer.email}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
