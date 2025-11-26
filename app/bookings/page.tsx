import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Phone } from "lucide-react"
import { redirect } from "next/navigation"

export default async function BookingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      `
      *,
      event_halls(name, location, contact_phone),
      entertainers(name, phone)
    `,
    )
    .eq("user_id", user.id)
    .order("booking_date", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">حجوزاتي</h1>
          <p className="text-muted-foreground text-center mb-8">جميع الحجوزات والمواعيد الخاصة بك</p>

          {!bookings || bookings.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">لا توجد حجوزات حالياً</h2>
              <p className="text-muted-foreground">ابدأ بحجز قاعة أو مطرب لمناسبتك القادمة</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {booking.event_halls?.name || booking.entertainers?.name}
                      </h3>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : booking.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {booking.status === "confirmed"
                          ? "مؤكد"
                          : booking.status === "pending"
                            ? "قيد المراجعة"
                            : "ملغي"}
                      </Badge>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-primary">{booking.total_price} د.أ</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(booking.booking_date).toLocaleDateString("ar-JO")}</span>
                    </div>

                    {booking.event_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{booking.event_time}</span>
                      </div>
                    )}

                    {booking.event_halls?.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.event_halls.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{booking.event_halls?.contact_phone || booking.entertainers?.phone}</span>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        <strong>ملاحظات:</strong> {booking.notes}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
