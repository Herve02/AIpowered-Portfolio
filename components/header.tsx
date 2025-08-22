"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import type { Language } from "@/lib/multilingual-voice-commands"

interface HeaderProps {
  onVoiceToggle?: () => void
  isListening?: boolean
  currentLanguage?: Language
  onLanguageChange?: (lang: Language) => void
}

export function Header({ onVoiceToggle, isListening = false, currentLanguage = "en", onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">TH</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {onLanguageChange && (
            <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
          )}

          {/* Voice Control Button */}
          {onVoiceToggle && (
            <Button
              variant="outline"
              size="sm"
              onClick={onVoiceToggle}
              className={`ml-4 ${isListening ? "bg-primary text-primary-foreground" : ""}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span className="ml-2 hidden lg:inline">{isListening ? "Stop" : "Voice"}</span>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="sr-only">Toggle menu</span>
          <div className="flex flex-col space-y-1">
            <div className="h-0.5 w-4 bg-foreground"></div>
            <div className="h-0.5 w-4 bg-foreground"></div>
            <div className="h-0.5 w-4 bg-foreground"></div>
          </div>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {onLanguageChange && (
              <div className="pt-2 border-t">
                <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
              </div>
            )}

            {onVoiceToggle && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onVoiceToggle()
                  setIsMenuOpen(false)
                }}
                className={`w-full mt-4 ${isListening ? "bg-primary text-primary-foreground" : ""}`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span className="ml-2">{isListening ? "Stop Voice Control" : "Enable Voice Control"}</span>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
