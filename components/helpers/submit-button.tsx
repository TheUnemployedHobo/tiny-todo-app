"use client"

import { useFormStatus } from "react-dom"

import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

type SubmitButtonProps = {
  text: string
}

function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending && <Spinner />}
      <span>{text}</span>
    </Button>
  )
}

export default SubmitButton
