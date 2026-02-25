"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChildCard } from "@/components/parent/child-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchChildren } from "@/lib/store/slices/parentSlice"

// Mock children data (fallback)
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
  {
    id: 3,
    name: "Sophie Johnson",
    age: 7,
    grade: "1st",
    progress: 65,
    testsCompleted: 8,
    status: "needs-support" as const,
    lastAssessment: "Dec 26, 2024",
    averageScore: 71,
  },
]

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth: string): number => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export default function ChildrenPage() {
  const dispatch = useAppDispatch()
  const parentState = useAppSelector((state) => state.parent)
  const { children: fetchedChildren, isLoading } = parentState as any
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  useEffect(() => {
    dispatch(fetchChildren())
  }, [dispatch])

  // Use fetched children or fallback to mock data
  const childrenData = fetchedChildren?.length > 0 ? fetchedChildren : mockChildrenData

  const filteredChildren = childrenData.filter((child: any) => {
    if (!child) return false
    // Get name from either name field or firstName/lastName combination
    const childName = child.name || `${child.firstName || ''} ${child.lastName || ''}`.trim()
    if (!childName) return false
    const matchesSearch = childName.toLowerCase().includes(searchQuery.toLowerCase())
    const childStatus = child.status?.toLowerCase?.() || ''
    if (selectedTab === "all") return matchesSearch
    if (selectedTab === "excellent") return matchesSearch && (childStatus === "excellent" || childStatus === "excellent_progress")
    if (selectedTab === "on-track") return matchesSearch && (childStatus === "on-track" || childStatus === "on_track")
    if (selectedTab === "needs-support") return matchesSearch && (childStatus === "needs-support" || childStatus === "needs_support")
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Children</h1>
        <p className="text-muted-foreground mt-2">Manage and monitor your children's learning progress</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search children by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link href="/parent-dashboard/children/add">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Add Child
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Children</TabsTrigger>
          <TabsTrigger value="excellent">Excellent</TabsTrigger>
          <TabsTrigger value="on-track">On Track</TabsTrigger>
          <TabsTrigger value="needs-support">Needs Support</TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={selectedTab} className="space-y-4">
          {filteredChildren.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChildren.map((child: any) => (
                <ChildCard 
                  key={child.id} 
                  id={child.id}
                  name={child.name || `${child.firstName || ''} ${child.lastName || ''}`.trim() || 'Unknown'}
                  age={child.age || (child.dateOfBirth ? calculateAge(child.dateOfBirth) : undefined)}
                  grade={child.grade}
                  progress={child.progress || 0}
                  testsCompleted={child.testsCompleted || 0}
                  status={child.status}
                  lastAssessment={child.lastAssessment}
                  averageScore={child.averageScore || 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No children found matching your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
