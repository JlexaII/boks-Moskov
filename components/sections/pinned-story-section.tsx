"use client"

import { useState, useRef, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

const storySteps = [
  {
    title: "Приходи",
    subtitle: "пробное — 0 ₽",
    videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3312-1xtirIrJfycuDZYRTNE7HzPxTauCnO.MOV",
    posterUrl: "/boxing-training-video-1.jpg",
  },
  {
    title: "Тренируйся",
    subtitle: "с профи",
    videoUrl: "/training-video-2.mp4",
    posterUrl: "/boxing-training-video-2.jpg",
  },
  {
    title: "Становись сильнее",
    subtitle: "скорость · техника",
    videoUrl: "/boxing-training-video-3.jpg",
    posterUrl: "/boxing-training-video-3.jpg",
  },
  {
    title: "Выходи на ринг",
    subtitle: "соревнования",
    videoUrl: "/boxing-training-video-4.jpg",
    posterUrl: "/boxing-training-video-4.jpg",
  },
]

export function PinnedStorySection() {
  const isMobile = useMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const [videoError, setVideoError] = useState<{ [key: number]: boolean }>({})
  const [videoLoading, setVideoLoading] = useState<{ [key: number]: boolean }>({})
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null)

  const handleVideoError = (index: number) => {
    setVideoError((prev) => ({ ...prev, [index]: true }))
    setVideoLoading((prev) => ({ ...prev, [index]: false }))
  }

  const handleVideoLoad = (index: number) => {
    setVideoLoading((prev) => ({ ...prev, [index]: false }))
  }

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex
    setActiveIndex(newIndex)

    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== newIndex) {
        video.pause()
      }
    })

    const activeVideo = videoRefs.current[newIndex]
    if (activeVideo && !videoError[newIndex]) {
      activeVideo.play().catch(() => {})
    }
  }

  const handleDesktopStoryClick = (index: number) => {
    setActiveIndex(index)
    if (desktopVideoRef.current && !videoError[index]) {
      desktopVideoRef.current.play().catch(() => {})
    }
  }

  useEffect(() => {
    if (isMobile && videoRefs.current[0] && !videoError[0]) {
      videoRefs.current[0].play().catch(() => {})
    }
  }, [isMobile, videoError])

  useEffect(() => {
    if (!isMobile && desktopVideoRef.current && !videoError[activeIndex]) {
      desktopVideoRef.current.play().catch(() => {})
    }
  }, [isMobile, activeIndex, videoError])

  if (isMobile) {
    return (
      <section className="relative bg-black py-8">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView="auto"
          centeredSlides={true}
          onSlideChange={handleSlideChange}
          className="!px-4"
        >
          {storySteps.map((step, index) => (
            <SwiperSlide key={index} className="!w-[85vw]">
              <div className="h-[70vh] relative bg-gradient-to-b from-zinc-900 to-black rounded-xl overflow-hidden">
                <div className="absolute inset-0">
                  {videoError[index] || (!step.videoUrl.endsWith(".mov") && !step.videoUrl.endsWith(".mp4")) ? (
                    <img
                      src={step.posterUrl || step.videoUrl}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={step.videoUrl}
                        poster={step.posterUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="none"
                        onError={() => handleVideoError(index)}
                        onLoadedData={() => handleVideoLoad(index)}
                      />
                      {videoLoading[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="w-12 h-12 border-4 border-[#ff3b30] border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 space-y-2 text-center p-6 pb-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h2 className="text-4xl font-bold text-white drop-shadow-lg">{step.title}</h2>
                  <p className="text-lg text-[#ff3b30] drop-shadow-lg">{step.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center items-center gap-2 mt-5">
          {storySteps.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === activeIndex ? "w-8 h-2 bg-[#ff3b30]" : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        <p className="text-center text-xs text-zinc-500 mt-2">
          {activeIndex + 1} / {storySteps.length}
        </p>
      </section>
    )
  }

  const currentStep = storySteps[activeIndex]

  return (
    <section className="relative min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff3b30]/30 to-transparent blur-3xl" />
            <div className="relative h-full bg-gradient-to-b from-zinc-900 to-black rounded-2xl overflow-hidden">
              <div className="absolute inset-0">
                {videoError[activeIndex] ||
                (!currentStep.videoUrl.endsWith(".mov") && !currentStep.videoUrl.endsWith(".mp4")) ? (
                  <img
                    src={currentStep.posterUrl || currentStep.videoUrl}
                    alt={currentStep.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <video
                      ref={desktopVideoRef}
                      src={currentStep.videoUrl}
                      poster={currentStep.posterUrl}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      onError={() => handleVideoError(activeIndex)}
                      onLoadedData={() => handleVideoLoad(activeIndex)}
                    />
                    {videoLoading[activeIndex] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="w-12 h-12 border-4 border-[#ff3b30] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Story progress bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1">
                {storySteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i === activeIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 space-y-2 text-center p-6 pb-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h2 className="text-4xl font-bold text-white drop-shadow-lg">{currentStep.title}</h2>
                <p className="text-lg text-[#ff3b30] drop-shadow-lg">{currentStep.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {storySteps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleDesktopStoryClick(index)}
                className={`w-full text-left space-y-2 p-6 rounded-xl transition-all ${
                  index === activeIndex
                    ? "bg-zinc-900 border-2 border-[#ff3b30]"
                    : "bg-zinc-900/50 border-2 border-zinc-800 hover:border-[#ff3b30]/50"
                }`}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">{step.title}</h2>
                  <p className="text-xl text-[#ff3b30]">{step.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
