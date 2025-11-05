import { eq } from "drizzle-orm"

import db from "../../../lib/db"
import { directories } from "../../../lib/db/schema"
import { dirBodySchema } from "../zod-schema"

export async function GET(req: Request) {
  try {
    const userId = +req.headers.get("userId")!

    const dirsById = await db.select().from(directories).where(eq(directories.userId, userId))

    return Response.json(dirsById)
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const userId = +req.headers.get("userId")!
    const body = dirBodySchema.parse(await req.json())

    const [newDir] = await db
      .insert(directories)
      .values({
        name: body.name,
        userId,
      })
      .returning()

    return Response.json(newDir)
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
