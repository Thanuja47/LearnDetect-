"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchReports } from "@/lib/store/slices/parentSlice"

const mockReports = [
  {
    id: "1",
    title: "Monthly Assessment Summary - December",
    child: "Emma Johnson",
    date: "Dec 31, 2024",
    type: "Summary",
  },
  {
    id: "2",
    title: "Detailed Pronunciation Analysis",
    child: "Noah Johnson",
    date: "Dec 29, 2024",
    type: "Detailed",
  },
  {
    id: "3",
    title: "Monthly Assessment Summary - December",
    child: "Sophie Johnson",
    date: "Dec 28, 2024",
    type: "Summary",
  },
  {
    id: "4",
    title: "Quarterly Progress Report",
    child: "Emma Johnson",
    date: "Dec 26, 2024",
    type: "Quarterly",
  },
]

export default function ReportsPage() {
  const dispatch = useAppDispatch()
  const parentState = useAppSelector((state) => state.parent)
  const { reports: fetchedReports, isLoading } = parentState as any

  useEffect(() => {
    dispatch(fetchReports())
  }, [dispatch])

  // Use fetched reports or fallback to mock data
  const reports = fetchedReports?.length > 0 ? fetchedReports : mockReports

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-2">Access and download comprehensive learning reports</p>
      </div>

      <div className="space-y-3">
        {reports.map((report: any) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{report.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      <span>{report.child}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </div>
                      <span>•</span>
                      <span className="font-medium">{report.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/parent-dashboard/reports/${report.id}`}>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </Link>
                  <Button size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
