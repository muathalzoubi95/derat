import { Button } from "@/components/ui/button"
import { Search, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-20 md:py-28 lg:py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm">
            <Sparkles size={16} />
            <span>أول تطبيق أردني متخصص - أكثر من 5,000 عميل</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            خدماتكو - كل ما تحتاجه
            <br />
            <span className="text-white/90">في عمان والأردن</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-primary-foreground/90 text-pretty max-w-2xl mx-auto leading-relaxed">
            أول منصة أردنية متخصصة للخدمات المنزلية، حجز قاعات الأفراح، والمطربين الأردنيين. نخدم عمان، الزرقاء، إربد،
            والعقبة
          </p>

          <form action="/search" method="get" className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                size={20}
              />
              <input
                type="text"
                name="q"
                placeholder="ابحث عن الخدمة التي تحتاجها..."
                className="w-full pr-12 pl-4 py-3 sm:py-4 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-white hover:bg-white/90 text-primary font-bold shadow-lg h-12 sm:h-auto px-8"
            >
              بحث
            </Button>
          </form>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">300+</div>
              <div className="text-xs sm:text-sm text-white/80">مزود خدمة أردني</div>
            </div>
            <div className="text-center border-x border-white/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">40+</div>
              <div className="text-xs sm:text-sm text-white/80">قاعة في الأردن</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">80+</div>
              <div className="text-xs sm:text-sm text-white/80">فنان أردني</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}
