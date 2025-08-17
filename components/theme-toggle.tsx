"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors duration-200">
        <div className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = theme === "system" ? systemTheme : theme
  const isLight = currentTheme === "light"
  const isDark = currentTheme === "dark"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
        >
          <Sun
            className={`h-5 w-5 transition-all duration-300 ${
              isLight ? "rotate-0 scale-100" : "rotate-90 scale-0"
            } absolute`}
          />
          <Moon
            className={`h-5 w-5 transition-all duration-300 ${
              isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            } absolute`}
          />
          <Monitor
            className={`h-5 w-5 transition-all duration-300 ${
              theme === "system" ? "rotate-0 scale-100" : "rotate-90 scale-0"
            } absolute`}
          />

          <div className="absolute inset-0 bg-primary/5 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Theme Preference
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`cursor-pointer transition-colors duration-200 ${
            theme === "light" ? "bg-primary/10 text-primary" : ""
          }`}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && <div className="ml-auto h-2 w-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`cursor-pointer transition-colors duration-200 ${
            theme === "dark" ? "bg-primary/10 text-primary" : ""
          }`}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && <div className="ml-auto h-2 w-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`cursor-pointer transition-colors duration-200 ${
            theme === "system" ? "bg-primary/10 text-primary" : ""
          }`}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === "system" && <div className="ml-auto h-2 w-2 bg-primary rounded-full" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
