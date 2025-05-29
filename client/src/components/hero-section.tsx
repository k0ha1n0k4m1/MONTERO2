import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center fade-in">
          <h2 className="text-5xl lg:text-7xl font-bold tracking-wider text-foreground mb-8 montero-title">
            MONTERO
          </h2>
          <div className="mt-8">
            <Button 
              onClick={scrollToProducts}
              className="bg-foreground text-background px-8 py-3 text-sm font-light tracking-wide hover:bg-muted-foreground transition-colors duration-300"
            >
              EXPLORE COLLECTION
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
