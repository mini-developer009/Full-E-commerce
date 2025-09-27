"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function NotFound() {
    const t = useTranslations('global') // Use 'global' namespace for translations
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-md w-full"
            >
                <div className="flex justify-center mb-4">
                    <AlertTriangle className="w-12 h-12 text-destructive" />
                </div>

                <h1 className="text-3xl font-bold text-foreground mb-2">
                    {t('404')} - {t('page-not-found')}
                </h1>

                <p className="text-muted-foreground text-sm mb-6">
                    {t('page-not-found-desc', { name: `${process.env.NEXT_PUBLIC_SITE_NAME}` })}
                </p>

                <Button asChild variant="default">
                    <Link href="/">🏠 {t('return-to-home-page')}</Link>
                </Button>
            </motion.div>
        </div>
    )
}
