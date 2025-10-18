import { eq } from "drizzle-orm"

import db from "@/app/api/db"
import { directories } from "@/app/api/db/schema"
import { dirBodySchema } from "@/app/api/zod-schema"

type PropsType = { params: Promise<{ id: string }> }

export async function DELETE(_: unknown, { params }: PropsType) {
  try {
    const dirId = +(await params).id

    const [deletedDir] = await db.delete(directories).where(eq(directories.id, dirId)).returning()

    return Response.json(deletedDir, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}

export async function PUT(req: Request, { params }: PropsType) {
  try {
    const dirId = +(await params).id
    const body = dirBodySchema.parse(await req.json())

    const [updatedDir] = await db
      .update(directories)
      .set({ name: body.name })
      .where(eq(directories.id, dirId))
      .returning()

    return Response.json(updatedDir, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
