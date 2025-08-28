"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useVoiceCommands } from "@/hooks/use-voice-commands"
import { portfolioData } from "@/lib/portfolio-data"
import Link from "next/link"
import { ArrowRight, Code, Palette, Zap } from "lucide-react"
import { VoiceHelpModal } from "@/components/voice-help-modal"
import { AIVoiceInterface } from "@/components/ai-voice-interface"
import PortfolioSecretary from "./AiSecretary/PortfolioSecretary"

export default function HomePage() {
  const { isListening, isSupported, toggleListening, feedback, commands, currentLanguage, changeLanguage } =
    useVoiceCommands()

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onVoiceToggle={isSupported ? toggleListening : undefined}
        isListening={isListening}
        currentLanguage={currentLanguage}
        onLanguageChange={changeLanguage}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 animate-in fade-in-50 duration-700">
                <img
                  src="/professional-developer-portrait.jpg"
                  alt="Twubahimana Herve - Professional Portrait"
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/20 hover:border-primary/40 transition-colors duration-300"
                  loading="eager"
                />
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-in slide-in-from-bottom-5 duration-700 delay-150">
                {portfolioData.hero.name}
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 font-medium animate-in slide-in-from-bottom-5 duration-700 delay-300">
                {portfolioData.hero.tagline}
              </p>

              <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-5 duration-700 delay-500">
                {portfolioData.hero.summary}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-5 duration-700 delay-700">
                <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-transform duration-200">
                  <Link href="/projects">
                    {portfolioData.hero.cta.primary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent hover:scale-105 transition-transform duration-200"
                >
                  <Link href="/contact">{portfolioData.hero.cta.secondary}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 animate-in fade-in-50 duration-700">
                What I Bring to Your Project
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Code,
                    title: "Modern Development",
                    description:
                      "Building responsive, performant web applications using the latest technologies and best practices.",
                    color: "primary",
                  },
                  {
                    icon: Palette,
                    title: "UI/UX Focus",
                    description:
                      "Creating intuitive, beautiful interfaces that provide exceptional user experiences across all devices.",
                    color: "secondary",
                  },
                  {
                    icon: Zap,
                    title: "Performance Optimization",
                    description:
                      "Ensuring fast loading times and smooth interactions through careful optimization and modern techniques.",
                    color: "accent",
                  },
                ].map((feature, index) => (
                  <Card
                    key={feature.title}
                    className={`p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-5 duration-700`}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div
                      className={`w-16 h-16 bg-${feature.color}/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-in fade-in-50 duration-700">
                  Featured Projects
                </h2>
                <p className="text-lg text-muted-foreground animate-in fade-in-50 duration-700 delay-200">
                  A selection of my recent work showcasing modern web development
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {portfolioData.projects
                  .filter((p) => p.featured)
                  .map((project, index) => (
                    <Card
                      key={project.id}
                      className={`overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-5 duration-700`}
                      style={{ animationDelay: `${(index + 1) * 300}ms` }}
                    >
                      <div className="aspect-video bg-muted/50 flex items-center justify-center overflow-hidden">
                        <img
                          src={`${project.img}?height=300&width=500&query=${project.title} project screenshot`}
                          alt={`${project.title} Screenshot`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                        {/* <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div> */}
                      </div>
                    </Card>
                  ))}
              </div>

              <div className="text-center animate-in fade-in-50 duration-700 delay-1000">
                <Button asChild size="lg" className="hover:scale-105 transition-transform duration-200">
                  <Link href="/projects">
                    View All Projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

         <section id="portfolio-secretary">
        <PortfolioSecretary />
      </section>
      </main>

      <Footer />
      <ScrollToTop />

      <AIVoiceInterface />

      {/* Voice Help Modal - positioned in bottom left */}
      {isSupported && (
        <div className="fixed bottom-4 left-4 z-50">
          <VoiceHelpModal commands={commands} isSupported={isSupported} />
        </div>
      )}
    </div>
  )
}
