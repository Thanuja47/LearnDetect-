"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, Stamp as Stop, RotateCcw, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useLanguage } from "@/components/providers/language-provider"

interface ReadingAssessmentProps {
  onBack: () => void
}

interface AnalysisResult {
  wordAccuracy: number
  pronunciation: number
  readingSpeed: number
  fluency: number
  comprehension: number
  overallScore: number
  feedback: string[]
  suggestions: string[]
}

export function ReadingAssessment({ onBack }: ReadingAssessmentProps) {
  const { t } = useLanguage()
  const [stage, setStage] = useState<"ready" | "recording" | "analyzing" | "results">("ready")
  const [recordingTime, setRecordingTime] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number>(0)

  const {
    isListening,
    transcript,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  } = useSpeechRecognition()

  const passage =
    "The quick brown fox jumps over the lazy dog. This is a famous pangram that contains every letter of the English alphabet. Reading is one of the most important skills a student can develop. It opens doors to new worlds, ideas, and opportunities."

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isListening && stage === "recording") {
      interval = setInterval(() => {
        setRecordingTime((t) => t + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isListening, stage])

  // Handle speech errors
  useEffect(() => {
    if (speechError) {
      setError(speechError)
    }
  }, [speechError])

  const handleStartRecording = () => {
    if (!isSupported) {
      setError(t("assess_not_supported"))
      return
    }

    setError(null)
    setRecordingTime(0)
    setStartTime(Date.now())
    setStage("recording")
    startListening()
  }

  const handleStopRecording = async () => {
    stopListening()
    setStage("analyzing")

    const duration = Math.floor((Date.now() - startTime) / 1000)

    try {
      // Call backend analysis API
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/assessments/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          expectedText: passage,
          recognizedText: transcript,
          duration: duration,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Analysis failed")
      }

      if (data.success) {
        setAnalysisResult(data.data)
        setStage("results")
      } else {
        throw new Error(data.message || "Analysis failed")
      }
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze reading. Please try again.")
      setStage("ready")
    }
  }

  const handleReset = () => {
    setStage("ready")
    setRecordingTime(0)
    setAnalysisResult(null)
    setError(null)
    resetTranscript()
  }

  const handleSaveAndExit = async () => {
    if (!analysisResult) return

    try {
      const token = localStorage.getItem("token")
      await fetch("http://localhost:5000/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "passage",
          wordAccuracy: analysisResult.wordAccuracy,
          pronunciation: analysisResult.pronunciation,
          readingSpeed: analysisResult.readingSpeed,
          fluency: analysisResult.fluency,
          comprehension: analysisResult.comprehension,
          recognizedText: transcript,
          feedback: analysisResult.feedback,
          suggestions: analysisResult.suggestions,
        }),
      })

      onBack()
    } catch (err) {
      console.error("Save error:", err)
      setError("Failed to save assessment. Please try again.")
    }
  }

  // Get word match class for real-time highlighting
  const getWordMatchClass = (spokenWord: string, expectedWord: string) => {
    if (!spokenWord || !expectedWord) return "text-muted-foreground"
    const similarity = spokenWord.toLowerCase() === expectedWord.toLowerCase()
    return similarity ? "text-green-600 font-semibold" : "text-orange-500"
  }

  const expectedWords = passage.toLowerCase().split(" ")
  const spokenWords = transcript.toLowerCase().split(" ")

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        &larr; {t("assess_back_dashboard")}
      </Button>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Ready Stage */}
      {stage === "ready" && (
        <Card>
          <CardHeader>
            <CardTitle>{t("assess_type_passage")}</CardTitle>
            <CardDescription>{t("assess_read_aloud")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t("assess_mic_alert")}
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-6 rounded-lg">
              <p className="text-lg leading-relaxed text-foreground">{passage}</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">{t("assess_instructions")}</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>{t("assess_step_1")}</li>
                <li>{t("assess_step_2")}</li>
                <li>{t("assess_step_3")}</li>
                <li>{t("assess_step_4")}</li>
              </ol>
            </div>

            <Button size="lg" className="w-full gap-2" onClick={handleStartRecording} disabled={!isSupported}>
              <Mic className="w-5 h-5" />
              {t("assess_start_recording")}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recording Stage */}
      {stage === "recording" && (
        <Card>
          <CardHeader>
            <CardTitle>{t("assess_recording")}</CardTitle>
            <CardDescription>{t("assess_recording_desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg flex flex-col items-center gap-4">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mic className="w-12 h-12 text-primary animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">
                  {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
                </p>
                <p className="text-muted-foreground mt-2">{t("assess_keep_reading")}</p>
              </div>
            </div>

            {/* Expected Passage */}
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-lg leading-relaxed text-foreground">{passage}</p>
            </div>

            {/* Real-time Transcription */}
            {transcript && (
              <div className="bg-card border border-border p-6 rounded-lg">
                <h4 className="font-semibold mb-3 text-sm text-muted-foreground">{t("assess_transcript")}</h4>
                <p className="text-base leading-relaxed">
                  {spokenWords.map((word, idx) => (
                    <span key={idx} className={getWordMatchClass(word, expectedWords[idx])}>
                      {word}{" "}
                    </span>
                  ))}
                </p>
              </div>
            )}

            <Button size="lg" variant="destructive" className="w-full gap-2" onClick={handleStopRecording}>
              <Stop className="w-5 h-5" />
              {t("assess_stop_recording")}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Analyzing Stage */}
      {stage === "analyzing" && (
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
            <p className="text-lg font-semibold">{t("assess_analyzing")}</p>
            <p className="text-muted-foreground">{t("assess_processing_2")}</p>
          </CardContent>
        </Card>
      )}

      {/* Results Stage */}
      {stage === "results" && analysisResult && (
        <>
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
              {/* Overall Score */}
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{Math.round(analysisResult.overallScore)}%</div>
                <p className="text-muted-foreground">{t("assess_overall_score")}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "assess_word_accuracy", value: analysisResult.wordAccuracy, color: "bg-primary" },
                  { label: "assess_pronunciation", value: analysisResult.pronunciation, color: "bg-accent" },
                  { label: "assess_reading_speed", value: analysisResult.readingSpeed, color: "bg-secondary" },
                  { label: "assess_fluency", value: analysisResult.fluency, color: "bg-blue-500" },
                  { label: "assess_comprehension", value: analysisResult.comprehension, color: "bg-green-500" },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{t(metric.label as any)}</p>
                    <div className="relative h-8 bg-muted rounded-lg flex items-center px-2">
                      <div
                        className={`${metric.color} h-full rounded-lg transition-all flex items-center justify-end pr-2 text-white text-xs font-bold`}
                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                      >
                        {Math.round(metric.value)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">{t("assess_feedback")}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {analysisResult.feedback.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              {analysisResult.suggestions.length > 0 && (
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">{t("assess_suggestions_title")}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {analysisResult.suggestions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t("assess_try_again")}
                </Button>
                <Button className="flex-1" onClick={handleSaveAndExit}>
                  {t("assess_save_exit")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("assess_tips_title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">1.</span>
                  <span>{t("assess_tip_1")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">2.</span>
                  <span>{t("assess_tip_2")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">3.</span>
                  <span>{t("assess_tip_3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
