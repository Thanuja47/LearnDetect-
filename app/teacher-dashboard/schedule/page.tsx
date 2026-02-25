"use client"

import { useState, useEffect } from "react"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { ScheduleForm, type ScheduleData } from "@/components/teacher/schedule-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { BookOpen, Calendar, Clock, Users, Loader2, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchSchedules, fetchTeacherStudents, createSchedule, deleteSchedule, updateSchedule } from "@/lib/store/slices/teacherSlice"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EditFormData {
  id: string
  date: string
  time: string
  duration: number
  type: string
  notes: string
  studentIds: string[]
}

export default function ScheduleAssessmentPage() {
  const dispatch = useAppDispatch()
  const teacherState = useAppSelector((state) => state.teacher)
  const { schedules: fetchedSchedules, students: fetchedStudents, isLoading } = teacherState as any
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editData, setEditData] = useState<EditFormData | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    dispatch(fetchSchedules())
    dispatch(fetchTeacherStudents())
  }, [dispatch])

  // Use fetched students for the form
  const students = fetchedStudents?.length > 0 
    ? fetchedStudents.map((s: any) => ({ id: s.id, name: s.name }))
    : []

  // Use fetched schedules from database
  const scheduledAssessments = fetchedSchedules || []

  const handleSchedule = async (data: ScheduleData) => {
    setIsSubmitting(true)
    try {
      const result = await dispatch(createSchedule({
        date: data.date,
        time: data.time,
        duration: data.duration,
        studentIds: data.students,
        type: data.type,
        notes: data.notes,
      }))

      if (createSchedule.fulfilled.match(result)) {
        toast.success("Assessment scheduled successfully!")
        // Refresh schedules from database
        dispatch(fetchSchedules())
      } else {
        toast.error("Failed to schedule assessment")
      }
    } catch (error) {
      toast.error("Failed to schedule assessment")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (assessment: any) => {
    // Format date for input field (YYYY-MM-DD)
    const dateObj = new Date(assessment.date)
    const formattedDate = dateObj.toISOString().split('T')[0]
    
    setEditData({
      id: assessment.id,
      date: formattedDate,
      time: assessment.time,
      duration: assessment.duration,
      type: assessment.type.toLowerCase(),
      notes: assessment.notes || "",
      studentIds: assessment.studentIds || [],
    })
  }

  const handleUpdate = async () => {
    if (!editData) return
    
    setIsUpdating(true)
    try {
      const result = await dispatch(updateSchedule({
        id: editData.id,
        data: {
          date: editData.date,
          time: editData.time,
          duration: editData.duration,
          type: editData.type,
          notes: editData.notes,
          studentIds: editData.studentIds,
        }
      }))
      
      if (updateSchedule.fulfilled.match(result)) {
        toast.success("Schedule updated successfully")
        dispatch(fetchSchedules())
        setEditData(null)
      } else {
        toast.error("Failed to update schedule")
      }
    } catch (error) {
      toast.error("Failed to update schedule")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    
    setIsDeleting(true)
    try {
      const result = await dispatch(deleteSchedule(deleteId))
      if (deleteSchedule.fulfilled.match(result)) {
        toast.success("Schedule deleted successfully")
        dispatch(fetchSchedules())
      } else {
        toast.error("Failed to delete schedule")
      }
    } catch (error) {
      toast.error("Failed to delete schedule")
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const toggleStudentSelection = (studentId: string) => {
    if (!editData) return
    const newStudentIds = editData.studentIds.includes(studentId)
      ? editData.studentIds.filter(id => id !== studentId)
      : [...editData.studentIds, studentId]
    setEditData({ ...editData, studentIds: newStudentIds })
  }

  const getStudentNames = (studentIds: string[]) => {
    if (!studentIds || studentIds.length === 0) return "No students selected"
    return students
      .filter((s: any) => studentIds.includes(s.id))
      .map((s: any) => s.name)
      .join(", ") || `${studentIds.length} student(s)`
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      phoneme: "Phoneme",
      word: "Word",
      passage: "Passage",
      PHONEME: "Phoneme",
      WORD: "Word",
      PASSAGE: "Passage",
      COMPREHENSION: "Comprehension",
    }
    return labels[type] || type
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Schedule Assessment</h1>
              <p className="text-muted-foreground mt-2">Plan and schedule reading assessments for your students</p>
            </div>

            {/* Schedule Form */}
            <ScheduleForm students={students} onSchedule={handleSchedule} />

            {/* Scheduled Assessments */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Upcoming Assessments</h2>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : scheduledAssessments.length > 0 ? (
                <div className="grid gap-4">
                  {scheduledAssessments.map((assessment: any) => (
                    <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {/* Header Row */}
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{getTypeLabel(assessment.type)} Assessment</h3>
                              <p className="text-sm text-muted-foreground mt-1">{assessment.notes || "No notes"}</p>
                            </div>
                            <Badge variant="secondary">{getTypeLabel(assessment.type)}</Badge>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="font-medium">{formatDate(assessment.date)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Time</p>
                                <p className="font-medium">{formatTime(assessment.time)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Duration</p>
                                <p className="font-medium">{assessment.duration} min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Students</p>
                                <p className="font-medium">{assessment.studentIds?.length || 0}</p>
                              </div>
                            </div>
                          </div>

                          {/* Students List */}
                          <div className="pt-2 border-t border-border">
                            <p className="text-sm font-medium mb-2">Selected Students</p>
                            <p className="text-sm text-muted-foreground">{getStudentNames(assessment.studentIds || [])}</p>
                          </div>

                          {/* Action */}
                          <div className="flex gap-2 pt-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="gap-1"
                              onClick={() => handleEdit(assessment)}
                            >
                              <Pencil className="w-3 h-3" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-destructive bg-transparent gap-1"
                              onClick={() => setDeleteId(assessment.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-12 text-center">
                    <p className="text-muted-foreground">
                      No assessments scheduled yet. Create one above to get started!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Assessment?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this scheduled assessment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Cancel Assessment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
