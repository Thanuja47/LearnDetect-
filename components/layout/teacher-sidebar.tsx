"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, Home, Users, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/store/hooks"
import { logout } from "@/lib/store/slices/authSlice"
import { useLanguage } from "@/components/providers/language-provider"

interface TeacherSidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function TeacherSidebar({ isOpen, onClose }: TeacherSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { t } = useLanguage()

  const handleSignOut = () => {
    dispatch(logout())
    router.push('/login')
  }

  const navItems = [
    { href: "/teacher-dashboard", key: "nav_dashboard" as const, icon: Home },
    { href: "/teacher-dashboard/students", key: "nav_students" as const, icon: Users },
    { href: "/teacher-dashboard/analytics", key: "nav_analytics" as const, icon: BarChart3 },
    { href: "/teacher-dashboard/schedule", key: "nav_schedule" as const, icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative w-64 h-screen bg-sidebar border-r border-sidebar-border transition-transform duration-200 z-30 flex flex-col`}
    >
      {/* Logo */}
      <div className="hidden lg:flex items-center gap-3 h-16 px-4 border-b border-sidebar-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <span className="font-bold text-lg block">LearnDetect</span>
          <span className="text-xs text-sidebar-foreground/60">{t("role_teacher")}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map(({ href, key: label, icon: Icon }) => (
          <Link key={href} href={href} onClick={onClose}>
            <button
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left ${isActive(href)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{t(label)}</span>
            </button>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive bg-transparent"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          {t("nav_logout")}
        </Button>
      </div>
    </aside>
  )
}
