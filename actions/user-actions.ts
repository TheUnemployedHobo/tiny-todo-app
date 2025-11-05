"use server"

import { cookies } from "next/headers"

const BASE_URL = process.env["NEXT_PUBLIC_BASE_URL"]!

export const userSignIn = async (f: FormData) => {
  const username = f.get("username") as string
  const password = f.get("password") as string

  const response = await fetch(`${BASE_URL}/api/users/sign-in`, {
    body: JSON.stringify({ password, username }),
    method: "POST",
  })

  if (!response.ok) return false

  const jwToken = await response.text()

  const cookie = await cookies()

  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 24)

  cookie.set("token", jwToken, { expires: expirationDate })

  return true
}

export const userSignUp = async (f: FormData) => {
  const username = f.get("username") as string
  const password = f.get("password") as string

  const response = await fetch(`${BASE_URL}/api/users/sign-up`, {
    body: JSON.stringify({ password, username }),
    method: "POST",
  })

  return response.ok
}

export const userUpdateCredits = async (f: FormData) => {
  const username = f.get("username") as string
  const prevPassword = f.get("prev-password") as string
  const newPassword = f.get("new-password") as string

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/users`, {
    body: JSON.stringify({
      newPassword: newPassword || null,
      prevPassword: prevPassword || null,
      username: username || null,
    }),
    headers: { authorization: value },
    method: "PUT",
  })

  return response.ok
}

export const userDeleteAcc = async () => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/users`, {
    headers: { authorization: value },
    method: "DELETE",
  })

  return response.ok
}
