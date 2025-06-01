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
    <section id="hero" className="pt-16 min-h-[70vh] md:min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 w-full">
        <div className="text-center fade-in bg-black/30 md:bg-black/20 backdrop-blur rounded-xl md:rounded-[2rem] p-6 md:p-8 lg:p-12 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-9xl font-bold tracking-wider mb-6 md:mb-8 montero-title text-white">
            {t('heroTitle')}
          </h2>
          <div className="mt-6 md:mt-8">
            <Button 
              onClick={scrollToProducts}
              className="bg-black text-white px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300 shadow-lg rounded-lg"
            >
              {t('exploreCollection')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
