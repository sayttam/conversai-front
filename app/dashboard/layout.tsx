"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Layers,
  Zap,
  Bell,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: <Layers className="h-5 w-5" />,
    submenu: [
      { title: "Active Campaigns", href: "/dashboard/campaigns" },
      { title: "Create Campaign", href: "/dashboard/campaigns/create" },
      { title: "Archives", href: "/dashboard/campaigns/archive" },
    ],
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Chat Logs",
    href: "/dashboard/chat-logs",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "AI Settings",
    href: "/dashboard/ai-settings",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold">AI Chatbot Admin</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium",
                        pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                      )}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openSubmenu === item.title && "transform rotate-180",
                        )}
                      />
                    </button>
                    {openSubmenu === item.title && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.submenu.map((submenu) => (
                          <li key={submenu.title}>
                            <Link
                              href={submenu.href}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm font-medium",
                                pathname === submenu.href ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                              )}
                            >
                              {submenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="ml-2 mt-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex justify-between items-center">
              <Link href="/dashboard" className="font-bold text-lg">
                AI Chatbot Admin
              </Link>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.title}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.title)}
                          className={cn(
                            "flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium",
                            pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                          )}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-3">{item.title}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              openSubmenu === item.title && "transform rotate-180",
                            )}
                          />
                        </button>
                        {openSubmenu === item.title && (
                          <ul className="mt-1 ml-6 space-y-1">
                            {item.submenu.map((submenu) => (
                              <li key={submenu.title}>
                                <Link
                                  href={submenu.href}
                                  className={cn(
                                    "block rounded-md px-3 py-2 text-sm font-medium",
                                    pathname === submenu.href ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                                  )}
                                >
                                  {submenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                          pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                        )}
                      >
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t">
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Nav */}
        <header className="border-b bg-background">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="md:hidden"></div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Admin User</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">admin@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="flex items-center" onClick={() => {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                      }
                    }>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

