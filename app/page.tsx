import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/hero-section"
import { ServiceCategories } from "@/components/service-categories"
import { FeaturedHalls } from "@/components/featured-halls"
import { EntertainmentSection } from "@/components/entertainment-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("service_categories").select("*").limit(8)

  const { data: halls } = await supabase
    .from("event_halls")
    .select("*, hall_media(*)")
    .eq("is_available", true)
    .order("rating", { ascending: false })
    .limit(3)

  const { data: entertainers } = await supabase
    .from("entertainers")
    .select("*, entertainer_media(*)")
    .eq("available", true)
    .order("rating", { ascending: false })
    .limit(4)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen">
      <Navbar user={user} />
      <HeroSection />
      <ServiceCategories categories={categories || []} />
      <StatsSection />
      <FeaturedHalls halls={halls || []} />
      <EntertainmentSection entertainers={entertainers || []} />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
