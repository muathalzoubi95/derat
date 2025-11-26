"use client"

import { Home, Search, Calendar, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "الرئيسية", href: "/" },
    { icon: Search, label: "بحث", href: "/search" },
    { icon: Calendar, label: "حجوزاتي", href: "/bookings" },
    { icon: User, label: "حسابي", href: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border md:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200",
                "min-w-[70px] active:scale-95",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className={cn("text-xs font-medium", isActive && "font-semibold")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
