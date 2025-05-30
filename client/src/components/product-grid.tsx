import { useQuery } from "@tanstack/react-query"
import { useLocation } from "wouter"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/hooks/useLanguage"
import type { Product } from "@shared/schema"

export default function ProductGrid() {
  const [location] = useLocation()
  const { t } = useLanguage()
  // Extract category from URL path
  const category = location.startsWith('/category/') 
    ? location.split('/category/')[1] 
    : 'all'
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products', category],
    queryFn: async () => {
      const res = await fetch(`/api/products?category=${category}`, {
        credentials: 'include'
      })
      if (!res.ok) throw new Error('Failed to fetch products')
      return res.json()
    }
  })

  const { data: featuredProducts, isLoading: featuredLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
    queryFn: async () => {
      const res = await fetch('/api/products/featured', {
        credentials: 'include'
      })
      if (!res.ok) throw new Error('Failed to fetch featured products')
      return res.json()
    }
  })

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Failed to load products. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-20">
      {/* New Arrivals Section */}
      <section className="py-20" id="products">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {category === 'all' ? t('newArrivals') : `${t(category)} ${t('collection')}`}
              </h3>
              <p className="text-white/80 font-medium text-lg">
                {category === 'all' ? t('freshPieces') : `Discover our ${t(category)} essentials`}
              </p>
            </div>
        
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 slide-up">
                {(category === 'all' ? featuredProducts?.slice(0, 4) : products)?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Collection - Only show on "all" page */}
      {category === 'all' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="text-center mb-16">
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t('featuredSelection')}</h3>
                <p className="text-white/80 font-medium text-lg">{t('handpicked')}</p>
              </div>
              
              {featuredLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="aspect-[4/5] w-full" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProducts?.slice(4, 7).map((product) => (
                    <ProductCard key={product.id} product={product} featured />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
