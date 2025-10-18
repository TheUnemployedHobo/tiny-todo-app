import type { NextRequest } from "next/server"

import { eq } from "drizzle-orm"

import db from "@/app/api/db"
import { directories, tasks } from "@/app/api/db/schema"

export async function GET(req: NextRequest) {
  try {
    const userId = +req.headers.get("userId")!

    const tasksByUser = await db
      .select({
        isCompleted: tasks.isCompleted,
      })
      .from(tasks)
      .innerJoin(directories, eq(tasks.directoryId, directories.id))
      .where(eq(directories.userId, userId))

    const completedTasks = tasksByUser.filter(({ isCompleted }) => isCompleted)

    const percentageCompleted = (completedTasks.length / tasksByUser.length) * 100 || 0

    return new Response(Math.trunc(percentageCompleted).toString(), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
