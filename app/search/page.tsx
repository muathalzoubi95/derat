import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Star } from "lucide-react"
import Link from "next/link"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const searchQuery = params.q || ""
  const searchType = params.type || "all"

  let services = []
  let halls = []
  let entertainers = []

  if (searchType === "all" || searchType === "services") {
    const { data } = await supabase
      .from("service_categories")
      .select("*")
      .ilike("name_ar", `%${searchQuery}%`)
      .limit(10)
    services = data || []
  }

  if (searchType === "all" || searchType === "halls") {
    const { data } = await supabase
      .from("event_halls")
      .select("*")
      .or(`name.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
      .eq("is_available", true)
      .limit(10)
    halls = data || []
  }

  if (searchType === "all" || searchType === "entertainers") {
    const { data } = await supabase
      .from("entertainers")
      .select("*")
      .or(`name.ilike.%${searchQuery}%,type.ilike.%${searchQuery}%`)
      .eq("available", true)
      .limit(10)
    entertainers = data || []
  }

  const totalResults = services.length + halls.length + entertainers.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-2xl text-primary-foreground">
            <h1 className="text-3xl font-bold mb-4 text-center">ابحث عن الخدمة المناسبة</h1>
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <form action="/search" method="get">
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="سباك، قاعة أفراح، مطرب..."
                  className="w-full pr-12 pl-4 py-4 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Link href={`/search?q=${searchQuery}&type=all`}>
              <Badge
                variant={searchType === "all" ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer whitespace-nowrap"
              >
                الكل ({totalResults})
              </Badge>
            </Link>
            <Link href={`/search?q=${searchQuery}&type=services`}>
              <Badge
                variant={searchType === "services" ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer whitespace-nowrap"
              >
                الخدمات ({services.length})
              </Badge>
            </Link>
            <Link href={`/search?q=${searchQuery}&type=halls`}>
              <Badge
                variant={searchType === "halls" ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer whitespace-nowrap"
              >
                القاعات ({halls.length})
              </Badge>
            </Link>
            <Link href={`/search?q=${searchQuery}&type=entertainers`}>
              <Badge
                variant={searchType === "entertainers" ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer whitespace-nowrap"
              >
                المطربين ({entertainers.length})
              </Badge>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {totalResults === 0 ? (
            <Card className="p-12 text-center">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">لم يتم العثور على نتائج</h2>
              <p className="text-muted-foreground">جرب البحث بكلمات مختلفة</p>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Services Results */}
              {services.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">الخدمات</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {services.map((service: any) => (
                      <Card key={service.id} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="text-4xl">{service.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{service.name_ar}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{service.description_ar}</p>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              عرض مزودي الخدمة
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Halls Results */}
              {halls.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">القاعات</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {halls.map((hall: any) => (
                      <Card key={hall.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20"></div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2">{hall.name}</h3>
                          <div className="space-y-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{hall.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{hall.rating} تقييم</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">{hall.price_per_event} د.أ</span>
                            <Button size="sm">احجز الآن</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Entertainers Results */}
              {entertainers.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">الفنانين</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {entertainers.map((entertainer: any) => (
                      <Card key={entertainer.id} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                            🎤
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{entertainer.name}</h3>
                            <Badge variant="secondary" className="mb-2">
                              {entertainer.type}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{entertainer.rating} تقييم</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-primary">{entertainer.price_per_event} د.أ</span>
                              <Button size="sm">احجز الآن</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
