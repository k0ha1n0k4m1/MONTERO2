import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProductGrid from "@/components/product-grid"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProductGrid />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
