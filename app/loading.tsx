import { LoaderCircle } from "lucide-react"

import BigMessage from "@/components/helpers/big-message"

export default function Loading() {
  return <BigMessage Icon={<LoaderCircle className="animate-spin" size={64} />} />
}
