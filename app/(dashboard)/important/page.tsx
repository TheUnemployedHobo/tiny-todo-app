import { taskGet } from "@/actions/task-actions"
import TaskCardWrapper from "@/components/task-card/task-card-wrapper"

export default async function Page() {
  const tasks = await taskGet("important")

  return <TaskCardWrapper tasks={tasks} />
}
