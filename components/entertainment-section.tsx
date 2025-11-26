import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Ban as Band, Star, Heart } from "lucide-react"

interface EntertainerMedia {
  media_url: string
  media_type: string
}

interface Entertainer {
  id: string
  name_ar: string
  type: string
  description_ar?: string
  price_per_event: number
  rating: number
  entertainer_media?: EntertainerMedia[]
}

interface EntertainmentSectionProps {
  entertainers: Entertainer[]
}

const typeTranslation: Record<string, string> = {
  singer: "مطرب",
  band: "فرقة موسيقية",
  dj: "دي جي",
  dancer: "راقص",
  other: "ترفيه",
}

// Fallback data
const defaultEntertainers = [
  {
    id: "1",
    name_ar: "فرقة البتراء للفنون الشعبية",
    type: "band",
    rating: 4.9,
    reviews: 127,
    image: "/professional-music-band-performing.jpg",
    specialty: "فرقة تراثية أردنية - عرضة وأهازيج شعبية",
    price_per_event: 1200,
    popular: true,
  },
  {
    id: "2",
    name_ar: "عمر العبداللات",
    type: "singer",
    rating: 4.8,
    reviews: 89,
    image: "/male-arabic-singer-with-microphone.jpg",
    specialty: "مطرب أردني شعبي - أغاني تراثية",
    price_per_event: 1500,
    popular: false,
  },
  {
    id: "3",
    name_ar: "DJ محمد الأردني",
    type: "dj",
    rating: 5.0,
    reviews: 156,
    image: "/traditional-arabic-dance-performers.jpg",
    specialty: "دي جي حفلات - موسيقى عربية وعالمية",
    price_per_event: 800,
    popular: true,
  },
  {
    id: "4",
    name_ar: "فرقة عمان الموسيقية",
    type: "band",
    rating: 4.7,
    reviews: 94,
    image: "/female-singer-performing-at-event.jpg",
    specialty: "فرقة موسيقية حية - أغاني رومانسية ومعاصرة",
    price_per_event: 2000,
    popular: false,
  },
]

export function EntertainmentSection({ entertainers }: EntertainmentSectionProps) {
  const displayEntertainers = entertainers.length > 0 ? entertainers : defaultEntertainers

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">
            المطربين والفرق الموسيقية
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            اجعل مناسبتك لا تُنسى مع أفضل الفنانين
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayEntertainers.map((entertainer) => {
            const image =
              "entertainer_media" in entertainer &&
              entertainer.entertainer_media &&
              entertainer.entertainer_media.length > 0
                ? entertainer.entertainer_media[0].media_url
                : "image" in entertainer
                  ? entertainer.image
                  : "/placeholder.svg?height=400&width=300"

            const typeLabel = typeTranslation[entertainer.type] || entertainer.type
            const popular = "popular" in entertainer ? entertainer.popular : false
            const specialty =
              "description_ar" in entertainer
                ? entertainer.description_ar
                : "specialty" in entertainer
                  ? entertainer.specialty
                  : ""
            const reviews = "reviews" in entertainer ? entertainer.reviews : 0

            return (
              <Card
                key={entertainer.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 hover:border-primary/50"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={entertainer.name_ar}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {popular && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground gap-1">
                      <Star size={12} className="fill-current" />
                      الأكثر طلباً
                    </Badge>
                  )}

                  <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <Heart size={18} className="text-gray-600" />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-bold text-base sm:text-lg mb-1 leading-tight">{entertainer.name_ar}</h3>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      {entertainer.type === "band" ? <Band size={14} /> : <Music size={14} />}
                      <span>{typeLabel}</span>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <div></div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span>{entertainer.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{specialty}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    {reviews > 0 && <span>{reviews} تقييم</span>}
                    <span className="text-primary font-bold text-base">
                      {entertainer.price_per_event.toLocaleString()} <span className="text-xs font-normal">د.أ</span>
                    </span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    احجز الآن
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent">
            عرض جميع الفنانين
          </Button>
        </div>
      </div>
    </section>
  )
}
