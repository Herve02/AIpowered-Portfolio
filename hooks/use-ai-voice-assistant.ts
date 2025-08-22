"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { OpenAIService } from "@/lib/openai-service"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
    AudioContext: any
    webkitAudioContext: any
  }
}

interface VoiceAssistantState {
  isListening: boolean
  isProcessing: boolean
  isSpeaking: boolean
  isSupported: boolean
  currentLanguage: string
  feedback: string
  conversation: Array<{ role: "user" | "assistant"; content: string; timestamp: Date }>
  audioLevel: number
}

interface UseAIVoiceAssistantReturn extends VoiceAssistantState {
  startListening: () => void
  stopListening: () => void
  changeLanguage: (lang: string) => void
  clearConversation: () => void
}

const LANGUAGES = {
  en: { code: "en-US", name: "English" },
  fr: { code: "fr-FR", name: "Français" },
  rw: { code: "rw-RW", name: "Kinyarwanda" },
  es: { code: "es-ES", name: "Español" },
}

const SYSTEM_PROMPTS = {
  en: `You are Herve's professional AI assistant. You know everything about Twubahimana Herve's portfolio, skills, projects, and experience. Answer questions naturally and conversationally. You can suggest navigation to specific pages when relevant. Keep responses concise but informative (2-3 sentences max). Always be helpful, professional, and enthusiastic about Herve's work.`,

  fr: `Tu es l'assistant IA professionnel d'Herve. Tu connais tout sur le portfolio, les compétences, les projets et l'expérience de Twubahimana Herve. Réponds aux questions de manière naturelle et conversationnelle. Tu peux suggérer la navigation vers des pages spécifiques quand c'est pertinent. Garde les réponses concises mais informatives (2-3 phrases max).`,

  rw: `Uri umufasha w'ikoranabuhanga wa Herve. Uzi byose ku mirimo, ubuhanga, imishinga, n'uburambe bwa Twubahimana Herve. Subiza ibibazo mu buryo bwiza kandi bworoshye. Ushobora gusaba kujya ku mpapuro zihariye mugihe bikenewe. Bika ibisubizo bigufi ariko bifite amakuru (interuro 2-3 gusa).`,

  es: `Eres el asistente de IA profesional de Herve. Conoces todo sobre el portafolio, habilidades, proyectos y experiencia de Twubahimana Herve. Responde preguntas de manera natural y conversacional. Puedes sugerir navegación a páginas específicas cuando sea relevante. Mantén las respuestas concisas pero informativas (máximo 2-3 oraciones).`,
}

export function useAIVoiceAssistant(): UseAIVoiceAssistantReturn {
  const router = useRouter()
  const [state, setState] = useState<VoiceAssistantState>({
    isListening: false,
    isProcessing: false,
    isSpeaking: false,
    isSupported: false,
    currentLanguage: "en",
    feedback: "",
    conversation: [],
    audioLevel: 0,
  })

  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const openAIRef = useRef<OpenAIService | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()

  // Initialize services
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const isSupported = !!(SpeechRecognition && window.speechSynthesis)

    setState((prev) => ({ ...prev, isSupported }))

    if (isSupported) {
      recognitionRef.current = new SpeechRecognition()
      synthesisRef.current = window.speechSynthesis

      // Initialize OpenAI service (you'll need to provide API key)
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
      if (apiKey) {
        openAIRef.current = new OpenAIService(apiKey)
      }

      setupSpeechRecognition()
      setupAudioVisualization()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const setupSpeechRecognition = useCallback(() => {
    if (!recognitionRef.current) return

    const recognition = recognitionRef.current
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setState((prev) => ({
        ...prev,
        isListening: true,
        feedback: getLocalizedText("listening", state.currentLanguage),
      }))
    }

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript
      await processUserInput(transcript)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setState((prev) => ({
        ...prev,
        isListening: false,
        isProcessing: false,
        feedback: getLocalizedText("error", state.currentLanguage),
      }))
    }

    recognition.onend = () => {
      setState((prev) => ({ ...prev, isListening: false }))
    }
  }, [state.currentLanguage])

  const setupAudioVisualization = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()

      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      analyserRef.current.fftSize = 256
      startAudioVisualization()
    } catch (error) {
      console.error("Audio visualization setup failed:", error)
    }
  }, [])

  const startAudioVisualization = useCallback(() => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)

    const animate = () => {
      analyserRef.current!.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length
      const normalizedLevel = Math.min(average / 128, 1)

      setState((prev) => ({ ...prev, audioLevel: normalizedLevel }))
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const processUserInput = async (transcript: string) => {
    if (!openAIRef.current) {
      speakResponse(getLocalizedText("noAI", state.currentLanguage))
      return
    }

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      feedback: getLocalizedText("processing", state.currentLanguage),
      conversation: [...prev.conversation, { role: "user", content: transcript, timestamp: new Date() }],
    }))

    try {
      // Check for navigation commands
      const navigationResult = handleNavigationCommands(transcript, state.currentLanguage)
      if (navigationResult) {
        speakResponse(navigationResult.response)
        if (navigationResult.route) {
          setTimeout(() => router.push(navigationResult.route!), 1000)
        }
        return
      }

      // Generate AI response
      const messages = [
        { role: "system" as const, content: SYSTEM_PROMPTS[state.currentLanguage as keyof typeof SYSTEM_PROMPTS] },
        { role: "user" as const, content: transcript },
      ]

      const aiResponse = await openAIRef.current.generateResponse(messages, state.currentLanguage)

      setState((prev) => ({
        ...prev,
        conversation: [...prev.conversation, { role: "assistant", content: aiResponse, timestamp: new Date() }],
      }))

      speakResponse(aiResponse)
    } catch (error) {
      console.error("AI processing error:", error)
      speakResponse(getLocalizedText("error", state.currentLanguage))
    } finally {
      setState((prev) => ({ ...prev, isProcessing: false }))
    }
  }

  const speakResponse = (text: string) => {
    if (!synthesisRef.current) return

    setState((prev) => ({ ...prev, isSpeaking: true, feedback: text }))

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = LANGUAGES[state.currentLanguage as keyof typeof LANGUAGES].code
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.volume = 0.8

    utterance.onend = () => {
      setState((prev) => ({ ...prev, isSpeaking: false, feedback: "" }))
    }

    utterance.onerror = () => {
      setState((prev) => ({ ...prev, isSpeaking: false, feedback: "" }))
    }

    synthesisRef.current.speak(utterance)
  }

  const startListening = () => {
    if (!recognitionRef.current || state.isListening || state.isSpeaking) return

    recognitionRef.current.lang = LANGUAGES[state.currentLanguage as keyof typeof LANGUAGES].code
    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop()
    }
    if (synthesisRef.current && state.isSpeaking) {
      synthesisRef.current.cancel()
      setState((prev) => ({ ...prev, isSpeaking: false, feedback: "" }))
    }
  }

  const changeLanguage = (lang: string) => {
    setState((prev) => ({ ...prev, currentLanguage: lang }))
    if (recognitionRef.current) {
      setupSpeechRecognition()
    }
  }

  const clearConversation = () => {
    setState((prev) => ({ ...prev, conversation: [] }))
  }

  return {
    ...state,
    startListening,
    stopListening,
    changeLanguage,
    clearConversation,
  }
}

// Helper functions
function getLocalizedText(key: string, language: string): string {
  const texts = {
    listening: {
      en: "Listening... Ask me anything about Herve!",
      fr: "En écoute... Demandez-moi tout sur Herve!",
      rw: "Ntego... Mbaze ikintu icyo ari cyo cyose kuri Herve!",
      es: "Escuchando... ¡Pregúntame cualquier cosa sobre Herve!",
    },
    processing: {
      en: "Thinking...",
      fr: "Je réfléchis...",
      rw: "Ndatekereza...",
      es: "Pensando...",
    },
    error: {
      en: "Sorry, I didn't catch that. Please try again.",
      fr: "Désolé, je n'ai pas compris. Veuillez réessayer.",
      rw: "Ihangane, sinumvise. Nyamuneka ongera ugerageze.",
      es: "Lo siento, no entendí eso. Por favor, inténtalo de nuevo.",
    },
    noAI: {
      en: "AI assistant is not available right now. Please try the basic voice commands.",
      fr: "L'assistant IA n'est pas disponible maintenant. Veuillez essayer les commandos vocales de base.",
      rw: "Umufasha wa AI ntabwo ahari ubu. Nyamuneka gerageza amabwiriza y'ijwi y'ibanze.",
      es: "El asistente de IA no está disponible ahora. Por favor, prueba los comandos de voz básicos.",
    },
  }

  return (
    texts[key as keyof typeof texts]?.[language as keyof typeof texts.listening] ||
    texts[key as keyof typeof texts]?.en ||
    ""
  )
}

function handleNavigationCommands(transcript: string, language: string): { response: string; route?: string } | null {
  const lowerTranscript = transcript.toLowerCase()

  // Navigation patterns by language
  const patterns = {
    en: {
      home: ["home", "homepage", "main page", "start"],
      projects: ["projects", "work", "portfolio", "show projects"],
      about: ["about", "bio", "background", "experience"],
      contact: ["contact", "hire", "get in touch", "reach out"],
    },
    fr: {
      home: ["accueil", "page principale", "début"],
      projects: ["projets", "travail", "portfolio", "montrer projets"],
      about: ["à propos", "bio", "expérience"],
      contact: ["contact", "embaucher", "contacter"],
    },
    rw: {
      home: ["ahabanza", "urupapuro rw'ibanze"],
      projects: ["imishinga", "akazi", "portfolio"],
      about: ["byerekeye", "uburambe"],
      contact: ["kuvugana", "gukoresha"],
    },
    es: {
      home: ["inicio", "página principal", "empezar"],
      projects: ["proyectos", "trabajo", "portafolio", "mostrar proyectos"],
      about: ["acerca de", "bio", "experiencia"],
      contact: ["contacto", "contratar", "ponerse en contacto"],
    },
  }

  const langPatterns = patterns[language as keyof typeof patterns] || patterns.en

  for (const [page, keywords] of Object.entries(langPatterns)) {
    if (keywords.some((keyword) => lowerTranscript.includes(keyword))) {
      const responses = {
        en: {
          home: "Taking you to the homepage where you can learn about Herve's expertise!",
          projects: "Let me show you Herve's amazing projects and technical work!",
          about: "Here's everything about Herve's background and experience!",
          contact: "Perfect! Here's how you can get in touch with Herve for your project!",
        },
        fr: {
          home: "Je vous emmène à la page d'accueil pour découvrir l'expertise d'Herve!",
          projects: "Laissez-moi vous montrer les projets incroyables d'Herve!",
          about: "Voici tout sur le parcours et l'expérience d'Herve!",
          contact: "Parfait! Voici comment contacter Herve pour votre projet!",
        },
        rw: {
          home: "Nzakujyana ku rupapuro rw'ibanze aho uzamenya ubuhanga bwa Herve!",
          projects: "Reka nkwereke imishinga ihebuje ya Herve!",
          about: "Hano hari byose ku mateka n'uburambe bwa Herve!",
          contact: "Byiza! Hano ni uburyo ushobora kuvugana na Herve!",
        },
        es: {
          home: "Te llevo a la página principal donde puedes conocer la experiencia de Herve!",
          projects: "¡Déjame mostrarte los increíbles proyectos de Herve!",
          about: "¡Aquí está todo sobre el trasfondo y experiencia de Herve!",
          contact: "¡Perfecto! ¡Aquí está cómo puedes contactar a Herve para tu proyecto!",
        },
      }

      const response =
        responses[language as keyof typeof responses]?.[page as keyof typeof responses.en] ||
        responses.en[page as keyof typeof responses.en]

      return {
        response,
        route: page === "home" ? "/" : `/${page}`,
      }
    }
  }

  return null
}
