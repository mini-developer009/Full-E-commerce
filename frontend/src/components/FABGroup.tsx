// components/FABGroup.tsx
"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { LucideIcon, Plus } from "lucide-react"

export type ActionItem = {
  id: string
  icon: LucideIcon
  label?: string
  href: string
  colorClass?: string
}

export default function FABGroup({
  actions,
  position = "bottom-right",
  icon: MainIcon = Plus,
  colorClass = "bg-primary text-white hover:bg-primary/90",
}: {
  actions: ActionItem[]
  position?: "bottom-right" | "bottom-left"
  icon?: LucideIcon
  colorClass?: string
}) {
  const [open, setOpen] = useState(false)

  const posClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  }

  return (
    <div className={cn("fixed z-50 flex flex-col items-end gap-3", posClasses[position])}>
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2"
            >
              {action.label && (
                <span className="text-sm bg-card rounded px-2 py-1 shadow">
                  {action.label}
                </span>
              )}
              <Link href={action.href}>
                <Button
                  className={cn(
                    "h-12 w-12 p-0 border-0 rounded-full shadow-md shadow-primary",
                    action.colorClass ?? "bg-[#00bd6d] text-white hover:bg-[#00bd6d]/90"
                  )}
                >
                  <action.icon className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>

      <Button
        onClick={() => setOpen((prev) => !prev)}
        className={cn("h-14 w-14 p-0 rounded-full shadow-xl", colorClass)}
      >
        <MainIcon className="w-6 h-6" />
      </Button>
    </div>
  )
}
