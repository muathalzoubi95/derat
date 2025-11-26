"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">تسجيل الدخول</CardTitle>
            <CardDescription className="text-base">أدخل بياناتك للوصول إلى حسابك</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? "جارِ تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                ليس لديك حساب؟{" "}
                <Link href="/auth/signup" className="text-primary font-medium hover:underline">
                  إنشاء حساب جديد
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
