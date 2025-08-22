"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { languageConfig, type Language } from "@/lib/multilingual-voice-commands"

interface VoiceFeedbackProps {
  isListening: boolean
  feedback: string
  isSupported: boolean
  currentLanguage?: Language
}

export function VoiceFeedback({ isListening, feedback, isSupported, currentLanguage = "en" }: VoiceFeedbackProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (feedback || isListening) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [feedback, isListening])

  if (!isSupported || !isVisible) return null

  const config = languageConfig[currentLanguage]

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card
        className={`p-4 transition-all duration-300 ${
          isListening ? "bg-primary/10 border-primary/30 shadow-lg" : "bg-card border-border"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`flex-shrink-0 ${isListening ? "animate-pulse" : ""}`}>
            {isListening ? (
              <Mic className="h-5 w-5 text-primary" />
            ) : feedback ? (
              <Volume2 className="h-5 w-5 text-muted-foreground" />
            ) : (
              <MicOff className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {isListening ? (
              <p className="text-sm font-medium text-primary">{config.listening}</p>
            ) : feedback ? (
              <p className="text-sm text-foreground">{feedback}</p>
            ) : (
              <p className="text-sm text-muted-foreground">{config.voiceReady}</p>
            )}
          </div>
        </div>

        {isListening && (
          <div className="mt-2 flex space-x-1">
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse"></div>
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          </div>
        )}
      </Card>
    </div>
  )
}
