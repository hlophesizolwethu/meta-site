"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, ExternalLink } from "lucide-react"

export function FloatingChatbot() {
  const handleOpenZapierChat = () => {
    window.open("https://meta-p.zapier.app", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleOpenZapierChat}
        className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 animate-pulse group"
        title="Chat with Meta-P AI Assistant"
      >
        <div className="relative">
          <MessageCircle className="h-7 w-7" />
          <ExternalLink className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Button>
    </div>
  )
}
