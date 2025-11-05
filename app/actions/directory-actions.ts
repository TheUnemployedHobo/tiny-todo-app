"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const BASE_URL = process.env["NEXT_PUBLIC_BASE_URL"]!

export const directoryCreate = async (f: FormData) => {
  const name = f.get("dir-name") as string

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/directories`, {
    body: JSON.stringify({ name }),
    headers: { authorization: value },
    method: "POST",
  })

  return response.ok
}

export const directoryEdit = async (f: FormData, id: number) => {
  const name = f.get("dir-name") as string

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/directories/${id}`, {
    body: JSON.stringify({ name }),
    headers: { authorization: value },
    method: "PUT",
  })

  revalidateTag("tasks")

  return response.ok
}

export const directoryDelete = async (id: number) => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/directories/${id}`, {
    headers: { authorization: value },
    method: "DELETE",
  })

  revalidateTag("tasks")

  return response.ok
}
