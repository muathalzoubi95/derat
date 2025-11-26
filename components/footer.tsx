import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">🇯🇴</span>
              </div>
              <span className="font-bold text-xl">خدماتكو</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              أول منصة أردنية شاملة لجميع الخدمات - من عمان إلى كل محافظات المملكة
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  عن الشركة
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  كيف نعمل
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  الشروط والأحكام
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  سياسة الخصوصية
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">الخدمات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  الخدمات المنزلية
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  حجز القاعات
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  المطربين والفرق
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  التصوير والديكور
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  خدمات التوصيل
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div dir="ltr">+962 79 123 4567</div>
                  <div dir="ltr">+962 77 765 4321</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:info@khadamatko.jo" className="hover:text-primary transition-colors">
                  info@khadamatko.jo
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>عمان - الأردن، شارع المدينة المنورة</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>جميع الحقوق محفوظة © 2025 خدماتكو - الأردن 🇯🇴</p>
        </div>
      </div>
    </footer>
  )
}
