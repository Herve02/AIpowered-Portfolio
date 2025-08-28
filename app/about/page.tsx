"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useVoiceCommands } from "@/hooks/use-voice-commands"
import { portfolioData } from "@/lib/portfolio-data"
import { Calendar, Globe, GraduationCap } from "lucide-react"
import { VoiceFeedback } from "@/components/voice-feedback"
import PortfolioSecretary from "../AiSecretary/PortfolioSecretary"

export default function AboutPage() {
  const { isListening, isSupported, toggleListening, feedback } = useVoiceCommands()

  return (
    <div className="min-h-screen flex flex-col">
      <Header onVoiceToggle={isSupported ? toggleListening : undefined} isListening={isListening} />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-in fade-in-50 duration-700">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Me</h1>
              <p className="text-xl text-muted-foreground">Get to know the person behind the code</p>
            </div>

            {/* Profile Section */}
            <div className="grid lg:grid-cols-3 gap-12 mb-16">
              <div className="lg:col-span-1 animate-in slide-in-from-left-5 duration-700">
                <div className="text-center">
                  <img
                    src="/professional-developer-full-body.jpg"
                    alt="Twubahimana Herve - Professional Photo"
                    className="w-64 h-64 rounded-2xl mx-auto mb-6 object-cover border-4 border-primary/20 hover:border-primary/40 transition-colors duration-300"
                    loading="lazy"
                  />
                  <h2 className="text-2xl font-bold mb-2">{portfolioData.hero.name}</h2>
                  <p className="text-muted-foreground">{portfolioData.hero.tagline}</p>
                </div>
              </div>

              <div className="lg:col-span-2 animate-in slide-in-from-right-5 duration-700 delay-200">
                <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-semibold mb-4">My Story</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{portfolioData.about.bio}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Education</p>
                        <p className="text-sm text-muted-foreground">{portfolioData.about.education}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Languages</p>
                        <p className="text-sm text-muted-foreground">{portfolioData.about.languages.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-16 animate-in slide-in-from-bottom-5 duration-700 delay-400">
              <h3 className="text-3xl font-bold text-center mb-12">Technical Skills</h3>
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-wrap gap-3 justify-center">
                  {portfolioData.about.skills.map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`px-4 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 hover:scale-105 animate-in fade-in-50 duration-500`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Experience Timeline */}
            <div className="animate-in slide-in-from-bottom-5 duration-700 delay-600">
              <h3 className="text-3xl font-bold text-center mb-12">Experience</h3>
              <div className="space-y-8">
                {portfolioData.about.experience.map((exp, index) => (
                  <Card
                    key={index}
                    className={`p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-5 duration-700`}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h4 className="text-xl font-semibold">{exp.title}</h4>
                          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <PortfolioSecretary />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ScrollToTop />
      <VoiceFeedback isListening={isListening} feedback={feedback} isSupported={isSupported} />
    </div>
  )
}
