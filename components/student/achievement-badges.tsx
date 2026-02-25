"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Zap, Flame, Target, BookOpen, Award, Loader2 } from "lucide-react"
import { useAppSelector } from "@/lib/store/hooks"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
}

// Icon mapping for achievements from database
const iconMap: Record<string, React.ReactNode> = {
  star: <Star className="w-5 h-5" />,
  flame: <Flame className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  book: <BookOpen className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
}

export function AchievementBadges() {
  const studentState = useAppSelector((state) => state.student)
  const { dashboard, achievements: fetchedAchievements, isLoading } = studentState as any

  // Get achievements from dashboard or fetched achievements
  const earnedAchievements = dashboard?.achievements || fetchedAchievements || []
  
  // Get stats for calculating progress
  const totalTests = dashboard?.totalTests || 0
  const averageScore = dashboard?.averageScore || 0
  const streak = dashboard?.streak || 0

  // Default achievements with progress calculation
  const defaultAchievements: Achievement[] = [
    {
      id: "starter",
      name: "Getting Started",
      description: "Complete your first assessment",
      icon: <Star className="w-5 h-5" />,
      unlocked: totalTests >= 1,
      progress: totalTests >= 1 ? 100 : 0,
    },
    {
      id: "streak",
      name: "On Fire",
      description: "Complete 7 assessments in a row",
      icon: <Flame className="w-5 h-5" />,
      unlocked: streak >= 7,
      progress: Math.min(Math.round((streak / 7) * 100), 100),
    },
    {
      id: "accuracy",
      name: "Sharp Shooter",
      description: "Score 90% accuracy",
      icon: <Target className="w-5 h-5" />,
      unlocked: averageScore >= 90,
      progress: Math.min(Math.round((averageScore / 90) * 100), 100),
    },
    {
      id: "fluency",
      name: "Fluent Speaker",
      description: "Achieve 85% average score",
      icon: <Zap className="w-5 h-5" />,
      unlocked: averageScore >= 85,
      progress: Math.min(Math.round((averageScore / 85) * 100), 100),
    },
    {
      id: "reader",
      name: "Avid Reader",
      description: "Complete 25 assessments",
      icon: <BookOpen className="w-5 h-5" />,
      unlocked: totalTests >= 25,
      progress: Math.min(Math.round((totalTests / 25) * 100), 100),
    },
    {
      id: "champion",
      name: "Reading Champion",
      description: "Average score above 85%",
      icon: <Trophy className="w-5 h-5" />,
      unlocked: averageScore >= 85 && totalTests >= 10,
      progress: totalTests >= 10 ? Math.min(Math.round((averageScore / 85) * 100), 100) : Math.round((totalTests / 10) * 100),
    },
  ]

  // Merge earned achievements from database with defaults
  const achievements = defaultAchievements.map(defaultAch => {
    const earned = earnedAchievements.find((a: any) => a.name === defaultAch.name || a.id === defaultAch.id)
    if (earned) {
      return {
        ...defaultAch,
        unlocked: true,
        icon: iconMap[earned.icon] || defaultAch.icon,
      }
    }
    return defaultAch
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Loading your achievements...</CardDescription>
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
        <CardTitle>Achievements</CardTitle>
        <CardDescription>
          Unlock badges as you progress ({achievements.filter(a => a.unlocked).length}/{achievements.length} unlocked)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30"
                  : "bg-muted border-border opacity-60"
              }`}
            >
              <div className={achievement.unlocked ? "text-primary" : "text-muted-foreground"}>{achievement.icon}</div>
              <div className="text-center">
                <p className="text-xs font-semibold line-clamp-1">{achievement.name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{achievement.description}</p>
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div className="mt-2 w-full">
                    <div className="text-xs text-muted-foreground mb-1">{achievement.progress}%</div>
                    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
