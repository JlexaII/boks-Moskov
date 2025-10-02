import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import "swiper/css"
import "swiper/css/pagination"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TBT-PRO — Клуб единоборств в Москве | Бокс, Муай-тай, MMA",
  description:
    "Клуб единоборств TBT-PRO в Москве. Бокс, Муай-тай, MMA. Пробная тренировка бесплатно. м. Волгоградский проспект. 3000+ выпускников, 10 чемпионов.",
  generator: "v0.app",
  keywords: ["бокс москва", "муай-тай", "mma", "единоборства", "тренировки", "волгоградский проспект"],
  openGraph: {
    title: "TBT-PRO — Клуб единоборств в Москве",
    description: "Бокс, Муай-тай, MMA. Пробная тренировка бесплатно. 3000+ выпускников",
    type: "website",
    locale: "ru_RU",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "TBT-PRO",
              description: "Клуб единоборств: Бокс, Муай-тай, MMA",
              telephone: "+7-495-123-45-67",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Волгоградский пр-т, 28с1",
                addressLocality: "Москва",
                addressCountry: "RU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 55.7093,
                longitude: 37.7172,
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  )
}
