import { taskGet } from "@/app/actions/task-actions"
import TaskCardWrapper from "@/components/task-card/task-card-wrapper"

export default async function Page() {
  const tasks = await taskGet()

  const important = tasks.filter(({ isImportant }) => isImportant)

  return <TaskCardWrapper tasks={important} />
}
