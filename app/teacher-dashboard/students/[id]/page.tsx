"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { ChevronLeft, Loader2, TrendingUp, TrendingDown, Award, BookOpen, Menu, X } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { teacherAPI } from "@/lib/api"

interface StudentData {
  id: string
  name: string
  studentCode?: string
  email?: string
  score: number
  status: string
  trend: number
  grade?: string
  totalTests?: number
  lastAssessment?: string
  isRegisteredStudent?: boolean
}

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.id as string
  
  const [student, setStudent] = useState<StudentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true)
        const response = await teacherAPI.getStudentById(studentId)
        setStudent(response.data.data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch student')
      } finally {
        setIsLoading(false)
      }
    }

    if (studentId) {
      fetchStudent()
    }
  }, [studentId])

  const statusConfig: Record<string, { color: string; label: string }> = {
    excellent: { color: "bg-green-100 text-green-800", label: "Excellent Progress" },
    "on-track": { color: "bg-blue-100 text-blue-800", label: "On Track" },
    "needs-support": { color: "bg-amber-100 text-amber-800", label: "Needs Support" },
    EXCELLENT: { color: "bg-green-100 text-green-800", label: "Excellent Progress" },
    ON_TRACK: { color: "bg-blue-100 text-blue-800", label: "On Track" },
    NEEDS_SUPPORT: { color: "bg-amber-100 text-amber-800", label: "Needs Support" },
  }

  const getStatusConfig = (status: string) => {
    return statusConfig[status] || statusConfig["on-track"]
  }

  // Mock progress data - in real app would come from API
  const progressData = [
    { week: "Week 1", score: Math.max(0, (student?.score || 0) - 15) },
    { week: "Week 2", score: Math.max(0, (student?.score || 0) - 10) },
    { week: "Week 3", score: Math.max(0, (student?.score || 0) - 5) },
    { week: "Week 4", score: student?.score || 0 },
  ]

  const skillsData = [
    { skill: "Pronunciation", score: Math.round((student?.score || 0) * 0.95) },
    { skill: "Fluency", score: Math.round((student?.score || 0) * 1.02) },
    { skill: "Word Recognition", score: Math.round((student?.score || 0) * 1.05) },
    { skill: "Reading Speed", score: Math.round((student?.score || 0) * 0.9) },
    { skill: "Comprehension", score: Math.round((student?.score || 0) * 0.98) },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </main>
        </div>
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">{error || 'Student not found.'}</p>
              <Link href="/teacher-dashboard/students">
                <Button variant="outline" className="mt-4">
                  Back to Students
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusConfig(student.status)

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
        <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Back Button */}
            <Link href="/teacher-dashboard/students">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="w-5 h-5" />
                Back to Students
              </Button>
            </Link>

            {/* Student Header */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{student.name}</h1>
                  <p className="text-muted-foreground mt-1">
                    {student.studentCode || student.email || `ID: ${student.id}`}
                    {student.grade && ` • Grade ${student.grade}`}
                  </p>
                </div>
                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Current Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{student.score}%</div>
                  <Progress value={student.score} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`flex items-center gap-2 text-2xl font-bold ${student.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {student.trend >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                    {student.trend >= 0 ? '+' : ''}{student.trend}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">From last assessment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{student.totalTests || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Total assessments</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Last Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">
                    {student.lastAssessment 
                      ? new Date(student.lastAssessment).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'No assessment yet'
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Progress Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Over Time</CardTitle>
                  <CardDescription>Score history over the last 4 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="var(--color-primary)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-primary)", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skills Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills Breakdown</CardTitle>
                  <CardDescription>Performance across different skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={skillsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis type="number" domain={[0, 100]} stroke="var(--color-muted-foreground)" />
                      <YAxis dataKey="skill" type="category" width={100} stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="score" fill="var(--color-primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Strengths
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Good word recognition skills</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Consistent practice habits</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Improving fluency patterns</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Areas to Focus
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <span className="text-amber-600">⚠</span>
                        <span>Work on pronunciation accuracy</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">⚠</span>
                        <span>Increase reading speed gradually</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">⚠</span>
                        <span>Practice with complex vocabulary</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
