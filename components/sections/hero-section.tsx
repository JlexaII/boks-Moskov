"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const handleScrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        <img src="/tbt-pro-gym.jpg" alt="TBT-PRO Зал" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-20 w-full px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="flex justify-center mb-4">
              <img
                src="/tbt-pro-logo.png"
                alt="TBT-PRO Professional Tactic Boxing Team"
                className="w-[280px] md:w-[400px] h-auto"
              />
            </div>
            <p className="text-xl md:text-2xl text-white/80">Бокс · Муай-тай · MMA</p>
          </div>

          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <Button
              size="lg"
              className="w-full h-14 text-lg bg-[#ff3b30] hover:bg-[#ff3b30]/90 font-bold transition-all hover:scale-105 active:scale-95"
              onClick={handleScrollToBooking}
            >
              Пробная тренировка — 0 ₽
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-4 animate-in fade-in duration-700 delay-200">
            <Badge variant="secondary" className="px-3 py-1.5 text-xs bg-white/10 backdrop-blur border-white/20">
              500+ учеников
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5 text-xs bg-white/10 backdrop-blur border-white/20">
              10 чемпионов
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5 text-xs bg-white/10 backdrop-blur border-white/20">
              м.Волгоградский проспект
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
