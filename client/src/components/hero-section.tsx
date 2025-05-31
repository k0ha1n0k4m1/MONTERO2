import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"

export default function HeroSection() {
  const { t } = useLanguage()
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-16 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="text-center fade-in bg-black/20 backdrop-blur rounded-[2rem] p-8 lg:p-12 shadow-2xl">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-wider mb-8 montero-title text-white">
            {t('heroTitle')}
          </h2>
          <div className="mt-8">
            <Button 
              onClick={scrollToProducts}
              className="bg-black text-white px-10 py-4 text-base font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300 shadow-lg rounded-lg"
            >
              {t('exploreCollection')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
