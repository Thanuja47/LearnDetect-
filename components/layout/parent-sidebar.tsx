"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Users, BarChart3, FileText, Settings, LogOut } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { logout } from "@/lib/store/slices/authSlice"

import { useLanguage } from "@/components/providers/language-provider"

// Remove NAV_ITEMS from outside or keep structure but remove labels
const NAV_LINKS = [
  { href: "/parent-dashboard", key: "nav_dashboard" as const, icon: Home },
  { href: "/parent-dashboard/children", key: "nav_children" as const, icon: Users },
  { href: "/parent-dashboard/reports", key: "nav_reports" as const, icon: FileText },
  { href: "/parent-dashboard/progress", key: "nav_progress" as const, icon: BarChart3 },
  { href: "/parent-dashboard/settings", key: "nav_settings" as const, icon: Settings },
]

export function ParentSidebar() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = () => {
    dispatch(logout())
    router.push('/login')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-background border-r border-border flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">LearnDetect</h2>
          <p className="text-sm text-muted-foreground">{t("portal_parent")}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${isActive ? "bg-primary text-primary-foreground" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{t(item.key)}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 bg-transparent"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5" />
            <span>{t("nav_logout")}</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-primary">LearnDetect</h2>
            <p className="text-sm text-muted-foreground">{t("portal_parent")}</p>
          </div>

          <nav className="p-4 space-y-2">
            {NAV_LINKS.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${isActive ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{t(item.key)}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border mt-auto">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 bg-transparent"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
              <span>{t("nav_logout")}</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
