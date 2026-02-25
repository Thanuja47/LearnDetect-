"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Phone, Mail, FileText, Eye } from "lucide-react"

interface ChildDetailModalProps {
  childId: number | string
  name: string
  age: number
  grade: string
}

// Mock data for charts
const scoreHistory = [
  { date: "Dec 1", score: 72 },
  { date: "Dec 8", score: 75 },
  { date: "Dec 15", score: 78 },
  { date: "Dec 22", score: 76 },
  { date: "Dec 29", score: 82 },
]

const skillsData = [
  { skill: "Pronunciation", score: 78 },
  { skill: "Fluency", score: 82 },
  { skill: "Word Recognition", score: 85 },
  { skill: "Reading Speed", score: 76 },
  { skill: "Comprehension", score: 80 },
]

export function ChildDetailModal({ childId, name, age, grade }: ChildDetailModalProps) {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-muted-foreground mt-1">
              Age {age} • Grade {grade}
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800">Active</Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground mt-1">Up from 78% last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Assessments Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1">In the last 3 months</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">79%</div>
                <p className="text-xs text-muted-foreground mt-1">Across all skills</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Strengths & Areas to Improve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Strengths
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Strong word recognition (85%)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Good fluency patterns</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Consistent practice</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Areas to Improve
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-amber-600">⚠</span>
                      <span>Pronunciation accuracy (76%)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">⚠</span>
                      <span>Reading speed could be faster</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">⚠</span>
                      <span>Work on complex words</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Score History</CardTitle>
              <CardDescription>Last 5 assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis stroke="var(--color-muted-foreground)" dataKey="date" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-primary)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Performance across different skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    stroke="var(--color-muted-foreground)"
                    dataKey="skill"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip />
                  <Bar dataKey="score" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Reports</CardTitle>
              <CardDescription>Download detailed reports from recent assessments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { date: "Dec 29, 2024", type: "Full Assessment", status: "Completed" },
                { date: "Dec 22, 2024", type: "Pronunciation Test", status: "Completed" },
                { date: "Dec 15, 2024", type: "Full Assessment", status: "Completed" },
              ].map((report, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{report.type}</p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start gap-3 bg-transparent">
              <Phone className="w-5 h-5" />
              Contact Teacher
            </Button>
            <Button variant="outline" className="justify-start gap-3 bg-transparent">
              <Mail className="w-5 h-5" />
              Message Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
