import { notFound } from "next/navigation"

import { taskGet } from "@/actions/task-actions"
import TaskCardWrapper from "@/components/task-card/task-card-wrapper"

type PropsType = { params: Promise<{ name: string }> }

export default async function Page({ params }: PropsType) {
  const { name } = await params

  const tasks = await taskGet()

  const tasksByDirName = tasks.filter(({ dirName }) => dirName === decodeURIComponent(name))

  if (!tasksByDirName.length) notFound()

  return <TaskCardWrapper tasks={tasksByDirName} />
}
