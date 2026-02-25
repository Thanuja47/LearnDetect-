"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Settings, Users, Database, Activity, Loader2, GraduationCap, UserCheck, Shield, TrendingUp } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchAdminDashboard, fetchUsers } from "@/lib/store/slices/adminSlice"

export default function AdminDashboard() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const adminState = useAppSelector((state) => state.admin)
  const { dashboard, users, isLoading } = adminState as any

  // Auth check and data fetching
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    if (user?.role !== 'ADMIN') {
      router.push('/login')
      return
    }

    // Fetch dashboard data
    dispatch(fetchAdminDashboard())
    dispatch(fetchUsers())
  }, [isAuthenticated, user, router, dispatch])

  // Use real data from API
  const stats = dashboard?.stats || {}
  const totalUsers = stats.totalUsers || users?.length || 0
  const totalTeachers = stats.totalTeachers || users?.filter((u: any) => u.role === 'TEACHER').length || 0
  const totalParents = stats.totalParents || users?.filter((u: any) => u.role === 'PARENT').length || 0
  const totalStudents = stats.totalStudents || users?.filter((u: any) => u.role === 'STUDENT').length || 0
  const totalAssessments = stats.totalAssessments || 0
  const recentUsers = stats.recentUsers || 0
  const recentAssessments = stats.recentAssessments || 0

  // Use weekly data from API or fallback
  const weeklyData = dashboard?.weeklyData || [
    { date: "Mon", users: 0, assessments: 0 },
    { date: "Tue", users: 0, assessments: 0 },
    { date: "Wed", users: 0, assessments: 0 },
    { date: "Thu", users: 0, assessments: 0 },
    { date: "Fri", users: 0, assessments: 0 },
    { date: "Sat", users: 0, assessments: 0 },
    { date: "Sun", users: 0, assessments: 0 },
  ]

  // Role distribution for chart
  const roleDistribution = [
    { role: "Teachers", count: totalTeachers },
    { role: "Parents", count: totalParents },
    { role: "Students", count: totalStudents },
  ]

  // Recent users list
  const recentUsersList = users?.slice(0, 5) || []

  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage system settings and monitor platform activity</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+{recentUsers}</span> this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Teachers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTeachers}</div>
              <p className="text-xs text-muted-foreground mt-1">Active educators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAssessments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+{recentAssessments}</span> this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>User registrations and assessments this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} name="Users" />
                  <Line type="monotone" dataKey="assessments" stroke="#82ca9d" strokeWidth={2} name="Assessments" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Role Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown by user role</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={roleDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="role" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users & Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered users</CardDescription>
            </CardHeader>
            <CardContent>
              {recentUsersList.length > 0 ? (
                <div className="space-y-4">
                  {recentUsersList.map((u: any) => (
                    <div key={u.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {u.name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                      <Badge variant={
                        u.role === 'ADMIN' ? 'destructive' :
                          u.role === 'TEACHER' ? 'default' :
                            u.role === 'PARENT' ? 'secondary' : 'outline'
                      }>
                        {u.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No users found</p>
              )}
              <Link href="/admin-dashboard/users">
                <Button variant="outline" className="w-full mt-4">
                  View All Users
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin-dashboard/users">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin-dashboard/doctors">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Activity className="w-4 h-4" />
                  Manage Doctors
                </Button>
              </Link>
              <Link href="/admin-dashboard/settings">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" />
                  System Settings
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Database className="w-4 h-4" />
                Database Backup
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield className="w-4 h-4" />
                Security Audit
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <TrendingUp className="w-4 h-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current platform health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">API Server</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Operational</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Database</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Connected</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">2.3 GB / 10 GB</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Uptime</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">99.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
