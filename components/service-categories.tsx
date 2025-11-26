import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Zap, Car, Hammer, Paintbrush, Droplet, Clock, Star, Sparkles, Wind, TreeDeciduous } from "lucide-react"

interface ServiceCategory {
  id: string
  name_ar: string
  name_en: string
  description_ar?: string
  icon?: string
}

interface ServiceCategoriesProps {
  categories: ServiceCategory[]
}

const iconMap: Record<string, any> = {
  Wrench,
  Zap,
  Car,
  Hammer,
  Paintbrush,
  Droplet,
  Sparkles,
  Wind,
  TreeDeciduous,
}

// Fallback data if database is empty
const defaultServices = [
  {
    id: "1",
    name_ar: "سباك",
    description_ar: "خبراء سباكة أردنيين معتمدين في عمان وجميع المحافظات",
    icon: "Droplet",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-600",
    available: true,
    rating: 4.8,
  },
  {
    id: "2",
    name_ar: "كهربائي",
    description_ar: "كهربائيين محترفين أردنيين متوفرين على مدار الساعة",
    icon: "Zap",
    gradient: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    iconColor: "text-yellow-600",
    available: true,
    rating: 4.9,
  },
  {
    id: "3",
    name_ar: "ميكانيكي",
    description_ar: "أفضل ميكانيكيين أردنيين لصيانة وإصلاح السيارات",
    icon: "Car",
    gradient: "from-red-500 to-pink-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    iconColor: "text-red-600",
    available: true,
    rating: 4.7,
  },
  {
    id: "4",
    name_ar: "نجار",
    description_ar: "نجارين أردنيين مهرة لجميع أعمال النجارة والأثاث",
    icon: "Hammer",
    gradient: "from-amber-600 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-600",
    available: true,
    rating: 4.6,
  },
  {
    id: "5",
    name_ar: "دهان",
    description_ar: "أفضل الدهانين والديكوريين الأردنيين لمنزل أجمل",
    icon: "Paintbrush",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    iconColor: "text-purple-600",
    available: false,
    rating: 4.8,
  },
  {
    id: "6",
    name_ar: "صيانة عامة",
    description_ar: "فنيون أردنيون محترفون لجميع أعمال الصيانة",
    icon: "Wrench",
    gradient: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50 dark:bg-gray-950/30",
    iconColor: "text-gray-600",
    available: true,
    rating: 4.5,
  },
]

export function ServiceCategories({ categories }: ServiceCategoriesProps) {
  const services =
    categories.length > 0
      ? categories.map((cat, idx) => ({
          ...cat,
          ...defaultServices[idx % defaultServices.length],
        }))
      : defaultServices

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">الخدمات المنزلية</h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            احصل على أفضل الفنيين المحترفين لخدمتك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon || "Wrench"] || Wrench

            return (
              <Card
                key={service.id}
                className="group hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <CardHeader className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors">
                        {service.name_ar}
                      </CardTitle>
                      <CardDescription className="text-sm">{service.description_ar}</CardDescription>
                    </div>

                    <div
                      className={`p-3 rounded-xl ${service.bgColor} group-hover:scale-110 transition-transform duration-300 ${service.iconColor}`}
                    >
                      <IconComponent size={24} className="sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{service.rating}</span>
                    </div>

                    {service.available ? (
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Clock size={12} />
                        متوفر الآن
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        غير متوفر
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm font-medium text-primary group-hover:underline">اطلب الخدمة ←</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
