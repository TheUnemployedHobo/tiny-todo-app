import { ReactNode } from "react"

type PropsType = {
  Icon: ReactNode
  text?: string
}

function BigMessage({ Icon, text }: PropsType) {
  return (
    <div className="absolute top-2/4 left-2/4 flex -translate-x-2/4 -translate-y-2/4 items-center gap-x-2">
      {Icon}
      {text && <h3 className="text-xl font-semibold">{text}</h3>}
    </div>
  )
}

export default BigMessage
