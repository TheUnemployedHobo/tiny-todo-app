"use server"

import { updateTag } from "next/cache"
import { cookies } from "next/headers"

const BASE_URL = process.env["NEXT_PUBLIC_BASE_URL"]!

export const taskGet = async (filterBy?: "completed" | "important" | "uncompleted") => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks?filterBy=${filterBy}`, {
    headers: { authorization: value },
    next: { tags: ["tasks"] },
  })

  if (!response.ok) return []

  return response.json() as Promise<
    {
      createdAt: string
      deadline: string
      description: string
      dirName: string
      id: number
      isCompleted: boolean
      isImportant: boolean
      title: string
    }[]
  >
}

export const taskCreate = async (f: FormData) => {
  const title = f.get("title") as string
  const deadline = f.get("deadline") as string
  const description = f.get("description") as string
  const dirId = f.get("dir-id") as string
  const isImportant = f.get("is-important") as null | string
  const isCompleted = f.get("is-completed") as null | string

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${dirId}`, {
    body: JSON.stringify({
      deadline,
      description,
      isCompleted: isCompleted === "on",
      isImportant: isImportant === "on",
      title,
    }),
    headers: { authorization: value },
    method: "POST",
  })

  updateTag("tasks")

  return response.ok
}

export const taskEdit = async (id: number, f: FormData) => {
  const title = f.get("title") as string
  const deadline = f.get("deadline") as string
  const description = f.get("description") as string
  const isImportant = f.get("is-important") as null | string
  const isCompleted = f.get("is-completed") as null | string

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    body: JSON.stringify({
      deadline,
      description,
      isCompleted: isCompleted === "on",
      isImportant: isImportant === "on",
      title,
    }),
    headers: { authorization: value },
    method: "PUT",
  })

  updateTag("tasks")

  return response.ok
}

export const taskComplete = async (id: number, isCompleted: boolean) => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    body: JSON.stringify({
      isCompleted,
    }),
    headers: { authorization: value },
    method: "PUT",
  })

  updateTag("tasks")

  return response.ok
}

export const taskImportant = async (id: number, isImportant: boolean) => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    body: JSON.stringify({
      isImportant,
    }),
    headers: { authorization: value },
    method: "PUT",
  })

  updateTag("tasks")

  return response.ok
}

export const taskDelete = async (id: number) => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    headers: { authorization: value },
    method: "DELETE",
  })

  updateTag("tasks")

  return response.ok
}
