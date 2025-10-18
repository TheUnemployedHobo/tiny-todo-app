"use client"

import { create } from "zustand/react"

import { getClientAuthToken } from "@/lib/jwt-utils"

type StateType = {
  progress: number
  refresh: () => Promise<void>
}

const useTasksProgress = create<StateType>((set) => {
  const fetchTasksProgress = async () => {
    try {
      const authorization = getClientAuthToken()!

      const response = await fetch("/api/tasks/progress", { headers: { authorization } })

      const data: string = await response.text()

      set({ progress: +data })
    } catch {
      set({ progress: 0 })
    }
  }

  fetchTasksProgress()

  return {
    progress: 0,
    refresh: fetchTasksProgress,
  }
})

export default useTasksProgress
