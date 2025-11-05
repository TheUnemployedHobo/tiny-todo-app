import { TriangleAlert } from "lucide-react"

import BigMessage from "@/components/helpers/big-message"

export default function NotFound() {
  return <BigMessage Icon={<TriangleAlert size={32} />} text="Page not found." />
}
