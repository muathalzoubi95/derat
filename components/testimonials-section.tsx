import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "أحمد الخطيب",
      city: "عمان",
      rating: 5,
      text: "خدمة ممتازة! حجزت قاعة لحفل زفافي والتجربة كانت رائعة من البداية للنهاية",
      avatar: "👨‍💼",
    },
    {
      name: "سارة العمري",
      city: "الزرقاء",
      rating: 5,
      text: "وجدت أفضل كهربائي من خلال التطبيق، سريع ومحترف وبأسعار معقولة",
      avatar: "👩",
    },
    {
      name: "محمد الشريف",
      city: "إربد",
      rating: 5,
      text: "منصة احترافية وسهلة الاستخدام، ساعدتني في إيجاد فرقة موسيقية رائعة لمناسبتي",
      avatar: "👨",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">آراء عملائنا</h2>
          <p className="text-muted-foreground text-lg">اكتشف تجارب عملائنا السعداء في جميع أنحاء الأردن</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
