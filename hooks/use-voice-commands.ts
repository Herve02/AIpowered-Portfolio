"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { multilingualCommands, languageConfig, type Language } from "@/lib/multilingual-voice-commands"

export function useVoiceCommands() {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [recognition, setRecognition] = useState<any | null>(null)
  const [lastCommand, setLastCommand] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const router = useRouter()

  const processCommand = useCallback(
    (transcript: string) => {
      const normalizedTranscript = transcript.toLowerCase().trim()
      setLastCommand(transcript)

      for (const command of multilingualCommands) {
        const phrases = command[currentLanguage]
        for (const phrase of phrases) {
          if (normalizedTranscript.includes(phrase.toLowerCase())) {
            router.push(command.action)
            const config = languageConfig[currentLanguage]
            setFeedback(`${config.navigatingTo} ${command.description[currentLanguage]}...`)
            setTimeout(() => setFeedback(""), 2000)
            return true
          }
        }
      }

      const helpPhrases = {
        en: ["help", "what can I say", "voice commands", "show commands"],
        fr: ["aide", "que puis-je dire", "commandes vocales", "montrer les commandes"],
        rw: ["ubufasha", "icyo nshobora kuvuga", "amabwiriza y'ijwi"],
        es: ["ayuda", "qué puedo decir", "comandos de voz", "mostrar comandos"],
      }

      for (const helpPhrase of helpPhrases[currentLanguage]) {
        if (normalizedTranscript.includes(helpPhrase.toLowerCase())) {
          const config = languageConfig[currentLanguage]
          const commandList = multilingualCommands.map((cmd) => `"${cmd[currentLanguage][0]}"`).join(", ")
          setFeedback(`${config.availableCommands} ${commandList}`)
          setTimeout(() => setFeedback(""), 5000)
          return true
        }
      }

      const config = languageConfig[currentLanguage]
      setFeedback(config.commandNotRecognized)
      setTimeout(() => setFeedback(""), 3000)
      return false
    },
    [currentLanguage, router],
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        setIsSupported(true)
        const recognitionInstance = new SpeechRecognition()

        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = languageConfig[currentLanguage].code
        recognitionInstance.maxAlternatives = 1

        recognitionInstance.onstart = () => {
          console.log("[v0] Voice recognition started")
          const config = languageConfig[currentLanguage]
          setFeedback(config.listening)
        }

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          console.log("[v0] Voice command received:", transcript)

          const commandProcessed = processCommand(transcript)
          if (commandProcessed) {
            console.log("[v0] Command executed successfully")
          } else {
            console.log("[v0] No matching command found")
          }
        }

        recognitionInstance.onerror = (event: any) => {
          console.error("[v0] Speech recognition error:", event.error)
          setIsListening(false)
          const config = languageConfig[currentLanguage]

          switch (event.error) {
            case "no-speech":
              setFeedback(config.noSpeech)
              break
            case "audio-capture":
              setFeedback(config.microphoneError)
              break
            case "not-allowed":
              setFeedback(config.permissionDenied)
              break
            default:
              setFeedback(config.voiceError)
          }
          setTimeout(() => setFeedback(""), 3000)
        }

        recognitionInstance.onend = () => {
          console.log("[v0] Speech recognition ended")
          setIsListening(false)
          const config = languageConfig[currentLanguage]
          if (feedback === config.listening) {
            setFeedback("")
          }
        }

        setRecognition(recognitionInstance)
      } else {
        console.log("[v0] Speech recognition not supported")
        setIsSupported(false)
      }
    }
  }, [processCommand, feedback, currentLanguage])

  const changeLanguage = useCallback(
    (newLanguage: Language) => {
      setCurrentLanguage(newLanguage)
      if (recognition) {
        recognition.lang = languageConfig[newLanguage].code
      }
    },
    [recognition],
  )

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        recognition.start()
        setIsListening(true)
        console.log("[v0] Voice recognition started")
      } catch (error) {
        console.error("[v0] Error starting voice recognition:", error)
        const config = languageConfig[currentLanguage]
        setFeedback(config.voiceError)
        setTimeout(() => setFeedback(""), 3000)
      }
    }
  }, [recognition, isListening, currentLanguage])

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
      setFeedback("")
      console.log("[v0] Voice recognition stopped")
    }
  }, [recognition, isListening])

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    toggleListening,
    lastCommand,
    feedback,
    currentLanguage,
    changeLanguage,
    commands: multilingualCommands.map((cmd) => ({
      phrases: cmd[currentLanguage],
      description: cmd.description[currentLanguage],
    })),
  }
}
