"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Mic, Brain, BarChart3, FileText, CheckCircle, Play } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Child Selects Test",
    description: "Choose from multiple assessment types to begin",
    icon: Play,
  },
  {
    number: 2,
    title: "System Displays Content",
    description: "Words, sentences, or passages appear on screen",
    icon: FileText,
  },
  {
    number: 3,
    title: "Child Reads Aloud",
    description: "Student reads into microphone with clear audio capture",
    icon: Mic,
  },
  {
    number: 4,
    title: "Speech Recognition",
    description: "Audio converts to text using Google Web Speech API",
    icon: Brain,
  },
  {
    number: 5,
    title: "AI Analysis",
    description: "Machine learning identifies patterns and metrics",
    icon: Brain,
  },
  {
    number: 6,
    title: "Generate Scores",
    description: "Detailed performance metrics and difficulty indicators",
    icon: BarChart3,
  },
  {
    number: 7,
    title: "Create Report",
    description: "Comprehensive assessment report auto-generated",
    icon: FileText,
  },
  {
    number: 8,
    title: "View Dashboard",
    description: "Parents and teachers access insights immediately",
    icon: CheckCircle,
  },
]

export function WorkflowSteps() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            8-step intelligent workflow that captures, analyzes, and reports on reading performance in real-time
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block mb-12">
          <div className="grid grid-cols-8 gap-2">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div key={idx} className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all mb-4 ${
                      activeStep === idx
                        ? "bg-primary text-primary-foreground scale-110 ring-2 ring-primary ring-offset-2"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </button>
                  <div className="text-center">
                    <div className="font-semibold text-sm text-foreground mb-1">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <Card className="p-8 text-center border-2 border-primary/20">
              <div className="mb-6">
                {(() => {
                  const Icon = steps[activeStep].icon
                  return <Icon className="w-16 h-16 mx-auto text-primary mb-4" />
                })()}
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Step {steps[activeStep].number}: {steps[activeStep].title}
                </h3>
                <p className="text-muted-foreground text-lg">{steps[activeStep].description}</p>
              </div>
            </Card>
            <div className="flex gap-2 justify-center mt-6">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeStep ? "bg-primary w-8" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
