"use client"

import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Calendar } from "lucide-react"

export function StickyBottomBar() {
  const handleCall = () => {
    window.location.href = "tel:+74951234567"
  }

  const handleMessenger = () => {
    window.open("https://t.me/tbtpro", "_blank")
  }

  const handleBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-in slide-in-from-bottom duration-500 delay-1000">
      <div className="bg-black/80 backdrop-blur-xl border-t border-white/5 px-2 py-2 pb-safe">
        <div className="grid grid-cols-3 gap-1">
          <Button
            variant="ghost"
            onClick={handleCall}
            className="flex-col h-auto py-2 px-3 hover:bg-white/5 bg-transparent rounded-xl transition-all active:scale-95 gap-1"
            aria-label="Позвонить"
          >
            <Phone className="w-6 h-6" />
            <span className="text-xs font-medium">Позвонить</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleMessenger}
            className="flex-col h-auto py-2 px-3 hover:bg-white/5 bg-transparent rounded-xl transition-all active:scale-95 gap-1"
            aria-label="Написать"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Написать</span>
          </Button>

          <Button
            onClick={handleBooking}
            className="flex-col h-auto py-2 px-3 bg-[#ff3b30] hover:bg-[#ff3b30]/90 rounded-xl transition-all active:scale-95 gap-1"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-semibold">Записаться</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
