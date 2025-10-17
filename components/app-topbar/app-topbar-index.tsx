"use client"

import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import useFiltering from "@/hooks/use-filtering"
import { formatDate } from "@/lib/utils"

import AddTask from "./app-topbar-add-task"
import AppTopbarFilter from "./app-topbar-filter"
import AppTopbarTitle from "./app-topbar-title"

function AppTopbar() {
  const search = useFiltering((state) => state.search)
  const updateSearch = useFiltering((state) => state.updateSearch)

  return (
    <header className="my-5 space-y-8">
      <nav className="flex items-center justify-between gap-x-2">
        <SidebarTrigger className="md:hidden" />
        <Input
          className="hidden w-1/4 lg:block"
          onChange={(e) => updateSearch(e.currentTarget.value)}
          placeholder="Search for tasks"
          type="search"
          value={search}
        />
        <span className="text-sm sm:text-base">{formatDate(new Date())}</span>
        <AddTask />
      </nav>
      <Input
        className="lg:hidden"
        onChange={(e) => updateSearch(e.currentTarget.value)}
        placeholder="Search for tasks"
        type="search"
        value={search}
      />
      <AppTopbarTitle />
      <AppTopbarFilter />
    </header>
  )
}

export default AppTopbar
