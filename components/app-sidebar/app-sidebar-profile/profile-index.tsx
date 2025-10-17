"use client"

import { ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
import { memo } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar"
import useFetchFn from "@/hooks/use-fetch-fn"
import { useIsMobile } from "@/hooks/use-mobile"
import { userGetUsername } from "@/lib/utils"

const AppSidebarThemeSwitch = dynamic(() => import("../app-sidebar-theme-switch"), { ssr: false })
const DeleteAccountModal = dynamic(() => import("./profile-delete"), { ssr: false })
const EditCredentialsForm = dynamic(() => import("./profile-edit"), { ssr: false })
const SignOutModal = dynamic(() => import("./profile-sign-out"), { ssr: false })

function AppSidebarAvatar() {
  const { data: username } = useFetchFn(userGetUsername)

  return (
    <section className="flex items-center gap-x-3">
      <Avatar>
        <AvatarFallback className="uppercase">{username?.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="font-semibold">{username}</span>
    </section>
  )
}

function AppSidebarProfile() {
  const isMobile = useIsMobile()

  const side = isMobile ? "bottom" : "right"
  const align = isMobile ? "center" : "start"

  return (
    <SidebarHeader>
      <Popover>
        <PopoverTrigger asChild>
          <SidebarMenuButton className="py-6">
            <AppSidebarAvatar />
            <ChevronRight className="ml-auto" />
          </SidebarMenuButton>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-60 space-y-4" side={side}>
          <AppSidebarThemeSwitch />
          <SignOutModal />
          <EditCredentialsForm />
          <DeleteAccountModal />
        </PopoverContent>
      </Popover>
    </SidebarHeader>
  )
}

export default memo(AppSidebarProfile)
