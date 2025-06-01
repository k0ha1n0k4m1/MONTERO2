import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"
import { Link } from "wouter"
import { useState } from "react"
import AuthModal from "@/components/auth-modal"
import type { Product } from "@shared/schema"

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      setShowAuthModal(true)
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to your wishlist",
        variant: "destructive",
      })
      return
    }
    
    toggleItem(product.id)
    
    if (!isWishlisted) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      })
    } else {
      toast({
        title: "Removed from wishlist", 
        description: `${product.name} has been removed from your wishlist`,
      })
    }
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card 
        className={`group hover-lift rounded-[2rem] overflow-hidden border border-white/10 shadow-none cursor-pointer bg-black/20 backdrop-blur transition-all duration-500 hover:border-white/30 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5`}
      >
        <div className={`${featured ? 'aspect-[4/5]' : 'aspect-square'} overflow-hidden relative`}>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <button 
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 hover:scale-110"
          >
            <svg 
              className={`w-4 h-4 transition-all duration-300 ${isWishlisted ? 'text-red-400 fill-red-400' : 'text-white'}`} 
              fill={isWishlisted ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className={`${featured ? 'p-8' : 'p-6'}`}>
          <div className="space-y-3">
            <h4 className={`${featured ? 'text-xl' : 'text-base'} font-light text-white group-hover:text-white/90 transition-colors duration-300`}>
              {product.name}
            </h4>
            {featured && product.description && (
              <p className="text-white/70 text-sm font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {product.description}
              </p>
            )}
            <div className="flex items-center justify-between pt-2">
              <p className={`text-white ${featured ? 'text-lg font-light' : 'text-sm font-light'} group-hover:text-white/90 transition-colors duration-300`}>
                {formatPrice(product.price)}
              </p>
              <Button
                onClick={handleAddToCart}
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 text-xs font-light bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-full px-4 py-2"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </Link>
  )
}
