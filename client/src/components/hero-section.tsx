import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center fade-in">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-wider mb-8 montero-title">
            (MonTero)
          </h2>
          <div className="mt-8">
            <Button 
              onClick={scrollToProducts}
              className="bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-3 text-sm font-light tracking-wide hover:bg-white transition-colors duration-300 shadow-lg"
            >
              EXPLORE COLLECTION
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
