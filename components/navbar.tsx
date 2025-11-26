"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface NavbarProps {
  user?: any
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-sm safe-area-inset-top">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-base sm:text-lg">🇯🇴</span>
            </div>
            <span className="font-bold text-base sm:text-lg">خدماتكو</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              الرئيسية
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              الخدمات
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              القاعات
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              الفنانين
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              من نحن
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <User className="ml-2 h-4 w-4" />
                    حسابي
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">تسجيل الدخول</Link>
                </Button>
                <Button className="bg-gradient-to-r from-primary to-accent" asChild>
                  <Link href="/auth/signup">ابدأ الآن</Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 active:scale-90 transition-transform rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3">
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2.5 px-2 rounded-lg hover:bg-accent active:scale-95">
                الرئيسية
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2.5 px-2 rounded-lg hover:bg-accent active:scale-95">
                الخدمات
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2.5 px-2 rounded-lg hover:bg-accent active:scale-95">
                القاعات
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2.5 px-2 rounded-lg hover:bg-accent active:scale-95">
                الفنانين
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2.5 px-2 rounded-lg hover:bg-accent active:scale-95">
                من نحن
              </a>
              <div className="flex flex-col gap-2 pt-3 border-t border-border">
                {user ? (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/dashboard">
                        <User className="ml-2 h-4 w-4" />
                        حسابي
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                      <LogOut className="ml-2 h-4 w-4" />
                      تسجيل الخروج
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/auth/login">تسجيل الدخول</Link>
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent" asChild>
                      <Link href="/auth/signup">ابدأ الآن</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
