"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function ThemeStatus() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <div className="fixed bottom-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
      <Badge variant="secondary" className="text-xs">
        Theme: {currentTheme} {theme === "system" && "(auto)"}
      </Badge>
    </div>
  )
}
