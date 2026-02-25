"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { StudentDetailCard } from "@/components/teacher/student-detail-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Menu, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchTeacherDashboard, fetchTeacherStudents, fetchSchedules, generateClassReport } from "@/lib/store/slices/teacherSlice"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/providers/language-provider"

export default function TeacherDashboard() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const teacherState = useAppSelector((state) => state.teacher)
  const { dashboard, students, isLoading } = teacherState as any
  const { t } = useLanguage()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toast } = useToast()
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  // Auth check and data fetching
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    if (user?.role !== 'TEACHER') {
      router.push('/login')
      return
    }

    // Fetch dashboard data
    dispatch(fetchTeacherDashboard())
    dispatch(fetchTeacherStudents())
    dispatch(fetchSchedules())
  }, [isAuthenticated, user, router, dispatch])

  // Use fetched data or fallback to mock data
  const stats = dashboard?.stats || {}
  const totalStudents = stats.totalStudents || 0
  const avgScore = stats.avgScore || 0
  const testsThisWeek = stats.testsThisWeek || 0
  const needSupport = stats.needsSupport || 0

  // Get teacher info
  const teacherInfo = dashboard?.teacher || {}
  const teacherClassName = teacherInfo.className || 'Not Set'
  const teacherSubject = teacherInfo.subject || 'Not Set'

  // Mock class data - replaced with real students if available
  const mockClassData = [
    { name: "Student A", score: 85, status: "on-track" },
    { name: "Student B", score: 72, status: "needs-support" },
    { name: "Student C", score: 91, status: "excellent" },
    { name: "Student D", score: 68, status: "needs-support" },
    { name: "Student E", score: 79, status: "on-track" },
  ]

  // Use real students data for chart
  const classData = students?.length > 0
    ? students.slice(0, 10).map((s: any) => ({
      name: s.name || 'Unknown',
      score: s.score || 0,
      status: s.status?.toLowerCase().replace('_', '-') || 'on-track'
    }))
    : mockClassData

  // Use real performance data or fallback
  const mockPerformanceData = [
    { name: "Excellent", value: 1 },
    { name: "On Track", value: 2 },
    { name: "Needs Support", value: 2 },
  ]

  const performanceData = stats.performanceData || mockPerformanceData

  // Transform students for detail cards
  const mockStudentDetailCards = [
    {
      name: "Student A",
      id: "STU001",
      score: 85,
      status: "on-track" as const,
      lastAssessment: "Dec 8, 2024",
      trend: 5,
      progressData: [
        { date: "Nov 24", score: 80 },
        { date: "Dec 1", score: 82 },
        { date: "Dec 8", score: 85 },
      ],
    },
    {
      name: "Student B",
      id: "STU002",
      score: 72,
      status: "needs-support" as const,
      lastAssessment: "Dec 7, 2024",
      trend: -3,
      progressData: [
        { date: "Nov 24", score: 68 },
        { date: "Dec 1", score: 75 },
        { date: "Dec 7", score: 72 },
      ],
    },
    {
      name: "Student C",
      id: "STU003",
      score: 91,
      status: "excellent" as const,
      lastAssessment: "Dec 9, 2024",
      trend: 8,
      progressData: [
        { date: "Nov 24", score: 83 },
        { date: "Dec 1", score: 87 },
        { date: "Dec 9", score: 91 },
      ],
    },
  ]

  // Transform real students to detail card format
  const transformStudentForCard = (student: any) => ({
    name: student.name || 'Unknown',
    id: student.id || student.studentCode || 'N/A',
    score: student.score || 0,
    status: (student.status?.toLowerCase().replace('_', '-') || 'on-track') as "excellent" | "on-track" | "needs-support",
    lastAssessment: student.lastAssessment
      ? new Date(student.lastAssessment).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'No assessment yet',
    trend: student.trend || 0,
    progressData: [
      { date: 'Week 1', score: Math.max(0, (student.score || 0) - 10) },
      { date: 'Week 2', score: Math.max(0, (student.score || 0) - 5) },
      { date: 'Week 3', score: student.score || 0 },
    ],
  })

  const studentDetailCards = students?.length > 0
    ? students.slice(0, 3).map(transformStudentForCard)
    : mockStudentDetailCards

  const handleGenerateReport = async () => {
    try {
      setIsGeneratingReport(true)
      await dispatch(generateClassReport()).unwrap()
      toast({
        title: "Report Generated",
        description: "Class performance report has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate class report.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const COLORS = ["var(--color-accent)", "var(--color-primary)", "var(--color-destructive)"]

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
        <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">{t("teacher_dash_title")}</h1>
              <p className="text-muted-foreground mt-2">{t("teacher_dash_desc")}</p>
              {/* Teacher's Class Info */}
              <div className="flex gap-4 mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                  {t("label_class_prefix")}{teacherClassName}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/10 text-accent">
                  {t("label_subject_prefix")}{teacherSubject}
                </span>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t("dash_total_students")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <p className="text-xs text-muted-foreground mt-1">{t("teacher_in_class")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t("dash_avg_score")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgScore}%</div>
                  <p className="text-xs text-muted-foreground mt-1">{t("teacher_class_avg")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t("dash_tests_week")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{testsThisWeek}</div>
                  <p className="text-xs text-muted-foreground mt-1">{t("teacher_completed")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t("dash_need_support")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{needSupport}</div>
                  <p className="text-xs text-muted-foreground mt-1">{t("teacher_students")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>{t("dash_class_performance")}</CardTitle>
                  <CardDescription>{t("dash_scores_distribution")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={classData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip />
                      <Bar dataKey="score" fill="var(--color-primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dash_performance_summary")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {performanceData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4 text-sm">
                    {performanceData.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                        <span>
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Students */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{t("dash_featured_students")}</h2>
                <Link href="/teacher-dashboard/students">
                  <Button variant="outline">{t("dash_view_all")}</Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {studentDetailCards.map((student: any) => (
                  <StudentDetailCard key={student.id} {...student} />
                ))}
              </div>
            </div>

            {/* Student Details Table */}
            <Card>
              <CardHeader>
                <CardTitle>{t("dash_student_details")}</CardTitle>
                <CardDescription>{t("dash_individual_scores")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classData.map((student: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                          {student.status.replace("-", " ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{student.score}%</p>
                        <Progress value={student.score} className="mt-1 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-12 bg-transparent"
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
              >
                {isGeneratingReport ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("dash_generating")}
                  </>
                ) : (
                  t("dash_generate_report")
                )}
              </Button>
              <Link href="/teacher-dashboard/schedule" className="w-full">
                <Button className="w-full h-12">{t("dash_schedule_assessment")}</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
