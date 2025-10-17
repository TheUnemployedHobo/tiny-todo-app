"use client"

import Form from "next/form"
import Link from "next/link"
import { redirect } from "next/navigation"

import { userSignUp } from "@/app/actions/user-actions"
import SubmitButton from "@/components/helpers/submit-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const handleAction = async (f: FormData) => {
    const password = f.get("password") as string
    const confirmPassword = f.get("confirm-password") as string

    if (password !== confirmPassword)
      toast({
        description: "Passwords do not match",
        title: "Error",
        variant: "destructive",
      })
    else if (await userSignUp(f)) {
      toast({
        description: "Account created successfully, now you can sign in",
        title: "Successful",
      })
      redirect("/sign-in")
    } else
      toast({
        description: "Failed to sign up",
        title: "Error",
        variant: "destructive",
      })
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
            <span>Username</span>
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
            <span>Password</span>
            <Input minLength={8} name="password" placeholder="e.g admin" required type="password" />
          </Label>
          <Label className="block space-y-2">
            <span>Confirm password</span>
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
