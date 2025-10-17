import { Star } from "lucide-react"
import { startTransition, useOptimistic } from "react"

import { taskImportant } from "@/app/actions/task-actions"
import { Button } from "@/components/ui/button"

type PropsType = {
  id: number
  isImportant: boolean
}

function TaskCardImportantBtn({ id, isImportant }: PropsType) {
  const [important, setImportant] = useOptimistic(isImportant)

  const handleAction = () =>
    startTransition(() => {
      setImportant((prev) => !prev)
      taskImportant(id, !isImportant)
    })

  return (
    <Button onClick={handleAction} size="icon" variant="ghost">
      <Star fill={important ? "hsl(var(--foreground))" : "transparent"} />
    </Button>
  )
}

export default TaskCardImportantBtn
