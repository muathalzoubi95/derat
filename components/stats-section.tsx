import { Card } from "@/components/ui/card"
import { Users, Building2, Music, CheckCircle } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "5000+",
      label: "عميل راضٍ",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Building2,
      value: "40+",
      label: "قاعة أفراح",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Music,
      value: "80+",
      label: "فنان أردني",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: CheckCircle,
      value: "300+",
      label: "مزود خدمة",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">أرقام تتحدث عن نفسها</h2>
          <p className="text-muted-foreground text-lg">نفخر بخدمة الآلاف من العملاء في جميع أنحاء الأردن</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
