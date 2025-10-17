import bcrypt from "bcrypt"

import db from "@/app/api/db"
import { directories, users } from "@/app/api/db/schema"
import { userBodySchema } from "@/app/api/zod-schema"

export async function POST(req: Request) {
  try {
    const body = userBodySchema.parse(await req.json())

    const hashedPass = await bcrypt.hash(body.password, 12)

    const [user] = await db
      .insert(users)
      .values({
        password: hashedPass,
        username: body.username,
      })
      .returning()

    await db.insert(directories).values({
      name: "main",
      userId: user.id,
    })

    return new Response("Successful", { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
