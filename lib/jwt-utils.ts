import { jwtVerify, SignJWT } from "jose"
import { z } from "zod"

const secretKey = new TextEncoder().encode(process.env["JWT_SECRET_TOKEN"]!)

const authTokenSchema = z
  .string()
  .trim()
  .min(8)
  .startsWith("Bearer ")
  .transform((authToken) => authToken.split("Bearer ").at(1))

export const signJwToken = (userId: number) =>
  new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24h").sign(secretKey)

export const verifyJwToken = async (jwToken: null | string) => {
  try {
    const token = authTokenSchema.safeParse(jwToken)

    if (!token.success) return null

    const { payload } = await jwtVerify(token.data!, secretKey)

    return payload as {
      exp: number
      iat: number
      userId: number
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getClientAuthToken = () => {
  const match = document.cookie.match(/(^|;\s*)token=([^;]*)/)
  return match ? decodeURIComponent(match[2]) : null
}
