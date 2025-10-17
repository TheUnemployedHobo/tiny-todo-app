"use client"

import { Plus } from "lucide-react"
import Form from "next/form"
import { useState } from "react"
import { toast } from "sonner"

import { directoryCreate } from "@/app/actions/directory-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import SubmitButton from "@/components/helpers/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import useDirectories from "@/hooks/use-directories"

function CreateDirectory() {
  const [isOpen, setIsOpen] = useState(false)
  const refresh = useDirectories((state) => state.refresh)

  const handleAction = async (f: FormData) => {
    if (await directoryCreate(f)) {
      toast("Success", { description: `Directory created successfully.` })
      refresh()
      setIsOpen(false)
    } else toast("Error", { description: "Failed to create directory." })
  }

  return (
    <RegularDialog
      content={
        <Form action={handleAction} className="w-full space-y-5">
          <Label className="block space-y-2">
            <span>Directory name</span>
            <Input maxLength={20} name="dir-name" placeholder="ex: financial" required type="text" />
          </Label>
          <SubmitButton text="Add directory" />
        </Form>
      }
      control={{ onOpenChange: setIsOpen, open: isOpen }}
      description="Capitalized directory name, up to 15 characters in length."
      title="Create directory"
      trigger={
        <SidebarMenuButton className="w-8 justify-center">
          <Plus />
        </SidebarMenuButton>
      }
    />
  )
}

export default CreateDirectory
