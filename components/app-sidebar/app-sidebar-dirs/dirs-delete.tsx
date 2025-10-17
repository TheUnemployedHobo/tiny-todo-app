"use client"

import { Trash } from "lucide-react"

import { directoryDelete } from "@/app/actions/directory-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import useDirectories from "@/hooks/use-directories"
import { toast } from "@/hooks/use-toast"

function DeleteDirectory({ id }: { id: number }) {
  const refresh = useDirectories((state) => state.refresh)

  const handleAction = async () => {
    if (await directoryDelete(id)) {
      toast({
        description: "The directory and all its tasks have been successfully deleted.",
        title: "Directory deleted",
      })
      refresh()
    } else
      toast({
        description: "The directory could not be deleted.",
        title: "Deletion failed",
        variant: "destructive",
      })
  }

  return (
    <AlertDialog
      actionFn={handleAction}
      description="This action will delete the directory and all its tasks."
      trigger={
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      }
    />
  )
}

export default DeleteDirectory
