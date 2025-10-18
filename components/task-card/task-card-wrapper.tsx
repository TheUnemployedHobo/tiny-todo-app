"use client"

import { compareAsc, compareDesc } from "date-fns"
import { CircleSlash2 } from "lucide-react"
import dynamic from "next/dynamic"

import useFiltering from "@/hooks/use-filtering"
import { cn } from "@/lib/utils"

import type { TaskCardPropsType } from "./task-card-index"

import BigMessage from "../helpers/big-message"
import { ScrollArea } from "../ui/scroll-area"

const TaskCard = dynamic(() => import("./task-card-index"), { ssr: false })

type PropsType = { tasks: TaskCardPropsType[] }

function TaskCardWrapper({ tasks }: PropsType) {
  const renderMode = useFiltering((state) => state.renderMode)
  const sortBy = useFiltering((state) => state.sortBy)
  const search = useFiltering((state) => state.search)

  const sortedTasks = structuredClone(tasks).sort((a, b) => {
    switch (sortBy) {
      case "Earlier first":
        return compareAsc(new Date(a.deadline), new Date(b.deadline))
      case "Later first":
        return compareDesc(new Date(a.deadline), new Date(b.deadline))
      case "Order added":
        return a.id - b.id
    }
  })

  const finalData = search
    ? sortedTasks.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
    : sortedTasks

  return (
    <ScrollArea className="h-[calc(100vh-272px)] lg:h-[calc(100vh-208px)]">
      {finalData.length === 0 ? (
        <BigMessage Icon={<CircleSlash2 size={32} />} text="Empty." />
      ) : (
        <section
          className={cn(
            renderMode === "grid" && "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
            renderMode === "list" && "flex flex-col gap-y-5",
          )}
        >
          {finalData.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </section>
      )}
    </ScrollArea>
  )
}

export default TaskCardWrapper
