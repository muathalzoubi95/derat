"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [phone, setPhone] = useState("")
  const [userType, setUserType] = useState("customer")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            phone: phone,
            user_type: userType,
          },
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}`,
        },
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "حدث خطأ أثناء التسجيل")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div
        className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5"
        dir="rtl"
      >
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">تم التسجيل بنجاح!</CardTitle>
            <CardDescription>يرجى التحقق من بريدك الإلكتروني لتفعيل حسابك</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">إنشاء حساب جديد</CardTitle>
            <CardDescription className="text-base">انضم إلينا واحصل على أفضل الخدمات</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">الاسم الكامل</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="h-11"
                />
              </div>
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
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+966 5xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
              <div className="space-y-3">
                <Label>نوع الحساب</Label>
                <RadioGroup value={userType} onValueChange={setUserType} className="space-y-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer" className="cursor-pointer font-normal">
                      عميل (أبحث عن خدمات)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="provider" id="provider" />
                    <Label htmlFor="provider" className="cursor-pointer font-normal">
                      مزود خدمة (أقدم خدمات)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? "جارِ التسجيل..." : "إنشاء حساب"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                لديك حساب بالفعل؟{" "}
                <Link href="/auth/login" className="text-primary font-medium hover:underline">
                  تسجيل الدخول
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
