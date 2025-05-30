import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { Link } from "wouter"
import type { Product } from "@shared/schema"

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card 
        className={`group hover-lift rounded-lg overflow-hidden border-0 shadow-none cursor-pointer`}
        style={{ 
          backgroundColor: 'transparent'
        }}
      >
        <div className={`${featured ? 'aspect-[4/5]' : 'aspect-square'} overflow-hidden`}>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div 
          className={`${featured ? 'p-8' : 'p-6'}`}
          style={{ 
            backgroundColor: 'transparent'
          }}
        >
          <h4 className={`${featured ? 'text-lg' : 'text-sm'} font-light text-black mb-2`}>
            {product.name}
          </h4>
          {featured && product.description && (
            <p className="text-black/80 text-sm font-light mb-4">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <p className={`text-black ${featured ? 'font-light' : 'text-sm font-light'}`}>
              {formatPrice(product.price)}
            </p>
            <Button
              onClick={handleAddToCart}
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-light hover:bg-black hover:text-white text-black"
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
