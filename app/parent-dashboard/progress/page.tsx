"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const monthlyProgress = [
  { month: "Oct", Emma: 60, Noah: 68, Sophie: 45 },
  { month: "Nov", Emma: 72, Noah: 75, Sophie: 58 },
  { month: "Dec", Emma: 82, Noah: 78, Sophie: 65 },
]

const skillComparison = [
  { skill: "Pronunciation", Emma: 80, Noah: 82, Sophie: 70 },
  { skill: "Fluency", Emma: 85, Noah: 80, Sophie: 72 },
  { skill: "Word Recognition", Emma: 88, Noah: 85, Sophie: 68 },
  { skill: "Reading Speed", Emma: 78, Noah: 76, Sophie: 62 },
]

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress Tracking</h1>
        <p className="text-muted-foreground mt-2">View detailed progress analytics for all your children</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Comparison</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
              <CardDescription>Average scores across all children</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis stroke="var(--color-muted-foreground)" dataKey="month" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Emma" stroke="var(--color-primary)" strokeWidth={2} />
                  <Line type="monotone" dataKey="Noah" stroke="var(--color-accent)" strokeWidth={2} />
                  <Line type="monotone" dataKey="Sophie" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills Comparison</CardTitle>
              <CardDescription>Performance across different learning skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={skillComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis stroke="var(--color-muted-foreground)" dataKey="skill" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Emma" fill="var(--color-primary)" />
                  <Bar dataKey="Noah" fill="var(--color-accent)" />
                  <Bar dataKey="Sophie" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">35</div>
                <p className="text-sm text-muted-foreground mt-2">Across 3 children this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">75%</div>
                <p className="text-sm text-muted-foreground mt-2">Up from 68% last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Improvement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">+7%</div>
                <p className="text-sm text-muted-foreground mt-2">Month over month growth</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Children</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">3</div>
                <p className="text-sm text-muted-foreground mt-2">All actively learning</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
