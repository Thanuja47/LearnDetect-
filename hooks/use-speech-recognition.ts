"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface SpeechRecognitionResult {
  transcript: string
  isFinal: boolean
  confidence: number
}

interface UseSpeechRecognitionReturn {
  isListening: boolean
  transcript: string
  confidence: number
  error: string | null
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
  results: SpeechRecognitionResult[]
  isSupported: boolean
  retryCount: number
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SpeechRecognitionResult[]>([])
  const [isSupported, setIsSupported] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  const recognitionRef = useRef<any>(null)
  const interimTranscriptRef = useRef("")
  const retryTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSupported(false)
      setError("Speech Recognition is not supported in this browser. Please use Chrome, Firefox, or Safari.")
      return
    }

    setIsSupported(true)

    try {
      const recognition = new SpeechRecognition()

      // Configure recognition settings
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"
      recognition.maxAlternatives = 1

      if ("SpeechRecognitionAudioConfig" in window) {
        try {
          ; (recognition as any).audioConfig = (window as any).SpeechRecognitionAudioConfig?.microphone()
        } catch (e) {
          // Fallback if audio config fails
        }
      }

      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
        setTranscript("")
        setRetryCount(0)
        interimTranscriptRef.current = ""
      }

      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let maxConfidence = 0
        const newResults: SpeechRecognitionResult[] = []

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          const confidence = event.results[i][0].confidence

          if (event.results[i].isFinal) {
            newResults.push({
              transcript,
              isFinal: true,
              confidence,
            })
            maxConfidence = Math.max(maxConfidence, confidence)
          } else {
            interimTranscript += transcript + " "
          }
        }

        interimTranscriptRef.current = interimTranscript
        setTranscript(interimTranscript)
        if (maxConfidence > 0) {
          setConfidence(maxConfidence * 100)
        }

        if (newResults.length > 0) {
          setResults((prev) => [...prev, ...newResults])
          const finalText = newResults.map((r) => r.transcript).join(" ")
          setTranscript((prev) => prev + finalText)
        }
      }

      recognition.onerror = (event: any) => {
        let errorMessage = ""

        switch (event.error) {
          case "network":
            errorMessage =
              "Network error. Please check your internet connection and try again. Make sure microphone permissions are granted."
            // Attempt auto-retry for network errors
            if (retryCount < 3) {
              setRetryCount((prev) => prev + 1)
              retryTimeoutRef.current = setTimeout(() => {
                try {
                  recognition.start()
                } catch (e) {
                }
              }, 1500)
              return
            }
            break
          case "no-speech":
            errorMessage =
              "No speech detected. Please speak clearly into the microphone and try again. Make sure it's not muted."
            break
          case "audio-capture":
            errorMessage =
              "Microphone not found or not working. Please check that your microphone is connected and working properly."
            break
          case "not-allowed":
            errorMessage =
              "Microphone access denied. Please allow microphone permissions in your browser settings and try again."
            break
          case "permission-denied":
            errorMessage =
              "Permission denied. Please grant microphone access to use speech recognition. Check your browser privacy settings."
            break
          default:
            errorMessage = `Speech recognition error: ${event.error}. Please try again.`
        }

        setError(errorMessage)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } catch (err) {
      setError("Failed to initialize speech recognition. Please refresh the page and try again.")
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Speech Recognition is not supported in your browser")
      return
    }

    if (recognitionRef.current && !isListening) {
      try {
        interimTranscriptRef.current = ""
        setTranscript("")
        setResults([])
        setConfidence(0)
        setError(null)
        setRetryCount(0)

        recognitionRef.current.start()
      } catch (err) {
        setError("Failed to start recording. Please check microphone permissions and try again.")
      }
    }
  }, [isListening, isSupported])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (err) {
      }
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setConfidence(0)
    setResults([])
    setError(null)
    setRetryCount(0)
    interimTranscriptRef.current = ""
  }, [])

  return {
    isListening,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
    results,
    isSupported,
    retryCount,
  }
}
