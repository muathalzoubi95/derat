import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import { BottomNav } from "@/components/bottom-nav"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
})

export const metadata: Metadata = {
  title: "خدماتكو - أول منصة أردنية شاملة للخدمات",
  description: "أول تطبيق أردني متخصص للخدمات المنزلية، حجز القاعات، والمطربين في عمان والأردن",
  keywords: "خدمات أردنية, سباك عمان, كهربائي عمان, قاعات أفراح الأردن, مطربين أردنيين",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "خدماتكو",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${tajawal.className} font-sans antialiased`}>
        <div className="pb-16 md:pb-0 min-h-screen">{children}</div>
        <BottomNav />
      </body>
    </html>
  )
}
