import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

import { getClientAuthToken } from "./jwt-utils"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (date: Date | string) => format(date, "MMMM dd, yyyy")

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}

export const userGetUsername = async () => {
  const authorization = getClientAuthToken()!

  const response = await fetch("/api/users", { headers: { authorization } })

  if (!response.ok) return ""

  return response.text()
}
