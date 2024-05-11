"use client"

import { Button }             from "@/components/ui/button"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme }           from "next-themes"


export function ToggleThemeIcons() {
  const { theme, setTheme } = useTheme()
  const className = "w-10 px-0"
  const activeThemeClasses = " bg-accent-foreground text-background"

  return (
    <div className="flex">
      <Button
        className = {`${className} ${(theme === "system") ? activeThemeClasses : ""}`}
        onClick   = {() => setTheme("system")}
        title     = "Toggle system's default theme"
        variant   = "ghost"
      >
        <SunMoon className="size-5 transition-all"/>
        <span className="sr-only">System</span>
      </Button>
      <Button
        className = {`${className} ${(theme === "dark") ? activeThemeClasses : ""}`}
        onClick   = {() => setTheme("dark")}
        title     = "Toggle dark theme"
        variant   = "ghost"
      >
        <Moon className="size-5 transition-all"/>
        <span className="sr-only">Dark</span>
      </Button>
      <Button
        className = {`${className} ${(theme === "light") ? activeThemeClasses : ""}`}
        onClick   = {() => setTheme("light")}
        title     = "Toggle light theme"
        variant   = "ghost"
      >
        <Sun className="size-5 transition-all"/>
        <span className="sr-only">Light</span>
      </Button>
    </div>
  )
}
