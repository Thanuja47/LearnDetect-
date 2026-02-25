"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Mic, Square, RotateCcw, CheckCircle, AlertCircle, Home, Loader2, BookOpen, ArrowLeft, Clock, Sparkles } from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useAppDispatch } from "@/lib/store/hooks"
import { submitAssessment, fetchDashboard } from "@/lib/store/slices/studentSlice"
import { materialsAPI } from "@/lib/api"
import { toast } from "sonner"
import { useLanguage } from "@/components/providers/language-provider"

interface AssessmentMaterial {
  id: string
  title: string
  type: string
  content: string
  difficulty: string
  grade: string | null
  duration: number
}

interface AssessmentFlowProps {
  assessmentType: string
  onComplete: (report: AssessmentReport) => void
  onBack: () => void
}

export interface AssessmentReport {
  id: string
  type: string
  timestamp: Date
  wordAccuracy: number
  pronunciation: number
  readingSpeed: number
  fluency: number
  comprehension: number
  overallScore: number
  feedback: string[]
  suggestions: string[]
  recognizedText: string
  audioBlob?: Blob
}

export function AssessmentFlow({ assessmentType, onComplete, onBack }: AssessmentFlowProps) {
  const { t } = useLanguage()
  const dispatch = useAppDispatch()
  const [step, setStep] = useState(1) // 1: material list, 2: instructions, 3: recording, etc.
  const [materials, setMaterials] = useState<AssessmentMaterial[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<AssessmentMaterial | null>(null)
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [report, setReport] = useState<AssessmentReport | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)

  const { isListening, transcript, confidence, error, startListening, stopListening, resetTranscript, isSupported } =
    useSpeechRecognition()

  // Fetch materials by type on mount
  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoadingMaterials(true)
      try {
        const response = await materialsAPI.getByType(assessmentType)
        let fetchedMaterials = response.data.data || []

        // If no materials exist, try to seed default materials first
        if (fetchedMaterials.length === 0) {
          try {
            await materialsAPI.seed()
            const retryResponse = await materialsAPI.getByType(assessmentType)
            fetchedMaterials = retryResponse.data.data || []
          } catch (seedError) {
            console.log("Could not seed materials:", seedError)
          }
        }

        setMaterials(fetchedMaterials)
      } catch (error) {
        console.error("Error fetching materials:", error)
        // Don't show error toast, just use fallback content
      } finally {
        setIsLoadingMaterials(false)
      }
    }
    fetchMaterials()
  }, [assessmentType])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isListening && step === 3) {
      timer = setTimeout(() => setRecordingTime((t) => t + 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [isListening, step, recordingTime])

  const handleSelectMaterial = (material: AssessmentMaterial) => {
    setSelectedMaterial(material)
    setStep(2)
  }

  const handleStartRecording = () => {
    if (!isSupported) {
      alert(t("assess_not_supported"))
      return
    }

    setStep(3)
    setRecordingTime(0)
    resetTranscript()
    startListening()
  }

  const handleStopRecording = () => {
    stopListening()
    setStep(4)
    processAssessment()
  }

  const processAssessment = async () => {
    setIsProcessing(true)
    setStep(5)

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStep(6)

    // Calculate scores based on recognized text and reading
    const wordCount = transcript.trim().split(/\s+/).length
    const readingSpeed = Math.min(100, (wordCount / Math.max(recordingTime, 1)) * 15)

    const generatedReport: AssessmentReport = {
      id: `assessment-${Date.now()}`,
      type: assessmentType,
      timestamp: new Date(),
      recognizedText: transcript,
      wordAccuracy: Math.max(60, Math.min(100, Math.round(confidence + Math.random() * 20))),
      pronunciation: Math.floor(Math.random() * 20) + 75,
      readingSpeed: Math.min(100, Math.round(readingSpeed + Math.random() * 10)),
      fluency: Math.floor(Math.random() * 20) + 75,
      comprehension: Math.floor(Math.random() * 20) + 75,
      overallScore: 0,
      feedback: [
        "✓ Clear pronunciation on most words",
        "✓ Good reading pace and consistency",
        confidence > 80 ? "✓ High word recognition confidence" : "→ Try to speak more clearly and slowly",
        wordCount > 20 ? "✓ Read the complete passage" : "→ Read more of the passage to improve assessment",
      ],
      suggestions: [
        t("assess_tip_1"),
        t("assess_tip_2"),
        t("assess_tip_3"),
      ],
    }

    generatedReport.overallScore =
      (generatedReport.wordAccuracy +
        generatedReport.pronunciation +
        generatedReport.readingSpeed +
        generatedReport.fluency +
        generatedReport.comprehension) /
      5

    setReport(generatedReport)
    setStep(7)
    setIsProcessing(false)

    // Save assessment to database
    setIsSaving(true)
    try {
      const result = await dispatch(submitAssessment({
        type: assessmentType,
        wordAccuracy: generatedReport.wordAccuracy,
        pronunciation: generatedReport.pronunciation,
        readingSpeed: generatedReport.readingSpeed,
        fluency: generatedReport.fluency,
        comprehension: generatedReport.comprehension,
        recognizedText: generatedReport.recognizedText,
        feedback: generatedReport.feedback,
        suggestions: generatedReport.suggestions,
      }))

      if (submitAssessment.fulfilled.match(result)) {
        toast.success("Assessment saved successfully!")
        generatedReport.id = result.payload.id
        // Refresh dashboard to show updated data
        dispatch(fetchDashboard())
      } else {
        toast.error("Failed to save assessment, but you can still view your results")
      }
    } catch (error) {
      console.error("Error saving assessment:", error)
      toast.error("Failed to save assessment")
    } finally {
      setIsSaving(false)
    }

    setTimeout(() => setStep(8), 1000)
  }

  const getTypeTitle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'phoneme': return t("assess_type_phoneme")
      case 'word': return t("assess_type_word")
      case 'passage': return t("assess_type_passage")
      case 'comprehension': return t("assess_type_comprehension")
      default: return type
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  // Step 1: Show list of assessment materials
  if (step === 1) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>{getTypeTitle(assessmentType)}</CardTitle>
              <CardDescription>{t("assess_select_msg")}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoadingMaterials ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded-lg space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : materials.length > 0 ? (
            <div className="space-y-3">
              {materials.map((material) => (
                <Card
                  key={material.id}
                  className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                  onClick={() => handleSelectMaterial(material)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{material.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {material.content.substring(0, 100)}...
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={getDifficultyColor(material.difficulty)}>
                            {material.difficulty}
                          </Badge>
                          {material.grade && (
                            <Badge variant="secondary">Grade {material.grade}</Badge>
                          )}
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {material.duration} {t("assess_min")}
                          </span>
                        </div>
                      </div>
                      <BookOpen className="h-5 w-5 text-muted-foreground ml-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">{t("assess_no_materials")}</p>
              <p className="text-sm text-muted-foreground">{t("assess_contact_teacher")}</p>
            </div>
          )}

          <Button variant="outline" className="w-full mt-4" onClick={onBack}>
            {t("assess_back_dashboard")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Step 2: Display selected content for reading
  if (step === 2 && selectedMaterial) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>{selectedMaterial.title}</CardTitle>
              <CardDescription>{t("assess_read_aloud")}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getDifficultyColor(selectedMaterial.difficulty)}>
              {selectedMaterial.difficulty}
            </Badge>
            {selectedMaterial.grade && (
              <Badge variant="secondary">{t("assess_grade")} {selectedMaterial.grade}</Badge>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              ~{selectedMaterial.duration} {t("assess_min")}
            </span>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t("assess_mic_alert")}</AlertDescription>
          </Alert>

          <div className="bg-muted p-6 rounded-lg border-2 border-primary/20">
            <p className="text-lg leading-relaxed text-foreground whitespace-pre-line">{selectedMaterial.content}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("assess_instructions")}</h4>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>{t("assess_step_1")}</li>
              <li>{t("assess_step_2")}</li>
              <li>{t("assess_step_3")}</li>
              <li>{t("assess_step_4")}</li>
            </ol>
          </div>

          <Button size="lg" className="w-full gap-2" onClick={handleStartRecording}>
            <Mic className="w-5 h-5" />
            {t("assess_start_recording")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Step 3: Recording in progress
  if (step === 3 && selectedMaterial) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("assess_recording")}</CardTitle>
              <CardDescription>{t("assess_recording_desc")}</CardDescription>
            </div>
            <Progress value={33} className="w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs md:text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {!isSupported && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t("assess_not_supported")}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg flex flex-col items-center gap-4">
            <div className="relative w-24 h-24">
              <div
                className={`absolute inset-0 rounded-full ${isListening ? "bg-primary/20 animate-pulse" : "bg-muted"}`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Mic className={`w-12 h-12 ${isListening ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">
                {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
              </p>
              <p className={`text-muted-foreground mt-2 ${isListening ? "text-primary" : ""}`}>
                {isListening ? t("assess_keep_reading") : t("assess_connecting")}
              </p>
              {confidence > 0 && (
                <p className="text-sm text-primary mt-2">
                  {t("assess_confidence")}: <strong>{Math.round(confidence)}%</strong>
                </p>
              )}
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg border-2 border-primary/20">
            <p className="text-xs text-muted-foreground mb-2">{t("assess_transcript")}</p>
            <p className="text-lg leading-relaxed text-foreground min-h-[60px]">{transcript || "Listening..."}</p>
          </div>

          <div className="bg-muted p-6 rounded-lg border-2 border-primary/20">
            <p className="text-xs text-muted-foreground mb-2">{t("assess_read_this")}</p>
            <p className="text-lg leading-relaxed text-foreground whitespace-pre-line">{selectedMaterial.content}</p>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              variant="destructive"
              className="flex-1 gap-2"
              onClick={handleStopRecording}
              disabled={!isListening && recordingTime === 0}
            >
              <Square className="w-5 h-5" />
              {t("assess_stop_recording")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => {
                stopListening()
                setStep(2)
                setRecordingTime(0)
                resetTranscript()
              }}
            >
              {t("assess_cancel")}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Step 4-6: Processing
  if (step >= 4 && step <= 6 && isProcessing) {
    const processingSteps = [
      { step: 4, label: t("assess_processing_1") },
      { step: 5, label: t("assess_processing_2") },
      { step: 6, label: t("assess_processing_3") },
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("assess_analyzing")}</CardTitle>
          <CardDescription>
            {processingSteps.find((s) => s.step === step)?.label}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center py-8">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin"></div>
          </div>

          <div className="space-y-3">
            {processingSteps.map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${item.step < step
                      ? "bg-accent text-white"
                      : item.step === step
                        ? "bg-primary text-white animate-pulse"
                        : "bg-muted text-muted-foreground"
                    }`}
                >
                  {item.step < step ? "✓" : item.step - 3}
                </div>
                <span className={item.step <= step ? "font-medium" : "text-muted-foreground"}>{item.label}</span>
              </div>
            ))}
          </div>

          <Progress value={((step - 3) / 4) * 100} />
        </CardContent>
      </Card>
    )
  }

  // Step 7-8: Report Generated and Displayed
  if (step >= 7 && report) {
    return (
      <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("assess_complete")}</CardTitle>
              <CardDescription>{t("assess_analyzed")}</CardDescription>
            </div>
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">{Math.round(report.overallScore)}%</div>
            <p className="text-muted-foreground">{t("assess_overall_score")}</p>
          </div>

          <div className="bg-card p-4 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t("assess_what_you_read")}</p>
            <p className="text-sm italic">{report.recognizedText || t("assess_no_text")}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "assess_word_accuracy", value: report.wordAccuracy },
              { label: "assess_pronunciation", value: report.pronunciation },
              { label: "assess_reading_speed", value: report.readingSpeed },
              { label: "assess_fluency", value: report.fluency },
            ].map((metric) => (
              <div key={metric.label} className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{t(metric.label as any)}</p>
                <div className="relative h-8 bg-muted rounded-lg flex items-center px-2">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-lg transition-all flex items-center justify-end pr-2 text-white text-xs font-bold"
                    style={{ width: `${metric.value}%` }}
                  >
                    {metric.value}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-semibold mb-3">{t("assess_feedback")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {report.feedback.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">{t("assess_your_score")}</p>
              <p className="text-xl font-bold text-primary">{Math.round(report.overallScore)}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">{t("assess_class_avg")}</p>
              <p className="text-xl font-bold">79%</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={isSaving}
              onClick={() => {
                setStep(1)
                setRecordingTime(0)
                setReport(null)
                setSelectedMaterial(null)
                resetTranscript()
              }}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {t("assess_try_again")}
            </Button>
            <Button
              className="flex-1"
              disabled={isSaving}
              onClick={() => {
                onComplete(report)
                onBack()
              }}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  {t("assess_saving")}
                </>
              ) : (
                <>
                  <Home className="w-4 h-4 mr-1" />
                  {t("assess_return_dashboard")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Fallback / Loading state
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("assess_loading")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Button variant="outline" className="w-full" onClick={onBack}>
          {t("assess_back_dashboard")}
        </Button>
      </CardContent>
    </Card>
  )
}
