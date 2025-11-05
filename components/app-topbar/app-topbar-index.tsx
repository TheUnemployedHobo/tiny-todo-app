"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { memo, startTransition, useEffect, useEffectEvent, useState } from "react"

import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import useDebounce from "@/hooks/use-debounce"
import { formatDate } from "@/lib/utils"

import AddTask from "./app-topbar-add-task"
import AppTopbarFilter from "./app-topbar-filter"
import AppTopbarTitle from "./app-topbar-title"

function AppTopbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [text, setText] = useState("")

  const debouncedText = useDebounce(text, 200)

  const updateURL = useEffectEvent(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedText) params.set("search", debouncedText)
    else params.delete("search")

    startTransition(() => router.replace(`${pathname}?${params.toString()}`))
  })

  useEffect(() => {
    updateURL()
  }, [debouncedText])

  return (
    <header className="my-5 space-y-8">
      <nav className="flex items-center justify-between gap-x-2">
        <SidebarTrigger className="md:hidden" />
        <Input
          className="hidden w-1/4 lg:block"
          onChange={(e) => setText(e.currentTarget.value)}
          placeholder="Search for tasks"
          type="search"
          value={text}
        />
        <span className="text-sm sm:text-base">{formatDate(new Date())}</span>
        <AddTask />
      </nav>
      <Input
        className="lg:hidden"
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Search for tasks"
        type="search"
        value={text}
      />
      <AppTopbarTitle />
      <AppTopbarFilter />
    </header>
  )
}

export default memo(AppTopbar)
