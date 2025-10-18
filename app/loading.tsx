import BigMessage from "@/components/helpers/big-message"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return <BigMessage Icon={<Spinner className="size-16" />} />
}
