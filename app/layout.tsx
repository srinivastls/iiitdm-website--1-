import type { Metadata } from "next"
import type React from "react"
import "./globals.css"
import "./overview.css"

export const metadata: Metadata = {
  title: "IIITDM Kancheepuram - CSE Department",
  description: "Department of Computer Science & Engineering at IIITDM Kancheepuram",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  )
}



import './globals.css'