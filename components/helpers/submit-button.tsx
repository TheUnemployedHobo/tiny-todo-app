"use client"

import { LoaderCircle } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Button } from "../ui/button"

type SubmitButtonProps = {
  text: string
}

function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending && <LoaderCircle className="animate-spin" />}
      <span>{text}</span>
    </Button>
  )
}

export default SubmitButton
