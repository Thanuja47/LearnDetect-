"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, Award } from "lucide-react"

interface ChildCardProps {
  id: number | string
  name: string
  age?: number
  grade?: string
  progress?: number
  testsCompleted?: number
  status?: string
  lastAssessment?: string
  averageScore?: number
}

const statusConfig: Record<string, { color: string; label: string }> = {
  excellent: { color: "bg-green-100 text-green-800", label: "Excellent Progress" },
  "on-track": { color: "bg-blue-100 text-blue-800", label: "On Track" },
  "needs-support": { color: "bg-amber-100 text-amber-800", label: "Needs Support" },
  // Handle API response formats (uppercase/different naming)
  EXCELLENT: { color: "bg-green-100 text-green-800", label: "Excellent Progress" },
  ON_TRACK: { color: "bg-blue-100 text-blue-800", label: "On Track" },
  NEEDS_SUPPORT: { color: "bg-amber-100 text-amber-800", label: "Needs Support" },
}

const defaultConfig = { color: "bg-gray-100 text-gray-800", label: "Unknown" }

export function ChildCard({
  id,
  name,
  age = 0,
  grade = "N/A",
  progress = 0,
  testsCompleted = 0,
  status,
  lastAssessment = "N/A",
  averageScore = 0,
}: ChildCardProps) {
  const config = status ? (statusConfig[status] || defaultConfig) : defaultConfig

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>
              {age ? `Age ${age} • ` : ""}Grade {grade}
            </CardDescription>
          </div>
          <Badge className={config.color}>{config.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-2xl font-bold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-lg font-semibold">{averageScore}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Avg Score</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-lg font-semibold">{testsCompleted}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tests Done</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-lg font-semibold">+5%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">This Month</p>
          </div>
        </div>

        {/* Info */}
        <div className="text-sm">
          <p className="text-muted-foreground">
            <span className="font-medium">Last Assessment:</span> {lastAssessment}
          </p>
        </div>

        {/* Actions */}
        <Link href={`/parent-dashboard/children/${id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
