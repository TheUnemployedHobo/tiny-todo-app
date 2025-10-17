"use client"

import { redirect } from "next/navigation"
import { toast } from "sonner"

import { userDeleteAcc } from "@/app/actions/user-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteCookie } from "@/lib/utils"

function DeleteAccountModal() {
  const handleClick = async () => {
    if (await userDeleteAcc()) {
      toast("Account deleted", { description: "You're now signed out and your account is deleted" })

      deleteCookie("token")

      redirect("/sign-in")
    }

    toast("Failed to delete account", { description: "Please try again later" })
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
