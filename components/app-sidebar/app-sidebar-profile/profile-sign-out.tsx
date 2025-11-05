"use client"

import { redirect } from "next/navigation"

import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteCookie } from "@/lib/utils"

function SignOutModal() {
  const handleClick = () => {
    deleteCookie("token")

    redirect("/sign-in")
  }

  return (
    <AlertDialog
      actionFn={handleClick}
      description="You're about to get signed out. You can sign back in anytime you want."
      trigger={
        <Button className="w-full" size="sm" variant="outline">
          Sign out
        </Button>
      }
    />
  )
}

export default SignOutModal
