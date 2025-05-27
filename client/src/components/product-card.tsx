import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
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
    <Card className={`group hover-lift bg-card rounded-lg overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all duration-300 ${featured ? 'bg-gradient-to-br from-card to-muted' : ''}`}>
      <div className={`${featured ? 'aspect-[4/5]' : 'aspect-square'} overflow-hidden relative`}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className={`${featured ? 'p-8' : 'p-6'}`}>
        <h4 className={`${featured ? 'text-lg' : 'text-sm'} font-light text-foreground mb-2`}>
          {product.name}
        </h4>
        {featured && product.description && (
          <p className="text-muted-foreground text-sm font-light mb-4">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className={`text-foreground ${featured ? 'font-light' : 'text-sm font-light'}`}>
            {formatPrice(product.price)}
          </p>
          <Button
            onClick={handleAddToCart}
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-light hover:bg-foreground hover:text-background"
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </Card>
  )
}
