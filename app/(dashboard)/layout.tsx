import type { PropsWithChildren } from "react"

import AppSidebar from "@/components/app-sidebar/app-sidebar-index"
import AppTopbar from "@/components/app-topbar/app-topbar-index"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="relative container">
        <AppTopbar />
        {children}
      </section>
    </SidebarProvider>
  )
}
