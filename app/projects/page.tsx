"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { useVoiceCommands } from "@/hooks/use-voice-commands";
import { portfolioData } from "@/lib/portfolio-data";
import { ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";
import { VoiceFeedback } from "@/components/voice-feedback";

export default function ProjectsPage() {
  const { isListening, isSupported, toggleListening, feedback } =
    useVoiceCommands();

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onVoiceToggle={isSupported ? toggleListening : undefined}
        isListening={isListening}
      />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-in fade-in-50 duration-700">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                My Projects
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A showcase of my recent work in web development, featuring
                modern technologies and innovative solutions
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {portfolioData.projects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 animate-in slide-in-from-bottom-5`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Project Image */}
                  <div className="relative aspect-video bg-muted/50 overflow-hidden">
                    <img
                      // src={`${project.img} ? height=400&width=600&query=${project.title} project screenshot interface`}
                      src={project.img}
                      alt={`${project.title} Screenshot`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 animate-in slide-in-from-top-2 duration-500 delay-300">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    {/* <div className="mb-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className={`text-xs bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 transition-colors animate-in fade-in-50 duration-500`}
                            style={{ animationDelay: `${techIndex * 50}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div> */}

                    {/* Project Links */}
                    <div className="flex gap-3">
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="hover:scale-105 transition-transform duration-200 bg-transparent"
                      >
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16 animate-in slide-in-from-bottom-5 duration-700 delay-800">
              <Card className="p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-4">
                  Interested in Working Together?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  I'm always excited to take on new challenges and create
                  amazing digital experiences. Let's discuss how I can help
                  bring your project to life.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ScrollToTop />
      <VoiceFeedback
        isListening={isListening}
        feedback={feedback}
        isSupported={isSupported}
      />
    </div>
  );
}
