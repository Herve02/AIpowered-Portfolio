interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export class OpenAIService {
  private apiKey: string
  private baseUrl = "https://api.openai.com/v1/chat/completions"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateResponse(messages: ChatMessage[], language = "en"): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages,
          max_tokens: 300,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data: OpenAIResponse = await response.json()
      return data.choices[0]?.message?.content || "I apologize, but I cannot provide a response right now."
    } catch (error) {
      console.error("OpenAI Service Error:", error)
      return this.getFallbackResponse(language)
    }
  }

  private getFallbackResponse(language: string): string {
    const fallbacks = {
      en: "I'm having trouble connecting to my AI service right now. Please try asking your question again, or feel free to explore the portfolio manually.",
      fr: "J'ai des difficultés à me connecter à mon service IA en ce moment. Veuillez réessayer votre question ou explorer le portfolio manuellement.",
      rw: "Mfite ikibazo cyo kwihurira na serivisi yanjye ya AI ubu. Nyamuneka ongera usubize icyabazo cyawe cyangwa usuzume portfolio wanjye ubwawe.",
      es: "Tengo problemas para conectarme a mi servicio de IA en este momento. Por favor, intenta hacer tu pregunta de nuevo o explora el portafolio manualmente.",
    }
    return fallbacks[language as keyof typeof fallbacks] || fallbacks.en
  }

  createSystemPrompt(language: string, portfolioData: any): ChatMessage {
    const prompts = {
      en: `You are Herve's professional AI assistant. You have comprehensive knowledge about Twubahimana Herve, a Full-Stack Developer from Rwanda. 

About Herve:
- Full name: ${portfolioData.personal.name}
- Title: ${portfolioData.personal.title}
- Location: ${portfolioData.personal.location}
- Personality: ${portfolioData.personal.personality}

Skills: ${portfolioData.skills.technical.join(", ")}
Languages: ${portfolioData.skills.languages.join(", ")}

Answer questions about Herve naturally and conversationally. You can provide detailed information about his projects, skills, experience, and background. Be helpful, professional, and engaging. Keep responses concise but informative.`,

      fr: `Tu es l'assistant IA professionnel d'Herve. Tu as une connaissance complète de Twubahimana Herve, un développeur Full-Stack du Rwanda.

À propos d'Herve:
- Nom complet: ${portfolioData.personal.name}
- Titre: ${portfolioData.personal.title}
- Localisation: ${portfolioData.personal.location}

Compétences: ${portfolioData.skills.technical.join(", ")}
Langues: ${portfolioData.skills.languages.join(", ")}

Réponds aux questions sur Herve de manière naturelle et conversationnelle. Sois utile, professionnel et engageant.`,

      rw: `Uri umufasha w'ikoranabuhanga wa Herve. Ufite ubumenyi bwuzuye kuri Twubahimana Herve, umukoresha w'ikoranabuhanga wo mu Rwanda.

Ku bijyanye na Herve:
- Izina ryuzuye: ${portfolioData.personal.name}
- Umurimo: ${portfolioData.personal.title}
- Aho atuye: ${portfolioData.personal.location}

Ubuhanga: ${portfolioData.skills.technical.join(", ")}
Indimi: ${portfolioData.skills.languages.join(", ")}

Subiza ibibazo ku bijyanye na Herve mu buryo bwiza kandi bworoshye.`,

      es: `Eres el asistente de IA profesional de Herve. Tienes conocimiento completo sobre Twubahimana Herve, un desarrollador Full-Stack de Ruanda.

Sobre Herve:
- Nombre completo: ${portfolioData.personal.name}
- Título: ${portfolioData.personal.title}
- Ubicación: ${portfolioData.personal.location}

Habilidades: ${portfolioData.skills.technical.join(", ")}
Idiomas: ${portfolioData.skills.languages.join(", ")}

Responde preguntas sobre Herve de manera natural y conversacional. Sé útil, profesional y atractivo.`,
    }

    return {
      role: "system",
      content: prompts[language as keyof typeof prompts] || prompts.en,
    }
  }
}

export const createOpenAIService = (apiKey: string) => {
  return new OpenAIService(apiKey)
}
