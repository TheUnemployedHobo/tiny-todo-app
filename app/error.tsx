"use client"

import { ServerCrash } from "lucide-react"

import { Button } from "@/components/ui/button"

type PropsType = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: PropsType) {
  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 space-y-5 text-center">
      <ServerCrash className="mx-auto" size={68} />
      <h3 className="text-xl font-bold">{error.name}</h3>
      <p className="max-w-96 text-lg">{error.message}</p>
      <Button onClick={reset}>Reset</Button>
    </div>
  )
}
