"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState, useRef, useEffect, type FormEvent } from "react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/pagination"

const fullSchedule = [
  // Monday
  { day: "ПН", time: "09:00", discipline: "Бокс", coach: "Иванов Артем", type: "boxing" },
  { day: "ПН", time: "11:00", discipline: "Бокс", coach: "Харьков Олег", type: "boxing" },
  { day: "ПН", time: "16:00", discipline: "Детская группа новички", coach: "Артём Иванов", type: "kids" },
  { day: "ПН", time: "17:00", discipline: "Группа детская PRO", coach: "Балашов Дмитрий", type: "kids" },
  { day: "ПН", time: "18:30", discipline: "Тайский бокс", coach: "Орлова Александра", type: "muaythai" },
  { day: "ПН", time: "20:00", discipline: "Бокс", coach: "Балашов Дмитрий", type: "boxing" },

  // Tuesday
  { day: "ВТ", time: "11:00", discipline: "ОФП", coach: "Кудряшов Александр", type: "fitness" },
  { day: "ВТ", time: "13:00", discipline: "Спарринги", coach: "", type: "sparring" },
  { day: "ВТ", time: "14:00", discipline: "Растяжка", coach: "Балькина Эльвира", type: "stretching" },
  { day: "ВТ", time: "18:15", discipline: "Бокс", coach: "Иванов Артем", type: "boxing" },
  { day: "ВТ", time: "19:30", discipline: "ОФП", coach: "Кудряшов Александр", type: "fitness" },
  { day: "ВТ", time: "19:30", discipline: "Женская группа по боксу", coach: "Хошокова Диляра", type: "women" },

  // Wednesday
  { day: "СР", time: "09:00", discipline: "Бокс", coach: "Иванов Артем", type: "boxing" },
  { day: "СР", time: "11:00", discipline: "Бокс", coach: "Харьков Олег", type: "boxing" },
  { day: "СР", time: "16:00", discipline: "Детская группа новички", coach: "Артём Иванов", type: "kids" },
  { day: "СР", time: "17:00", discipline: "Группа детская PRO", coach: "Балашов Дмитрий", type: "kids" },
  { day: "СР", time: "18:30", discipline: "Тайский бокс", coach: "Орлова Александра", type: "muaythai" },
  { day: "СР", time: "20:00", discipline: "Бокс", coach: "Балашов Дмитрий", type: "boxing" },

  // Thursday
  { day: "ЧТ", time: "11:00", discipline: "ОФП", coach: "Кудряшов Александр", type: "fitness" },
  { day: "ЧТ", time: "14:00", discipline: "Растяжка", coach: "Балькина Эльвира", type: "stretching" },
  { day: "ЧТ", time: "18:15", discipline: "Бокс", coach: "Иванов Артем", type: "boxing" },
  { day: "ЧТ", time: "19:30", discipline: "ОФП", coach: "Кудряшов Александр", type: "fitness" },
  { day: "ЧТ", time: "19:30", discipline: "Женская группа по боксу", coach: "Хошокова Диляра", type: "women" },

  // Friday
  { day: "ПТ", time: "09:00", discipline: "Бокс", coach: "Иванов Артем", type: "boxing" },
  { day: "ПТ", time: "11:00", discipline: "Бокс", coach: "Харьков Олег", type: "boxing" },
  { day: "ПТ", time: "16:00", discipline: "Детская группа новички", coach: "Артём Иванов", type: "kids" },
  { day: "ПТ", time: "17:00", discipline: "Группа детская PRO", coach: "Балашов Дмитрий", type: "kids" },
  { day: "ПТ", time: "18:30", discipline: "Тайский бокс", coach: "Орлова Александра", type: "muaythai" },
  { day: "ПТ", time: "20:00", discipline: "Бокс", coach: "Балашов Дмитрий", type: "boxing" },

  // Saturday
  { day: "СБ", time: "12:00", discipline: "Спарринги", coach: "", type: "sparring" },
]

const timeSlots = ["09:00", "11:00", "12:00", "13:00", "14:00", "16:00", "17:00", "18:15", "18:30", "19:30", "20:00"]
const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

const classColors = {
  boxing: "bg-[#ff3b30]/20 text-[#ff3b30] border-[#ff3b30]/30",
  muaythai: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  fitness: "bg-green-500/20 text-green-400 border-green-500/30",
  stretching: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  sparring: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  kids: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  women: "bg-pink-500/20 text-pink-400 border-pink-500/30",
}

function getCurrentDayIndex() {
  const today = new Date().getDay()
  // Sunday is 0, Monday is 1, etc. We want Monday to be 0, so we adjust
  return today === 0 ? 5 : today - 2
}

export function BookingSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    consent: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const swiperRef = useRef<SwiperType | null>(null)
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(getCurrentDayIndex())
  const [initialSlide] = useState(getCurrentDayIndex())

  useEffect(() => {
    if (swiperRef.current && isMobile) {
      const currentDay = getCurrentDayIndex()
      swiperRef.current.slideTo(currentDay, 0)
    }
  }, [isMobile])

  const scrollToDay = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.name.length < 2) {
      newErrors.name = "Минимум 2 символа"
    }

    const cleanedPhone = formData.phone.replace(/[\s()-]/g, "")
    if (!/^\+?[0-9]{10,12}$/.test(cleanedPhone)) {
      newErrors.phone = "Некорректный номер"
    }

    if (!formData.consent) {
      newErrors.consent = "Необходимо согласие"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setIsSubmitted(true)
      toast({
        title: "Заявка отправлена!",
        description: "Перезвоним за 10 минут",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Попробуйте еще раз",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const getClassForSlot = (day: string, time: string) => {
    return fullSchedule.filter((c) => c.day === day && c.time === time)
  }

  const filteredSchedule =
    selectedFilter === "all" ? fullSchedule : fullSchedule.filter((c) => c.type === selectedFilter)

  const handleScheduleItemClick = (classItem: { discipline: string; time: string; type: string }) => {
    // Scroll to booking form
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)

    // Show toast notification
    toast({
      title: "Занятие выбрано",
      description: `${classItem.discipline} в ${classItem.time}`,
    })
  }

  return (
    <section id="booking" className="py-12 pb-24 md:pb-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <Card className="bg-gradient-to-br from-[#ff3b30] to-[#ff3b30]/80 border-0 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/boxing-gloves-pattern.jpg')] opacity-10" />
            <h2 className="text-3xl font-bold mb-2 text-white relative">Первое занятие — 0 ₽</h2>
            <p className="text-white/90 text-sm relative">Дарим капу или бинты при покупке абонемента </p>
          </Card>
        </div>

        <div className="space-y-6 w-full max-w-full box-border">
          <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-[#ff3b30]/10 to-transparent p-6 md:p-8 border-b border-zinc-800/50">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Записаться на тренировку
              </h3>
              <p className="text-sm text-zinc-400">Заполните форму и мы свяжемся с вами</p>
            </div>

            <div className="p-6 md:p-8">
              {!isSubmitted ? (
                <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-300">Ваше имя</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Иван Иванов"
                      required
                      className={`h-12 bg-black/50 border-zinc-700 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 transition-all ${
                        errors.name ? "border-[#ff3b30] shake" : formData.name ? "border-green-500/50" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-[#ff3b30] animate-in fade-in slide-in-from-top duration-200">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-300">Телефон</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      type="tel"
                      required
                      className={`h-12 bg-black/50 border-zinc-700 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 transition-all ${
                        errors.phone ? "border-[#ff3b30]" : formData.phone ? "border-green-500/50" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#ff3b30] animate-in fade-in slide-in-from-top duration-200">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <div
                      className={`flex items-start gap-3 p-4 rounded-xl bg-black/30 border transition-all hover:bg-black/50 ${
                        errors.consent ? "border-[#ff3b30]" : "border-zinc-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => updateField("consent", e.target.checked)}
                        className="mt-0.5 w-5 h-5 accent-[#ff3b30] cursor-pointer rounded"
                        id="consent"
                      />
                      <label htmlFor="consent" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
                        Согласен на обработку персональных данных и получение информационных сообщений
                      </label>
                    </div>
                    {errors.consent && (
                      <p className="text-xs text-[#ff3b30] mt-2 animate-in fade-in slide-in-from-top duration-200">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-[#ff3b30] to-[#ff3b30]/90 hover:from-[#ff3b30]/90 hover:to-[#ff3b30] font-bold text-base shadow-xl shadow-[#ff3b30]/30 transition-all hover:shadow-2xl hover:shadow-[#ff3b30]/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      "Отправка..."
                    ) : (
                      <span className="flex items-center gap-2">
                        Записаться бесплатно
                        <span>→</span>
                      </span>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in duration-500">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#ff3b30] to-[#ff3b30]/80 shadow-2xl shadow-[#ff3b30]/30 animate-in zoom-in duration-700">
                    <span className="text-5xl text-white animate-in zoom-in duration-1000 delay-200">✓</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Заявка принята!</h4>
                    <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
                      Наш менеджер свяжется с вами в течение 10 минут для подтверждения записи
                    </p>
                  </div>
                  <div className="pt-4">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                      Ожидайте звонка
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card
            id="schedule"
            className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-zinc-800 overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-[#ff3b30]/10 to-transparent p-4 md:p-5 border-b border-zinc-800/50">
              <h3 className="text-xl md:text-2xl font-bold mb-1">Расписание на неделю</h3>
              <p className="text-xs text-zinc-400">Выберите удобное время для тренировки</p>
            </div>

            <div className="p-3 md:p-5">
              <div className="relative mb-5">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:overflow-x-auto pb-2 md:scrollbar-hide md:-mx-3 md:px-3">
                  <button
                    onClick={() => setSelectedFilter("all")}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      selectedFilter === "all"
                        ? "bg-gradient-to-r from-[#ff3b30] to-[#ff3b30]/80 text-white shadow-lg shadow-[#ff3b30]/30 scale-105"
                        : "bg-zinc-800/70 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 active:scale-95"
                    }`}
                  >
                    Все
                  </button>
                  <button
                    onClick={() => setSelectedFilter("boxing")}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      selectedFilter === "boxing"
                        ? "bg-gradient-to-r from-[#ff3b30] to-[#ff3b30]/80 text-white shadow-lg shadow-[#ff3b30]/30 scale-105"
                        : "bg-zinc-800/70 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 active:scale-95"
                    }`}
                  >
                    Бокс
                  </button>
                  <button
                    onClick={() => setSelectedFilter("muaythai")}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      selectedFilter === "muaythai"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                        : "bg-zinc-800/70 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 active:scale-95"
                    }`}
                  >
                    Тайский бокс
                  </button>
                  <button
                    onClick={() => setSelectedFilter("fitness")}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      selectedFilter === "fitness"
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 scale-105"
                        : "bg-zinc-800/70 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 active:scale-95"
                    }`}
                  >
                    ОФП
                  </button>
                  <button
                    onClick={() => setSelectedFilter("kids")}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      selectedFilter === "kids"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30 scale-105"
                        : "bg-zinc-800/70 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 active:scale-95"
                    }`}
                  >
                    Детские
                  </button>
                </div>
                <div className="hidden md:block absolute right-0 top-0 bottom-2 w-20 bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none" />
              </div>

              {isMobile ? (
                <div className="relative -mx-3">
                  <Swiper
                    modules={[Pagination]}
                    spaceBetween={12}
                    slidesPerView={1}
                    centeredSlides={true}
                    initialSlide={initialSlide}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper
                    }}
                    onSlideChange={(swiper) => {
                      setSelectedScheduleIndex(swiper.activeIndex)
                    }}
                    touchRatio={1}
                    threshold={5}
                    resistance={true}
                    resistanceRatio={0.85}
                    speed={400}
                    className="!pb-2 !px-3"
                  >
                    {days.map((day, dayIndex) => {
                      const dayClasses = filteredSchedule.filter((c) => c.day === day)
                      return (
                        <SwiperSlide key={dayIndex} className="!w-auto">
                          <div className="w-[85vw] max-w-[400px] mx-auto p-4 rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800/50 shadow-xl hover:shadow-[#ff3b30]/10 hover:border-zinc-700 transition-all duration-300">
                            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/70">
                              <h4 className="font-bold text-2xl flex-shrink-0">{day}</h4>
                              <Badge
                                variant="secondary"
                                className="bg-[#ff3b30]/20 text-[#ff3b30] border-[#ff3b30]/40 text-xs font-bold px-3 py-1 shadow-lg shadow-[#ff3b30]/20 flex-shrink-0"
                              >
                                {dayClasses.length} занятий
                              </Badge>
                            </div>

                            <div className="space-y-2.5">
                              {dayClasses.length > 0 ? (
                                dayClasses.map((classItem, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => handleScheduleItemClick(classItem)}
                                    className={`p-3.5 rounded-xl border ${classColors[classItem.type as keyof typeof classColors]} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer`}
                                  >
                                    <div className="flex items-start justify-between mb-2 gap-2">
                                      <p className="font-bold text-base flex-shrink-0">{classItem.time}</p>
                                      <Badge className="text-xs font-bold bg-transparent border-0 px-0 text-right text-white">
                                        {classItem.discipline}
                                      </Badge>
                                    </div>
                                    {classItem.coach && <p className="text-xs opacity-90">{classItem.coach}</p>}
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-12 space-y-3">
                                  <p className="text-zinc-500 text-xs font-medium">Нет занятий</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>

                  <div className="flex justify-center items-center gap-2 mt-5 px-3">
                    {days.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToDay(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === selectedScheduleIndex
                            ? "w-8 h-2.5 bg-gradient-to-r from-[#ff3b30] to-[#ff3b30]/70 shadow-lg shadow-[#ff3b30]/30"
                            : "w-2.5 h-2.5 bg-white/20 hover:bg-white/50 hover:scale-125 active:scale-95"
                        }`}
                        aria-label={`Перейти к дню ${i + 1}`}
                      />
                    ))}
                  </div>

                  <p className="text-center text-xs text-zinc-500 mt-3 font-medium px-3">
                    {days[selectedScheduleIndex]} — {selectedScheduleIndex + 1} / {days.length}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-5 px-5">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      <div className="text-xs font-bold text-zinc-400 p-3 bg-zinc-800/50 rounded-xl">Время</div>
                      {days.map((day) => (
                        <div
                          key={day}
                          className="text-center text-base font-bold p-3 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-xl border border-zinc-800/50"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {timeSlots.map((time) => (
                        <div key={time} className="grid grid-cols-7 gap-2">
                          <div className="text-xs font-bold text-zinc-400 p-3 flex items-center bg-zinc-800/50 rounded-xl">
                            {time}
                          </div>
                          {days.map((day) => {
                            const classItems = getClassForSlot(day, time)
                            const filteredClasses =
                              selectedFilter === "all"
                                ? classItems
                                : classItems.filter((c) => c.type === selectedFilter)

                            return (
                              <div
                                key={`${day}-${time}`}
                                className={`min-h-[70px] rounded-xl border transition-all duration-300 ${
                                  filteredClasses.length > 0
                                    ? "bg-zinc-950/70 border-zinc-800/50 p-2 space-y-1.5"
                                    : "bg-zinc-950/70 border-zinc-800/50 hover:bg-zinc-900/50"
                                }`}
                              >
                                {filteredClasses.map((classItem, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => handleScheduleItemClick(classItem)}
                                    className={`rounded-lg border p-2 cursor-pointer hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg ${
                                      classColors[classItem.type as keyof typeof classColors]
                                    }`}
                                  >
                                    <div className="text-xs space-y-1">
                                      <p className="font-bold text-[10px] leading-tight text-white">
                                        {classItem.discipline}
                                      </p>
                                      {classItem.coach && (
                                        <p className="opacity-90 leading-tight text-[9px]">{classItem.coach}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-3 md:p-6 overflow-hidden w-full max-w-full box-border">
            <h3 className="text-lg font-bold mb-4">Как нас найти</h3>
            <div className="space-y-3 w-full max-w-full min-w-0 box-border">
              <div className="w-full max-w-full min-w-0">
                <p className="text-sm font-medium mb-1">Адрес</p>
                <p className="text-zinc-400 text-sm break-words w-full">Волгоградский пр-т, 28с1</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full max-w-full min-w-0">
                <Badge
                  variant="secondary"
                  className="bg-white/10 border-zinc-700 text-xs break-words max-w-full min-w-0"
                >
                  м. Волгоградский проспект
                </Badge>
                <Badge variant="secondary" className="bg-white/10 border-zinc-700 text-xs flex-shrink-0">
                  5 мин пешком
                </Badge>
              </div>
              <Button
                variant="outline"
                className="w-full max-w-full mt-2 border-zinc-700 hover:bg-zinc-800 bg-transparent transition-all active:scale-95"
              >
                Открыть на карте
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
