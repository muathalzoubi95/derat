import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Play, Star } from "lucide-react"

interface HallMedia {
  media_url: string
  media_type: string
  is_primary?: boolean
}

interface EventHall {
  id: string
  name_ar: string
  location: string
  capacity: number
  price_per_hour: number
  rating: number
  hall_media?: HallMedia[]
}

interface FeaturedHallsProps {
  halls: EventHall[]
}

// Fallback data
const defaultHalls = [
  {
    id: "1",
    name_ar: "قصر الأميرة - عمان",
    location: "الدوار السابع، عمان، الأردن",
    capacity: 500,
    image: "/elegant-wedding-hall.png",
    videoCount: 5,
    rating: 4.9,
    price_per_hour: 350,
    featured: true,
  },
  {
    id: "2",
    name_ar: "قاعة الزهراء الكبرى",
    location: "شارع المدينة المنورة، عمان، الأردن",
    capacity: 800,
    image: "/luxury-event-hall-with-stage.jpg",
    videoCount: 8,
    rating: 4.8,
    price_per_hour: 280,
    featured: false,
  },
  {
    id: "3",
    name_ar: "قاعة الملكية",
    location: "ضاحية الياسمين، عمان، الأردن",
    capacity: 300,
    image: "/grand-ballroom-with-decorations.jpg",
    videoCount: 6,
    rating: 5.0,
    price_per_hour: 450,
    featured: true,
  },
]

export function FeaturedHalls({ halls }: FeaturedHallsProps) {
  const displayHalls = halls.length > 0 ? halls : defaultHalls

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">
            قاعات الأفراح والمناسبات
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">اختر القاعة المثالية لمناسبتك الخاصة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayHalls.map((hall) => {
            const image =
              "hall_media" in hall && hall.hall_media && hall.hall_media.length > 0
                ? hall.hall_media.find((m) => m.is_primary)?.media_url || hall.hall_media[0]?.media_url
                : "image" in hall
                  ? hall.image
                  : "/placeholder.svg?height=300&width=400"

            const videoCount =
              "hall_media" in hall
                ? hall.hall_media?.filter((m) => m.media_type === "video").length || 0
                : "videoCount" in hall
                  ? hall.videoCount
                  : 0

            const featured = "featured" in hall ? hall.featured : false

            return (
              <Card key={hall.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={hall.name_ar}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {featured && <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">مميزة</Badge>}

                  {videoCount > 0 && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
                      <Play size={14} className="fill-white" />
                      <span>{videoCount} فيديو</span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span>{hall.rating.toFixed(1)}</span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl leading-tight">{hall.name_ar}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5 text-sm">
                    <MapPin size={14} />
                    {hall.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span className="font-medium">{hall.capacity} شخص</span>
                    </div>
                    <div className="text-primary font-bold text-base">
                      {hall.price_per_hour.toLocaleString()} <span className="text-sm font-normal">د.أ</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {videoCount > 0 && (
                      <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                        <Play size={16} />
                        عرض الفيديوهات
                      </Button>
                    )}
                    <Button className="flex-1 bg-gradient-to-r from-primary to-accent">احجز الآن</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent">
            عرض جميع القاعات
          </Button>
        </div>
      </div>
    </section>
  )
}
