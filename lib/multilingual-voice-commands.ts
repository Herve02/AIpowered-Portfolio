"use client"

export type Language = "en" | "fr" | "rw" | "es"

export interface MultilingualCommand {
  en: string[]
  fr: string[]
  rw: string[]
  es: string[]
  action: string
  description: {
    en: string
    fr: string
    rw: string
    es: string
  }
}

export const multilingualCommands: MultilingualCommand[] = [
  {
    en: ["show me projects", "go to projects", "projects page", "view projects"],
    fr: ["montre-moi les projets", "aller aux projets", "page des projets", "voir les projets"],
    rw: ["nyerekana imishinga", "jya ku mishinga", "urupapuro rw'imishinga"],
    es: ["muéstrame proyectos", "ir a proyectos", "página de proyectos", "ver proyectos"],
    action: "/projects",
    description: {
      en: "Navigate to projects page",
      fr: "Aller à la page des projets",
      rw: "Jya ku rupapuro rw'imishinga",
      es: "Ir a la página de proyectos",
    },
  },
  {
    en: ["go to about", "about page", "about me", "my story"],
    fr: ["à propos", "page à propos", "à propos de moi", "mon histoire"],
    rw: ["kuvuga kuri njye", "urupapuro rwanjye", "inkuru yanjye"],
    es: ["acerca de", "página acerca de", "sobre mí", "mi historia"],
    action: "/about",
    description: {
      en: "Navigate to about page",
      fr: "Aller à la page à propos",
      rw: "Jya ku rupapuro rw'amakuru yanjye",
      es: "Ir a la página acerca de",
    },
  },
  {
    en: ["contact me", "go to contact", "contact page", "get in touch"],
    fr: ["contactez-moi", "aller au contact", "page de contact", "me contacter"],
    rw: ["mwandikire", "jya ku rupapuro rwo kwandikira"],
    es: ["contáctame", "ir a contacto", "página de contacto", "ponte en contacto"],
    action: "/contact",
    description: {
      en: "Navigate to contact page",
      fr: "Aller à la page de contact",
      rw: "Jya ku rupapuro rwo kwandikira",
      es: "Ir a la página de contacto",
    },
  },
  {
    en: ["go home", "home page", "homepage", "main page"],
    fr: ["accueil", "page d'accueil", "aller à l'accueil", "page principale"],
    rw: ["itangiriro", "urupapuro rw'itangiriro", "jya ku ntangiriro"],
    es: ["inicio", "página de inicio", "ir a inicio", "página principal"],
    action: "/",
    description: {
      en: "Navigate to home page",
      fr: "Aller à la page d'accueil",
      rw: "Jya ku rupapuro rw'itangiriro",
      es: "Ir a la página de inicio",
    },
  },
]

export const languageConfig = {
  en: {
    code: "en-US",
    name: "English",
    flag: "🇺🇸",
    listening: "Listening...",
    voiceReady: "Voice commands ready",
    commandNotRecognized: "Command not recognized. Try saying 'help' for available commands.",
    navigatingTo: "Navigating to",
    availableCommands: "Available commands:",
    microphoneError: "Microphone not available",
    permissionDenied: "Microphone permission denied",
    noSpeech: "No speech detected. Try again.",
    voiceError: "Voice recognition error. Please try again.",
  },
  fr: {
    code: "fr-FR",
    name: "Français",
    flag: "🇫🇷",
    listening: "En écoute...",
    voiceReady: "Commandes vocales prêtes",
    commandNotRecognized: "Commande non reconnue. Essayez de dire 'aide' pour les commandes disponibles.",
    navigatingTo: "Navigation vers",
    availableCommands: "Commandes disponibles:",
    microphoneError: "Microphone non disponible",
    permissionDenied: "Permission du microphone refusée",
    noSpeech: "Aucune parole détectée. Réessayez.",
    voiceError: "Erreur de reconnaissance vocale. Veuillez réessayer.",
  },
  rw: {
    code: "rw-RW",
    name: "Kinyarwanda",
    flag: "🇷🇼",
    listening: "Ntego...",
    voiceReady: "Amabwiriza y'ijwi yiteguye",
    commandNotRecognized: "Ibwiriza ntabwo ryumvikana. Gerageza kuvuga 'ubufasha'.",
    navigatingTo: "Kujya kuri",
    availableCommands: "Amabwiriza aboneka:",
    microphoneError: "Mikoro ntiboneka",
    permissionDenied: "Uruhushya rwa mikoro rwahakanywe",
    noSpeech: "Nta magambo yamenyekanye. Ongera ugerageze.",
    voiceError: "Ikosa mu kumva ijwi. Nyamuneka ongera ugerageze.",
  },
  es: {
    code: "es-ES",
    name: "Español",
    flag: "🇪🇸",
    listening: "Escuchando...",
    voiceReady: "Comandos de voz listos",
    commandNotRecognized: "Comando no reconocido. Intenta decir 'ayuda' para comandos disponibles.",
    navigatingTo: "Navegando a",
    availableCommands: "Comandos disponibles:",
    microphoneError: "Micrófono no disponible",
    permissionDenied: "Permiso de micrófono denegado",
    noSpeech: "No se detectó habla. Inténtalo de nuevo.",
    voiceError: "Error de reconocimiento de voz. Por favor, inténtalo de nuevo.",
  },
}
