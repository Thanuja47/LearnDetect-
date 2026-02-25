"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, TrendingUp, Download, Share2 } from "lucide-react"
import type { AssessmentReport } from "./assessment-flow"

interface AssessmentReportDetailProps {
  report: AssessmentReport
}

export function AssessmentReportDetail({ report }: AssessmentReportDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header with metadata */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assessment Report</h2>
          <p className="text-muted-foreground mt-1">
            {report.type.charAt(0).toUpperCase() + report.type.slice(1)} • {report.timestamp.toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" gap-2>
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button variant="outline" size="sm" gap-2>
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Overall Performance</p>
            <div className="text-5xl font-bold text-primary mb-2">{Math.round(report.overallScore)}%</div>
            <p className="text-sm text-muted-foreground">
              {report.overallScore >= 85
                ? "Excellent!"
                : report.overallScore >= 70
                  ? "Good Progress"
                  : "Keep Practicing"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Word Accuracy", value: report.wordAccuracy, icon: CheckCircle },
            { label: "Pronunciation", value: report.pronunciation, icon: CheckCircle },
            { label: "Reading Speed", value: report.readingSpeed, icon: TrendingUp },
            { label: "Fluency", value: report.fluency, icon: CheckCircle },
          ].map((metric) => (
            <div key={metric.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">{metric.label}</span>
                </div>
                <span className="font-bold text-primary">{metric.value}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {report.feedback.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-accent font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Suggestions for Improvement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tips for Improvement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {report.suggestions.map((suggestion, i) => (
            <div key={i} className="flex gap-3 p-3 bg-muted rounded-lg">
              <span className="font-bold text-accent flex-shrink-0">{i + 1}.</span>
              <span className="text-sm">{suggestion}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
