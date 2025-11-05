"use client"

import { LayoutList, List } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { startTransition, useCallback, useEffect, useEffectEvent, useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const selectOptions = ["Order added", "Earlier first", "Later first"] as const

type SelectOptionsType = (typeof selectOptions)[number]

function AppTopbarFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setRenderMode = useCallback(
    (mode: "grid" | "list") => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("renderMode", mode)
      startTransition(() => router.replace(`${pathname}?${params.toString()}`))
    },
    [pathname, router, searchParams],
  )

  const setSortBy = useCallback(
    (mode: SelectOptionsType) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("sortBy", mode)
      startTransition(() => router.replace(`${pathname}?${params.toString()}`))
    },
    [pathname, router, searchParams],
  )

  return (
    <div className="flex justify-between">
      <ToggleGroup
        className="hidden sm:block"
        onValueChange={(value: "grid" | "list") => value && setRenderMode(value)}
        type="single"
        value={searchParams.get("renderMode")!}
        variant="outline"
      >
        <ToggleGroupItem value="grid">
          <LayoutList />
          <span>Grid view</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <List />
          <span>List view</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <Select onValueChange={(value: SelectOptionsType) => setSortBy(value)} value={searchParams.get("sortBy")!}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default AppTopbarFilter
