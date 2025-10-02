"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

const coaches = [
  {
    name: "Дмитрий Балашов",
    specialty: "Бокс",
    achievements: "Главный тренер, победитель всероссийских турниров",
    image: "/coaches/coach-2.jpg",
  },
  {
    name: "Кудряшов Александр",
    specialty: "Бокс",
    achievements: "Главный тренер. Чемпион России по лёгкой атлетике, тренер",
    image: "/coaches/coach-1.jpg",
  },
  {
    name: "Луиза Давыдова",
    specialty: "Женский бокс",
    achievements: "Мастер спорта России, действующий профи-боксер",
    image: "/coaches/coach-3.jpg",
  },
  {
    name: "Хошокова Диляра",
    specialty: "Женский бокс",
    achievements: "Женская группа. КМС, многократная призёрка первенств России",
    image: "/coaches/coach-4.jpg",
  },
  {
    name: "Иванов Артём",
    specialty: "Бокс",
    achievements: "Детская группа. Тренер, действующий профессиональный боксер",
    image: "/coaches/coach-5.jpg",
  },
  {
    name: "Эльвира Балякина",
    specialty: "Растяжка",
    achievements: "Мастер спорта по спортивной аэробике, чемпионка мира",
    image: "/coaches/coach-6.jpg",
  },
  {
    name: "Олег Харьков",
    specialty: "Бокс",
    achievements: "Мастер спорта России, член сборной России 2014-2015",
    image: "/coaches/coach-7.jpg",
  },
]

export function CoachesSection() {
  const isMobile = useMobile()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-12 bg-black">
      <div className="px-4 space-y-6">
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <h2 className="text-3xl font-bold text-center mb-2">Тренеры</h2>
          <p className="text-center text-zinc-400 text-sm">Профессионалы с опытом</p>
        </div>

        {isMobile ? (
          <div className="relative -mx-4">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView="auto"
              centeredSlides={true}
              grabCursor={true}
              touchRatio={1}
              threshold={5}
              resistance={true}
              resistanceRatio={0.85}
              speed={400}
              onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
              className="!px-4 !py-2"
            >
              {coaches.map((coach, index) => (
                <SwiperSlide key={index} className="!w-[85vw] max-w-[400px]">
                  <Card className="overflow-hidden bg-zinc-900 border-zinc-800 transition-all duration-300 active:scale-[0.98] shadow-xl p-0">
                    <div className="relative aspect-[3/4]">
                      <img
                        src={coach.image || "/placeholder.svg"}
                        alt={coach.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#ff3b30] text-white border-0 text-xs font-semibold px-3 py-1 shadow-lg">
                        {coach.specialty}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold mb-1">{coach.name}</h3>
                      <p className="text-sm text-zinc-400">{coach.achievements}</p>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-center items-center gap-2 mt-6">
              {coaches.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const swiper = document.querySelector(".swiper") as any
                    if (swiper?.swiper) swiper.swiper.slideTo(i)
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 h-2 bg-[#ff3b30] shadow-[0_0_8px_rgba(255,59,48,0.5)]"
                      : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Перейти к тренеру ${i + 1}`}
                />
              ))}
            </div>

            <p className="text-center text-xs text-zinc-500 mt-3 font-medium">
              {activeIndex + 1} / {coaches.length}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {coaches.map((coach, index) => (
              <div
                key={index}
                className="animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-[#ff3b30]/50 transition-all hover:scale-105 p-0">
                  <div className="relative aspect-[3/4]">
                    <img
                      src={coach.image || "/placeholder.svg"}
                      alt={coach.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#ff3b30] text-white border-0 text-xs">
                      {coach.specialty}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">{coach.name}</h3>
                    <p className="text-xs text-zinc-400">{coach.achievements}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
