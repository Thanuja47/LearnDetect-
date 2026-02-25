"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, AlertCircle } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { register, clearError } from "@/lib/store/slices/authSlice"
import { useLanguage } from "@/components/providers/language-provider"

const gradeOptions = [
  { value: "Pre-K", label: "Pre-K" },
  { value: "Kindergarten", label: "Kindergarten" },
  { value: "1st", label: "1st Grade" },
  { value: "2nd", label: "2nd Grade" },
  { value: "3rd", label: "3rd Grade" },
  { value: "4th", label: "4th Grade" },
  { value: "5th", label: "5th Grade" },
  { value: "6th", label: "6th Grade" },
  { value: "7th", label: "7th Grade" },
  { value: "8th", label: "8th Grade" },
]

const subjectOptions = [
  { value: "English", label: "English" },
  { value: "Reading", label: "Reading" },
  { value: "Language Arts", label: "Language Arts" },
  { value: "Special Education", label: "Special Education" },
  { value: "ESL", label: "ESL (English as Second Language)" },
]

export default function SignupPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated, user } = useAppSelector((state) => state.auth)

  const [userRole, setUserRole] = useState("student")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // Student-specific fields
  const [grade, setGrade] = useState("")
  const [age, setAge] = useState("")
  // Teacher-specific fields
  const [subject, setSubject] = useState("")
  const [className, setClassName] = useState("")

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

    // Build registration data based on role
    const registrationData: any = { email, password, name, role: userRole }

    if (userRole === 'student') {
      registrationData.grade = grade
      registrationData.age = age ? parseInt(age) : undefined
    } else if (userRole === 'teacher') {
      registrationData.subject = subject
      registrationData.className = className
    }

    const result = await dispatch(register(registrationData))
    if (register.fulfilled.match(result)) {
      const redirectPath = getRedirectPath(result.payload.user.role)
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
            <CardTitle className="text-2xl">{t("auth_create_account_title")}</CardTitle>
            <CardDescription>{t("auth_create_account_desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label>{t("auth_i_am_a")}</Label>
                <RadioGroup value={userRole} onValueChange={setUserRole}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="font-normal cursor-pointer">
                      {t("role_student")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent" className="font-normal cursor-pointer">
                      {t("role_parent")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher" className="font-normal cursor-pointer">
                      {t("role_teacher")}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{t("auth_fullname")}</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  disabled={isLoading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("auth_email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth_password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Student-specific fields */}
              {userRole === "student" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="grade">{t("label_grade")}</Label>
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue placeholder={t("placeholder_select_grade")} />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">{t("label_age")}</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder={t("label_age")}
                      min="4"
                      max="18"
                      disabled={isLoading}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Teacher-specific fields */}
              {userRole === "teacher" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("label_subject")}</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue placeholder={t("placeholder_select_subject")} />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="className">{t("label_class_name")}</Label>
                    <Select value={className} onValueChange={setClassName}>
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue placeholder={t("placeholder_select_class")} />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("auth_signup_loading") : t("auth_signup_button")}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t("auth_already_account")}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {t("auth_signin_link")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
