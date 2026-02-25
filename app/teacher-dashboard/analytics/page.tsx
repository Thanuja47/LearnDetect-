"use client"

import { useState, useEffect } from "react"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X, BookOpen, TrendingUp, Users, Award, BarChart3, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchTeacherStudents, fetchSchedules } from "@/lib/store/slices/teacherSlice"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"]

export default function AnalyticsPage() {
  const dispatch = useAppDispatch()
  const teacherState = useAppSelector((state) => state.teacher)
  const { students, schedules, isLoading } = teacherState as any
  
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchTeacherStudents())
    dispatch(fetchSchedules())
  }, [dispatch])

  // Calculate analytics data
  const totalStudents = students?.length || 0
  const totalSchedules = schedules?.length || 0
  
  // Assessment type distribution
  const assessmentTypeData = schedules?.reduce((acc: any[], schedule: any) => {
    const type = schedule.type || "Unknown"
    const existing = acc.find(item => item.name === type)
    if (existing) {
      existing.value += 1
    } else {
      acc.push({ name: type, value: 1 })
    }
    return acc
  }, []) || []

  // Monthly schedule data (mock for demo)
  const monthlyData = [
    { month: "Jan", assessments: 4 },
    { month: "Feb", assessments: 6 },
    { month: "Mar", assessments: 8 },
    { month: "Apr", assessments: 5 },
    { month: "May", assessments: 10 },
    { month: "Jun", assessments: 7 },
  ]

  // Student performance data (mock for demo)
  const performanceData = [
    { category: "Phoneme", avgScore: 75 },
    { category: "Word", avgScore: 82 },
    { category: "Passage", avgScore: 68 },
    { category: "Comprehension", avgScore: 71 },
  ]

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
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Track student progress and assessment performance
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Students</p>
                          <p className="text-2xl font-bold">{totalStudents}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Assessments Scheduled</p>
                          <p className="text-2xl font-bold">{totalSchedules}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avg. Progress</p>
                          <p className="text-2xl font-bold">74%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                          <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completion Rate</p>
                          <p className="text-2xl font-bold">85%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance by Category */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Category</CardTitle>
                      <CardDescription>Average scores across assessment types</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="avgScore" fill="#8884d8" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assessment Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Assessment Distribution</CardTitle>
                      <CardDescription>Breakdown by assessment type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {assessmentTypeData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={assessmentTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {assessmentTypeData.map((entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            No assessment data available
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Monthly Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Assessment Trend</CardTitle>
                    <CardDescription>Number of assessments scheduled per month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="assessments" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Scheduled Assessments</CardTitle>
                    <CardDescription>Latest assessment schedules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {schedules && schedules.length > 0 ? (
                      <div className="space-y-4">
                        {schedules.slice(0, 5).map((schedule: any) => (
                          <div 
                            key={schedule.id} 
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <BookOpen className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{schedule.type} Assessment</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(schedule.date).toLocaleDateString()} at {schedule.time}
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary">
                              {schedule.studentIds?.length || 0} students
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No assessments scheduled yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
