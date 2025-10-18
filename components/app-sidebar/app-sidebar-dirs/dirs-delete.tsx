"use client"

import { Trash } from "lucide-react"
import { toast } from "sonner"

import { directoryDelete } from "@/app/actions/directory-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import useDirectories from "@/hooks/use-directories"

function DeleteDirectory({ id }: { id: number }) {
  const refresh = useDirectories((state) => state.refresh)

  const handleAction = async () => {
    if (await directoryDelete(id)) {
      toast("Directory deleted", { description: "The directory and all its tasks have been successfully deleted." })
      refresh()
    } else toast("Deletion failed", { description: "The directory could not be deleted." })
  }

  return (
    <AlertDialog
      actionFn={handleAction}
      description="This action will delete the directory and all its tasks."
      trigger={
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash className="mr-2 size-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      }
    />
  )
}

export default DeleteDirectory
