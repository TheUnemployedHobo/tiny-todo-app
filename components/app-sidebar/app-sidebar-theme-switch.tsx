"use client"

import { useTheme } from "next-themes"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

function AppSidebarThemeSwitch() {
  const { setTheme, theme } = useTheme()

  const handleSwitch = () => {
    if (theme === "dark") setTheme("light")
    else if (theme === "light") setTheme("dark")
  }

  return (
    <Label className="flex items-center justify-between">
      <span>Dark mode</span>
      <Switch checked={theme === "dark"} onCheckedChange={handleSwitch} />
    </Label>
  )
}

export default AppSidebarThemeSwitch
