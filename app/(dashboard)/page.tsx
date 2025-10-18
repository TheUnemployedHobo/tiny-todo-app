import TaskCardWrapper from "@/components/task-card/task-card-wrapper"

import { taskGet } from "../actions/task-actions"

export default async function Page() {
  const tasks = await taskGet()

  return <TaskCardWrapper tasks={tasks} />
}
