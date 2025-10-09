import { useParams } from "wouter"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Minus } from "lucide-react"
import { Link } from "wouter"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"
import Header from "@/components/header"
import CartSidebar from "@/components/cart-sidebar"
import type { Product } from "@shared/schema"

export default function Product() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const { addItem } = useCart()
  const { toast } = useToast()
  const { t } = useLanguage()

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  })

  const handleAddToCart = () => {
    if (product) {
      addItem(product.id, quantity)
      toast({
        title: t('addedToCart'),
        description: `${product.name} (${selectedSize}) ${t('addedToCartDesc')}`,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CartSidebar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CartSidebar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <Link href="/">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToProducts')}
              </Button>
            </Link>
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('productNotFound')}</h1>
              <p className="text-gray-600 mb-8">{t('productNotFoundDesc')}</p>
              <Link href="/">
                <Button>{t('backToProducts')}</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <Link href="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToProducts')}
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-gray-900">
                  {product.available === 0 ? t('priceNotDetermined') : `₩${product.price.toLocaleString()}`}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('description')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('size')}</h3>
                <div className="grid grid-cols-5 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => {
                    const isUnavailable = product.category === 'top' && ['XS', 'S', 'XL'].includes(size);
                    return (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        disabled={isUnavailable}
                        className={`h-12 transition-all duration-200 ${
                          isUnavailable
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
                            : selectedSize === size
                              ? "bg-gray-900 text-white hover:bg-gray-700"
                              : "hover:bg-gray-100"
                        }`}
                        onClick={() => !isUnavailable && setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('quantity')}</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.available === 0}
                  className="w-full h-12 text-lg font-semibold bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {product.available === 0 ? t('priceNotDetermined') : `${t('addToCart')} - ₩${(product.price * quantity).toLocaleString()}`}
                </Button>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>• {t('freeShipping')}</p>
                  <p>• {t('returns30Days')}</p>
                  <p>• {t('authenticity')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}