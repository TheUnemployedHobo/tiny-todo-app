import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"

import db from "../db"
import { users } from "../db/schema"
import { updateUserBodySchema } from "../zod-schema"

export async function DELETE(req: Request) {
  try {
    const userId = +req.headers.get("userId")!

    await db.delete(users).where(eq(users.id, userId))

    return new Response("Successful", { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const userId = +req.headers.get("userId")!

    const [user] = await db.select().from(users).where(eq(users.id, userId))

    if (!user) return new Response("User not found", { status: 404 })

    return new Response(user.username, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const userId = +req.headers.get("userId")!
    const body = updateUserBodySchema.parse(await req.json())

    const [user] = await db.select().from(users).where(eq(users.id, userId))

    if (body.username) {
      await db
        .update(users)
        .set({
          username: body.username,
        })
        .where(eq(users.id, userId))

      return new Response("Successful", { status: 200 })
    }

    if (body.prevPassword && body.newPassword) {
      const isPasswordCorrect = await bcrypt.compare(body.prevPassword, user.password)

      if (!isPasswordCorrect) return new Response("Failed", { status: 401 })

      const newPassword = await bcrypt.hash(body.newPassword, 12)

      await db
        .update(users)
        .set({
          password: newPassword,
        })
        .where(eq(users.id, userId))

      return new Response("Successful", { status: 200 })
    }

    return new Response("Failed", { status: 400 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
