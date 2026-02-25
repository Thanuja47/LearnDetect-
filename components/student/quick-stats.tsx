"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Calendar, Target, Zap, Loader2 } from "lucide-react"
import { useAppSelector } from "@/lib/store/hooks"

export function QuickStats() {
  const studentState = useAppSelector((state) => state.student)
  const { dashboard, isLoading } = studentState as any

  // Extract stats from dashboard data
  const totalTests = dashboard?.totalTests || dashboard?.assessments?.length || 0
  const averageScore = dashboard?.averageScore || 0
  const streak = dashboard?.streak || 0
  
  // Calculate best score from assessments
  const bestScore = dashboard?.assessments?.reduce((max: number, a: any) => {
    const score = a.overallScore || 0
    return score > max ? score : max
  }, 0) || 0

  const stats = [
    { label: "Total Tests", value: totalTests, icon: Calendar, color: "text-blue-500" },
    { label: "Average Score", value: Math.round(averageScore), unit: "%", icon: TrendingUp, color: "text-green-500" },
    { label: "Current Streak", value: streak, unit: " days", icon: Zap, color: "text-orange-500" },
    { label: "Best Score", value: Math.round(bestScore), unit: "%", icon: Target, color: "text-purple-500" },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
                {stat.unit && <span className="text-lg">{stat.unit}</span>}
              </div>
              {stat.label === "Average Score" && <Progress value={stat.value} className="mt-2" />}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
