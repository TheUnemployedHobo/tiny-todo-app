"use client"

import { CircleCheck, CircleX, LayoutGrid, Star } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const links = [
  { icon: <LayoutGrid />, id: 1, title: "All tasks", url: "/" },
  { icon: <Star />, id: 2, title: "Important tasks", url: "/important" },
  { icon: <CircleCheck />, id: 3, title: "Completed tasks", url: "/completed" },
  { icon: <CircleX />, id: 4, title: "Uncompleted tasks", url: "/uncompleted" },
]

function AppSidebarLinks() {
  const pathname = usePathname()

  return links.map(({ icon, id, title, url }) => (
    <SidebarMenuItem key={id}>
      <SidebarMenuButton asChild isActive={pathname === url}>
        <Link href={url}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))
}

export default AppSidebarLinks
