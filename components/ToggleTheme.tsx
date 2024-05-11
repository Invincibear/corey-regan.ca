"use client"

import { Button }    from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme }  from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function ToggleTheme() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-10 px-0 border border-input sm:border-none" title="Click to change site theme">
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="hover: cursor-pointer"
          onClick={() => setTheme("system")}
          title="Toggle system's default theme"
        >
          System
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover: cursor-pointer"
          onClick={() => setTheme("dark")}
          title="Toggle dark theme"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover: cursor-pointer"
          onClick={() => setTheme("light")}
          title="Toggle light theme"
        >
          Light
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
