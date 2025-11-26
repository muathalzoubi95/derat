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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-xl border-t border-border/50 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around px-2 pb-2 pt-1 safe-area-inset-bottom">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300",
                "min-w-[70px] active:scale-90",
                isActive ? "text-primary bg-primary/10 scale-105" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div className={cn(
                "relative transition-all duration-300",
                isActive && "animate-in zoom-in-50"
              )}>
                <Icon className={cn(
                  "h-6 w-6 transition-all duration-300",
                  isActive && "stroke-[2.5]"
                )} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive && "font-bold text-[11px]"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
