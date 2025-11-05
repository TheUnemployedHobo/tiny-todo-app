import type { Metadata } from "next"

import { ThemeProvider } from "next-themes"
import { Poppins } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const font = Poppins({
  display: "block",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  description: "Tiny Todo App is a simple task management project built for my portfolio.",
  title: "Tiny Todo App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased select-none`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
