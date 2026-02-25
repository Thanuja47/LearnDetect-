"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChildCard } from "@/components/parent/child-card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, AlertCircle, Plus, Loader2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchParentDashboard, fetchChildren } from "@/lib/store/slices/parentSlice"

import { useLanguage } from "@/components/providers/language-provider"

// Mock children data for dashboard preview (fallback when no data)
const mockChildrenData = [
  {
    id: 1,
    name: "Emma Johnson",
    age: 8,
    grade: "2nd",
    progress: 85,
    testsCompleted: 12,
    status: "excellent" as const,
    lastAssessment: "Dec 27, 2024",
    averageScore: 82,
  },
  {
    id: 2,
    name: "Noah Johnson",
    age: 10,
    grade: "4th",
    progress: 72,
    testsCompleted: 15,
    status: "on-track" as const,
    lastAssessment: "Dec 25, 2024",
    averageScore: 78,
  },
]

const scoreData = [
  { month: "Jan", Emma: 65, Noah: 70 },
  { month: "Feb", Emma: 68, Noah: 75 },
  { month: "Mar", Emma: 72, Noah: 78 },
  { month: "Apr", Emma: 75, Noah: 82 },
]

export default function ParentDashboard() {
  const { t } = useLanguage()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const parentState = useAppSelector((state) => state.parent)
  const { dashboard, children, isLoading } = parentState as any

  // Auth check and data fetching
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    if (user?.role !== 'PARENT') {
      router.push('/login')
      return
    }

    // Fetch dashboard data
    dispatch(fetchParentDashboard())
    dispatch(fetchChildren())
  }, [isAuthenticated, user, router, dispatch])

  // Use fetched children or fallback to mock data
  const childrenData = children?.length > 0 ? children : mockChildrenData
  const totalChildren = dashboard?.totalChildren || childrenData.length
  const totalAssessments = dashboard?.totalAssessments || 27
  const avgProgress = dashboard?.averageProgress || 78

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("parent_dash_title")}</h1>
        <p className="text-muted-foreground mt-2">{t("parent_dash_desc")}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{t("parent_total_children")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalChildren}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("parent_active_learners")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{t("parent_this_month")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAssessments}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("parent_assessments_completed")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{t("parent_avg_progress")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgProgress}%</div>
            <p className="text-xs text-muted-foreground mt-1">{t("parent_across_children")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t("parent_your_children")}</h2>
          <Link href="/parent-dashboard/children/add">
            <Button className="gap-2">
              <Plus className="w-5 h-5" />
              {t("parent_add_child")}
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {childrenData.map((child: any) => (
            <ChildCard key={child.id} {...child} />
          ))}
        </div>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("parent_progress_time")}</CardTitle>
          <CardDescription>{t("parent_progress_desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Emma" stroke="var(--color-primary)" strokeWidth={2} />
              <Line type="monotone" dataKey="Noah" stroke="var(--color-accent)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              {t("parent_strengths")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Strong word recognition improving</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Consistent practice maintaining</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Reading speed progressing well</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              {t("parent_areas_focus")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Pronunciation accuracy needs attention</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Hesitation patterns to monitor</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Suggest more practice with complex words</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
