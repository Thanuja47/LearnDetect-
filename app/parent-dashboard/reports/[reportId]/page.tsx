"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParentSidebar } from "@/components/layout/parent-sidebar"
import Link from "next/link"
import { ChevronLeft, Download, Printer as Print } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock report data
const reportData: Record<string, any> = {
  "1": {
    title: "Monthly Assessment Summary - December",
    child: "Emma Johnson",
    date: "Dec 31, 2024",
    type: "Summary",
    status: "Completed",
    duration: "45 minutes",
    overallScore: 82,
    metrics: [
      { name: "Pronunciation", score: 78 },
      { name: "Fluency", score: 82 },
      { name: "Word Recognition", score: 85 },
      { name: "Reading Speed", score: 76 },
      { name: "Comprehension", score: 80 },
    ],
    progressHistory: [
      { week: "W1", score: 75 },
      { week: "W2", score: 76 },
      { week: "W3", score: 79 },
      { week: "W4", score: 82 },
    ],
    detailedAnalysis: {
      strengths: ["Excellent word recognition", "Good fluency", "Consistent improvement"],
      areasToImprove: ["Pronunciation accuracy", "Reading speed", "Complex words"],
      recommendations: ["Practice difficult words daily", "Read more complex passages", "Work on pronunciation"],
    },
  },
}

export default function ReportDetailPage() {
  const params = useParams()
  const reportId = params.reportId as string
  const report = reportData[reportId]

  if (!report) {
    return (
      <div className="md:flex h-screen">
        <ParentSidebar />
        <div className="flex-1 p-6">
          <p className="text-muted-foreground">Report not found.</p>
        </div>
      </div>
    )
  }

  const skillColors = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

  return (
    <div className="md:flex h-screen">
      <ParentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/parent-dashboard/reports">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="w-5 h-5" />
                Back to Reports
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Print className="w-4 h-4" />
                Print
              </Button>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Report Header */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{report.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {report.child} • {report.date}
                  </CardDescription>
                </div>
                <Badge>{report.status}</Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Assessment Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary">{report.overallScore}%</div>
                  <p className="text-muted-foreground mt-2">Out of 100 points</p>
                  <p className="text-sm text-muted-foreground mt-1">Duration: {report.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>Performance across different dimensions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={report.metrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Progress History */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Score trend this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={report.progressHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.detailedAnalysis.strengths.map((strength: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Areas to Improve</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.detailedAnalysis.areasToImprove.map((area: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-amber-600 font-bold mt-1">!</span>
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Suggested next steps for continued improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report.detailedAnalysis.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                    <span className="text-accent font-semibold">→</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
