"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Users, Settings, Menu, X, LogOut } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { logout } from "@/lib/store/slices/authSlice"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "student" | "parent" | "teacher" | "admin"
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    dispatch(logout())
    router.push('/login')
  }

  const navItems = {
    student: [{ href: "/student-dashboard", label: "Dashboard", icon: Home }],
    parent: [
      { href: "/parent-dashboard", label: "Dashboard", icon: Home },
      { href: "/parent-dashboard/children", label: "Children", icon: Users },
    ],
    teacher: [
      { href: "/teacher-dashboard", label: "Dashboard", icon: Home },
      { href: "/teacher-dashboard/students", label: "Students", icon: Users },
    ],
    admin: [
      { href: "/admin-dashboard", label: "Dashboard", icon: Home },
      { href: "/admin-dashboard/users", label: "Users", icon: Users },
      { href: "/admin-dashboard/settings", label: "Settings", icon: Settings },
    ],
  }

  const items = navItems[userRole]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-border bg-background sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold">LearnDetect</span>
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative w-64 h-screen bg-sidebar border-r border-sidebar-border transition-transform duration-200 z-30 flex flex-col`}
        >
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-2 h-16 px-4 border-b border-sidebar-border">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">LearnDetect</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {items.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-left">
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-sidebar-border space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive bg-transparent"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
