"use client"

import Form from "next/form"
import Link from "next/link"
import { redirect } from "next/navigation"
import { toast } from "sonner"

import { userSignUp } from "@/actions/user-actions"
import SubmitButton from "@/components/helpers/submit-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const handleAction = async (f: FormData) => {
    const password = f.get("password") as string
    const confirmPassword = f.get("confirm-password") as string

    if (password !== confirmPassword) toast("Error", { description: "Passwords do not match" })
    else if (await userSignUp(f)) {
      toast.success("Account created successfully, now you can sign in")
      redirect("/sign-in")
    } else toast.error("Failed to sign up")
  }

  return (
    <Form action={handleAction}>
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Create an account and get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Label className="block space-y-2">
            <span className="block">Username</span>
            <Input
              name="username"
              pattern="^[a-z]{3,100}$"
              placeholder="e.g admin"
              required
              title="Enter between 3 and 100 lowercase letters with no spaces"
              type="text"
            />
          </Label>
          <Label className="block space-y-2">
            <span className="block">Password</span>
            <Input minLength={8} name="password" placeholder="e.g admin" required type="password" />
          </Label>
          <Label className="block space-y-2">
            <span className="block">Confirm password</span>
            <Input minLength={8} name="confirm-password" placeholder="e.g admin" required type="password" />
          </Label>
          <SubmitButton text="Sign up" />
        </CardContent>
        <CardFooter>
          <p>
            <span>Already have an account?</span>
            <Link href="/sign-in">
              <Button variant="link">Sign in</Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Form>
  )
}
