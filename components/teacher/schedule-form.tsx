"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

interface Student {
  id: string
  name: string
  selected?: boolean
}

interface ScheduleFormProps {
  students: Student[]
  onSchedule?: (data: ScheduleData) => void
}

export interface ScheduleData {
  date: string
  time: string
  duration: number
  students: string[]
  type: string
  notes: string
}

export function ScheduleForm({ students, onSchedule }: ScheduleFormProps) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("30")
  const [type, setType] = useState("phoneme")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSchedule) {
      onSchedule({
        date,
        time,
        duration: Number.parseInt(duration),
        students: selectedStudents,
        type,
        notes,
      })
    }
    setSubmitted(true)
    // Reset form after successful submission
    setTimeout(() => {
      setSubmitted(false)
      setSelectedStudents([])
      setDate("")
      setTime("")
      setDuration("30")
      setType("phoneme")
      setNotes("")
    }, 2000)
  }

  const isFormValid = selectedStudents.length > 0 && date && time

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Assessment</CardTitle>
        <CardDescription>Plan reading assessments for your students</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Assessment Type */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Assessment Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {["phoneme", "word", "passage"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`p-3 rounded-lg border-2 transition-all text-left capitalize ${
                    type === t ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="font-medium">{t}</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t === "phoneme" && "Basic sound recognition"}
                    {t === "word" && "Word reading fluency"}
                    {t === "passage" && "Full passage analysis"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes for this assessment..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background resize-none h-24"
            />
          </div>

          {/* Student Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Select Students</Label>
              <span className="text-sm text-muted-foreground">{selectedStudents.length} selected</span>
            </div>
            {students.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {students.map((student) => (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => handleStudentToggle(student.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                      selectedStudents.includes(student.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedStudents.includes(student.id) ? "bg-primary border-primary" : "border-border"
                      }`}
                    >
                      {selectedStudents.includes(student.id) && (
                        <span className="text-primary-foreground text-xs">✓</span>
                      )}
                    </div>
                    <span className="font-medium flex-1">{student.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground">
                <p>No students in your class yet.</p>
                <p className="text-sm mt-1">Students will appear here when they register with your class/grade.</p>
              </div>
            )}
          </div>

          {/* Validation Messages */}
          {selectedStudents.length === 0 && (
            <div className="flex gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Please select at least one student</span>
            </div>
          )}

          {/* Success Message */}
          {submitted && (
            <div className="flex gap-2 p-3 bg-accent/10 text-accent rounded-lg text-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Assessment scheduled successfully!</span>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full gap-2 h-12" disabled={!isFormValid || submitted}>
            <Clock className="w-4 h-4" />
            Schedule Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
