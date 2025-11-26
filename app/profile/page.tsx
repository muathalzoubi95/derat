import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Calendar, Settings } from "lucide-react"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: bookingsCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">حسابي</h1>

          <div className="grid gap-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profile?.full_name || "مستخدم جديد"}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5" />
                  <span>{user.email}</span>
                </div>

                {profile?.phone && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5" />
                    <span>{profile.phone}</span>
                  </div>
                )}

                {profile?.city && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>{profile.city}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>انضم في {new Date(user.created_at).toLocaleDateString("ar-JO")}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Settings className="h-4 w-4" />
                  تعديل الملف الشخصي
                </Button>
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">إحصائياتي</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">{bookingsCount?.count || 0}</div>
                  <div className="text-sm text-muted-foreground">إجمالي الحجوزات</div>
                </div>
                <div className="text-center p-4 bg-accent rounded-lg">
                  <div className="text-3xl font-bold mb-1">⭐ 4.8</div>
                  <div className="text-sm text-muted-foreground">تقييم المستخدم</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
