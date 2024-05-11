"use client"

import { Button }             from "@/components/ui/button"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme }           from "next-themes"


export function ToggleThemeIcons() {
  const { theme, setTheme } = useTheme()
  const buttonClassName = "w-10 px-0"
  const iconClassName = "size-6 transition-all"
  const activeThemeClasses = " bg-accent-foreground text-background"

  return (
    <div className="flex -ml-2">
      <Button
        className = {`${buttonClassName} ${(theme === "system") ? activeThemeClasses : ""}`}
        onClick   = {() => setTheme("system")}
        title     = "Toggle system's default theme"
        variant   = "ghost"
      >
        <SunMoon className={iconClassName} />
        <span className="sr-only">System</span>
      </Button>
      <Button
        className = {`${buttonClassName} ${(theme === "dark") ? activeThemeClasses : ""}`}
        onClick   = {() => setTheme("dark")}
        title     = "Toggle dark theme"
        variant   = "ghost"
      >
        <Moon className={iconClassName} />
        <span className="sr-only">Dark</span>
      </Button>
      <Button
        className = {`${buttonClassName} ${(theme === "light") ? activeThemeClasses : ""}`}
        onClick   = {() => setTheme("light")}
        title     = "Toggle light theme"
        variant   = "ghost"
      >
        <Sun className={iconClassName} />
        <span className="sr-only">Light</span>
      </Button>
    </div>
  )
}
