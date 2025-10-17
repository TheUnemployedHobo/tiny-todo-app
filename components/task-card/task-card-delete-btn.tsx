import { Trash } from "lucide-react"

import { taskDelete } from "@/app/actions/task-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

type PropsType = { id: number }

function TaskCardDeleteBtn({ id }: PropsType) {
  const handleAction = async () => {
    if (await taskDelete(id))
      toast({
        description: "The task has been successfully deleted.",
        title: "Deletion success",
      })
    else
      toast({
        description: "There was an error deleting the task. Please try again.",
        title: "Deletion failed",
        variant: "destructive",
      })
  }

  return (
    <AlertDialog
      actionFn={handleAction}
      description="This action will permanently delete the task."
      trigger={
        <Button size="icon" variant="ghost">
          <Trash />
        </Button>
      }
    />
  )
}

export default TaskCardDeleteBtn
