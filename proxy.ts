import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server"

import { verifyJwToken } from "./lib/jwt-utils"

const backToRoot = (req: NextRequest) => NextResponse.redirect(new URL("/", req.url), { status: 301 })
const backToSignIn = (req: NextRequest) => NextResponse.redirect(new URL("/sign-in", req.url), { status: 301 })
const signOut = (req: NextRequest) => {
  const response = backToSignIn(req)
  response.cookies.delete("token")
  return response
}

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isPublicApiRoute = ["/api/users/sign-in", "/api/users/sign-up"].some((route) => path === route)
  const isPublicClientRoute = ["/sign-in", "/sign-up"].some((route) => path === route)

  if (path.startsWith("/api")) {
    if (isPublicApiRoute) return NextResponse.next()

    const jwToken = req.headers.get("authorization")
    if (!jwToken) return new NextResponse("Authorization token is missing", { status: 403 })

    const token = await verifyJwToken(`Bearer ${jwToken}`)
    if (token === null) return new NextResponse("Invalid authorization token", { status: 401 })

    const response = NextResponse.next()
    response.headers.set("userId", String(token.userId))
    return response
  }

  if (isPublicClientRoute) {
    if (req.cookies.get("token")) return backToRoot(req)
    return NextResponse.next()
  }

  const jwToken = req.cookies.get("token")
  if (!jwToken?.value) return backToSignIn(req)

  const token = await verifyJwToken(`Bearer ${jwToken.value}`)
  if (token === null) return signOut(req)
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
