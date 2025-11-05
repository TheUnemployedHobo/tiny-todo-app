import { Progress } from "@/components/ui/progress"
import useTasksProgress from "@/hooks/use-tasks-progress"

function AppSidebarProgress() {
  const progress = useTasksProgress((state) => state.progress)

  return (
    <section className="mx-4">
      <div className="mb-2 flex justify-between">
        <span className="text-sm">Tasks done</span>
        <span className="text-sm">{progress}%</span>
      </div>
      <Progress className="h-3" value={progress} />
    </section>
  )
}

export default AppSidebarProgress
