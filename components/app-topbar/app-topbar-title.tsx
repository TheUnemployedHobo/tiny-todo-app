"use client"

import { usePathname } from "next/navigation"

const refactorName = (name: string) => decodeURIComponent(name.replace(/\//g, " ").trim())

function AppTopbarTitle() {
  const pathname = usePathname()

  return (
    <h1 className="mb-8 text-center text-xl font-bold capitalize sm:text-left sm:text-2xl">
      {refactorName(pathname) || "all"}
    </h1>
  )
}

export default AppTopbarTitle
