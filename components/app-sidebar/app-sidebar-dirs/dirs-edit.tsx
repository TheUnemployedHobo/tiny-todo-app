"use client"

import { Pencil } from "lucide-react"
import Form from "next/form"
import { useState } from "react"
import { toast } from "sonner"

import { directoryEdit } from "@/app/actions/directory-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import SubmitButton from "@/components/helpers/submit-button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useDirectories from "@/hooks/use-directories"

function EditDirectory({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const refresh = useDirectories((state) => state.refresh)

  const handleAction = async (f: FormData) => {
    if (await directoryEdit(f, id)) {
      toast("Edition success", { description: "Directory name updated successfully." })
      refresh()
      setIsOpen(false)
    } else toast("Edition failed", { description: "Failed to edit the directory." })
  }

  return (
    <RegularDialog
      content={
        <Form action={handleAction} className="w-full space-y-5">
          <Label className="block space-y-2">
            <span className="block">New directory name</span>
            <Input maxLength={20} name="dir-name" placeholder="ex: financial" required type="text" />
          </Label>
          <SubmitButton text="Edit directory" />
        </Form>
      }
      control={{ onOpenChange: setIsOpen, open: isOpen }}
      description="Capitalized directory name, up to 15 characters in length."
      title="Edit current directory name"
      trigger={
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="mr-2 size-4" />
          <span>Edit</span>
        </DropdownMenuItem>
      }
    />
  )
}

export default EditDirectory
