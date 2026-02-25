"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChevronRight, TrendingUp } from "lucide-react"
import Link from "next/link"

interface StudentDetailProps {
  name: string
  id: string
  score?: number
  status?: "excellent" | "on-track" | "needs-support" | string
  lastAssessment?: string
  trend?: number
  progressData?: Array<{ date: string; score: number }>
}

const statusColors: Record<string, string> = {
  excellent: "bg-accent text-accent-foreground",
  "on-track": "bg-primary text-primary-foreground",
  "needs-support": "bg-destructive text-destructive-foreground",
}

const statusLabels: Record<string, string> = {
  excellent: "Excellent",
  "on-track": "On Track",
  "needs-support": "Needs Support",
}

const defaultProgressData = [
  { date: "Week 1", score: 70 },
  { date: "Week 2", score: 75 },
  { date: "Week 3", score: 80 },
]

export function StudentDetailCard({
  name,
  id,
  score = 0,
  status = "on-track",
  lastAssessment = "N/A",
  trend = 0,
  progressData = defaultProgressData,
}: StudentDetailProps) {
  const normalizedStatus = status?.toLowerCase().replace('_', '-') || 'on-track'
  const badgeColor = statusColors[normalizedStatus] || statusColors["on-track"]
  const badgeLabel = statusLabels[normalizedStatus] || "On Track"

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription>Student ID: {id}</CardDescription>
          </div>
          <Badge className={badgeColor}>{badgeLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {/* Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current Score</span>
            <span className="text-2xl font-bold">{score}%</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>

        {/* Trend */}
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <TrendingUp className={`w-4 h-4 ${trend > 0 ? "text-accent" : "text-destructive"}`} />
          <span className="text-sm">
            {trend > 0 ? "+" : ""}
            {trend}% from last assessment
          </span>
        </div>

        {/* Last Assessment */}
        <div className="text-sm space-y-1">
          <p className="text-muted-foreground">Last Assessment</p>
          <p className="font-medium">{lastAssessment}</p>
        </div>

        {/* Progress Chart */}
        <div className="h-32 -mx-4 -mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      {/* Action */}
      <div className="px-6 pb-6">
        <Link href={`/teacher-dashboard/students/${id}`}>
          <Button className="w-full gap-2 bg-transparent" variant="outline">
            View Full Profile
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
