"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { useAIVoiceAssistant } from "@/hooks/use-ai-voice-assistant"
import { Mic, MicOff, MessageSquare, Trash2, Volume2 } from "lucide-react"
import { useState } from "react"

export function AIVoiceInterface() {
  const {
    isListening,
    isProcessing,
    isSpeaking,
    isSupported,
    currentLanguage,
    feedback,
    conversation,
    audioLevel,
    startListening,
    stopListening,
    changeLanguage,
    clearConversation,
  } = useAIVoiceAssistant()

  const [showConversation, setShowConversation] = useState(false)

  if (!isSupported) {
    return (
      <Card className="p-4 bg-muted/50 border-dashed">
        <p className="text-sm text-muted-foreground text-center">Voice assistant not supported in this browser</p>
      </Card>
    )
  }

  const isActive = isListening || isProcessing || isSpeaking

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-4">
      {/* Conversation History */}
      {showConversation && conversation.length > 0 && (
        <Card className="w-80 max-h-60 overflow-y-auto p-4 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Conversation</h3>
            <Button variant="ghost" size="sm" onClick={clearConversation} className="h-6 w-6 p-0">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-2">
            {conversation.slice(-5).map((msg, index) => (
              <div
                key={index}
                className={`text-xs p-2 rounded ${
                  msg.role === "user" ? "bg-primary/10 text-primary ml-4" : "bg-muted mr-4"
                }`}
              >
                <div className="font-medium mb-1">{msg.role === "user" ? "You" : "AI Assistant"}</div>
                <div>{msg.content}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Voice Feedback */}
      {feedback && (
        <Card className="p-3 bg-background/95 backdrop-blur-sm max-w-xs">
          <div className="flex items-center gap-2">
            {isSpeaking && <Volume2 className="h-4 w-4 text-primary animate-pulse" />}
            <p className="text-sm">{feedback}</p>
          </div>
        </Card>
      )}

      {/* Main Voice Interface */}
      <Card className="p-4 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* Audio Visualizer */}
          <div className="relative">
            <AudioVisualizer audioLevel={audioLevel} isActive={isActive} size={60} />
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="sm"
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing || isSpeaking}
                className="flex-1"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isListening ? "Stop" : "Talk"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConversation(!showConversation)}
                className="px-2"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>

            {/* Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-xs px-2 py-1 rounded border bg-background"
              disabled={isActive}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="rw">Kinyarwanda</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            {isListening && "🎤 Listening..."}
            {isProcessing && "🤔 Thinking..."}
            {isSpeaking && "🗣️ Speaking..."}
            {!isActive && "💬 Ask me anything about Herve!"}
          </p>
        </div>
      </Card>
    </div>
  )
}
