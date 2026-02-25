"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useAppSelector } from "@/lib/store/hooks"

interface ProgressChartProps {
  type?: "line" | "bar"
}

export function ProgressChart({ type = "line" }: ProgressChartProps) {
  const studentState = useAppSelector((state) => state.student)
  const { dashboard, progress, isLoading } = studentState as any

  // Transform assessments data for chart
  const assessments = dashboard?.assessments || []
  
  // Group assessments by week or use recent ones
  const chartData = assessments.slice().reverse().map((assessment: any, index: number) => {
    const date = new Date(assessment.createdAt)
    return {
      week: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      accuracy: Math.round(assessment.wordAccuracy || 0),
      fluency: Math.round(assessment.fluency || 0),
      speed: Math.round(assessment.readingSpeed || 0),
      comprehension: Math.round(assessment.comprehension || 0),
    }
  })

  // Use default data if no assessments
  const data = chartData.length > 0 ? chartData : [
    { week: "No Data", accuracy: 0, fluency: 0, speed: 0, comprehension: 0 },
  ]

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Loading your progress data...</CardDescription>
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
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>
          {chartData.length > 0 
            ? "Track your improvement across all skills"
            : "Complete assessments to see your progress"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {type === "line" ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Accuracy" />
              <Line type="monotone" dataKey="fluency" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Fluency" />
              <Line type="monotone" dataKey="speed" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Speed" />
              <Line type="monotone" dataKey="comprehension" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Comprehension" />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="hsl(var(--chart-1))" name="Accuracy" />
              <Bar dataKey="fluency" fill="hsl(var(--chart-2))" name="Fluency" />
              <Bar dataKey="speed" fill="hsl(var(--chart-3))" name="Speed" />
              <Bar dataKey="comprehension" fill="hsl(var(--chart-4))" name="Comprehension" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
