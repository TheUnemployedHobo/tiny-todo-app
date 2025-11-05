import type { NextRequest } from "next/server"

import { eq } from "drizzle-orm"

import db from "../../../lib/db"
import { directories, tasks } from "../../../lib/db/schema"

export async function GET(req: NextRequest) {
  try {
    const userId = +req.headers.get("userId")!
    const offset = req.nextUrl.searchParams.get("offset")
    const limit = req.nextUrl.searchParams.get("limit")

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
      .where(eq(directories.userId, userId))
      .offset(Number(offset || 0))
      .limit(Number(limit || -1))

    return Response.json(tasksByUser)
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
