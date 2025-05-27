import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/10"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="text-center fade-in">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-2xl shadow-xl">
              M⭐
            </div>
          </div>
          <h2 className="text-5xl lg:text-7xl font-light tracking-wider text-foreground mb-8 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            MONTERO
          </h2>
          <p className="text-lg lg:text-xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Premium streetwear collection. Bold designs with an edge. Express your attitude through fashion.
          </p>
          <div className="mt-12">
            <Button 
              onClick={scrollToProducts}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 text-sm font-medium tracking-wide hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              EXPLORE COLLECTION
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
