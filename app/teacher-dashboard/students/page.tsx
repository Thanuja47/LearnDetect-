"use client"

import { useState, useEffect } from "react"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { StudentDetailCard } from "@/components/teacher/student-detail-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, Search, Loader2 } from "lucide-react"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchTeacherStudents } from "@/lib/store/slices/teacherSlice"

export default function StudentsPage() {
  const dispatch = useAppDispatch()
  const teacherState = useAppSelector((state) => state.teacher)
  const { students: fetchedStudents, isLoading } = teacherState as any
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    dispatch(fetchTeacherStudents())
  }, [dispatch])

  // Mock data fallback
  const mockStudents = [
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
    {
      name: "Student D",
      id: "STU004",
      score: 68,
      status: "needs-support" as const,
      lastAssessment: "Dec 6, 2024",
      trend: -2,
      progressData: [
        { date: "Nov 24", score: 70 },
        { date: "Dec 1", score: 70 },
        { date: "Dec 6", score: 68 },
      ],
    },
    {
      name: "Student E",
      id: "STU005",
      score: 79,
      status: "on-track" as const,
      lastAssessment: "Dec 8, 2024",
      trend: 3,
      progressData: [
        { date: "Nov 24", score: 76 },
        { date: "Dec 1", score: 78 },
        { date: "Dec 8", score: 79 },
      ],
    },
  ]

  // Helper function to normalize status from backend format
  const normalizeStatus = (status: string): "excellent" | "on-track" | "needs-support" => {
    const statusMap: Record<string, "excellent" | "on-track" | "needs-support"> = {
      'EXCELLENT': 'excellent',
      'ON_TRACK': 'on-track',
      'NEEDS_SUPPORT': 'needs-support',
      'excellent': 'excellent',
      'on-track': 'on-track',
      'needs-support': 'needs-support',
    }
    return statusMap[status] || 'on-track'
  }

  // Transform fetched students to match component expected format
  const transformStudents = (students: any[]) => {
    return students.map((student: any) => ({
      id: student.id,
      name: student.name,
      score: student.score || 0,
      status: normalizeStatus(student.status),
      lastAssessment: student.lastAssessment 
        ? new Date(student.lastAssessment).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'No assessment yet',
      trend: student.trend || 0,
      progressData: student.progressData || [
        { date: 'Week 1', score: Math.max(0, (student.score || 0) - 10) },
        { date: 'Week 2', score: Math.max(0, (student.score || 0) - 5) },
        { date: 'Week 3', score: student.score || 0 },
      ],
    }))
  }

  // Use fetched students or fallback to mock data
  const allStudents = fetchedStudents?.length > 0 
    ? transformStudents(fetchedStudents) 
    : mockStudents

  const filteredStudents = allStudents.filter((student: any) => {
    const matchesSearch = student.name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || student.status === filterStatus
    return matchesSearch && matchesStatus
  })

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
              <h1 className="text-3xl font-bold">Students</h1>
              <p className="text-muted-foreground mt-2">View and manage all students in your class</p>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search students by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["all", "excellent", "on-track", "needs-support"].map((status) => (
                    <Button
                      key={status}
                      variant={filterStatus === status ? "default" : "outline"}
                      onClick={() => setFilterStatus(status)}
                      className="capitalize"
                    >
                      {status === "all" ? "All Students" : status.replace("-", " ")}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Students Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {filteredStudents.length} Student{filteredStudents.length !== 1 ? "s" : ""}
                </h2>
              </div>
              {filteredStudents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStudents.map((student: any) => (
                    <StudentDetailCard key={student.id} {...student} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-12 text-center">
                    <p className="text-muted-foreground">No students found matching your criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
