"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, AlertCircle } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { login, clearError } from "@/lib/store/slices/authSlice"
import { useLanguage } from "@/components/providers/language-provider"

export default function LoginPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated, user } = useAppSelector((state) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getRedirectPath(user.role)
      router.push(redirectPath)
    }
  }, [isAuthenticated, user, router])

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const getRedirectPath = (role: string) => {
    switch (role) {
      case 'PARENT':
        return '/parent-dashboard'
      case 'TEACHER':
        return '/teacher-dashboard'
      case 'ADMIN':
        return '/admin-dashboard'
      default:
        return '/student-dashboard'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(login({ email, password }))
    if (login.fulfilled.match(result)) {
      const redirectPath = result.payload.redirectPath || getRedirectPath(result.payload.user.role)
      router.push(redirectPath)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl">LearnDetect</span>
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{t("auth_login_title")}</CardTitle>
            <CardDescription>{t("auth_login_desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth_email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth_password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("auth_signin_loading") : t("auth_signin_button")}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Test Accounts</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>student@learndetect.com / password123</p>
                <p>parent@learndetect.com / password123</p>
                <p>teacher@learndetect.com / password123</p>
                <p>admin@learndetect.com / password123</p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t("auth_no_account")}{" "}
              <Link href="/signup" className="text-primary hover:underline">
                {t("auth_signup_link")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
