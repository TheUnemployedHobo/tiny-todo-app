"use client"

import Form from "next/form"
import { redirect } from "next/navigation"
import { toast } from "sonner"

import { userUpdateCredits } from "@/actions/user-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import SubmitButton from "@/components/helpers/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteCookie } from "@/lib/utils"

function EditCredentialsForm() {
  const handleAction = async (f: FormData) => {
    if (await userUpdateCredits(f)) {
      toast.success("Credentials updated")
      deleteCookie("token")
      redirect("/sign-in")
    }

    toast.error("Failed to update credentials")
  }

  return (
    <RegularDialog
      content={
        <Form action={handleAction} className="flex flex-grow flex-col gap-y-5">
          <Label className="block space-y-2">
            <span className="block">Username</span>
            <Input
              name="username"
              pattern="^[a-z]{3,100}$"
              placeholder="e.g admin"
              title="Enter between 3 and 100 lowercase letters with no spaces"
              type="text"
            />
          </Label>
          <Label className="block space-y-2">
            <span className="block">Previous password</span>
            <Input minLength={8} name="prev-password" placeholder="e.g admin" type="password" />
          </Label>
          <Label className="block space-y-2">
            <span className="block">New password</span>
            <Input minLength={8} name="new-password" placeholder="e.g admin" type="password" />
          </Label>
          <SubmitButton text="Update credentials" />
        </Form>
      }
      description="Fill out the fields you wanna edit"
      title="Edit credentials"
      trigger={
        <Button className="w-full" size="sm" variant="secondary">
          Edit credentials
        </Button>
      }
    />
  )
}

export default EditCredentialsForm
