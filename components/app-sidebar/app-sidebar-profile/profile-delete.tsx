"use client"

import { redirect } from "next/navigation"
import { toast } from "sonner"

import { userDeleteAcc } from "@/actions/user-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteCookie } from "@/lib/utils"

function DeleteAccountModal() {
  const handleClick = async () => {
    if (await userDeleteAcc()) {
      toast.success("Account deleted successfully.")
      deleteCookie("token")
      redirect("/sign-in")
    }

    toast.error("Failed to delete account")
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
