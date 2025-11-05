import jwt from "jsonwebtoken"
import { z } from "zod"

const JWT_SECRET_TOKEN = process.env["JWT_SECRET_TOKEN"]!

const authTokenSchema = z
  .string()
  .trim()
  .min(8)
  .startsWith("Bearer ")
  .transform((authToken) => authToken.split("Bearer ").at(1))

export const signJwToken = (userId: number) => jwt.sign({ userId }, JWT_SECRET_TOKEN, { expiresIn: "24h" })

export const verifyJwToken = async (jwToken: null | string) => {
  try {
    const token = authTokenSchema.safeParse(jwToken)

    if (!token.success) return null

    return jwt.verify(token.data!, JWT_SECRET_TOKEN) as {
      exp: number
      iat: number
      userId: number
    }
  } catch {
    return null
  }
}

export const getClientAuthToken = () => {
  const match = document.cookie.match(/(^|;\s*)token=([^;]*)/)
  return match ? decodeURIComponent(match[2]) : null
}
