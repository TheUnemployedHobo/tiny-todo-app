import bcrypt from "bcrypt"
import { and, eq } from "drizzle-orm"

import db from "@/lib/db"
import { users } from "@/lib/db/schema"
import { signJwToken } from "@/lib/jwt-utils"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const [availableUser] = await db
      .select()
      .from(users)
      .where(and(eq(users.username, body.username)))

    if (!availableUser) return new Response("User not found", { status: 404 })

    const isPassCorrect = await bcrypt.compare(body.password, availableUser.password)

    if (!isPassCorrect) return new Response("Incorrect credentials", { status: 401 })

    const jwtToken = await signJwToken(availableUser.id)

    return new Response(jwtToken, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
