"use client"

import { LayoutList, List } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { startTransition, useEffect, useEffectEvent, useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const selectOptions = ["Order added", "Earlier first", "Later first"] as const

type SelectOptionsType = (typeof selectOptions)[number]

function AppTopbarFilter() {
  const [renderMode, setRenderMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<SelectOptionsType>("Order added")

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateUrl = useEffectEvent(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("renderMode", renderMode)
    params.set("sortBy", sortBy)
    startTransition(() => router.replace(`${pathname}?${params.toString()}`))
  })

  useEffect(() => {
    updateUrl()
  }, [renderMode, sortBy])

  return (
    <div className="flex justify-between">
      <ToggleGroup
        className="hidden sm:block"
        onValueChange={(value: "grid" | "list") => value && setRenderMode(value)}
        type="single"
        value={renderMode}
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
      <Select onValueChange={(value: SelectOptionsType) => setSortBy(value)} value={sortBy}>
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
