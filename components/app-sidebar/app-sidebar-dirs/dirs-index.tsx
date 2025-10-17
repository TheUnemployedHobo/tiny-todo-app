"use client"

import { ChevronsUpDown, Folders, MoreHorizontal } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar"
import useDirectories, { type DirsType } from "@/hooks/use-directories"

const CreateDirectory = dynamic(() => import("./dirs-create"), { ssr: false })
const DeleteDirectory = dynamic(() => import("./dirs-delete"), { ssr: false })
const EditDirectory = dynamic(() => import("./dirs-edit"), { ssr: false })

function AppSidebarDirs() {
  const directories = useDirectories((state) => state.directories)

  return (
    <Collapsible>
      <SidebarMenuItem>
        <section className="flex">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Folders />
              <span>Directories</span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CreateDirectory />
        </section>
        <CollapsibleContent>
          <Directories directories={directories} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function Directories({ directories }: { directories: DirsType }) {
  return directories.map(({ id, name }) => (
    <SidebarMenuSub key={id}>
      <SidebarMenuSubItem className="flex">
        <SidebarMenuButton asChild isActive={false}>
          <Link href={`/directories/${name}`}>{name}</Link>
        </SidebarMenuButton>
        {name !== "main" && <DropDown id={id} />}
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  ))
}

function DropDown({ id }: { id: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <EditDirectory id={id} />
        <DeleteDirectory id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppSidebarDirs
