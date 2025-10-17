"use client"

import { LayoutList, List } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useFiltering from "@/hooks/use-filtering"

const selectOptions = ["Order added", "Earlier first", "Later first"]

function AppTopbarFilter() {
  const renderMode = useFiltering((state) => state.renderMode)
  const sortBy = useFiltering((state) => state.sortBy)
  const updateRenderMode = useFiltering((state) => state.updateRenderMode)
  const updateSortBy = useFiltering((state) => state.updateSortBy)

  return (
    <div className="flex justify-between">
      <ToggleGroup
        className="hidden sm:block"
        onValueChange={(value: "grid" | "list") => value && updateRenderMode(value)}
        type="single"
        value={renderMode}
      >
        <ToggleGroupItem value="grid">
          <LayoutList />
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <List />
        </ToggleGroupItem>
      </ToggleGroup>
      <Select onValueChange={updateSortBy} value={sortBy}>
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
