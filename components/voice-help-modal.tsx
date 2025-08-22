"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Mic } from "lucide-react"

interface VoiceCommand {
  phrases: string[]
  description: string
}

interface VoiceHelpModalProps {
  commands: VoiceCommand[]
  isSupported: boolean
}

export function VoiceHelpModal({ commands, isSupported }: VoiceHelpModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isSupported) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <HelpCircle className="h-4 w-4 mr-2" />
          Voice Help
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mic className="h-5 w-5 text-primary" />
            <span>Voice Commands Guide</span>
          </DialogTitle>
          <DialogDescription>
            Use these voice commands to navigate the portfolio hands-free. Click the microphone button and speak
            clearly.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4">
            {commands.map((command, index) => (
              <Card key={index} className="p-4">
                <h4 className="font-medium mb-2">{command.description}</h4>
                <div className="flex flex-wrap gap-2">
                  {command.phrases.map((phrase, phraseIndex) => (
                    <Badge key={phraseIndex} variant="secondary" className="text-xs">
                      "{phrase}"
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Tips for better recognition:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Speak clearly and at normal pace</li>
              <li>• Ensure your microphone is working</li>
              <li>• Try different phrases if one doesn't work</li>
              <li>• Say "help" to hear available commands</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
