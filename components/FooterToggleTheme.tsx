"use client"

import { Button }             from "@/components/ui/button"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme }           from "next-themes"
import { useEffect, useState } from "react"


export function FooterToggleTheme() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  const buttonClassName = "w-10 px-0"
  const iconClassName = "size-6 transition-all"
  // const activeThemeClasses = " bg-accent-foreground text-background"

  const systemVariant = (mounted && theme === "system") ? "ghostFooterActive" : "ghostFooter"
  const darkVariant   = (mounted && theme === "dark")   ? "ghostFooterActive" : "ghostFooter"
  const lightVariant  = (mounted && theme === "light")  ? "ghostFooterActive" : "ghostFooter"


  return (
    <div className="flex -ml-2">
      <Button
        className = {buttonClassName}
        onClick   = {() => setTheme("system")}
        title     = "Toggle system's default theme"
        variant   = {systemVariant}
      >
        <SunMoon className={iconClassName} />
        <span className="sr-only">System</span>
      </Button>
      <Button
        className = {buttonClassName}
        onClick   = {() => setTheme("dark")}
        title     = "Toggle dark theme"
        variant   = {darkVariant}
      >
        <Moon className={iconClassName} />
        <span className="sr-only">Dark</span>
      </Button>
      <Button
        className = {buttonClassName}
        onClick   = {() => setTheme("light")}
        title     = "Toggle light theme"
        variant   = {lightVariant}
      >
        <Sun className={iconClassName} />
        <span className="sr-only">Light</span>
      </Button>
    </div>
  )
}
