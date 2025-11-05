"use client"

import Form from "next/form"
import Link from "next/link"
import { redirect } from "next/navigation"
import { toast } from "sonner"

import { userSignIn } from "@/app/actions/user-actions"
import SubmitButton from "@/components/helpers/submit-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  const handleAction = async (f: FormData) => {
    if (await userSignIn(f)) {
      toast("Success", { description: "You have successfully signed in" })
      redirect("/")
    }

    toast("Error", { description: "Invalid credentials" })
  }

  return (
    <Form action={handleAction}>
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Sign into your account</CardTitle>
          <CardDescription>Use your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Label className="block space-y-2">
            <span className="block">Username</span>
            <Input name="username" placeholder="e.g admin" required type="text" />
          </Label>
          <Label className="block space-y-2">
            <span className="block">Password</span>
            <Input name="password" placeholder="e.g admin" required type="password" />
          </Label>
          <SubmitButton text="Sign in" />
        </CardContent>
        <CardFooter>
          <p>
            <span>Don&apos;t have an account?</span>
            <Link href="/sign-up">
              <Button variant="link">Sign up</Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Form>
  )
}
