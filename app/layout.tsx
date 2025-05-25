import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from '@/lib/i18n/context'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Chatbot Admin",
  description: "AI-Powered Chatbot Management Platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <I18nProvider>
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </I18nProvider>
  )
}



import './globals.css'