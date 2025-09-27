"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, MonitorCog } from "lucide-react"
import clsx from "clsx"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="flex items-center justify-between w-full">
            <span>Theme</span>
            <div className="flex items-center gap-1 border rounded-full">
                {/* System */}
                <button
                    onClick={() => setTheme("system")}
                    className={clsx(
                        "w-6 h-6 flex items-center justify-center rounded-full border transition-colors",
                        theme === "system" ? "bg-muted" : "hover:bg-muted/50"
                    )}
                >
                    <MonitorCog className="size-3" />
                </button>

                {/* Light */}
                <button
                    onClick={() => setTheme("light")}
                    className={clsx(
                        "w-6 h-6 flex items-center justify-center rounded-full border transition-colors",
                        theme === "light" ? "bg-muted" : "hover:bg-muted/50"
                    )}
                >
                    <Sun className="size-3" />
                </button>

                {/* Dark */}
                <button
                    onClick={() => setTheme("dark")}
                    className={clsx(
                        "w-6 h-6 flex items-center justify-center rounded-full border transition-colors",
                        theme === "dark" ? "bg-muted" : "hover:bg-muted/50"
                    )}
                >
                    <Moon className="size-3" />
                </button>
            </div>
        </div>
    )
}
