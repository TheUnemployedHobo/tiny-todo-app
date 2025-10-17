"use client"

import { redirect } from "next/navigation"

import { userDeleteAcc } from "@/app/actions/user-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { deleteCookie } from "@/lib/utils"

function DeleteAccountModal() {
  const handleClick = async () => {
    if (await userDeleteAcc()) {
      toast({
        description: "You're now signed out and your account is deleted",
        title: "Account deleted",
      })

      deleteCookie("token")

      redirect("/sign-in")
    }

    toast({
      description: "Please try again later",
      title: "Failed to delete account",
      variant: "destructive",
    })
  }

  return (
    <AlertDialog
      actionFn={handleClick}
      description="You're about to delete your account. Remember, this action cannot be undone."
      trigger={
        <Button className="w-full" size="sm" variant="destructive">
          Delete account
        </Button>
      }
    />
  )
}

export default DeleteAccountModal
