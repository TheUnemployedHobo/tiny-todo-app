import type { NextRequest } from "next/server"

import { and, eq } from "drizzle-orm"

import db from "@/lib/db"
import { directories, tasks } from "@/lib/db/schema"

export async function GET(req: NextRequest) {
  try {
    const userId = +req.headers.get("userId")!
    const offset = req.nextUrl.searchParams.get("offset")
    const limit = req.nextUrl.searchParams.get("limit")
    const filterBy = req.nextUrl.searchParams.get("filterBy")

    const tasksByUser = await db
      .select({
        createdAt: tasks.createdAt,
        deadline: tasks.deadline,
        description: tasks.description,
        dirName: directories.name,
        id: tasks.id,
        isCompleted: tasks.isCompleted,
        isImportant: tasks.isImportant,
        title: tasks.title,
      })
      .from(tasks)
      .innerJoin(directories, eq(tasks.directoryId, directories.id))
      .where(
        filterBy === "completed"
          ? and(eq(directories.userId, userId), eq(tasks.isCompleted, true))
          : filterBy === "uncompleted"
            ? and(eq(directories.userId, userId), eq(tasks.isCompleted, false))
            : filterBy === "important"
              ? and(eq(directories.userId, userId), eq(tasks.isImportant, true))
              : eq(directories.userId, userId),
      )
      .offset(Number(offset || 0))
      .limit(Number(limit || -1))

    return Response.json(tasksByUser)
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
