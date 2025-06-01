import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"

export default function HeroSection() {
  const { t } = useLanguage()
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ block: 'start' })
    }
  }

  return (
    <section id="hero" className="pt-16 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="text-center fade-in bg-black/20 backdrop-blur rounded-[2rem] p-8 lg:p-16 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-700">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider montero-title text-white leading-none" style={{ fontFamily: 'IFC LOS BANDITOS, serif' }}>
                {t('heroTitle')}
              </h2>
              <div className="flex items-center justify-center space-x-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
                <span className="text-white/60 text-sm font-light tracking-[0.3em] uppercase">Racing Collection</span>
                <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
              Discover the ultimate fusion of speed and style with our exclusive racing-inspired apparel
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button 
                onClick={scrollToProducts}
                className="group bg-white text-black px-12 py-4 text-lg font-light hover:bg-gray-100 transition-all duration-300 rounded-full border-2 border-transparent hover:shadow-2xl hover:shadow-white/20 transform hover:scale-105"
              >
                <span className="flex items-center space-x-3">
                  <span>{t('exploreCollection')}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
              <button className="text-white/80 hover:text-white px-10 py-4 text-lg font-light border border-white/30 hover:border-white/50 transition-all duration-300 rounded-full hover:bg-white/5 backdrop-blur">
                View Lookbook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
