"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const testimonials = [
  {
    name: "Алексей Морозов",
    age: 32,
    achievement: "Похудел на 18 кг за 4 месяца",
    quote:
      "Пришел в TBT-PRO с лишним весом и низкой самооценкой. Тренеры составили индивидуальную программу, и результат превзошел все ожидания. Не только сбросил вес, но и обрел уверенность в себе.",
    results: ["18 кг", "4 месяца", "Бокс + Фитнес"],
    rating: 5,
  },
  {
    name: "Мария Соколова",
    age: 28,
    achievement: "Подготовилась к первому соревнованию",
    quote:
      "Всегда мечтала заниматься боевыми искусствами. В TBT-PRO нашла не просто зал, а настоящую семью. За полгода подготовилась к соревнованиям и заняла 2 место в своей категории!",
    results: ["2 место", "6 месяцев", "Муай-тай"],
    rating: 5,
  },
  {
    name: "Дмитрий Кузнецов",
    age: 45,
    achievement: "Вернул форму после травмы",
    quote:
      "После травмы думал, что спорт для меня закончен. Тренеры TBT-PRO помогли восстановиться и вернуться в форму. Сейчас чувствую себя лучше, чем 10 лет назад.",
    results: ["Полное восстановление", "8 месяцев", "Реабилитация"],
    rating: 5,
  },
  {
    name: "Анна Волкова",
    age: 35,
    achievement: "Сбросила 12 кг и обрела энергию",
    quote:
      "После рождения ребенка никак не могла вернуться в форму. Женские группы в TBT-PRO стали для меня спасением. Сбросила вес, появилась энергия, и главное - нашла время для себя.",
    results: ["12 кг", "5 месяцев", "Женский бокс"],
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <Badge className="bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/20 px-4 py-1.5">Истории успеха</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Результаты наших учеников</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Реальные истории людей, которые изменили свою жизнь вместе с TBT-PRO
          </p>
        </div>

        {/* Mobile Swiper */}
        <div className="lg:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletActiveClass: "!bg-[#ff3b30]",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="!pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8 hover:border-[#ff3b30]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#ff3b30]/5">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
            <p className="text-sm text-zinc-400">{testimonial.age} лет</p>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#ff3b30] text-[#ff3b30]" />
            ))}
          </div>
        </div>

        {/* Achievement Badge */}
        <Badge className="bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/20 text-sm font-semibold">
          {testimonial.achievement}
        </Badge>

        {/* Quote */}
        <blockquote className="text-zinc-300 leading-relaxed italic border-l-2 border-[#ff3b30]/30 pl-4">
          "{testimonial.quote}"
        </blockquote>

        {/* Results */}
        <div className="flex flex-wrap gap-2 pt-2">
          {testimonial.results.map((result, idx) => (
            <div key={idx} className="px-3 py-1.5 bg-zinc-800/50 rounded-lg text-sm text-zinc-300 font-medium">
              {result}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
