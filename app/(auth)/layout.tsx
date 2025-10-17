import type { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
  return <section className="flex h-screen items-center justify-center">{children}</section>
}
