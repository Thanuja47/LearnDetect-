"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, BookOpen, Volume2, Eye, Clock, Calendar, User } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchStudentSchedules } from "@/lib/store/slices/studentSlice"
import { format, isToday, isTomorrow, formatDistanceToNow } from "date-fns"

interface AssessmentSelectorProps {
  onSelectAssessment: (type: string) => void
}

export function AssessmentSelector({ onSelectAssessment }: AssessmentSelectorProps) {
  const dispatch = useAppDispatch()
  const { schedules } = useAppSelector((state) => state.student)

  useEffect(() => {
    dispatch(fetchStudentSchedules())
  }, [dispatch])

  const assessmentTypes = [
    {
      id: "phoneme",
      name: "Phoneme Recognition",
      description: "Identify individual sounds and letters",
      icon: Volume2,
      duration: "3-5 min",
      color: "from-blue-500/10 to-blue-600/10",
    },
    {
      id: "word",
      name: "Word Reading",
      description: "Read and pronounce words correctly",
      icon: BookOpen,
      duration: "5-7 min",
      color: "from-green-500/10 to-green-600/10",
    },
    {
      id: "passage",
      name: "Passage Reading",
      description: "Read complete passages with fluency",
      icon: Mic,
      duration: "8-10 min",
      color: "from-purple-500/10 to-purple-600/10",
    },
    {
      id: "comprehension",
      name: "Reading Comprehension",
      description: "Answer questions about what you read",
      icon: Eye,
      duration: "10-15 min",
      color: "from-orange-500/10 to-orange-600/10",
    },
  ]

  const getTypeIcon = (type: string) => {
    const typeMap: Record<string, any> = {
      phoneme: Volume2,
      word: BookOpen,
      passage: Mic,
      comprehension: Eye,
    }
    return typeMap[type.toLowerCase()] || BookOpen
  }

  const getTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      phoneme: "from-blue-500/10 to-blue-600/10",
      word: "from-green-500/10 to-green-600/10",
      passage: "from-purple-500/10 to-purple-600/10",
      comprehension: "from-orange-500/10 to-orange-600/10",
    }
    return colorMap[type.toLowerCase()] || "from-gray-500/10 to-gray-600/10"
  }

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "MMM d")
  }

  return (
    <div className="space-y-6">
      {/* Scheduled Assessments Section */}
      {schedules && schedules.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Scheduled Assessments</h3>
            <Badge variant="secondary" className="ml-2">{schedules.length}</Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {schedules.map((schedule) => {
              const Icon = getTypeIcon(schedule.type)
              return (
                <Card
                  key={schedule.id}
                  className="hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group border-primary/30 bg-primary/5"
                  onClick={() => onSelectAssessment(schedule.type.toLowerCase())}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeColor(schedule.type)}`}>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="default" className="text-xs">
                          {getDateLabel(schedule.scheduledDate)}
                        </Badge>
                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {schedule.scheduledTime}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-base mt-3">{schedule.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <span className="block capitalize">{schedule.type} Assessment</span>
                      {schedule.teacher && (
                        <span className="flex items-center gap-1 text-xs">
                          <User className="w-3 h-3" />
                          By {schedule.teacher.firstName} {schedule.teacher.lastName}
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectAssessment(schedule.type.toLowerCase())
                      }}
                    >
                      Start Now
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Practice Assessments Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-muted-foreground">Practice Assessments</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {assessmentTypes.map((assessment) => {
            const Icon = assessment.icon
            return (
              <Card
                key={assessment.id}
                className="hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => onSelectAssessment(assessment.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${assessment.color}`}>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {assessment.duration}
                    </span>
                  </div>
                  <CardTitle className="text-base mt-3">{assessment.name}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectAssessment(assessment.id)
                    }}
                  >
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
