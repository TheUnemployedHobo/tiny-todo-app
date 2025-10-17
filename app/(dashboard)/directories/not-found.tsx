import { TriangleAlert } from "lucide-react"

export default function NotFound() {
  return (
    <div className="absolute top-2/4 left-2/4 flex -translate-x-2/4 -translate-y-2/4 items-center gap-x-2">
      <TriangleAlert />
      <h3 className="text-lg font-semibold">No content in this directory.</h3>
    </div>
  )
}
