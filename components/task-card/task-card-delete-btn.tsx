import { Trash } from "lucide-react"
import { toast } from "sonner"

import { taskDelete } from "@/app/actions/task-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"

type PropsType = { id: number }

function TaskCardDeleteBtn({ id }: PropsType) {
  const handleAction = async () => {
    if (await taskDelete(id)) toast("Deletion success", { description: "The task has been successfully deleted." })
    else toast("Deletion failed", { description: "There was an error deleting the task. Please try again." })
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
