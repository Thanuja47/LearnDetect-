"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AssessmentSelector } from "@/components/student/assessment-selector"
import { ProgressChart } from "@/components/student/progress-chart"
import { AchievementBadges } from "@/components/student/achievement-badges"
import { TestHistory } from "@/components/student/test-history"
import { QuickStats } from "@/components/student/quick-stats"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AssessmentFlow } from "@/components/student/assessment-flow"
import type { AssessmentReport } from "@/components/student/assessment-flow"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchDashboard, fetchProgress, fetchAchievements } from "@/lib/store/slices/studentSlice"

export default function StudentDashboard() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const studentState = useAppSelector((state) => state.student)
  const { dashboard, progress, achievements, isLoading } = studentState as any
  
  const [activeView, setActiveView] = useState<"dashboard" | "assessment">("dashboard")
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)
  const [completedReport, setCompletedReport] = useState<AssessmentReport | null>(null)

  // Auth check and data fetching
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    if (user?.role !== 'STUDENT') {
      router.push('/login')
      return
    }
    
    // Fetch dashboard data
    dispatch(fetchDashboard())
    dispatch(fetchProgress())
    dispatch(fetchAchievements())
  }, [isAuthenticated, user, router, dispatch])

  const handleSelectAssessment = (type: string) => {
    setSelectedAssessment(type)
    setActiveView("assessment")
  }

  const handleAssessmentComplete = (report: AssessmentReport) => {
    setCompletedReport(report)
    // Refresh dashboard data after assessment completion
    dispatch(fetchDashboard())
  }

  // Calculate skills data from dashboard
  const assessments = dashboard?.assessments || []
  const latestAssessment = assessments[0] || {}
  
  const skillsData = [
    { skill: "Word Accuracy", value: Math.round(latestAssessment.wordAccuracy || 0), target: 90 },
    { skill: "Pronunciation", value: Math.round(latestAssessment.pronunciation || 0), target: 85 },
    { skill: "Reading Speed", value: Math.round(latestAssessment.readingSpeed || 0), target: 90 },
    { skill: "Fluency", value: Math.round(latestAssessment.fluency || 0), target: 85 },
    { skill: "Comprehension", value: Math.round(latestAssessment.comprehension || 0), target: 85 },
  ]

  // Dynamic alert message based on user stats
  const streak = dashboard?.streak || 0
  const totalTests = dashboard?.totalTests || 0
  const averageScore = dashboard?.averageScore || 0

  const getAlertMessage = () => {
    if (totalTests === 0) {
      return "Welcome! Start your first assessment to begin tracking your reading progress."
    }
    if (streak >= 7) {
      return `Amazing! You're on a ${streak}-day streak! Keep up the great work!`
    }
    if (averageScore >= 85) {
      return `Excellent performance! Your average score is ${Math.round(averageScore)}%. You're doing great!`
    }
    if (streak > 0) {
      return `You're on a ${streak}-day streak! Complete ${7 - streak} more days to unlock the "On Fire" badge.`
    }
    return "Keep practicing! Regular assessments help improve your reading skills."
  }

  if (activeView === "assessment" && selectedAssessment) {
    return (
      <DashboardLayout userRole="student">
        <AssessmentFlow
          assessmentType={selectedAssessment}
          onComplete={handleAssessmentComplete}
          onBack={() => {
            setActiveView("dashboard")
            setSelectedAssessment(null)
          }}
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Welcome Back, {user?.name || 'Student'}!</h1>
          <p className="text-muted-foreground mt-2">Keep up your reading practice. You're doing great!</p>
        </div>

        {/* Alert for encouragement */}
        <Alert className="border-accent/30 bg-accent/5">
          <BookOpen className="h-4 w-4" />
          <AlertDescription>
            {getAlertMessage()}
          </AlertDescription>
        </Alert>

        {/* Quick Stats */}
        <QuickStats />

        {/* Tabs for organized content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Assessment Selector */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Start a New Assessment</CardTitle>
                <CardDescription>Choose the type of reading assessment that works best for you</CardDescription>
              </CardHeader>
              <CardContent>
                <AssessmentSelector onSelectAssessment={handleSelectAssessment} />
              </CardContent>
            </Card>

            {/* Recent Results */}
            <TestHistory />
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <ProgressChart type="line" />
            <Card>
              <CardHeader>
                <CardTitle>Skills Breakdown</CardTitle>
                <CardDescription>
                  {assessments.length > 0 
                    ? "Your latest assessment performance by skill"
                    : "Complete an assessment to see your skills breakdown"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData.map((item) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.skill}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.value}% / {item.target}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            item.value >= item.target 
                              ? "bg-green-500" 
                              : "bg-gradient-to-r from-primary to-accent"
                          }`}
                          style={{ width: `${Math.min(item.value, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <AchievementBadges />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
