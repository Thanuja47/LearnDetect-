"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Minus, Loader2, FileX } from "lucide-react"
import { useAppSelector } from "@/lib/store/hooks"

interface TestResult {
  id: string
  date: string
  type: string
  passage: string
  score: number
  trend: "up" | "down" | "same"
  metrics: {
    accuracy: number
    fluency: number
    speed: number
    comprehension: number
  }
}

export function TestHistory() {
  const studentState = useAppSelector((state) => state.student)
  const { dashboard, isLoading } = studentState as any

  // Transform assessments from dashboard data
  const assessments = dashboard?.assessments || []
  
  const tests: TestResult[] = assessments.map((assessment: any, index: number) => {
    // Calculate trend based on comparison with next assessment
    let trend: "up" | "down" | "same" = "same"
    if (index < assessments.length - 1) {
      const prevScore = assessments[index + 1]?.overallScore || 0
      const currentScore = assessment.overallScore || 0
      if (currentScore > prevScore) trend = "up"
      else if (currentScore < prevScore) trend = "down"
    }

    // Format date
    const date = new Date(assessment.createdAt)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    let dateStr = date.toLocaleDateString()
    if (diffDays === 0) dateStr = "Today"
    else if (diffDays === 1) dateStr = "Yesterday"
    else if (diffDays < 7) dateStr = `${diffDays} days ago`

    return {
      id: assessment.id,
      date: dateStr,
      type: assessment.type || "Assessment",
      passage: assessment.notes || `${assessment.type} Assessment`,
      score: Math.round(assessment.overallScore || 0),
      trend,
      metrics: {
        accuracy: Math.round(assessment.wordAccuracy || 0),
        fluency: Math.round(assessment.fluency || 0),
        speed: Math.round(assessment.readingSpeed || 0),
        comprehension: Math.round(assessment.comprehension || 0),
      }
    }
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
          <CardDescription>Your recent assessments</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Test Results</CardTitle>
        <CardDescription>Your last {tests.length} assessments in detail</CardDescription>
      </CardHeader>
      <CardContent>
        {tests.length > 0 ? (
          <div className="space-y-3">
            {tests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{test.type}</Badge>
                    <span className="text-sm text-muted-foreground">{test.date}</span>
                  </div>
                  <p className="text-sm font-medium">{test.passage}</p>
                  <div className="grid grid-cols-4 gap-2 mt-2 text-xs text-muted-foreground">
                    <div>Accuracy: {test.metrics.accuracy}%</div>
                    <div>Fluency: {test.metrics.fluency}%</div>
                    <div>Speed: {test.metrics.speed}%</div>
                    <div>Comprehension: {test.metrics.comprehension}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{test.score}%</div>
                  </div>
                  <div>
                    {test.trend === "up" && <ArrowUpRight className="w-5 h-5 text-green-500" />}
                    {test.trend === "down" && <ArrowDownRight className="w-5 h-5 text-destructive" />}
                    {test.trend === "same" && <Minus className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileX className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No assessments completed yet</p>
            <p className="text-sm text-muted-foreground">Start your first assessment above!</p>
          </div>
        )}
        {tests.length > 0 && (
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            View All Results
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
