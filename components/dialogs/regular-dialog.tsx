"use client"

import type { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type PropsType = {
  content: ReactNode
  control?: {
    onOpenChange: (open: boolean) => void
    open: boolean
  }
  description?: string
  title: string
  trigger: ReactNode
}

function RegularDialog({ content, control, description, title, trigger }: PropsType) {
  return (
    <Dialog onOpenChange={control?.onOpenChange} open={control?.open}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{content}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RegularDialog
