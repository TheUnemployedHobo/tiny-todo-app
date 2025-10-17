import { taskGet } from "@/app/actions/task-actions"
import TaskCardWrapper from "@/components/task-card/task-card-wrapper"

export default async function Page() {
  const tasks = await taskGet()

  const uncompletedTasks = tasks.filter(({ isCompleted }) => !isCompleted)

  return <TaskCardWrapper tasks={uncompletedTasks} />
}
