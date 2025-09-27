"use client"

import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function Loading() {
  const t = useTranslations('global')
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{t('loading')} {t('please-want')}</p>
      </motion.div>
    </div>
  )
}
